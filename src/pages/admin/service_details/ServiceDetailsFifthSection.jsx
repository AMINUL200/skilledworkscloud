import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, Briefcase, Clock, DollarSign, Shield, Rocket, Users, BarChart3, TrendingUp, Award, Headphones } from 'lucide-react';

const ServiceDetailsFifthSection = () => {
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
    features: [],
    statistics: [],
    title2: '',
    short_desc: '',
    status: 1
  });

  // Feature form state
  const [featureFormData, setFeatureFormData] = useState({
    icon: 'briefcase',
    title: '',
    description: ''
  });
  const [editingFeatureIndex, setEditingFeatureIndex] = useState(null);

  // Statistics form state
  const [statisticFormData, setStatisticFormData] = useState({
    title: '',
    number: ''
  });
  const [editingStatisticIndex, setEditingStatisticIndex] = useState(null);

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-fifth-section/list');

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

  // Feature management
  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFeatureFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (!featureFormData.title) {
      setMessage({ type: 'error', text: 'Feature title is required!' });
      return;
    }

    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { ...featureFormData }]
    }));

    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setEditingFeatureIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleEditFeature = (index) => {
    const feature = formData.features[index];
    setFeatureFormData({
      icon: feature.icon || 'briefcase',
      title: feature.title || '',
      description: feature.description || ''
    });
    setEditingFeatureIndex(index);
  };

  const handleUpdateFeature = () => {
    if (!featureFormData.title) {
      setMessage({ type: 'error', text: 'Feature title is required!' });
      return;
    }

    const updatedFeatures = [...formData.features];
    updatedFeatures[editingFeatureIndex] = { ...featureFormData };
    setFormData(prev => ({
      ...prev,
      features: updatedFeatures
    }));

    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setEditingFeatureIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleCancelFeatureEdit = () => {
    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setEditingFeatureIndex(null);
  };

  // Statistics management
  const handleStatisticChange = (e) => {
    const { name, value } = e.target;
    setStatisticFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStatistic = () => {
    if (!statisticFormData.title || !statisticFormData.number) {
      setMessage({ type: 'error', text: 'Statistic title and number are required!' });
      return;
    }

    setFormData(prev => ({
      ...prev,
      statistics: [...prev.statistics, { ...statisticFormData }]
    }));

    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingStatisticIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleEditStatistic = (index) => {
    const statistic = formData.statistics[index];
    setStatisticFormData({
      title: statistic.title || '',
      number: statistic.number || ''
    });
    setEditingStatisticIndex(index);
  };

  const handleUpdateStatistic = () => {
    if (!statisticFormData.title || !statisticFormData.number) {
      setMessage({ type: 'error', text: 'Statistic title and number are required!' });
      return;
    }

    const updatedStatistics = [...formData.statistics];
    updatedStatistics[editingStatisticIndex] = { ...statisticFormData };
    setFormData(prev => ({
      ...prev,
      statistics: updatedStatistics
    }));

    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingStatisticIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleRemoveStatistic = (index) => {
    setFormData(prev => ({
      ...prev,
      statistics: prev.statistics.filter((_, i) => i !== index)
    }));
  };

  const handleCancelStatisticEdit = () => {
    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingStatisticIndex(null);
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'briefcase':
        return <Briefcase className="w-4 h-4" />;
      case 'clock':
        return <Clock className="w-4 h-4" />;
      case 'dollar':
        return <DollarSign className="w-4 h-4" />;
      case 'shield':
        return <Shield className="w-4 h-4" />;
      case 'rocket':
        return <Rocket className="w-4 h-4" />;
      case 'users':
        return <Users className="w-4 h-4" />;
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  const getIconBgColor = (iconName) => {
    switch(iconName) {
      case 'briefcase':
        return 'bg-blue-100 text-blue-600';
      case 'clock':
        return 'bg-green-100 text-green-600';
      case 'dollar':
        return 'bg-yellow-100 text-yellow-600';
      case 'shield':
        return 'bg-purple-100 text-purple-600';
      case 'rocket':
        return 'bg-red-100 text-red-600';
      case 'users':
        return 'bg-indigo-100 text-indigo-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
      features: [],
      statistics: [],
      title2: '',
      short_desc: '',
      status: 1
    });
    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingFeatureIndex(null);
    setEditingStatisticIndex(null);
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
      features: section.features || [],
      statistics: section.statistics || [],
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      status: section.status !== undefined ? section.status : 1
    });
    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingFeatureIndex(null);
    setEditingStatisticIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-fifth-section/${id}`);

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

    if (formData.features.length === 0) {
      setMessage({ type: 'error', text: 'At least one feature is required!' });
      return false;
    }

    if (formData.statistics.length === 0) {
      setMessage({ type: 'error', text: 'At least one statistic is required!' });
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
        if (key === 'features') {
          // Send each feature as individual form fields with array notation
          formData[key].forEach((feature, index) => {
            submitData.append(`features[${index}][icon]`, feature.icon || '');
            submitData.append(`features[${index}][title]`, feature.title || '');
            submitData.append(`features[${index}][description]`, feature.description || '');
          });
        } else if (key === 'statistics') {
          // Send each statistic as individual form fields with array notation
          formData[key].forEach((statistic, index) => {
            submitData.append(`statistics[${index}][title]`, statistic.title || '');
            submitData.append(`statistics[${index}][number]`, statistic.number || '');
          });
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-fifth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-fifth-section/save', submitData, {
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
    setFeatureFormData({
      icon: 'briefcase',
      title: '',
      description: ''
    });
    setStatisticFormData({
      title: '',
      number: ''
    });
    setEditingFeatureIndex(null);
    setEditingStatisticIndex(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                Service Details Fifth Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details benefits section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Service Details Fifth Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details benefits section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center gap-2 transition-colors"
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
                  placeholder="e.g., BENEFITS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  placeholder="e.g., Our Solutions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  placeholder="Enter secondary title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Features</h3>
              
              {/* Feature Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Icon
                    </label>
                    <select
                      name="icon"
                      value={featureFormData.icon}
                      onChange={handleFeatureChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={saving}
                    >
                      <option value="briefcase">Briefcase</option>
                      <option value="clock">Clock</option>
                      <option value="dollar">Dollar</option>
                      <option value="shield">Shield</option>
                      <option value="rocket">Rocket</option>
                      <option value="users">Users</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={featureFormData.title}
                      onChange={handleFeatureChange}
                      placeholder="e.g., Business Growth"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                      value={featureFormData.description}
                      onChange={handleFeatureChange}
                      placeholder="Brief description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {editingFeatureIndex !== null ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdateFeature}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Update Feature
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelFeatureEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Feature
                    </button>
                  )}
                </div>
              </div>

              {/* Features List */}
              {formData.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${getIconBgColor(feature.icon)}`}>
                            {getIconComponent(feature.icon)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{feature.title}</p>
                            {feature.description && (
                              <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditFeature(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                            disabled={saving}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
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

            {/* Statistics Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Statistics</h3>
              
              {/* Statistic Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={statisticFormData.title}
                      onChange={handleStatisticChange}
                      placeholder="e.g., Projects Completed"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={statisticFormData.number}
                      onChange={handleStatisticChange}
                      placeholder="e.g., 250+"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {editingStatisticIndex !== null ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdateStatistic}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Update Statistic
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelStatisticEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddStatistic}
                      className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Statistic
                    </button>
                  )}
                </div>
              </div>

              {/* Statistics List */}
              {formData.statistics.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.statistics.map((statistic, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-2xl font-bold text-amber-600">{statistic.number}</p>
                          <p className="text-xs text-gray-500">{statistic.title}</p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditStatistic(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                            disabled={saving}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveStatistic(index)}
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
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
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
                className="px-6 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="w-5 h-5 text-amber-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            section.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {section.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {section.batch && (
                          <p className="text-sm text-amber-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-amber-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Features */}
                        {section.features && section.features.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                            {section.features.map((feature, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 border border-amber-100 flex items-start gap-2"
                              >
                                <div className={`p-1.5 rounded-lg ${getIconBgColor(feature.icon)}`}>
                                  {getIconComponent(feature.icon)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700">{feature.title}</p>
                                  {feature.description && (
                                    <p className="text-xs text-gray-500">{feature.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Statistics */}
                        {section.statistics && section.statistics.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                            {section.statistics.map((statistic, index) => (
                              <div
                                key={index}
                                className="bg-white rounded-lg p-3 text-center border border-amber-100"
                              >
                                <p className="text-lg font-bold text-amber-600">{statistic.number}</p>
                                <p className="text-xs text-gray-500">{statistic.title}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* CTA Section */}
                        <div className="mt-4 p-4 bg-white rounded-lg border border-amber-200">
                          <h4 className="text-lg font-semibold text-gray-800">{section.title2}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.short_desc}</p>
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(section.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
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

export default ServiceDetailsFifthSection;