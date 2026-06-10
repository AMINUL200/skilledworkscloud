import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    site_name: '',
    contact_email: '',
    contact_phone: '',
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

  // Fetch existing site settings on component mount
  useEffect(() => {
    fetchSiteSettings();
  }, []);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (previews.site_logo) URL.revokeObjectURL(previews.site_logo);
      if (previews.favicon) URL.revokeObjectURL(previews.favicon);
    };
  }, [previews]);

  const fetchSiteSettings = async () => {
    try {
      setFetching(true);
      const response = await api.get('/site-settings');
      
      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          site_name: data.site_name || '',
          contact_email: data.contact_email || '',
          contact_phone: data.contact_phone || '',
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
          setPreviews(prev => ({ ...prev, site_logo: data.site_logo }));
        }
        if (data.favicon) {
          setPreviews(prev => ({ ...prev, favicon: data.favicon }));
        }
        
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      setIsEditing(false);
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
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/x-icon'];
      if (!validTypes.includes(file.type)) {
        setMessage({ 
          type: 'error', 
          text: 'Please upload a valid image file (JPEG, PNG, SVG, or ICO)' 
        });
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ 
          type: 'error', 
          text: 'File size should be less than 2MB' 
        });
        return;
      }
      
      setFiles(prev => ({ ...prev, [name]: file }));
      
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({ ...prev, [name]: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      
      // For PUT/POST with FormData, we need to send as POST with _method
      if (isEditing) {
        submitData.append('_method', 'PUT');
      }
      
      const response = await api.post('/site-settings/save', submitData, {
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
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error('Error saving site settings:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to save site settings. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (imageType) => {
    setFiles(prev => ({ ...prev, [imageType]: null }));
    setPreviews(prev => ({ ...prev, [imageType]: null }));
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading site settings...</div>
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
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status === 1}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              <input
                type="file"
                name="site_logo"
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/jpg,image/svg+xml"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended size: 200x50px. Max size: 2MB</p>
              
              {previews.site_logo && (
                <div className="mt-3">
                  <div className="relative inline-block">
                    <img 
                      src={previews.site_logo} 
                      alt="Site Logo Preview" 
                      className="h-16 w-auto border border-gray-300 rounded p-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('site_logo')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
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
                accept="image/x-icon,image/png,image/jpeg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended size: 32x32px or 16x16px. Max size: 1MB</p>
              
              {previews.favicon && (
                <div className="mt-3">
                  <div className="relative inline-block">
                    <img 
                      src={previews.favicon} 
                      alt="Favicon Preview" 
                      className="h-8 w-8 border border-gray-300 rounded p-0.5"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage('favicon')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Format: https://wa.me/yourphonenumber</p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Settings' : 'Save Settings')}
          </button>
          
          <button
            type="button"
            onClick={() => fetchSiteSettings()}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
        </div>
      </div>
    </div>
  );
};

export default SiteSettings;