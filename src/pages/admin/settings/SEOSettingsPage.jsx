import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';

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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'social'

  // Fetch all SEO settings on component mount
  useEffect(() => {
    fetchSEOList();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (ogImagePreview) URL.revokeObjectURL(ogImagePreview);
    };
  }, [ogImagePreview]);

  const fetchSEOList = async () => {
    try {
      setFetching(true);
      const response = await api.get('/seo-settings/list');
      
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
      const response = await api.get(`/seo-settings/${pageName}`);
      
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
          setOgImagePreview(data.og_image);
        } else {
          setOgImagePreview(null);
        }
        
        setIsEditing(true);
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error fetching SEO details:', error);
      if (error.status === 404) {
        // New page, reset form
        resetForm(pageName);
        setIsEditing(false);
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
      page_name: pageName || selectedPage || '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      status: 1
    });
    setOgImage(null);
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
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
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
        return;
      }
      
      // Validate file size (max 1MB for OG image)
      if (file.size > 1 * 1024 * 1024) {
        setMessage({ 
          type: 'error', 
          text: 'OG image size should be less than 1MB' 
        });
        return;
      }
      
      setOgImage(file);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setOgImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setOgImage(null);
    setOgImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.page_name) {
      setMessage({ type: 'error', text: 'Page name is required!' });
      return;
    }
    
    setLoading(true);
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
      
      const response = await api.post('/seo-settings/save', submitData, {
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
        
        // Clear image input
        setOgImage(null);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to save SEO settings. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const getPageOptions = () => {
    const commonPages = ['Home', 'About', 'Services', 'Products', 'Blog', 'Contact', 'FAQ', 'Gallery'];
    const existingPages = pages.map(p => p.page_name);
    const allPages = [...new Set([...commonPages, ...existingPages])];
    return allPages.sort();
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading SEO settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SEO Settings</h1>
        <p className="text-gray-600 mt-2">Configure meta tags and social media sharing settings for each page</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a page --</option>
            {getPageOptions().map(page => (
              <option key={page} value={page}>
                {page} {pages.some(p => p.page_name === page) && '(Configured)'}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setSelectedPage('');
              resetForm();
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            New Page
          </button>
        </div>
        {selectedPage && (
          <p className="text-xs text-gray-500 mt-2">
            {isEditing ? 'Editing existing configuration' : 'Creating new configuration'}
          </p>
        )}
      </div>

      {/* SEO Form */}
      {(selectedPage || formData.page_name) && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    required
                    disabled={!!selectedPage}
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier for this page</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Characters: {formData.meta_title.length}</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Characters: {formData.meta_description.length}</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Preferred URL for search engines</p>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status === 1}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Enable SEO for this page</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">When disabled, meta tags won't be applied</p>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
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
            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (isEditing ? 'Update SEO Settings' : 'Save SEO Settings')}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  if (selectedPage) {
                    fetchSEODetails(selectedPage);
                  } else {
                    resetForm();
                  }
                }}
                disabled={loading}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Existing Pages List */}
      {pages.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Configured Pages</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {page.page_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {page.meta_title ? (page.meta_title.length > 50 ? page.meta_title.substring(0, 50) + '...' : page.meta_title) : '-'}
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
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SEO Tips Section */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-800 mb-2">📈 SEO Best Practices:</h3>
        <div className="text-xs text-green-700 space-y-1">
          <p>• Meta Title should be 50-60 characters and include primary keywords</p>
          <p>• Meta Description should be 150-160 characters and include a call-to-action</p>
          <p>• Use unique meta tags for each page to avoid duplicate content</p>
          <p>• OG Image should be 1200x630px for optimal social media display</p>
          <p>• Canonical URLs help prevent duplicate content issues</p>
          <p>• Keep meta keywords relevant and avoid keyword stuffing</p>
        </div>
      </div>
    </div>
  );
};

export default SEOSettingsPage;