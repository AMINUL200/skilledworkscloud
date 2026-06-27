import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, X, Image, Briefcase } from 'lucide-react';

const ManageServiceHeroSection = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    image_alt: '',
    button1_name: '',
    button1_url: '',
    button2_name: '',
    button2_url: '',
    status: 1
  });

  const [webBgImage, setWebBgImage] = useState(null);
  const [mobileBgImage, setMobileBgImage] = useState(null);
  const [webBgImagePreview, setWebBgImagePreview] = useState(null);
  const [mobileBgImagePreview, setMobileBgImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch section data on component mount
  useEffect(() => {
    fetchSectionData();
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (webBgImagePreview && webBgImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webBgImagePreview);
      }
      if (mobileBgImagePreview && mobileBgImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileBgImagePreview);
      }
    };
  }, [webBgImagePreview, mobileBgImagePreview]);

  const fetchSectionData = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/services/details');

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          title: data.title || '',
          description: data.description || '',
          title_meta: data.title_meta || '',
          desc_meta: data.desc_meta || '',
          image_alt: data.image_alt || '',
          button1_name: data.button1_name || '',
          button1_url: data.button1_url || '',
          button2_name: data.button2_name || '',
          button2_url: data.button2_url || '',
          status: data.status !== undefined ? data.status : 1
        });

        // Set image previews
        if (data.web_bg_image) {
          const url = data.web_bg_image.startsWith('http')
            ? data.web_bg_image
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.web_bg_image}`;
          setWebBgImagePreview(url);
        }
        if (data.mobile_bg_image) {
          const url = data.mobile_bg_image.startsWith('http')
            ? data.mobile_bg_image
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.mobile_bg_image}`;
          setMobileBgImagePreview(url);
        }

        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching service hero section:', error);
      if (error.status === 404 || error.response?.status === 404) {
        setIsEditing(false);
        setMessage({
          type: 'info',
          text: 'No data found. Create new service hero section.'
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
        setWebBgImage(file);
        setWebBgImagePreview(previewUrl);
      } else {
        setMobileBgImage(file);
        setMobileBgImagePreview(previewUrl);
      }

      setMessage({ type: '', text: '' });
    }
  };

  const removeImage = (type) => {
    if (type === 'web') {
      if (webBgImagePreview && webBgImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(webBgImagePreview);
      }
      setWebBgImage(null);
      setWebBgImagePreview(null);
      const input = document.querySelector('input[name="web_bg_image"]');
      if (input) input.value = '';
    } else {
      if (mobileBgImagePreview && mobileBgImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileBgImagePreview);
      }
      setMobileBgImage(null);
      setMobileBgImagePreview(null);
      const input = document.querySelector('input[name="mobile_bg_image"]');
      if (input) input.value = '';
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
      if (webBgImage) submitData.append('web_bg_image', webBgImage);
      if (mobileBgImage) submitData.append('mobile_bg_image', mobileBgImage);

      const response = await api.post('/admin/services/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || 'Service hero section saved successfully!'
        });

        await fetchSectionData();

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
      console.error('Error saving service hero section:', error);

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
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                Service Hero Section
              </h2>
              <p className="text-sm text-gray-600">Manage the service page hero section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
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
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Service Hero Section
            </h2>
            <p className="text-sm text-gray-600">Manage the service page hero section</p>
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
              placeholder="Enter hero title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              placeholder="Meta title for SEO"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              placeholder="Enter hero description"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">
              Characters: {formData.description.length}
            </p>
          </div>

          {/* Description Meta */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description Meta
            </label>
            <input
              type="text"
              name="desc_meta"
              value={formData.desc_meta}
              onChange={handleChange}
              placeholder="Meta description for SEO"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              placeholder="Alt text for background images"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Helps with SEO and accessibility</p>
          </div>

          {/* Buttons Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Call-to-Action Buttons</h3>
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
                  placeholder="e.g., Free Consultation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 1 URL
                </label>
                <input
                  type="text"
                  name="button1_url"
                  value={formData.button1_url}
                  onChange={handleChange}
                  placeholder="/contact-us"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 Name
                </label>
                <input
                  type="text"
                  name="button2_name"
                  value={formData.button2_name}
                  onChange={handleChange}
                  placeholder="e.g., Explore Services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button 2 URL
                </label>
                <input
                  type="text"
                  name="button2_url"
                  value={formData.button2_url}
                  onChange={handleChange}
                  placeholder="/services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Background Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Web Background Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Web Background Image
                </label>
                <input
                  type="file"
                  name="web_bg_image"
                  onChange={(e) => handleImageChange(e, 'web')}
                  accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1920x600px. Max: 2MB</p>

                {webBgImagePreview && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img
                        src={webBgImagePreview}
                        alt="Web Background Preview"
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

              {/* Mobile Background Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Background Image
                </label>
                <input
                  type="file"
                  name="mobile_bg_image"
                  onChange={(e) => handleImageChange(e, 'mobile')}
                  accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 768x400px. Max: 2MB</p>

                {mobileBgImagePreview && (
                  <div className="mt-3">
                    <div className="relative inline-block">
                      <img
                        src={mobileBgImagePreview}
                        alt="Mobile Background Preview"
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
          <div className="md:col-span-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="status"
                checked={formData.status === 1}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                {isEditing ? 'Update Section' : 'Save Section'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageServiceHeroSection;