import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, X, Heart, Image, Plus, Trash2 } from 'lucide-react';

const SocialFirstSection = () => {
  const [formData, setFormData] = useState({
    title: '',
    highlighted_text: '',
    title_meta: '',
    description: '',
    desc_meta: '',
    image_alt: '',
    title2: '',
    title3: '',
    feature: [],
    status: 1
  });

  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);
  const [newFeature, setNewFeature] = useState('');
  
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

      const response = await api.get('/admin/sr-first-section');

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        
        // Parse feature data - convert comma-separated string to array
        let features = [];
        if (data.feature) {
          if (typeof data.feature === 'string') {
            // If it's a string, split by comma
            features = data.feature.split(',').map(item => item.trim()).filter(item => item);
          } else if (Array.isArray(data.feature)) {
            // If it's already an array
            features = data.feature;
          }
        }

        setFormData({
          title: data.title || '',
          highlighted_text: data.highlighted_text || '',
          title_meta: data.title_meta || '',
          description: data.description || '',
          desc_meta: data.desc_meta || '',
          image_alt: data.image_alt || '',
          title2: data.title2 || '',
          title3: data.title3 || '',
          feature: features,
          status: data.status !== undefined ? data.status : 1
        });

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
      console.error('Error fetching SR first section:', error);
      if (error.status === 404 || error.response?.status === 404) {
        setIsEditing(false);
        setMessage({
          type: 'info',
          text: 'No data found. Create new section.'
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

  // Feature management
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        feature: [...prev.feature, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      feature: prev.feature.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
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
        // Handle feature field - send as comma-separated string
        if (key === 'feature') {
          // Convert array to comma-separated string
          const featureString = formData[key].join(',');
          submitData.append(key, featureString);
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Append images if exist
      if (webImage) submitData.append('web_image', webImage);
      if (mobileImage) submitData.append('mobile_image', mobileImage);

      const response = await api.post('/admin/sr-first-section/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || 'Social Responsibility section saved successfully!'
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
      console.error('Error saving SR first section:', error);

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
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-green-600" />
                Social Responsibility Section
              </h2>
              <p className="text-sm text-gray-600">Manage the social responsibility section content</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600" />
              Social Responsibility Section
            </h2>
            <p className="text-sm text-gray-600">Manage the social responsibility section content</p>
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
              placeholder="Enter section title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">
              Characters: {formData.title.length}
            </p>
          </div>

          {/* Highlighted Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlighted Text
            </label>
            <input
              type="text"
              name="highlighted_text"
              value={formData.highlighted_text}
              onChange={handleChange}
              placeholder="e.g., Through Action"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Text that will be highlighted in the title</p>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Helps with SEO and accessibility</p>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              placeholder="Meta description for this section"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
          </div>

          {/* Title 2 & Title 3 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stats Number
            </label>
            <input
              type="text"
              name="title2"
              value={formData.title2}
              onChange={handleChange}
              placeholder="e.g., 5000+"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Number/stat for the section</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stats Label
            </label>
            <input
              type="text"
              name="title3"
              value={formData.title3}
              onChange={handleChange}
              placeholder="e.g., Lives Positively Impacted"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-1">Label for the stat number</p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200x600px. Max: 2MB</p>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 768x400px. Max: 2MB</p>

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

          {/* Features Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Key Features</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={handleFeatureKeyPress}
                  placeholder="Add feature (e.g., Education Programs)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={saving}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.feature && formData.feature.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formData.feature.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                    >
                      <span className="text-sm text-gray-700 flex items-center gap-2">
                        <Heart className="w-3 h-3 text-green-500" />
                        {item}
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
              <p className="text-xs text-gray-500 mt-1">Add key features or initiatives of your social responsibility program</p>
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
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
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
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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

export default SocialFirstSection;