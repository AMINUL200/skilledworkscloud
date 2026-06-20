import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, X, Shield, Image, Plus, Trash2 } from 'lucide-react';

const AboutFourthSection = () => {
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    image1_alt: '',
    image2_alt: '',
    card1_title: '',
    card1_desc: [],
    card2_title: '',
    card2_desc: [],
    card3_title: '',
    card3_desc: [],
    card4_title: '',
    card4_desc: [],
    card5_title: '',
    card5_desc: [],
    status: 1
  });

  const [webImage1, setWebImage1] = useState(null);
  const [mobileImage1, setMobileImage1] = useState(null);
  const [webImage2, setWebImage2] = useState(null);
  const [mobileImage2, setMobileImage2] = useState(null);
  const [webImage1Preview, setWebImage1Preview] = useState(null);
  const [mobileImage1Preview, setMobileImage1Preview] = useState(null);
  const [webImage2Preview, setWebImage2Preview] = useState(null);
  const [mobileImage2Preview, setMobileImage2Preview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // State for dynamic card description inputs
  const [newCardDesc, setNewCardDesc] = useState({
    card1: '',
    card2: '',
    card3: '',
    card4: '',
    card5: ''
  });

  // Fetch section data on component mount
  useEffect(() => {
    fetchSectionData();
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (webImage1Preview && webImage1Preview.startsWith('blob:')) {
        URL.revokeObjectURL(webImage1Preview);
      }
      if (mobileImage1Preview && mobileImage1Preview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImage1Preview);
      }
      if (webImage2Preview && webImage2Preview.startsWith('blob:')) {
        URL.revokeObjectURL(webImage2Preview);
      }
      if (mobileImage2Preview && mobileImage2Preview.startsWith('blob:')) {
        URL.revokeObjectURL(mobileImage2Preview);
      }
    };
  }, [webImage1Preview, mobileImage1Preview, webImage2Preview, mobileImage2Preview]);

  const fetchSectionData = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/about-forth-section');

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          batch: data.batch || '',
          title: data.title || '',
          description: data.description || '',
          title_meta: data.title_meta || '',
          desc_meta: data.desc_meta || '',
          image1_alt: data.image1_alt || '',
          image2_alt: data.image2_alt || '',
          card1_title: data.card1_title || '',
          card1_desc: data.card1_desc || [],
          card2_title: data.card2_title || '',
          card2_desc: data.card2_desc || [],
          card3_title: data.card3_title || '',
          card3_desc: data.card3_desc || [],
          card4_title: data.card4_title || '',
          card4_desc: data.card4_desc || [],
          card5_title: data.card5_title || '',
          card5_desc: data.card5_desc || [],
          status: data.status !== undefined ? data.status : 1
        });

        // Set image previews
        if (data.web_image1) {
          const url = data.web_image1.startsWith('http')
            ? data.web_image1
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.web_image1}`;
          setWebImage1Preview(url);
        }
        if (data.mobile_image1) {
          const url = data.mobile_image1.startsWith('http')
            ? data.mobile_image1
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.mobile_image1}`;
          setMobileImage1Preview(url);
        }
        if (data.web_image2) {
          const url = data.web_image2.startsWith('http')
            ? data.web_image2
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.web_image2}`;
          setWebImage2Preview(url);
        }
        if (data.mobile_image2) {
          const url = data.mobile_image2.startsWith('http')
            ? data.mobile_image2
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.mobile_image2}`;
          setMobileImage2Preview(url);
        }

        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching about fourth section:', error);
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

      switch(type) {
        case 'web1':
          setWebImage1(file);
          setWebImage1Preview(previewUrl);
          break;
        case 'mobile1':
          setMobileImage1(file);
          setMobileImage1Preview(previewUrl);
          break;
        case 'web2':
          setWebImage2(file);
          setWebImage2Preview(previewUrl);
          break;
        case 'mobile2':
          setMobileImage2(file);
          setMobileImage2Preview(previewUrl);
          break;
        default:
          break;
      }

      setMessage({ type: '', text: '' });
    }
  };

  const removeImage = (type) => {
    switch(type) {
      case 'web1':
        if (webImage1Preview && webImage1Preview.startsWith('blob:')) {
          URL.revokeObjectURL(webImage1Preview);
        }
        setWebImage1(null);
        setWebImage1Preview(null);
        const input1 = document.querySelector('input[name="web_image1"]');
        if (input1) input1.value = '';
        break;
      case 'mobile1':
        if (mobileImage1Preview && mobileImage1Preview.startsWith('blob:')) {
          URL.revokeObjectURL(mobileImage1Preview);
        }
        setMobileImage1(null);
        setMobileImage1Preview(null);
        const input2 = document.querySelector('input[name="mobile_image1"]');
        if (input2) input2.value = '';
        break;
      case 'web2':
        if (webImage2Preview && webImage2Preview.startsWith('blob:')) {
          URL.revokeObjectURL(webImage2Preview);
        }
        setWebImage2(null);
        setWebImage2Preview(null);
        const input3 = document.querySelector('input[name="web_image2"]');
        if (input3) input3.value = '';
        break;
      case 'mobile2':
        if (mobileImage2Preview && mobileImage2Preview.startsWith('blob:')) {
          URL.revokeObjectURL(mobileImage2Preview);
        }
        setMobileImage2(null);
        setMobileImage2Preview(null);
        const input4 = document.querySelector('input[name="mobile_image2"]');
        if (input4) input4.value = '';
        break;
      default:
        break;
    }
  };

  // Card description management
  const handleAddCardDesc = (cardKey) => {
    const descText = newCardDesc[cardKey];
    if (descText && descText.trim()) {
      setFormData(prev => ({
        ...prev,
        [`${cardKey}_desc`]: [...prev[`${cardKey}_desc`], descText.trim()]
      }));
      setNewCardDesc(prev => ({ ...prev, [cardKey]: '' }));
    }
  };

  const handleRemoveCardDesc = (cardKey, index) => {
    setFormData(prev => ({
      ...prev,
      [`${cardKey}_desc`]: prev[`${cardKey}_desc`].filter((_, i) => i !== index)
    }));
  };

  const handleCardDescKeyPress = (e, cardKey) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCardDesc(cardKey);
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

  // FIXED: handleSubmit with proper FormData array handling
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
        // Handle array fields - use [] notation for FormData
        if (key.endsWith('_desc')) {
          if (formData[key] && formData[key].length > 0) {
            // Append each item individually with [] notation
            formData[key].forEach((item) => {
              submitData.append(`${key}[]`, item);
            });
          } else {
            // For empty arrays, append an empty value with [] notation
            // This ensures the key exists as an array
            submitData.append(`${key}[]`, '');
          }
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Append images if exist
      if (webImage1) submitData.append('web_image1', webImage1);
      if (mobileImage1) submitData.append('mobile_image1', mobileImage1);
      if (webImage2) submitData.append('web_image2', webImage2);
      if (mobileImage2) submitData.append('mobile_image2', mobileImage2);

      const response = await api.post('/admin/about-forth-section/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || 'About fourth section saved successfully!'
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
      console.error('Error saving about fourth section:', error);

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
                <Shield className="w-5 h-5 text-blue-600" />
                About Fourth Section
              </h2>
              <p className="text-sm text-gray-600">Manage the about page principles and values section</p>
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
              About Fourth Section
            </h2>
            <p className="text-sm text-gray-600">Manage the about page principles and values section</p>
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
              placeholder="e.g., OUR PRINCIPLES"
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
              placeholder="Enter section title"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={saving}
            />
          </div>

          {/* Images Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image 1 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image 1</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Web Image 1
                    </label>
                    <input
                      type="file"
                      name="web_image1"
                      onChange={(e) => handleImageChange(e, 'web1')}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    {webImage1Preview && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={webImage1Preview}
                          alt="Web Image 1 Preview"
                          className="h-20 w-auto object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('web1')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          disabled={saving}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile Image 1
                    </label>
                    <input
                      type="file"
                      name="mobile_image1"
                      onChange={(e) => handleImageChange(e, 'mobile1')}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    {mobileImage1Preview && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={mobileImage1Preview}
                          alt="Mobile Image 1 Preview"
                          className="h-20 w-auto object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('mobile1')}
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

              {/* Image 2 */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Image 2</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Web Image 2
                    </label>
                    <input
                      type="file"
                      name="web_image2"
                      onChange={(e) => handleImageChange(e, 'web2')}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    {webImage2Preview && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={webImage2Preview}
                          alt="Web Image 2 Preview"
                          className="h-20 w-auto object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('web2')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                          disabled={saving}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Mobile Image 2
                    </label>
                    <input
                      type="file"
                      name="mobile_image2"
                      onChange={(e) => handleImageChange(e, 'mobile2')}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    {mobileImage2Preview && (
                      <div className="mt-2 relative inline-block">
                        <img
                          src={mobileImage2Preview}
                          alt="Mobile Image 2 Preview"
                          className="h-20 w-auto object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage('mobile2')}
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
          </div>

          {/* Cards Section */}
          <div className="md:col-span-2 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Principle Cards</h3>
            <div className="grid grid-cols-1 gap-6">
              {['card1', 'card2', 'card3', 'card4', 'card5'].map((cardKey, idx) => (
                <div key={cardKey} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Card {idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        name={`${cardKey}_title`}
                        value={formData[`${cardKey}_title`]}
                        onChange={handleChange}
                        placeholder={`Card ${idx + 1} Title`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Description Points</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCardDesc[cardKey]}
                          onChange={(e) => setNewCardDesc(prev => ({ ...prev, [cardKey]: e.target.value }))}
                          onKeyPress={(e) => handleCardDescKeyPress(e, cardKey)}
                          placeholder="Add point"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          disabled={saving}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddCardDesc(cardKey)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          disabled={saving}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {formData[`${cardKey}_desc`] && formData[`${cardKey}_desc`].length > 0 && (
                        <div className="mt-2 space-y-1">
                          {formData[`${cardKey}_desc`].map((point, index) => (
                            <div key={index} className="flex items-center justify-between p-1 bg-gray-50 rounded text-sm">
                              <span className="text-gray-700">• {point}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCardDesc(cardKey, index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                disabled={saving}
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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

export default AboutFourthSection;