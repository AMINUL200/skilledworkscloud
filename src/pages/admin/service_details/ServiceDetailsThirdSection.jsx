import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, Users, Lightbulb, Shield, TrendingUp, MessageCircle, Image } from 'lucide-react';

const ServiceDetailsThirdSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    highlighted_title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    card1_title: '',
    card2_title: '',
    card3_title: '',
    card4_title: '',
    title2: '',
    short_desc: '',
    button_name: '',
    button_url: '',
    identifier: '',
    image_alt: '', // Added image_alt field
    status: 1
  });

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (webImagePreview && webImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webImagePreview);
      }
      if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImagePreview);
      }
    };
  }, [webImagePreview, mobileImagePreview]);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-third-section/list');

      if (response.data.status && response.data.data) {
        setSections(response.data.data);
        console.log('Fetched sections:', response.data.data);
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

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'image/svg+xml'
      ];
      if (!validTypes.includes(file.type)) {
        setMessage({
          type: 'error',
          text: 'Please upload a valid image file (JPEG, PNG, WEBP, or SVG)'
        });
        e.target.value = '';
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'Image size should be less than 2MB'
        });
        e.target.value = '';
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      if (type === 'web') {
        setWebImage(file);
        setWebImagePreview(previewUrl);
      } else {
        setMobileImage(file);
        setMobileImagePreview(previewUrl);
      }

      setMessage({ type: '', text: '' });
    }
  };

  const removeImage = (type) => {
    if (type === 'web') {
      if (webImagePreview && webImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webImagePreview);
      }
      setWebImage(null);
      setWebImagePreview(null);
      const input = document.querySelector('input[name="web_image"]');
      if (input) input.value = '';
    } else {
      if (mobileImagePreview && mobileImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImagePreview);
      }
      setMobileImage(null);
      setMobileImagePreview(null);
      const input = document.querySelector('input[name="mobile_image"]');
      if (input) input.value = '';
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
      card1_title: '',
      card2_title: '',
      card3_title: '',
      card4_title: '',
      title2: '',
      short_desc: '',
      button_name: '',
      button_url: '',
      identifier: '',
      image_alt: '',
      status: 1
    });
    setWebImage(null);
    setMobileImage(null);
    setWebImagePreview(null);
    setMobileImagePreview(null);
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
      card1_title: section.card1_title || '',
      card2_title: section.card2_title || '',
      card3_title: section.card3_title || '',
      card4_title: section.card4_title || '',
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      button_name: section.button_name || '',
      button_url: section.button_url || '',
      identifier: section.identifier || '',
      image_alt: section.image_alt || '',
      status: section.status !== undefined ? section.status : 1
    });

    // Set image previews
    if (section.web_image) {
      const url = section.web_image.startsWith('http')
        ? section.web_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${section.web_image}`;
      setWebImagePreview(url);
    }
    if (section.mobile_image) {
      const url = section.mobile_image.startsWith('http')
        ? section.mobile_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${section.mobile_image}`;
      setMobileImagePreview(url);
    }

    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-third-section/${id}`);

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

  const getCardIcon = (index) => {
    const icons = [
      <Users className="w-6 h-6 text-blue-600" />,
      <Lightbulb className="w-6 h-6 text-green-600" />,
      <Shield className="w-6 h-6 text-purple-600" />,
      <TrendingUp className="w-6 h-6 text-orange-600" />
    ];
    return icons[index] || <Users className="w-6 h-6 text-blue-600" />;
  };

  const getCardBgColor = (index) => {
    const colors = [
      'from-blue-50 to-blue-100 border-blue-200',
      'from-green-50 to-green-100 border-green-200',
      'from-purple-50 to-purple-100 border-purple-200',
      'from-orange-50 to-orange-100 border-orange-200'
    ];
    return colors[index] || 'from-blue-50 to-blue-100 border-blue-200';
  };

  const getCardTitleColor = (index) => {
    const colors = [
      'text-blue-700',
      'text-green-700',
      'text-purple-700',
      'text-orange-700'
    ];
    return colors[index] || 'text-blue-700';
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
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Append images if exist
      if (webImage) submitData.append('web_image', webImage);
      if (mobileImage) submitData.append('mobile_image', mobileImage);

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-third-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-third-section/save', submitData, {
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
    setWebImage(null);
    setMobileImage(null);
    setWebImagePreview(null);
    setMobileImagePreview(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                Service Details Third Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details about section</p>
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
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Service Details Third Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details about section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
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
              {/* Identifier */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identifier *
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="e.g., service_third_section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Unique identifier for this section (e.g., service_third_section)
                </p>
              </div>

              {/* Image Alt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="image_alt"
                  value={formData.image_alt}
                  onChange={handleChange}
                  placeholder="Alt text for images"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
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
                  placeholder="e.g., ABOUT OUR SERVICES"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., For Growing Businesses"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., Ready to Transform Your Business?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., Talk To Our Experts"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Cards Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Feature Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { key: 'card1', label: 'Card 1', placeholder: 'Experienced Team' },
                  { key: 'card2', label: 'Card 2', placeholder: 'Innovative Solutions' },
                  { key: 'card3', label: 'Card 3', placeholder: 'Trusted Support' },
                  { key: 'card4', label: 'Card 4', placeholder: 'Proven Results' }
                ].map((card, index) => (
                  <div key={card.key} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">{card.label}</h4>
                    <input
                      type="text"
                      name={`${card.key}_title`}
                      value={formData[`${card.key}_title`]}
                      onChange={handleChange}
                      placeholder={card.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Web Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Web Image
                  </label>
                  <input
                    type="file"
                    name="web_image"
                    onChange={(e) => handleImageChange(e, 'web')}
                    accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 1920x600px. Max: 2MB
                  </p>

                  {webImagePreview && (
                    <div className="mt-3">
                      <div className="relative inline-block">
                        <img
                          src={webImagePreview}
                          alt="Web Image Preview"
                          className="max-w-full h-32 object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="200" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('web')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                          disabled={saving}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Image
                  </label>
                  <input
                    type="file"
                    name="mobile_image"
                    onChange={(e) => handleImageChange(e, 'mobile')}
                    accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 768x400px. Max: 2MB
                  </p>

                  {mobileImagePreview && (
                    <div className="mt-3">
                      <div className="relative inline-block">
                        <img
                          src={mobileImagePreview}
                          alt="Mobile Image Preview"
                          className="max-w-full h-32 object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="200" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('mobile')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                          disabled={saving}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
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
          /* Sections List */
          <>
            {sections.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MessageCircle className="w-5 h-5 text-blue-600" />
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
                          <p className="text-sm text-blue-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-blue-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                          {[
                            { title: section.card1_title, index: 0 },
                            { title: section.card2_title, index: 1 },
                            { title: section.card3_title, index: 2 },
                            { title: section.card4_title, index: 3 }
                          ].map((card, i) => (
                            card.title && (
                              <div
                                key={i}
                                className={`bg-gradient-to-br ${getCardBgColor(i)} border rounded-lg p-3 text-center`}
                              >
                                <div className="flex justify-center mb-2">
                                  {getCardIcon(i)}
                                </div>
                                <p className={`text-sm font-semibold ${getCardTitleColor(i)}`}>
                                  {card.title}
                                </p>
                              </div>
                            )
                          ))}
                        </div>
                        
                        {/* Images */}
                        {(section.web_image || section.mobile_image) && (
                          <div className="flex gap-2 mt-4">
                            {section.web_image && (
                              <div className="relative">
                                <img
                                  src={section.web_image.startsWith('http') ? section.web_image : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${section.web_image}`}
                                  alt={section.image_alt || 'Web Image'}
                                  className="w-24 h-16 object-cover rounded border border-gray-200"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] text-center py-0.5">Web</span>
                              </div>
                            )}
                            {section.mobile_image && (
                              <div className="relative">
                                <img
                                  src={section.mobile_image.startsWith('http') ? section.mobile_image : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${section.mobile_image}`}
                                  alt={section.image_alt || 'Mobile Image'}
                                  className="w-24 h-16 object-cover rounded border border-gray-200"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                                  }}
                                />
                                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] text-center py-0.5">Mobile</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* CTA Section */}
                        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                          <h4 className="text-lg font-semibold text-gray-800">{section.title2}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.short_desc}</p>
                          {section.button_name && (
                            <div className="mt-3">
                              <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">
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
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
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

export default ServiceDetailsThirdSection;