import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ManageFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    question: '',
    answer: '',
    status: 1
  });

  // Fetch all FAQs on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/faq/list');

      if (response.data.status && response.data.data) {
        setFaqs(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch FAQs'
      });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleAddNew = () => {
    setEditingFaq(null);
    setFormData({
      slug: '',
      question: '',
      answer: '',
      status: 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      slug: faq.slug || '',
      question: faq.question || '',
      answer: faq.answer || '',
      status: faq.status !== undefined ? (faq.status === true || faq.status === 1 ? 1 : 0) : 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/faq/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'FAQ deleted successfully!'
        });
        await fetchFaqs();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete FAQ'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.slug.trim()) {
      setMessage({ type: 'error', text: 'Slug is required!' });
      return false;
    }

    if (!formData.question.trim()) {
      setMessage({ type: 'error', text: 'Question is required!' });
      return false;
    }

    if (!formData.answer.trim()) {
      setMessage({ type: 'error', text: 'Answer is required!' });
      return false;
    }

   

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('slug', formData.slug);
      submitData.append('question', formData.question);
      submitData.append('answer', formData.answer);
      submitData.append('status', formData.status);

      let response;
      if (editingFaq) {
        // Update existing FAQ
        submitData.append('id', editingFaq.id);
        response = await api.post('/admin/faq/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new FAQ
        response = await api.post('/admin/faq/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `FAQ ${editingFaq ? 'updated' : 'added'} successfully!`
        });

        await fetchFaqs();
        setShowForm(false);
        setEditingFaq(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save FAQ'
        });
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setMessage({
          type: 'error',
          text: `Validation Error: ${errorMessages}`
        });
      } else {
        setMessage({
          type: 'error',
          text: error.message || 'Failed to save. Please try again.'
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFaq(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Manage FAQs
              </h2>
              <p className="text-sm text-gray-600">Manage frequently asked questions</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading FAQs...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              Manage FAQs
            </h2>
            <p className="text-sm text-gray-600">Manage frequently asked questions</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add FAQ
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : message.type === 'info'
              ? 'bg-blue-50 text-blue-800 border border-blue-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <span className="flex-1">{message.text}</span>
            <button
              type="button"
              onClick={() => setMessage({ type: '', text: '' })}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g., services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for grouping FAQs (e.g., services, pricing, support)
                </p>
              </div>

              {/* Status */}
              <div className="flex items-end">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 ml-3">When inactive, this FAQ won't be displayed</p>
              </div>

              {/* Question */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Enter the question"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.question.length}
                </p>
              </div>

              {/* Answer */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  placeholder="Enter the answer"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.answer.length}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingFaq ? 'Update FAQ' : 'Add FAQ'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* FAQs List */
          <>
            {faqs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No FAQs added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add Your First FAQ
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-indigo-200 transition-colors"
                  >
                    {/* FAQ Header */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <HelpCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-800">
                          {faq.question}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({faq.slug})
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          faq.status === true || faq.status === 1
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {faq.status === true || faq.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(faq);
                          }}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(faq.id);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFaq(faq.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded transition-colors"
                        >
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* FAQ Answer (Expandable) */}
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              Updated: {new Date(faq.updated_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageFAQ;