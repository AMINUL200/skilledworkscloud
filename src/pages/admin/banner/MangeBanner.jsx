import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, RefreshCw, Plus, Edit, X, Image, Video, FileText, Eye } from 'lucide-react';

const ManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState('');
  const [formData, setFormData] = useState({
    page_name: '',
    title: '',
    highlighted_title: '',
    title_meta: '',
    description: '',
    desc_meta: '',
    button1_text: '',
    button1_url: '',
    button2_text: '',
    button2_url: '',
    image_alt: '',
    video_meta: '',
    media_type: 'image',
    status: 1
  });
  
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'media'

  // Fetch all banners on component mount
  useEffect(() => {
    fetchBannerList();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview.startsWith('blob:')) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview]);

  const fetchBannerList = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });
      
      const response = await api.get('/admin/banner-list');
      
      if (response.data.status && response.data.data) {
        setBanners(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching banner list:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to fetch banner list' 
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchBannerDetails = async (pageName) => {
    if (!pageName) return;
    
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      setShowForm(true);
      
      const response = await api.get(`/admin/banner/${pageName}`);
      
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          page_name: data.page_name || '',
          title: data.title || '',
          highlighted_title: data.highlighted_title || '',
          title_meta: data.title_meta || '',
          description: data.description || '',
          desc_meta: data.desc_meta || '',
          button1_text: data.button1_text || '',
          button1_url: data.button1_url || '',
          button2_text: data.button2_text || '',
          button2_url: data.button2_url || '',
          image_alt: data.image_alt || '',
          video_meta: data.video_meta || '',
          media_type: data.media_type || 'image',
          status: data.status !== undefined ? data.status : 1
        });
        
        setMediaType(data.media_type || 'image');
        
        // Set media preview if exists
        if (data.image || data.video) {
          const mediaUrl = data.image || data.video;
          const url = mediaUrl.startsWith('http') 
            ? mediaUrl 
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${mediaUrl}`;
          setMediaPreview(url);
        } else {
          setMediaPreview(null);
        }
        
        setIsEditing(true);
        setSelectedBanner(pageName);
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error fetching banner details:', error);
      if (error.status === 404 || error.response?.status === 404) {
        resetForm(pageName);
        setIsEditing(false);
        setMessage({ 
          type: 'info', 
          text: `No banner found for "${pageName}". Create new banner.` 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to fetch banner details' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = (pageName = '') => {
    setFormData({
      page_name: pageName || '',
      title: '',
      highlighted_title: '',
      title_meta: '',
      description: '',
      desc_meta: '',
      button1_text: '',
      button1_url: '',
      button2_text: '',
      button2_url: '',
      image_alt: '',
      video_meta: '',
      media_type: 'image',
      status: 1
    });
    setMediaFile(null);
    if (mediaPreview && mediaPreview.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaPreview(null);
    setMediaType('image');
    setIsEditing(false);
  };

  const handleBannerSelect = (e) => {
    const pageName = e.target.value;
    setSelectedBanner(pageName);
    if (pageName) {
      fetchBannerDetails(pageName);
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

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type based on media type
      if (mediaType === 'image') {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
          setMessage({ 
            type: 'error', 
            text: 'Please upload a valid image file (JPEG, PNG, WEBP, or SVG)' 
          });
          e.target.value = '';
          return;
        }
        
        // Validate file size (max 2MB for images)
        if (file.size > 2 * 1024 * 1024) {
          setMessage({ 
            type: 'error', 
            text: 'Image size should be less than 2MB' 
          });
          e.target.value = '';
          return;
        }
      } else if (mediaType === 'video') {
        const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        if (!validTypes.includes(file.type)) {
          setMessage({ 
            type: 'error', 
            text: 'Please upload a valid video file (MP4, WEBM, OGG, or MOV)' 
          });
          e.target.value = '';
          return;
        }
        
        // Validate file size (max 10MB for videos)
        if (file.size > 10 * 1024 * 1024) {
          setMessage({ 
            type: 'error', 
            text: 'Video size should be less than 10MB' 
          });
          e.target.value = '';
          return;
        }
      }
      
      setMediaFile(file);
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setMediaPreview(previewUrl);
      
      // Clear any existing messages
      setMessage({ type: '', text: '' });
    }
  };

  const removeMedia = () => {
    if (mediaPreview && mediaPreview.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaFile(null);
    setMediaPreview(null);
    
    // Clear the file input
    const fileInput = document.querySelector('input[name="media_file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const validateForm = () => {
    if (!formData.page_name) {
      setMessage({ type: 'error', text: 'Page name is required!' });
      return false;
    }

    if (!formData.title) {
      setMessage({ type: 'error', text: 'Title is required!' });
      return false;
    }

    if (!formData.description) {
      setMessage({ type: 'error', text: 'Description is required!' });
      return false;
    }

    // Validate URLs if provided
    const urlFields = ['button1_url', 'button2_url'];
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    
    for (const field of urlFields) {
      if (formData[field] && !urlRegex.test(formData[field])) {
        setMessage({
          type: 'error',
          text: `Please enter a valid URL for ${field.replace('_', ' ')}`
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
      
      // Determine which media field to use based on media_type
      if (mediaFile) {
        if (mediaType === 'image') {
          submitData.append('image', mediaFile);
        } else if (mediaType === 'video') {
          submitData.append('video', mediaFile);
        }
      }
      
      const response = await api.post('/admin/banner/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: response.data.message || `Banner for "${formData.page_name}" saved successfully!` 
        });
        
        // Refresh the list
        await fetchBannerList();
        
        // Refresh the current banner details
        await fetchBannerDetails(formData.page_name);
        
        // Clear media input
        setMediaFile(null);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: response.data.message || 'Failed to save banner' 
        });
      }
    } catch (error) {
      console.error('Error saving banner:', error);
      
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
          text: error.message || 'Failed to save banner. Please try again.' 
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleNewBanner = () => {
    setSelectedBanner('');
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
    setSelectedBanner('');
    resetForm();
    setMessage({ type: '', text: '' });
  };

  const getFilteredBanners = () => {
    if (!searchTerm) return banners;
    return banners.filter(banner => 
      banner.page_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get unique page names for dropdown
  const getUniquePageNames = () => {
    const pageNames = banners.map(b => b.page_name);
    return [...new Set(pageNames)].sort();
  };

  const renderMediaPreview = () => {
    if (!mediaPreview) return null;

    if (mediaType === 'image') {
      return (
        <img 
          src={mediaPreview} 
          alt="Banner Preview" 
          className="max-w-full h-48 object-cover border border-gray-300 rounded"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="200" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
      );
    } else if (mediaType === 'video') {
      return (
        <video 
          src={mediaPreview} 
          controls 
          className="max-w-full h-48 object-cover border border-gray-300 rounded"
        />
      );
    }
    return null;
  };

  const getMediaIcon = () => {
    if (mediaType === 'image') {
      return <Image className="w-5 h-5" />;
    } else if (mediaType === 'video') {
      return <Video className="w-5 h-5" />;
    }
    return <FileText className="w-5 h-5" />;
  };

  if (fetching) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-500">Loading banners...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Banners</h1>
            <p className="text-gray-600 mt-2">Create and manage banner content for your website pages</p>
          </div>
          {!showForm && (
            <button
              onClick={handleNewBanner}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Banner
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

      {/* Banner Selector */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Banner Page *
        </label>
        <div className="flex gap-4">
          <select
            value={selectedBanner}
            onChange={handleBannerSelect}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Select a page --</option>
            {getUniquePageNames().map(page => {
              const hasConfig = banners.some(b => b.page_name === page);
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
        {selectedBanner && (
          <p className="text-xs text-gray-500 mt-2">
            {isEditing ? '✏️ Editing existing banner' : '📝 Creating new banner'}
          </p>
        )}
        {!selectedBanner && showForm && (
          <p className="text-xs text-blue-500 mt-2">
            📝 Creating new banner configuration
          </p>
        )}
      </div>

      {/* Banner Form */}
      {(showForm || selectedBanner) && (
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
                Basic Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'media'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Media & Buttons
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Hidden page_name input */}
            <input type="hidden" name="page_name" value={formData.page_name} />

            {/* Basic Information Tab */}
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
                    disabled={!!selectedBanner || saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedBanner 
                      ? 'Page name is locked (existing configuration)' 
                      : 'Enter a unique page name (cannot be changed after creation)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter banner title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={saving || loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highlighted Title
                  </label>
                  <input
                    type="text"
                    name="highlighted_title"
                    value={formData.highlighted_title}
                    onChange={handleChange}
                    placeholder="Highlighted text within title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">Text that will be highlighted in the title</p>
                </div>

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
                    disabled={saving || loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter banner description"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Characters: {formData.description.length}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description Meta
                  </label>
                  <input
                    type="text"
                    name="desc_meta"
                    value={formData.desc_meta}
                    onChange={handleChange}
                    placeholder="Additional description meta information"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
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
                    <span className="text-sm font-medium text-gray-700">Enable Banner</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">When disabled, this banner won't be displayed</p>
                </div>
              </div>
            )}

            {/* Media & Buttons Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media Type *
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="media_type"
                        value="image"
                        checked={mediaType === 'image'}
                        onChange={(e) => {
                          setMediaType('image');
                          setFormData(prev => ({ ...prev, media_type: 'image' }));
                          removeMedia();
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        disabled={saving || loading}
                      />
                      <span className="text-sm text-gray-700">Image</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="media_type"
                        value="video"
                        checked={mediaType === 'video'}
                        onChange={(e) => {
                          setMediaType('video');
                          setFormData(prev => ({ ...prev, media_type: 'video' }));
                          removeMedia();
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        disabled={saving || loading}
                      />
                      <span className="text-sm text-gray-700">Video</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {mediaType === 'image' ? 'Upload Image' : 'Upload Video'}
                  </label>
                  <input
                    type="file"
                    name="media_file"
                    onChange={handleMediaChange}
                    accept={mediaType === 'image' 
                      ? 'image/jpeg,image/png,image/jpg,image/webp,image/svg+xml'
                      : 'video/mp4,video/webm,video/ogg,video/quicktime'
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {mediaType === 'image' 
                      ? 'Recommended size: 1920x600px. Max size: 2MB. Formats: JPG, PNG, WEBP, SVG'
                      : 'Max size: 10MB. Formats: MP4, WEBM, OGG, MOV'
                    }
                  </p>
                  
                  {mediaPreview && (
                    <div className="mt-3">
                      <div className="relative inline-block">
                        {renderMediaPreview()}
                        <button
                          type="button"
                          onClick={removeMedia}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                          disabled={saving || loading}
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {mediaType === 'image' ? 'Image' : 'Video'} preview
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {mediaType === 'image' ? 'Image Alt Text' : 'Video Meta'}
                  </label>
                  <input
                    type="text"
                    name={mediaType === 'image' ? 'image_alt' : 'video_meta'}
                    value={mediaType === 'image' ? formData.image_alt : formData.video_meta}
                    onChange={handleChange}
                    placeholder={mediaType === 'image' 
                      ? 'Enter image alt text for SEO'
                      : 'Enter video meta information'
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving || loading}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {mediaType === 'image' 
                      ? 'Alt text helps with SEO and accessibility'
                      : 'Meta information for the video'
                    }
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Buttons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 1 Text
                      </label>
                      <input
                        type="text"
                        name="button1_text"
                        value={formData.button1_text}
                        onChange={handleChange}
                        placeholder="e.g., Learn More"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving || loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 1 URL
                      </label>
                      <input
                        type="url"
                        name="button1_url"
                        value={formData.button1_url}
                        onChange={handleChange}
                        placeholder="https://example.com/page"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving || loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 Text
                      </label>
                      <input
                        type="text"
                        name="button2_text"
                        value={formData.button2_text}
                        onChange={handleChange}
                        placeholder="e.g., Contact Us"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving || loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 URL
                      </label>
                      <input
                        type="url"
                        name="button2_url"
                        value={formData.button2_url}
                        onChange={handleChange}
                        placeholder="https://example.com/contact"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving || loading}
                      />
                    </div>
                  </div>
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
                    {isEditing ? 'Update Banner' : 'Save Banner'}
                  </>
                )}
              </button>
              
              {selectedBanner && (
                <button
                  type="button"
                  onClick={() => {
                    fetchBannerDetails(selectedBanner);
                  }}
                  disabled={saving || loading}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              )}
              
              {!selectedBanner && showForm && (
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

      {/* Existing Banners List */}
      {banners.length > 0 && !showForm && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Configured Banners</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <span className="text-sm text-gray-500">{banners.length} banner(s)</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Media Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getFilteredBanners().map((banner) => (
                    <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {banner.page_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {banner.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
                          banner.media_type === 'image' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {banner.media_type === 'image' ? (
                            <Image className="w-3 h-3" />
                          ) : (
                            <Video className="w-3 h-3" />
                          )}
                          {banner.media_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          banner.status === 1 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {banner.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(banner.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedBanner(banner.page_name);
                            fetchBannerDetails(banner.page_name);
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

      {/* Tips Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Banner Best Practices:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-700">
          <div>
            <p>• <strong>Image Size:</strong> 1920x600px for optimal display</p>
            <p>• <strong>Video Format:</strong> MP4 with H.264 encoding for best compatibility</p>
            <p>• <strong>Title:</strong> Keep it concise and compelling (50-60 characters)</p>
            <p>• <strong>Description:</strong> Clear and engaging (150-200 characters)</p>
          </div>
          <div>
            <p>• <strong>Buttons:</strong> Use clear call-to-action text</p>
            <p>• <strong>Alt Text:</strong> Always add descriptive alt text for images</p>
            <p>• <strong>File Size:</strong> Optimize images (max 2MB) and videos (max 10MB)</p>
            <p>• <strong>Regular Updates:</strong> Update banners to keep content fresh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBanner;