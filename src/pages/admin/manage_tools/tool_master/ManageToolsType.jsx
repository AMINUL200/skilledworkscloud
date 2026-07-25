import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit, Trash2, X, Shield, FileText, CheckCircle, Eye } from 'lucide-react';
import { api } from '../../../../utils/app';

const ManageToolsType = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingForm, setEditingForm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    form_type: '',
    is_active: 1
  });

  // Fetch forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/forms');

      if (response.data.status && response.data.data) {
        setForms(response.data.data);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to fetch forms'
        });
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch forms'
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

  const handleAddNew = () => {
    setEditingForm(null);
    setFormData({
      name: '',
      description: '',
      form_type: '',
      is_active: 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (form) => {
    setEditingForm(form);
    setFormData({
      name: form.name || '',
      description: form.description || '',
      form_type: form.form_type || '',
      is_active: form.is_active !== undefined ? (form.is_active ? 1 : 0) : 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this form?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/forms/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Form deleted successfully!'
        });
        await fetchForms();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete form'
        });
      }
    } catch (error) {
      console.error('Error deleting form:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete form'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Form name is required!' });
      return false;
    }

    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Description is required!' });
      return false;
    }

    if (!formData.form_type.trim()) {
      setMessage({ type: 'error', text: 'Form type is required!' });
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
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        form_type: formData.form_type.trim(),
        is_active: formData.is_active
      };

      // If editing, add the id
      if (editingForm) {
        submitData.id = editingForm.id;
      }

      const response = await api.post('/admin/forms/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Form ${editingForm ? 'updated' : 'added'} successfully!`
        });

        await fetchForms();
        setShowForm(false);
        setEditingForm(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save form'
        });
      }
    } catch (error) {
      console.error('Error saving form:', error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setMessage({
          type: 'error',
          text: `Validation Error: ${errorMessages}`
        });
      } else if (error.response?.data?.message) {
        setMessage({
          type: 'error',
          text: error.response.data.message
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
    setEditingForm(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Manage Tools Type
              </h2>
              <p className="text-sm text-gray-600">Manage form types for tools</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Manage Tools Type
            </h2>
            <p className="text-sm text-gray-600">Manage form types for tools</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Form Type
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
              {/* Form Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., WORK PERMIT CLOUD · COMPLIANCE AUDIT"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Form Type */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form Type *
                </label>
                <input
                  type="text"
                  name="form_type"
                  value={formData.form_type}
                  onChange={handleChange}
                  placeholder="e.g., Compliance Audit, QUICK START"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">This will be used as the form type identifier</p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter form description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">When inactive, this form type won't be displayed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingForm ? 'Update Form' : 'Add Form'}
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
          /* Forms List */
          <>
            {forms.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No form types added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Form Type
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forms.map((form) => (
                  <div
                    key={form.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            form.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {form.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-800">
                          {form.name}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {form.description}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {form.form_type}
                          </span>
                          <span className="text-xs text-gray-500">
                            Questions: {form.questions_count || 0}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(form.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(form)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(form.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div> */}
                    </div>
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

export default ManageToolsType;