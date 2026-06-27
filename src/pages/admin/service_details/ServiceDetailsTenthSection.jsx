import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, Target, CheckCircle, FileText, Users, Star, MessageCircle } from 'lucide-react';

const ServiceDetailsTenthSection = () => {
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
    title2: '',
    short_desc: '',
    challenge_title: '',
    challenge_desc: '',
    strategy_title: '',
    strategy_desc: '',
    services: [],
    results: [],
    testimonial_title: '',
    testimonial_desc: '',
    button_name: '',
    button_url: '',
    status: 1
  });

  // Service input state
  const [serviceInput, setServiceInput] = useState('');
  // Result input state
  const [resultInput, setResultInput] = useState('');

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-tenth-section/list');

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

  // Services management
  const handleAddService = () => {
    if (serviceInput.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, serviceInput.trim()]
      }));
      setServiceInput('');
    }
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleServiceKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddService();
    }
  };

  // Results management
  const handleAddResult = () => {
    if (resultInput.trim()) {
      setFormData(prev => ({
        ...prev,
        results: [...prev.results, resultInput.trim()]
      }));
      setResultInput('');
    }
  };

  const handleRemoveResult = (index) => {
    setFormData(prev => ({
      ...prev,
      results: prev.results.filter((_, i) => i !== index)
    }));
  };

  const handleResultKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddResult();
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
      title2: '',
      short_desc: '',
      challenge_title: '',
      challenge_desc: '',
      strategy_title: '',
      strategy_desc: '',
      services: [],
      results: [],
      testimonial_title: '',
      testimonial_desc: '',
      button_name: '',
      button_url: '',
      status: 1
    });
    setServiceInput('');
    setResultInput('');
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
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      challenge_title: section.challenge_title || '',
      challenge_desc: section.challenge_desc || '',
      strategy_title: section.strategy_title || '',
      strategy_desc: section.strategy_desc || '',
      services: section.services || [],
      results: section.results || [],
      testimonial_title: section.testimonial_title || '',
      testimonial_desc: section.testimonial_desc || '',
      button_name: section.button_name || '',
      button_url: section.button_url || '',
      status: section.status !== undefined ? section.status : 1
    });
    setServiceInput('');
    setResultInput('');
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-tenth-section/${id}`);

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

    if (!formData.challenge_title) {
      setMessage({ type: 'error', text: 'Challenge Title is required!' });
      return false;
    }

    if (!formData.challenge_desc) {
      setMessage({ type: 'error', text: 'Challenge Description is required!' });
      return false;
    }

    if (!formData.strategy_title) {
      setMessage({ type: 'error', text: 'Strategy Title is required!' });
      return false;
    }

    if (!formData.strategy_desc) {
      setMessage({ type: 'error', text: 'Strategy Description is required!' });
      return false;
    }

    if (!formData.testimonial_title) {
      setMessage({ type: 'error', text: 'Testimonial Title is required!' });
      return false;
    }

    if (!formData.testimonial_desc) {
      setMessage({ type: 'error', text: 'Testimonial Description is required!' });
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

    if (formData.services.length === 0) {
      setMessage({ type: 'error', text: 'At least one service is required!' });
      return false;
    }

    if (formData.results.length === 0) {
      setMessage({ type: 'error', text: 'At least one result is required!' });
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
        if (key === 'services') {
          // Send services as array
          if (formData[key] && formData[key].length > 0) {
            formData[key].forEach((item, index) => {
              submitData.append(`services[${index}]`, item);
            });
          } else {
            submitData.append('services', '');
          }
        } else if (key === 'results') {
          // Send results as array
          if (formData[key] && formData[key].length > 0) {
            formData[key].forEach((item, index) => {
              submitData.append(`results[${index}]`, item);
            });
          } else {
            submitData.append('results', '');
          }
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-tenth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-tenth-section/save', submitData, {
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
    setServiceInput('');
    setResultInput('');
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Service Details Tenth Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details success story section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Service Details Tenth Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details success story section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center gap-2 transition-colors"
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
                  placeholder="e.g., SUCCESS STORY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  placeholder="e.g., Hire Global Talent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  placeholder="e.g., Sponsor Licence Approved For UK Technology Company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  placeholder="Short description for the success story"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Challenge Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  name="challenge_title"
                  value={formData.challenge_title}
                  onChange={handleChange}
                  placeholder="e.g., Immigration Challenge"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Challenge Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Challenge Description *
                </label>
                <input
                  type="text"
                  name="challenge_desc"
                  value={formData.challenge_desc}
                  onChange={handleChange}
                  placeholder="Describe the challenge"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Strategy Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strategy Title *
                </label>
                <input
                  type="text"
                  name="strategy_title"
                  value={formData.strategy_title}
                  onChange={handleChange}
                  placeholder="e.g., Our Legal Strategy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Strategy Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Strategy Description *
                </label>
                <input
                  type="text"
                  name="strategy_desc"
                  value={formData.strategy_desc}
                  onChange={handleChange}
                  placeholder="Describe the strategy"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Testimonial Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Title *
                </label>
                <input
                  type="text"
                  name="testimonial_title"
                  value={formData.testimonial_title}
                  onChange={handleChange}
                  placeholder="e.g., Client Testimonial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Testimonial Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Description *
                </label>
                <input
                  type="text"
                  name="testimonial_desc"
                  value={formData.testimonial_desc}
                  onChange={handleChange}
                  placeholder="Client testimonial text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  placeholder="e.g., Book A Consultation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  placeholder="/contact"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Services Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Services</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyPress={handleServiceKeyPress}
                  placeholder="Add service (e.g., Sponsor Licence Application)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={saving}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.services.map((service, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-200"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {service}
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-orange-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Results</h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  onKeyPress={handleResultKeyPress}
                  placeholder="Add result (e.g., Sponsor Licence Approved)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={handleAddResult}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={saving}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {formData.results.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.results.map((result, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200"
                    >
                      <Star className="w-3 h-3" />
                      {result}
                      <button
                        type="button"
                        onClick={() => handleRemoveResult(index)}
                        className="text-green-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
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
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
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
                className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="w-5 h-5 text-orange-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            section.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {section.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {section.batch && (
                          <p className="text-sm text-orange-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-orange-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Challenge & Strategy */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          <div className="bg-white rounded-lg p-3 border border-orange-100">
                            <h4 className="text-sm font-semibold text-gray-800">{section.challenge_title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{section.challenge_desc}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-orange-100">
                            <h4 className="text-sm font-semibold text-gray-800">{section.strategy_title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{section.strategy_desc}</p>
                          </div>
                        </div>
                        
                        {/* Services */}
                        {section.services && section.services.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-gray-600 mb-1">Services:</p>
                            <div className="flex flex-wrap gap-1">
                              {section.services.map((service, index) => (
                                <span key={index} className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Results */}
                        {section.results && section.results.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold text-gray-600 mb-1">Results:</p>
                            <div className="flex flex-wrap gap-1">
                              {section.results.map((result, index) => (
                                <span key={index} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
                                  {result}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Testimonial */}
                        <div className="mt-3 p-3 bg-white rounded-lg border border-orange-100">
                          <h4 className="text-sm font-semibold text-gray-800">{section.testimonial_title}</h4>
                          <p className="text-xs text-gray-500 mt-1 italic">"{section.testimonial_desc}"</p>
                        </div>
                        
                        {/* CTA Button */}
                        {section.button_name && (
                          <div className="mt-3">
                            <span className="inline-block px-4 py-2 bg-orange-600 text-white text-sm rounded-lg">
                              {section.button_name}
                            </span>
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(section.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
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

export default ServiceDetailsTenthSection;