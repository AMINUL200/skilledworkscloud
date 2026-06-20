import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, X, BookOpen, Image, Plus, Trash2 } from 'lucide-react';

const AboutSecondSection = () => {
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    title_meta: '',
    button1_name: '',
    button1_details: '',
    button2_name: '',
    button2_details: '',
    image_alt: '',
    our_journey: '',
    button3_name: '',
    button3_url: '',
    button4_name: '',
    button4_url: '',
    card1_h: '',
    card1_d: '',
    card2_h: '',
    card2_d: '',
    card3_h: '',
    card3_d: '',
    status: 1
  });

  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [journeyPoints, setJourneyPoints] = useState([]);
  const [newJourneyPoint, setNewJourneyPoint] = useState('');

  // Fetch section data on component mount
  useEffect(() => {
    fetchSectionData();
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

  const fetchSectionData = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/about-second-section');

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          batch: data.batch || '',
          title: data.title || '',
          title_meta: data.title_meta || '',
          button1_name: data.button1_name || '',
          button1_details: data.button1_details || '',
          button2_name: data.button2_name || '',
          button2_details: data.button2_details || '',
          image_alt: data.image_alt || '',
          our_journey: data.our_journey || '',
          button3_name: data.button3_name || '',
          button3_url: data.button3_url || '',
          button4_name: data.button4_name || '',
          button4_url: data.button4_url || '',
          card1_h: data.card1_h || '',
          card1_d: data.card1_d || '',
          card2_h: data.card2_h || '',
          card2_d: data.card2_d || '',
          card3_h: data.card3_h || '',
          card3_d: data.card3_d || '',
          status: data.status !== undefined ? data.status : 1
        });

        // Parse journey points
        if (data.our_journey) {
          const points = data.our_journey.split('\n').filter(point => point.trim());
          setJourneyPoints(points);
        }

        // Set image previews
        if (data.web_image) {
          const url = data.web_image.startsWith('http')
            ? data.web_image
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.web_image}`;
          setWebImagePreview(url);
        }
        if (data.mobile_image) {
          const url = data.mobile_image.startsWith('http')
            ? data.mobile_image
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.mobile_image}`;
          setMobileImagePreview(url);
        }

        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching about second section:', error);
      if (error.status === 404 || error.response?.status === 404) {
        setIsEditing(false);
        setMessage({
          type: 'info',
          text: 'No data found. Create new about section.'
        });
      } else {
        setMessage({
          type: 'error',
          text: error.message || 'Failed to fetch data'
        });
      }
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
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml'];
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

  const handleAddJourneyPoint = () => {
    if (newJourneyPoint.trim()) {
      setJourneyPoints([...journeyPoints, newJourneyPoint.trim()]);
      setNewJourneyPoint('');
    }
  };

  const handleRemoveJourneyPoint = (index) => {
    setJourneyPoints(journeyPoints.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddJourneyPoint();
    }
  };

  const validateForm = () => {
    if (!formData.title) {
      setMessage({ type: 'error', text: 'Title is required!' });
      return false;
    }

    if (!formData.batch) {
      setMessage({ type: 'error', text: 'Batch/Subtitle is required!' });
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

      // Append journey points as newline separated string
      if (journeyPoints.length > 0) {
        submitData.append('our_journey', journeyPoints.join('\n'));
      }

      // Append images if exist
      if (webImage) {
        submitData.append('web_image', webImage);
      }
      if (mobileImage) {
        submitData.append('mobile_image', mobileImage);
      }

      const response = await api.post('/admin/about-second-section/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || 'About second section saved successfully!'
        });

        // Refetch to get updated data
        await fetchSectionData();

        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save data'
        });
      }
    } catch (error) {
      console.error('Error saving about second section:', error);

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

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                About Second Section
              </h2>
              <p className="text-sm text-gray-600">Manage the about page story and journey section</p>
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
              <BookOpen className="w-5 h-5 text-blue-600" />
              About Second Section
            </h2>
            <p className="text-sm text-gray-600">Manage the about page story and journey section</p>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            isEditing ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isEditing ? 'Configured' : 'New'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Batch / Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch / Subtitle *
            </label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="e.g., OUR STORY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Small text above the main title</p>
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
              placeholder="Enter section title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">
              Characters: {formData.title.length}
            </p>
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
              placeholder="Additional title meta information"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={saving}
            />
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
            <p className="text-xs text-gray-500 mt-1">Helps with SEO and accessibility</p>
          </div>

          {/* Button 1 Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Button 1</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 1 Name
                </label>
                <input
                  type="text"
                  name="button1_name"
                  value={formData.button1_name}
                  onChange={handleChange}
                  placeholder="e.g., Our Story"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 1 Details
                </label>
                <input
                  type="text"
                  name="button1_details"
                  value={formData.button1_details}
                  onChange={handleChange}
                  placeholder="Brief description for button 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Button 2 Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Button 2</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 Name
                </label>
                <input
                  type="text"
                  name="button2_name"
                  value={formData.button2_name}
                  onChange={handleChange}
                  placeholder="e.g., Mission & Vision"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 Details
                </label>
                <input
                  type="text"
                  name="button2_details"
                  value={formData.button2_details}
                  onChange={handleChange}
                  placeholder="Brief description for button 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Our Journey Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Our Journey</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newJourneyPoint}
                  onChange={(e) => setNewJourneyPoint(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add journey point (e.g., 2020 Company Founded)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={handleAddJourneyPoint}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={saving}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {journeyPoints.length > 0 && (
                <div className="space-y-2">
                  {journeyPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <span className="text-sm text-gray-700">{point}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveJourneyPoint(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        disabled={saving}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Add key milestones or journey points</p>
            </div>
          </div>

          {/* Images Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
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
                <p className="text-xs text-gray-500 mt-1">Recommended: 800x600px. Max: 2MB</p>

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
                <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px. Max: 2MB</p>

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

          {/* Button 3 & 4 Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Additional Buttons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 3 Name
                </label>
                <input
                  type="text"
                  name="button3_name"
                  value={formData.button3_name}
                  onChange={handleChange}
                  placeholder="e.g., Learn More"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 3 URL
                </label>
                <input
                  type="text"
                  name="button3_url"
                  value={formData.button3_url}
                  onChange={handleChange}
                  placeholder="/about"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 4 Name
                </label>
                <input
                  type="text"
                  name="button4_name"
                  value={formData.button4_name}
                  onChange={handleChange}
                  placeholder="e.g., Contact Us"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 4 URL
                </label>
                <input
                  type="text"
                  name="button4_url"
                  value={formData.button4_url}
                  onChange={handleChange}
                  placeholder="/contact"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Cards Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Feature Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Card 1</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="card1_h"
                    value={formData.card1_h}
                    onChange={handleChange}
                    placeholder="Card 1 Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                  <input
                    type="text"
                    name="card1_d"
                    value={formData.card1_d}
                    onChange={handleChange}
                    placeholder="Card 1 Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Card 2</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="card2_h"
                    value={formData.card2_h}
                    onChange={handleChange}
                    placeholder="Card 2 Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                  <input
                    type="text"
                    name="card2_d"
                    value={formData.card2_d}
                    onChange={handleChange}
                    placeholder="Card 2 Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Card 3</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="card3_h"
                    value={formData.card3_h}
                    onChange={handleChange}
                    placeholder="Card 3 Heading"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                  <input
                    type="text"
                    name="card3_d"
                    value={formData.card3_d}
                    onChange={handleChange}
                    placeholder="Card 3 Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                  />
                </div>
              </div>
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
              <span className="text-sm font-medium text-gray-700">Enable this section</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">When disabled, this section won't be displayed on the website</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
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
                {isEditing ? 'Update Section' : 'Save Section'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutSecondSection;