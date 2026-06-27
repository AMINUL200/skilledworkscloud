import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, Search, Pencil, Code, Rocket, Calendar, MessageCircle } from 'lucide-react';

const ServiceDetailsEightsSection = () => {
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
    timelines: [],
    title2: '',
    short_desc: '',
    button_name: '',
    button_url: '',
    status: 1
  });

  // Timeline form state
  const [timelineFormData, setTimelineFormData] = useState({
    icon: 'search',
    batch: '',
    title: '',
    description: ''
  });
  const [editingTimelineIndex, setEditingTimelineIndex] = useState(null);

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-eighth-section/list');

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

  // Timeline management
  const handleTimelineChange = (e) => {
    const { name, value } = e.target;
    setTimelineFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTimeline = () => {
    if (!timelineFormData.batch || !timelineFormData.title) {
      setMessage({ type: 'error', text: 'Batch and title are required!' });
      return;
    }

    setFormData(prev => ({
      ...prev,
      timelines: [...prev.timelines, { ...timelineFormData }]
    }));

    // Reset timeline form
    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleEditTimeline = (index) => {
    const timeline = formData.timelines[index];
    setTimelineFormData({
      icon: timeline.icon || 'search',
      batch: timeline.batch || '',
      title: timeline.title || '',
      description: timeline.description || ''
    });
    setEditingTimelineIndex(index);
  };

  const handleUpdateTimeline = () => {
    if (!timelineFormData.batch || !timelineFormData.title) {
      setMessage({ type: 'error', text: 'Batch and title are required!' });
      return;
    }

    const updatedTimelines = [...formData.timelines];
    updatedTimelines[editingTimelineIndex] = { ...timelineFormData };
    setFormData(prev => ({
      ...prev,
      timelines: updatedTimelines
    }));

    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleRemoveTimeline = (index) => {
    setFormData(prev => ({
      ...prev,
      timelines: prev.timelines.filter((_, i) => i !== index)
    }));
  };

  const handleCancelTimelineEdit = () => {
    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'search':
        return <Search className="w-5 h-5" />;
      case 'pencil':
        return <Pencil className="w-5 h-5" />;
      case 'code':
        return <Code className="w-5 h-5" />;
      case 'rocket':
        return <Rocket className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (iconName) => {
    switch(iconName) {
      case 'search':
        return 'bg-blue-100 text-blue-600';
      case 'pencil':
        return 'bg-green-100 text-green-600';
      case 'code':
        return 'bg-purple-100 text-purple-600';
      case 'rocket':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTimelineBorderColor = (iconName) => {
    switch(iconName) {
      case 'search':
        return 'border-blue-200';
      case 'pencil':
        return 'border-green-200';
      case 'code':
        return 'border-purple-200';
      case 'rocket':
        return 'border-orange-200';
      default:
        return 'border-gray-200';
    }
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
      timelines: [],
      title2: '',
      short_desc: '',
      button_name: '',
      button_url: '',
      status: 1
    });
    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
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
      timelines: section.timelines || [],
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      button_name: section.button_name || '',
      button_url: section.button_url || '',
      status: section.status !== undefined ? section.status : 1
    });
    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-eighth-section/${id}`);

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

    if (formData.timelines.length === 0) {
      setMessage({ type: 'error', text: 'At least one timeline item is required!' });
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
        if (key === 'timelines') {
          // Send each timeline as individual form fields with array notation
          formData[key].forEach((timeline, index) => {
            submitData.append(`timelines[${index}][icon]`, timeline.icon || '');
            submitData.append(`timelines[${index}][batch]`, timeline.batch || '');
            submitData.append(`timelines[${index}][title]`, timeline.title || '');
            submitData.append(`timelines[${index}][description]`, timeline.description || '');
          });
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-eighth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-eighth-section/save', submitData, {
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
    setTimelineFormData({
      icon: 'search',
      batch: '',
      title: '',
      description: ''
    });
    setEditingTimelineIndex(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                Service Details Eight Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details timeline section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Service Details Eight Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details timeline section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center gap-2 transition-colors"
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
                  placeholder="e.g., PROJECT TIMELINE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  placeholder="e.g., Project Success"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  placeholder="e.g., Transparent Progress At Every Stage"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  placeholder="e.g., Schedule Consultation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Timelines Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Project Timelines</h3>
              
              {/* Timeline Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Icon
                    </label>
                    <select
                      name="icon"
                      value={timelineFormData.icon}
                      onChange={handleTimelineChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      disabled={saving}
                    >
                      <option value="search">Search</option>
                      <option value="pencil">Pencil</option>
                      <option value="code">Code</option>
                      <option value="rocket">Rocket</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Batch / Week *
                    </label>
                    <input
                      type="text"
                      name="batch"
                      value={timelineFormData.batch}
                      onChange={handleTimelineChange}
                      placeholder="e.g., Week 01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                      value={timelineFormData.title}
                      onChange={handleTimelineChange}
                      placeholder="e.g., Discovery"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                      value={timelineFormData.description}
                      onChange={handleTimelineChange}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {editingTimelineIndex !== null ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdateTimeline}
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Update Timeline
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelTimelineEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddTimeline}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Timeline
                    </button>
                  )}
                </div>
              </div>

              {/* Timelines List */}
              {formData.timelines.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {formData.timelines.map((timeline, index) => (
                    <div
                      key={index}
                      className={`bg-white border ${getTimelineBorderColor(timeline.icon)} rounded-lg p-4 hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${getIconBgColor(timeline.icon)} mb-3`}>
                            {getIconComponent(timeline.icon)}
                          </div>
                          <p className="text-xs font-semibold text-teal-600">{timeline.batch}</p>
                          <h4 className="text-sm font-semibold text-gray-800 mt-1">{timeline.title}</h4>
                          {timeline.description && (
                            <p className="text-xs text-gray-500 mt-1">{timeline.description}</p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditTimeline(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                            disabled={saving}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTimeline(index)}
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
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
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
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-teal-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            section.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {section.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {section.batch && (
                          <p className="text-sm text-teal-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-teal-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Timelines */}
                        {section.timelines && section.timelines.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                            {section.timelines.map((timeline, index) => (
                              <div
                                key={index}
                                className={`bg-white border ${getTimelineBorderColor(timeline.icon)} rounded-lg p-3 text-center`}
                              >
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${getIconBgColor(timeline.icon)} mb-2`}>
                                  {getIconComponent(timeline.icon)}
                                </div>
                                <p className="text-xs font-semibold text-teal-600">{timeline.batch}</p>
                                <p className="text-sm font-medium text-gray-700">{timeline.title}</p>
                                {timeline.description && (
                                  <p className="text-xs text-gray-500 mt-1">{timeline.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* CTA Section */}
                        <div className="mt-4 p-4 bg-white rounded-lg border border-teal-200">
                          <h4 className="text-lg font-semibold text-gray-800">{section.title2}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.short_desc}</p>
                          {section.button_name && (
                            <div className="mt-3">
                              <span className="inline-block px-4 py-2 bg-teal-600 text-white text-sm rounded-lg">
                                {section.button_name}
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
                          className="p-2 text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
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

export default ServiceDetailsEightsSection;