import React, { useState, useEffect } from 'react';
import { Save, Plus, Edit, Trash2, X, Image, Heart, Star, Users, Briefcase, Shield, Clock, FileText } from 'lucide-react';
import { api } from '../../../../utils/app';

const ManageRTWFirstSection = () => {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [featureInput, setFeatureInput] = useState('');
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    features: [],
    button_name: '',
    button_url: '',
    status: 1
  });

  // Fetch section on component mount
  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/rtw-first-section/list');

      if (response.data.status && response.data.data) {
        setSection(response.data.data);
        // If section exists, populate form data for editing
        if (response.data.data.id) {
          setFormData({
            batch: response.data.data.batch || '',
            title: response.data.data.title || '',
            description: response.data.data.description || '',
            title_meta: response.data.data.title_meta || '',
            desc_meta: response.data.data.desc_meta || '',
            features: response.data.data.features || [],
            button_name: response.data.data.button_name || '',
            button_url: response.data.data.button_url || '',
            status: response.data.data.status !== undefined ? response.data.data.status : 1
          });
          setEditingSection(response.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch section'
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

  // Feature management
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, { title: featureInput.trim() }]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleAddNew = () => {
    setEditingSection(null);
    setFormData({
      batch: '',
      title: '',
      description: '',
      title_meta: '',
      desc_meta: '',
      features: [],
      button_name: '',
      button_url: '',
      status: 1
    });
    setFeatureInput('');
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (sectionData) => {
    setEditingSection(sectionData);
    setFormData({
      batch: sectionData.batch || '',
      title: sectionData.title || '',
      description: sectionData.description || '',
      title_meta: sectionData.title_meta || '',
      desc_meta: sectionData.desc_meta || '',
      features: sectionData.features || [],
      button_name: sectionData.button_name || '',
      button_url: sectionData.button_url || '',
      status: sectionData.status !== undefined ? sectionData.status : 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/rtw-first-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Section deleted successfully!'
        });
        setSection(null);
        setFormData({
          batch: '',
          title: '',
          description: '',
          title_meta: '',
          desc_meta: '',
          features: [],
          button_name: '',
          button_url: '',
          status: 1
        });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete section'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title) {
      setMessage({ type: 'error', text: 'Title is required!' });
      return false;
    }

    if (!formData.description) {
      setMessage({ type: 'error', text: 'Description is required!' });
      return false;
    }

    if (formData.button_url && !formData.button_url.startsWith('/')) {
      setMessage({ type: 'error', text: 'Button URL should start with "/"' });
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
      // Create a plain object for the submission
      const submitData = {
        batch: formData.batch,
        title: formData.title,
        description: formData.description,
        title_meta: formData.title_meta,
        desc_meta: formData.desc_meta,
        features: formData.features, // Send as array directly
        button_name: formData.button_name,
        button_url: formData.button_url,
        status: formData.status
      };

      // If editing, add the id
      if (editingSection) {
        submitData.id = editingSection.id;
      }

      console.log('Submitting data:', submitData);

      let response;
      if (editingSection) {
        response = await api.post('/admin/rtw-first-section/save', submitData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await api.post('/admin/rtw-first-section/save', submitData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Section ${editingSection ? 'updated' : 'added'} successfully!`
        });

        await fetchSection();
        setShowForm(false);
        setEditingSection(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save section'
        });
      }
    } catch (error) {
      console.error('Error saving section:', error);

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
    setEditingSection(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                RTW First Section
              </h2>
              <p className="text-sm text-gray-600">Manage Right to Work hero section</p>
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
              <Shield className="w-5 h-5 text-blue-600" />
              RTW First Section
            </h2>
            <p className="text-sm text-gray-600">Manage Right to Work hero section</p>
          </div>
          {!showForm && !section && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          )}
          {!showForm && section && (
            <button
              onClick={() => handleEdit(section)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Section
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
              {/* Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch / Subtitle
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="e.g., Free RTW Compliance Check"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter main title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
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
                  placeholder="Enter section description"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Title Meta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Meta
                </label>
                <input
                  type="text"
                  name="title_meta"
                  value={formData.title_meta}
                  onChange={handleChange}
                  placeholder="Meta title for this section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Description Meta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description Meta
                </label>
                <input
                  type="text"
                  name="desc_meta"
                  value={formData.desc_meta}
                  onChange={handleChange}
                  placeholder="Meta description for this section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Button Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Call-to-Action Button</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button Name
                    </label>
                    <input
                      type="text"
                      name="button_name"
                      value={formData.button_name}
                      onChange={handleChange}
                      placeholder="e.g., Talk to an Expert"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button URL
                    </label>
                    <input
                      type="text"
                      name="button_url"
                      value={formData.button_url}
                      onChange={handleChange}
                      placeholder="/contact"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">Should start with "/" (e.g., /contact)</p>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Features</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={handleFeatureKeyPress}
                      placeholder="Add feature (e.g., IAA Regulated)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {formData.features.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                        >
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Shield className="w-3 h-3 text-blue-500" />
                            {item.title}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            disabled={saving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">When inactive, this section won't be displayed</p>
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
                    {editingSection ? 'Update Section' : 'Add Section'}
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
          /* Section Display */
          <>
            {!section ? (
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No section added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        section.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {section.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    {section.batch && (
                      <p className="text-sm text-blue-600 font-medium">{section.batch}</p>
                    )}
                    
                    <h3 className="text-xl font-semibold text-gray-800 mt-1">
                      {section.title}
                    </h3>
                    
                    <p className="text-gray-600 mt-2">{section.description}</p>
                    
                    {/* Features */}
                    {section.features && section.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {section.features.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1"
                          >
                            {index === 0 && <Shield className="w-3 h-3" />}
                            {index === 1 && <Clock className="w-3 h-3" />}
                            {index === 2 && <FileText className="w-3 h-3" />}
                            {item.title}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Button */}
                    {section.button_name && (
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md">
                          {section.button_name}
                          {section.button_url && (
                            <span className="text-xs text-blue-200">({section.button_url})</span>
                          )}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-400 mt-4">
                      Updated: {new Date(section.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(section)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => handleDelete(section.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageRTWFirstSection;