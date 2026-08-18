import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, ClipboardList, ArrowRight, MessageCircle } from 'lucide-react';

const ServiceDetailsSevenSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    highlighted_title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    steps: [],
    title2: '',
    short_desc: '',
    button_name: '',
    button_url: '',
    identifier: '', // Added identifier field
    status: 1
  });

  // Step form state
  const [stepFormData, setStepFormData] = useState({
    number: '',
    title: '',
    description: ''
  });
  const [editingStepIndex, setEditingStepIndex] = useState(null);

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-seventh-section/list');

      if (response.data.status && response.data.data) {
        setSections(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch sections'
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

  // Step management
  const handleStepChange = (e) => {
    const { name, value } = e.target;
    setStepFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStep = () => {
    if (!stepFormData.number || !stepFormData.title) {
      setMessage({ type: 'error', text: 'Step number and title are required!' });
      return;
    }

    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { ...stepFormData }]
    }));

    // Reset step form
    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleEditStep = (index) => {
    const step = formData.steps[index];
    setStepFormData({
      number: step.number || '',
      title: step.title || '',
      description: step.description || ''
    });
    setEditingStepIndex(index);
  };

  const handleUpdateStep = () => {
    if (!stepFormData.number || !stepFormData.title) {
      setMessage({ type: 'error', text: 'Step number and title are required!' });
      return;
    }

    const updatedSteps = [...formData.steps];
    updatedSteps[editingStepIndex] = { ...stepFormData };
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));

    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleRemoveStep = (index) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const handleCancelStepEdit = () => {
    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
  };

  const handleAddNew = () => {
    setEditingSection(null);
    setFormData({
      batch: '',
      title: '',
      highlighted_title: '',
      description: '',
      title_meta: '',
      desc_meta: '',
      steps: [],
      title2: '',
      short_desc: '',
      button_name: '',
      button_url: '',
      identifier: '', // Reset identifier
      status: 1
    });
    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      batch: section.batch || '',
      title: section.title || '',
      highlighted_title: section.highlighted_title || '',
      description: section.description || '',
      title_meta: section.title_meta || '',
      desc_meta: section.desc_meta || '',
      steps: section.steps || [],
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      button_name: section.button_name || '',
      button_url: section.button_url || '',
      identifier: section.identifier || '', // Load identifier from section
      status: section.status !== undefined ? section.status : 1
    });
    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-seventh-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Section deleted successfully!'
        });
        await fetchSections();
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

    if (!formData.title2) {
      setMessage({ type: 'error', text: 'Secondary Title is required!' });
      return false;
    }

    if (!formData.short_desc) {
      setMessage({ type: 'error', text: 'Short Description is required!' });
      return false;
    }

    if (!formData.button_name) {
      setMessage({ type: 'error', text: 'Button Name is required!' });
      return false;
    }

    if (!formData.button_url) {
      setMessage({ type: 'error', text: 'Button URL is required!' });
      return false;
    }

    if (!formData.identifier) {
      setMessage({ type: 'error', text: 'Identifier is required!' });
      return false;
    }

    if (formData.steps.length === 0) {
      setMessage({ type: 'error', text: 'At least one step is required!' });
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

      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'steps') {
          // Send each step as individual form fields with array notation
          formData[key].forEach((step, index) => {
            submitData.append(`steps[${index}][number]`, step.number || '');
            submitData.append(`steps[${index}][title]`, step.title || '');
            submitData.append(`steps[${index}][description]`, step.description || '');
          });
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-seventh-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-seventh-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Section ${editingSection ? 'updated' : 'added'} successfully!`
        });

        await fetchSections();
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
    setStepFormData({
      number: '',
      title: '',
      description: ''
    });
    setEditingStepIndex(null);
    setMessage({ type: '', text: '' });
  };

  // Get gradient color for step based on index
  const getStepGradient = (index) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-indigo-500 to-indigo-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-rose-500 to-rose-600'
    ];
    return gradients[index % gradients.length];
  };

  const getStepBgGradient = (index) => {
    const gradients = [
      'from-blue-50 to-blue-100 border-blue-200',
      'from-indigo-50 to-indigo-100 border-indigo-200',
      'from-purple-50 to-purple-100 border-purple-200',
      'from-pink-50 to-pink-100 border-pink-200',
      'from-rose-50 to-rose-100 border-rose-200'
    ];
    return gradients[index % gradients.length];
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-rose-600" />
                Service Details Seven Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details process section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-rose-600" />
              Service Details Seven Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details process section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
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
              {/* Identifier - New Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identifier *
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="e.g., service_seventh_section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for this section (e.g., service_seventh_section)
                </p>
              </div>

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
                  placeholder="e.g., OUR PROCESS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter main title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Highlighted Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlighted Title
                </label>
                <input
                  type="text"
                  name="highlighted_title"
                  value={formData.highlighted_title}
                  onChange={handleChange}
                  placeholder="e.g., Exceptional Results"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
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
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Secondary Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Title *
                </label>
                <input
                  type="text"
                  name="title2"
                  value={formData.title2}
                  onChange={handleChange}
                  placeholder="e.g., A Proven Workflow That Delivers Results"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleChange}
                  placeholder="Short description for CTA section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Button Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Name *
                </label>
                <input
                  type="text"
                  name="button_name"
                  value={formData.button_name}
                  onChange={handleChange}
                  placeholder="e.g., Get Started"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Button URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button URL *
                </label>
                <input
                  type="text"
                  name="button_url"
                  value={formData.button_url}
                  onChange={handleChange}
                  placeholder="/contact-us"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Steps Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Process Steps</h3>
              
              {/* Step Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Step Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={stepFormData.number}
                      onChange={handleStepChange}
                      placeholder="e.g., 01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={stepFormData.title}
                      onChange={handleStepChange}
                      placeholder="e.g., Discovery & Consultation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={stepFormData.description}
                      onChange={handleStepChange}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {editingStepIndex !== null ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdateStep}
                        className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Update Step
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelStepEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Step
                    </button>
                  )}
                </div>
              </div>

              {/* Steps List */}
              {formData.steps.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.steps.map((step, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${getStepBgGradient(index)} border rounded-lg p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${getStepGradient(index)} text-white font-bold text-sm mb-3`}>
                            {step.number}
                          </div>
                          <h4 className="text-sm font-semibold text-gray-800">{step.title}</h4>
                          {step.description && (
                            <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditStep(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                            disabled={saving}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                            disabled={saving}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status === 1}
                  onChange={handleChange}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  disabled={saving}
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">When inactive, this section won't be displayed</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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
          /* Sections List */
          <>
            {sections.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <ClipboardList className="w-5 h-5 text-rose-600" />
                          {section.identifier && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                              {section.identifier}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            section.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {section.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {section.batch && (
                          <p className="text-sm text-rose-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-rose-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Steps */}
                        {section.steps && section.steps.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                            {section.steps.map((step, index) => (
                              <div
                                key={index}
                                className={`bg-gradient-to-br ${getStepBgGradient(index)} border rounded-lg p-3`}
                              >
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${getStepGradient(index)} text-white font-bold text-xs mb-2`}>
                                  {step.number}
                                </div>
                                <p className="text-sm font-medium text-gray-700">{step.title}</p>
                                {step.description && (
                                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* CTA Section */}
                        <div className="mt-4 p-4 bg-white rounded-lg border border-rose-200">
                          <h4 className="text-lg font-semibold text-gray-800">{section.title2}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.short_desc}</p>
                          {section.button_name && (
                            <div className="mt-3">
                              <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 text-white text-sm rounded-lg">
                                {section.button_name}
                                <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(section.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(section.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default ServiceDetailsSevenSection;