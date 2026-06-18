import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, RefreshCw, Upload, X, Eye, Edit, Plus } from 'lucide-react';

const SEOSettingsPage = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [formData, setFormData] = useState({
    page_name: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    status: 1
  });
  
  const [ogImage, setOgImage] = useState(null);
  const [ogImagePreview, setOgImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Fetch all SEO settings on component mount
  useEffect(() => {
    fetchSEOList();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (ogImagePreview && ogImagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(ogImagePreview);
      }
    };
  }, [ogImagePreview]);

  const fetchSEOList = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });
      
      const response = await api.get('/admin/seo-settings/list');
      
      if (response.data.status && response.data.data) {
        setPages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching SEO list:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to fetch SEO settings list' 
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchSEODetails = async (pageName) => {
    if (!pageName) return;
    
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      setShowForm(true);
      
      const response = await api.get(`/admin/seo-settings/${pageName}`);
      
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          page_name: data.page_name || '',
          meta_title: data.meta_title || '',
          meta_description: data.meta_description || '',
          meta_keywords: data.meta_keywords || '',
          canonical_url: data.canonical_url || '',
          og_title: data.og_title || '',
          og_description: data.og_description || '',
          status: data.status !== undefined ? data.status : 1
        });
        
        // Set OG image preview if exists
        if (data.og_image) {
          const imageUrl = data.og_image.startsWith('http') 
            ? data.og_image 
            : `${import.meta.env.VITE_APP_API_URL || ''}${data.og_image}`;
          setOgImagePreview(imageUrl);
        } else {
          setOgImagePreview(null);
        }
        
        setIsEditing(true);
        setSelectedPage(pageName);
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error fetching SEO details:', error);
      if (error.status === 404 || error.response?.status === 404) {
        // New page, reset form
        resetForm(pageName);
        setIsEditing(false);
        setMessage({ 
          type: 'info', 
          text: `No SEO settings found for "${pageName}". Create new settings.` 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to fetch SEO settings' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (pageName = '') => {
    setFormData({
      page_name: pageName || '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      status: 1
    });
    setOgImage(null);
    if (ogImagePreview && ogImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(ogImagePreview);
    }
    setOgImagePreview(null);
    setIsEditing(false);
  };

  const handlePageSelect = (e) => {
    const pageName = e.target.value;
    setSelectedPage(pageName);
    if (pageName) {
      fetchSEODetails(pageName);
    } else {
      resetForm();
      setShowForm(false);
      setMessage({ type: '', text: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setMessage({ 
          type: 'error', 
          text: 'Please upload a valid image file (JPEG, PNG, or WEBP)' 
        });
        e.target.value = '';
        return;
      }
      
      // Validate file size (max 1MB for OG image)
      if (file.size > 1 * 1024 * 1024) {
        setMessage({ 
          type: 'error', 
          text: 'OG image size should be less than 1MB' 
        });
        e.target.value = '';
        return;
      }
      
      setOgImage(file);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setOgImagePreview(previewUrl);
      
      // Clear any existing messages
      setMessage({ type: '', text: '' });
    }
  };

  const removeImage = () => {
    if (ogImagePreview && ogImagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(ogImagePreview);
    }
    setOgImage(null);
    setOgImagePreview(null);
    
    // Clear the file input
    const fileInput = document.querySelector('input[name="og_image"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.page_name) {
      setMessage({ type: 'error', text: 'Page name is required!' });
      return false;
    }

    if (!formData.meta_title) {
      setMessage({ type: 'error', text: 'Meta title is required!' });
      return false;
    }

    if (!formData.meta_description) {
      setMessage({ type: 'error', text: 'Meta description is required!' });
      return false;
    }

    // Validate URL if provided
    if (formData.canonical_url) {
      const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
      if (!urlRegex.test(formData.canonical_url)) {
        setMessage({
          type: 'error',
          text: 'Please enter a valid URL for Canonical URL'
        });
        return false;
      }
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
      
      // Append OG image if exists
      if (ogImage) {
        submitData.append('og_image', ogImage);
      }
      
      const response = await api.post('/admin/seo-settings/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: response.data.message || `SEO settings for "${formData.page_name}" saved successfully!` 
        });
        
        // Refresh the list
        await fetchSEOList();
        
        // Refresh the current page details
        await fetchSEODetails(formData.page_name);
        
        // Clear image input
        setOgImage(null);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: response.data.message || 'Failed to save SEO settings' 
        });
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      
      // Handle validation errors from backend
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
          text: error.message || 'Failed to save SEO settings. Please try again.' 
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleNewPage = () => {
    setSelectedPage('');
    resetForm();
    setShowForm(true);
    setActiveTab('basic');
    setMessage({ type: '', text: '' });
    
    // Focus on page name input after a short delay
    setTimeout(() => {
      const input = document.querySelector('input[name="page_name"]');
      if (input) {
        input.focus();
        input.disabled = false;
      }
    }, 100);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedPage('');
    resetForm();
    setMessage({ type: '', text: '' });
  };

  const getFilteredPages = () => {
    if (!searchTerm) return pages;
    return pages.filter(page => 
      page.page_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get unique page names for dropdown
  const getUniquePageNames = () => {
    const pageNames = pages.map(p => p.page_name);
    return [...new Set(pageNames)].sort();
  };

  if (fetching) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-500">Loading SEO settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">SEO Settings</h1>
            <p className="text-gray-600 mt-2">Configure meta tags and social media sharing settings for each page</p>
          </div>
          {!showForm && (
            <button
              onClick={handleNewPage}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Page
            </button>
          )}
        </div>
      </div>

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
            onClick={() => setMessage({ type: '', text: '' })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Page *
        </label>
        <div className="flex gap-4">
          <select
            value={selectedPage}
            onChange={handlePageSelect}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Select a page --</option>
            {getUniquePageNames().map(page => {
              const hasConfig = pages.some(p => p.page_name === page);
              return (
                <option key={page} value={page}>
                  {page} {hasConfig && '✓'}
                </option>
              );
            })}
          </select>
          {showForm && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
        {selectedPage && (
          <p className="text-xs text-gray-500 mt-2">
            {isEditing ? '✏️ Editing existing configuration' : '📝 Creating new configuration'}
          </p>
        )}
        {!selectedPage && showForm && (
          <p className="text-xs text-blue-500 mt-2">
            📝 Creating new page configuration
          </p>
        )}
      </div>

      {/* SEO Form - Show when a page is selected or "New Page" is clicked */}
      {(showForm || selectedPage) && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'basic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Basic SEO
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('social')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'social'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Social Media (OG Tags)
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Hidden page_name input */}
            <input type="hidden" name="page_name" value={formData.page_name} />

            {/* Basic SEO Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Name *
                  </label>
                  <input
                    type="text"
                    name="page_name"
                    value={formData.page_name}
                    onChange={handleChange}
                    placeholder="e.g., Home, About, Services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={!!selectedPage || saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedPage 
                      ? 'Page name is locked (existing configuration)' 
                      : 'Enter a unique page name (cannot be changed after creation)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title *
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formData.meta_title}
                    onChange={handleChange}
                    placeholder="Enter meta title (50-60 characters recommended)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={saving || loading}
                    maxLength="70"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-xs ${formData.meta_title.length > 60 ? 'text-red-500' : 'text-gray-500'}`}>
                      Characters: {formData.meta_title.length}
                    </p>
                    <p className="text-xs text-gray-500">Recommended: 50-60 characters</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description *
                  </label>
                  <textarea
                    name="meta_description"
                    value={formData.meta_description}
                    onChange={handleChange}
                    placeholder="Enter meta description (150-160 characters recommended)"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={saving || loading}
                    maxLength="170"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-xs ${formData.meta_description.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      Characters: {formData.meta_description.length}
                    </p>
                    <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="meta_keywords"
                    value={formData.meta_keywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate keywords with commas (max 10 keywords recommended)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    name="canonical_url"
                    value={formData.canonical_url}
                    onChange={handleChange}
                    placeholder="https://example.com/canonical-page"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Preferred URL for search engines to avoid duplicate content</p>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status === 1}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={saving || loading}
                    />
                    <span className="text-sm font-medium text-gray-700">Enable SEO for this page</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">When disabled, meta tags won't be applied to this page</p>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    💡 Open Graph (OG) tags control how your content appears when shared on social media platforms like Facebook, LinkedIn, and Twitter.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    name="og_title"
                    value={formData.og_title}
                    onChange={handleChange}
                    placeholder="Title for social media sharing"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to use Meta Title</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description
                  </label>
                  <textarea
                    name="og_description"
                    value={formData.og_description}
                    onChange={handleChange}
                    placeholder="Description for social media sharing"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to use Meta Description</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Image
                  </label>
                  <input
                    type="file"
                    name="og_image"
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/jpg,image/webp"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended size: 1200x630px. Max size: 1MB. Formats: JPG, PNG, WEBP
                  </p>
                  
                  {ogImagePreview && (
                    <div className="mt-3">
                      <div className="relative inline-block">
                        <img 
                          src={ogImagePreview} 
                          alt="OG Image Preview" 
                          className="max-w-full h-32 object-cover border border-gray-300 rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect width="300" height="200" fill="%23f0f0f0"/%3E%3Ctext x="150" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                          disabled={saving || loading}
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Preview of how your image will appear on social media</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="submit"
                disabled={saving || loading}
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
                    {isEditing ? 'Update SEO Settings' : 'Save SEO Settings'}
                  </>
                )}
              </button>
              
              {selectedPage && (
                <button
                  type="button"
                  onClick={() => {
                    fetchSEODetails(selectedPage);
                  }}
                  disabled={saving || loading}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              
              {!selectedPage && showForm && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving || loading}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      {/* Existing Pages List */}
      {pages.length > 0 && !showForm && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Configured Pages</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <span className="text-sm text-gray-500">{pages.length} page(s)</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredPages().map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {page.page_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {page.meta_title ? page.meta_title : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          page.status === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {page.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(page.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedPage(page.page_name);
                            fetchSEODetails(page.page_name);
                            setActiveTab('basic');
                          }}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SEO Tips Section */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-800 mb-2">📈 SEO Best Practices:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-green-700">
          <div>
            <p>• <strong>Meta Title:</strong> 50-60 characters, include primary keywords</p>
            <p>• <strong>Meta Description:</strong> 150-160 characters, include call-to-action</p>
            <p>• <strong>Unique Tags:</strong> Use unique meta tags for each page</p>
            <p>• <strong>OG Image:</strong> 1200x630px for optimal social media display</p>
          </div>
          <div>
            <p>• <strong>Canonical URLs:</strong> Prevent duplicate content issues</p>
            <p>• <strong>Keywords:</strong> Keep relevant, avoid keyword stuffing</p>
            <p>• <strong>Regular Updates:</strong> Update meta tags when content changes</p>
            <p>• <strong>Mobile Friendly:</strong> Ensure content is mobile-optimized</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOSettingsPage;