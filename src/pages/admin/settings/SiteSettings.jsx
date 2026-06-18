import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, RefreshCw, Upload, X, Eye, EyeOff } from 'lucide-react';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    site_name: '',
    contact_email: '',
    contact_phone: '',
    contact_land_line: '',
    address: '',
    copyright_text: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    linkedin_url: '',
    youtube_url: '',
    whatsapp_url: '',
    status: 1
  });
  
  const [files, setFiles] = useState({
    site_logo: null,
    favicon: null
  });
  
  const [previews, setPreviews] = useState({
    site_logo: null,
    favicon: null
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  // Fetch existing site settings on component mount
  useEffect(() => {
    fetchSiteSettings();
  }, []);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (previews.site_logo && previews.site_logo.startsWith('blob:')) {
        URL.revokeObjectURL(previews.site_logo);
      }
      if (previews.favicon && previews.favicon.startsWith('blob:')) {
        URL.revokeObjectURL(previews.favicon);
      }
    };
  }, [previews]);

  const fetchSiteSettings = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });
      
      const response = await api.get('/admin/site-settings');
      
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          site_name: data.site_name || '',
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
          contact_land_line: data.contact_land_line || '',
          address: data.address || '',
          copyright_text: data.copyright_text || '',
          facebook_url: data.facebook_url || '',
          instagram_url: data.instagram_url || '',
          twitter_url: data.twitter_url || '',
          linkedin_url: data.linkedin_url || '',
          youtube_url: data.youtube_url || '',
          whatsapp_url: data.whatsapp_url || '',
          status: data.status !== undefined ? data.status : 1
        });
        
        // Set image previews if they exist
        if (data.site_logo) {
          // If it's a URL from the server
          const logoUrl = data.site_logo.startsWith('http') 
            ? data.site_logo 
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.site_logo}`;
          setPreviews(prev => ({ ...prev, site_logo: logoUrl }));
        }
        if (data.favicon) {
          const faviconUrl = data.favicon.startsWith('http') 
            ? data.favicon 
            : `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${data.favicon}`;
          setPreviews(prev => ({ ...prev, favicon: faviconUrl }));
        }
        
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      
      // Check if error is 404 (No settings found)
      if (error.status === 404 || error.response?.status === 404) {
        setIsEditing(false);
        setMessage({ 
          type: 'info', 
          text: 'No site settings found. Please configure your site settings.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to fetch site settings' 
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

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
      if (!validTypes.includes(file.type)) {
        setMessage({ 
          type: 'error', 
          text: 'Please upload a valid image file (JPEG, PNG, SVG, or ICO)' 
        });
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Validate file size (max 2MB for logo, 1MB for favicon)
      const maxSize = name === 'site_logo' ? 2 * 1024 * 1024 : 1 * 1024 * 1024;
      if (file.size > maxSize) {
        setMessage({ 
          type: 'error', 
          text: `File size should be less than ${name === 'site_logo' ? '2MB' : '1MB'}` 
        });
        e.target.value = ''; // Clear the input
        return;
      }
      
      setFiles(prev => ({ ...prev, [name]: file }));
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [name]: previewUrl }));
      
      // Clear any existing messages
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    const requiredFields = ['site_name', 'contact_email', 'contact_phone', 'address'];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setMessage({
          type: 'error',
          text: `Please fill in the ${field.replace('_', ' ')} field`
        });
        return false;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contact_email)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      });
      return false;
    }

   

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
      
      // Append files if they exist
      if (files.site_logo) {
        submitData.append('site_logo', files.site_logo);
      }
      if (files.favicon) {
        submitData.append('favicon', files.favicon);
      }
      
      // Use the same API endpoint for both add and update
      const response = await api.post('/admin/site-settings/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: response.data.message || `Site settings ${isEditing ? 'updated' : 'saved'} successfully!` 
        });
        
        // Refetch to get updated data
        await fetchSiteSettings();
        
        // Clear file inputs
        setFiles({ site_logo: null, favicon: null });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: response.data.message || 'Failed to save site settings' 
        });
      }
    } catch (error) {
      console.error('Error saving site settings:', error);
      
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
          text: error.message || 'Failed to save site settings. Please try again.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (imageType) => {
    setFiles(prev => ({ ...prev, [imageType]: null }));
    setPreviews(prev => ({ ...prev, [imageType]: null }));
    
    // Clear the file input
    const fileInput = document.querySelector(`input[name="${imageType}"]`);
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      if (isEditing) {
        // Refetch to reset to saved values
        fetchSiteSettings();
      } else {
        // Reset to defaults
        setFormData({
          site_name: '',
          contact_email: '',
          contact_phone: '',
          contact_land_line: '',
          address: '',
          copyright_text: '',
          facebook_url: '',
          instagram_url: '',
          twitter_url: '',
          linkedin_url: '',
          youtube_url: '',
          whatsapp_url: '',
          status: 1
        });
        setFiles({ site_logo: null, favicon: null });
        setPreviews({ site_logo: null, favicon: null });
      }
      setMessage({ type: '', text: '' });
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-500">Loading site settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure your website general settings and social media links</p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* General Settings Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Name *
              </label>
              <input
                type="text"
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                placeholder="Enter site name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="contact@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Contact Land Line */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Land Line
              </label>
              <input
                type="tel"
                name="contact_land_line"
                value={formData.contact_land_line}
                onChange={handleChange}
                placeholder="033-1234567"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            {/* Copyright Text */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                name="copyright_text"
                value={formData.copyright_text}
                onChange={handleChange}
                placeholder="© 2026 Your Company. All rights reserved."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
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
                  disabled={loading}
                />
                <span className="text-sm font-medium text-gray-700">Active Status</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">Enable or disable site settings</p>
            </div>
          </div>
        </div>

        {/* Logo & Favicon Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Logo & Favicon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Logo
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  name="site_logo"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg,image/svg+xml"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended size: 200x50px. Max size: 2MB</p>
              
              {previews.site_logo && (
                <div className="mt-3">
                  <div className="relative inline-block">
                    <img 
                      src={previews.site_logo} 
                      alt="Site Logo Preview" 
                      className="h-16 w-auto border border-gray-300 rounded p-1 bg-white object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="50"%3E%3Crect width="200" height="50" fill="%23f0f0f0"/%3E%3Ctext x="100" y="30" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Logo%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('site_logo')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Favicon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon
              </label>
              <input
                type="file"
                name="favicon"
                onChange={handleFileChange}
                accept="image/x-icon,image/png,image/jpeg,image/vnd.microsoft.icon"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Recommended size: 32x32px or 16x16px. Max size: 1MB</p>
              
              {previews.favicon && (
                <div className="mt-3">
                  <div className="relative inline-block">
                    <img 
                      src={previews.favicon} 
                      alt="Favicon Preview" 
                      className="h-8 w-8 border border-gray-300 rounded p-0.5 bg-white object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32"%3E%3Crect width="32" height="32" fill="%23f0f0f0"/%3E%3Ctext x="16" y="20" font-family="Arial" font-size="10" fill="%23999" text-anchor="middle"%3E?%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('favicon')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* Twitter/X */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter/X URL
              </label>
              <input
                type="url"
                name="twitter_url"
                value={formData.twitter_url}
                onChange={handleChange}
                placeholder="https://twitter.com/yourhandle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/yourcompany"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <input
                type="url"
                name="youtube_url"
                value={formData.youtube_url}
                onChange={handleChange}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp URL
              </label>
              <input
                type="url"
                name="whatsapp_url"
                value={formData.whatsapp_url}
                onChange={handleChange}
                placeholder="https://wa.me/1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Format: https://wa.me/yourphonenumber</p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Settings' : 'Save Settings'}
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Tips:</h3>
        <div className="text-xs text-blue-700 space-y-1">
          <p>• Logo and favicon are optional. If not uploaded, system defaults will be used.</p>
          <p>• Social media links will appear in the website footer.</p>
          <p>• Copyright text is typically displayed in the footer of your website.</p>
          <p>• All URLs should start with https:// for security.</p>
          <p>• The "Contact Land Line" field is optional for additional phone numbers.</p>
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;