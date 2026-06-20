import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, X, Heart, Image, Plus, Trash2 } from 'lucide-react';

const SocialSecondSection = () => {
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    title_meta: '',
    description: '',
    desc_meta: '',
    image1_alt: '',
    image2_alt: '',
    image3_alt: '',
    features: [],
    status: 1
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [image3Preview, setImage3Preview] = useState(null);
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
      if (image1Preview && image1Preview.startsWith('blob:')) {
        URL.revokeObjectURL(image1Preview);
      }
      if (image2Preview && image2Preview.startsWith('blob:')) {
        URL.revokeObjectURL(image2Preview);
      }
      if (image3Preview && image3Preview.startsWith('blob:')) {
        URL.revokeObjectURL(image3Preview);
      }
    };
  }, [image1Preview, image2Preview, image3Preview]);

  const fetchSectionData = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sr-second-section');

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        
        // Parse features data - convert comma-separated string to array
        let features = [];
        if (data.features) {
          if (typeof data.features === 'string') {
            // If it's a string, split by comma
            features = data.features.split(',').map(item => item.trim()).filter(item => item);
          } else if (Array.isArray(data.features)) {
            // If it's already an array
            features = data.features;
          }
        }

        setFormData({
          batch: data.batch || '',
          title: data.title || '',
          title_meta: data.title_meta || '',
          description: data.description || '',
          desc_meta: data.desc_meta || '',
          image1_alt: data.image1_alt || '',
          image2_alt: data.image2_alt || '',
          image3_alt: data.image3_alt || '',
          features: features,
          status: data.status !== undefined ? data.status : 1
        });

        // Set image previews
        if (data.image1) {
          const url = data.image1.startsWith('http')
            ? data.image1
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.image1}`;
          setImage1Preview(url);
        }
        if (data.image2) {
          const url = data.image2.startsWith('http')
            ? data.image2
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.image2}`;
          setImage2Preview(url);
        }
        if (data.image3) {
          const url = data.image3.startsWith('http')
            ? data.image3
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.image3}`;
          setImage3Preview(url);
        }

        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching SR second section:', error);
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

      switch(type) {
        case 'image1':
          setImage1(file);
          setImage1Preview(previewUrl);
          break;
        case 'image2':
          setImage2(file);
          setImage2Preview(previewUrl);
          break;
        case 'image3':
          setImage3(file);
          setImage3Preview(previewUrl);
          break;
        default:
          break;
      }

      setMessage({ type: '', text: '' });
    }
  };

  const removeImage = (type) => {
    switch(type) {
      case 'image1':
        if (image1Preview && image1Preview.startsWith('blob:')) {
          URL.revokeObjectURL(image1Preview);
        }
        setImage1(null);
        setImage1Preview(null);
        const input1 = document.querySelector('input[name="image1"]');
        if (input1) input1.value = '';
        break;
      case 'image2':
        if (image2Preview && image2Preview.startsWith('blob:')) {
          URL.revokeObjectURL(image2Preview);
        }
        setImage2(null);
        setImage2Preview(null);
        const input2 = document.querySelector('input[name="image2"]');
        if (input2) input2.value = '';
        break;
      case 'image3':
        if (image3Preview && image3Preview.startsWith('blob:')) {
          URL.revokeObjectURL(image3Preview);
        }
        setImage3(null);
        setImage3Preview(null);
        const input3 = document.querySelector('input[name="image3"]');
        if (input3) input3.value = '';
        break;
      default:
        break;
    }
  };

  // Features management
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
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
        // Handle features field - send as comma-separated string
        if (key === 'features') {
          // Convert array to comma-separated string
          const featureString = formData[key].join(',');
          submitData.append(key, featureString);
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Append images if exist
      if (image1) submitData.append('image1', image1);
      if (image2) submitData.append('image2', image2);
      if (image3) submitData.append('image3', image3);

      const response = await api.post('/admin/sr-second-section/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || 'Social Responsibility second section saved successfully!'
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
      console.error('Error saving SR second section:', error);

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
                Social Responsibility Section 2
              </h2>
              <p className="text-sm text-gray-600">Manage the social responsibility approach section</p>
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
              Social Responsibility Section 2
            </h2>
            <p className="text-sm text-gray-600">Manage the social responsibility approach section</p>
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
              Batch / Subtitle
            </label>
            <input
              type="text"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              placeholder="e.g., OUR APPROACH"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              placeholder="Meta title for this section"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

          {/* Image Alt Texts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image 1 Alt Text
            </label>
            <input
              type="text"
              name="image1_alt"
              value={formData.image1_alt}
              onChange={handleChange}
              placeholder="Alt text for image 1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image 2 Alt Text
            </label>
            <input
              type="text"
              name="image2_alt"
              value={formData.image2_alt}
              onChange={handleChange}
              placeholder="Alt text for image 2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image 3 Alt Text
            </label>
            <input
              type="text"
              name="image3_alt"
              value={formData.image3_alt}
              onChange={handleChange}
              placeholder="Alt text for image 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={saving}
            />
          </div>

          {/* Images Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Image 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image 1</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload Image 1
                  </label>
                  <input
                    type="file"
                    name="image1"
                    onChange={(e) => handleImageChange(e, 'image1')}
                    accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max: 2MB</p>

                  {image1Preview && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={image1Preview}
                        alt="Image 1 Preview"
                        className="h-20 w-auto object-cover border border-gray-300 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('image1')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        disabled={saving}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image 2</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload Image 2
                  </label>
                  <input
                    type="file"
                    name="image2"
                    onChange={(e) => handleImageChange(e, 'image2')}
                    accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max: 2MB</p>

                  {image2Preview && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={image2Preview}
                        alt="Image 2 Preview"
                        className="h-20 w-auto object-cover border border-gray-300 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('image2')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        disabled={saving}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image 3 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image 3</h4>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Upload Image 3
                  </label>
                  <input
                    type="file"
                    name="image3"
                    onChange={(e) => handleImageChange(e, 'image3')}
                    accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    disabled={saving}
                  />
                  <p className="text-xs text-gray-500 mt-1">Max: 2MB</p>

                  {image3Preview && (
                    <div className="mt-2 relative inline-block">
                      <img
                        src={image3Preview}
                        alt="Image 3 Preview"
                        className="h-20 w-auto object-cover border border-gray-300 rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage('image3')}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        disabled={saving}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
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
                  placeholder="Add feature (e.g., Education Support)"
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

              {formData.features && formData.features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {formData.features.map((item, index) => (
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

export default SocialSecondSection;