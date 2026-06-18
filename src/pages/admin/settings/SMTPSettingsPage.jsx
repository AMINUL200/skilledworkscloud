import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { CheckCircle, XCircle, Loader, Mail, Save, RefreshCw } from 'lucide-react';

const SMTPSettingsPage = () => {
  const [formData, setFormData] = useState({
    mailer: 'smtp',
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    encryption: 'tls',
    from_address: '',
    from_name: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [hasSettings, setHasSettings] = useState(false);

  // Fetch existing SMTP settings on component mount
  useEffect(() => {
    fetchSMTPSettings();
  }, []);

  const fetchSMTPSettings = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });
      
      const response = await api.get('/admin/smtp/details');
      
      if (response.data.status && response.data.data) {
        // Settings exist
        setFormData({
          mailer: response.data.data.mailer || 'smtp',
          host: response.data.data.host || 'smtp.gmail.com',
          port: response.data.data.port || 587,
          username: response.data.data.username || '',
          password: response.data.data.password || '', // Don't populate password for security
          encryption: response.data.data.encryption || 'tls',
          from_address: response.data.data.from_address || '',
          from_name: response.data.data.from_name || ''
        });
        setHasSettings(true);
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
      
      // Check if error is 404 (No settings found)
      if (error.status === 404 || error.response?.status === 404) {
        setHasSettings(false);
        setIsEditing(false);
        // Keep default form values for new setup
        setMessage({ 
          type: 'info', 
          text: 'No SMTP settings found. Please configure your email settings.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to fetch SMTP settings' 
        });
      }
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    const processedValue = type === 'number' ? parseInt(value) || 0 : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    const requiredFields = ['mailer', 'host', 'port', 'username', 'from_address', 'from_name'];
    
    // Password is required only if adding new settings
    if (!isEditing) {
      requiredFields.push('password');
    }

    for (const field of requiredFields) {
      if (!formData[field]) {
        setMessage({
          type: 'error',
          text: `Please fill in the ${field.replace('_', ' ')} field`
        });
        return false;
      }
    }

    // Validate email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.username)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address for username'
      });
      return false;
    }

    if (!emailRegex.test(formData.from_address)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address for "From Email"'
      });
      return false;
    }

    // Validate port number
    if (formData.port < 1 || formData.port > 65535) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid port number (1-65535)'
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

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare data for API
      const submitData = {
        mailer: formData.mailer,
        host: formData.host,
        port: formData.port,
        username: formData.username,
        encryption: formData.encryption,
        from_address: formData.from_address,
        from_name: formData.from_name
      };

      // Only include password if it's provided (for update) or if it's a new setup
      if (formData.password || !isEditing) {
        submitData.password = formData.password;
      }

      let response;
      if (isEditing && hasSettings) {
        // Update existing settings
        response = await api.post('/admin/smtp/save', submitData);
      } else {
        // Add new settings
        response = await api.post('/admin/smtp/save', submitData);
      }

      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: response.data.message || `SMTP settings ${isEditing ? 'updated' : 'added'} successfully!` 
        });
        
        setHasSettings(true);
        setIsEditing(true);
        
        // Refetch to get updated data (especially for password field being cleared)
        await fetchSMTPSettings();
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: response.data.message || 'Failed to save SMTP settings' 
        });
      }
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      
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
          text: error.message || 'Failed to save SMTP settings. Please try again.' 
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    // Validate required fields before testing
    if (!formData.host || !formData.username || !formData.from_address) {
      setMessage({
        type: 'error',
        text: 'Please fill in all required fields before testing'
      });
      return;
    }

    setTesting(true);
    setMessage({ type: '', text: '' });

    try {
      const testData = {
        mailer: formData.mailer,
        host: formData.host,
        port: formData.port,
        username: formData.username,
        encryption: formData.encryption,
        from_address: formData.from_address,
        from_name: formData.from_name
      };

      // Include password if available
      if (formData.password) {
        testData.password = formData.password;
      }

      const response = await api.post('/admin/smtp/test', testData);
      
      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: '✅ Test email sent successfully! SMTP configuration is working perfectly.' 
        });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({ 
          type: 'error', 
          text: response.data.message || 'Test failed! Please check your SMTP settings.' 
        });
      }
    } catch (error) {
      console.error('Error testing SMTP:', error);
      
      if (error.response?.data?.message) {
        setMessage({ 
          type: 'error', 
          text: `Test failed: ${error.response.data.message}` 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.message || 'Failed to test SMTP connection. Please check your settings.' 
        });
      }
    } finally {
      setTesting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form?')) {
      if (hasSettings) {
        // Refetch to reset to saved values
        fetchSMTPSettings();
      } else {
        // Reset to defaults
        setFormData({
          mailer: 'smtp',
          host: 'smtp.gmail.com',
          port: 587,
          username: '',
          password: '',
          encryption: 'tls',
          from_address: '',
          from_name: ''
        });
      }
      setMessage({ type: '', text: '' });
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <Loader className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <span className="text-gray-500">Loading SMTP settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Mail className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">SMTP Settings</h1>
          {hasSettings && (
            <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              Configured
            </span>
          )}
        </div>
        <p className="text-gray-600 mt-2">
          {hasSettings 
            ? 'Update your email server settings for sending emails' 
            : 'Configure your email server settings for sending emails'}
        </p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : message.type === 'info'
            ? 'bg-blue-50 text-blue-800 border border-blue-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          {message.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          {message.type === 'info' && <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />}
          <span className="flex-1">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mailer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mailer *
            </label>
            <input
              type="text"
              name="mailer"
              value={formData.mailer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="smtp"
            />
          </div>

          {/* Host */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SMTP Host *
            </label>
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="smtp.gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Port */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Port *
            </label>
            <input
              type="number"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="587"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              min="1"
              max="65535"
            />
            <p className="text-xs text-gray-500 mt-1">587 (TLS) or 465 (SSL)</p>
          </div>

          {/* Encryption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Encryption *
            </label>
            <select
              name="encryption"
              value={formData.encryption}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username (Email) *
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="your-email@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password / App Password {!isEditing && '*'}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditing ? "Leave blank to keep current password" : "Enter password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required={!isEditing}
            />
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password</p>
            )}
          </div>

          {/* From Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Email Address *
            </label>
            <input
              type="email"
              name="from_address"
              value={formData.from_address}
              onChange={handleChange}
              placeholder="sender@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* From Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Name *
            </label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              placeholder="Your App Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={saving || testing}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEditing ? 'Update Settings' : 'Save Settings'}
              </>
            )}
          </button>
          
         
        </div>
      </form>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Common SMTP Settings:</h3>
        <div className="text-xs text-blue-700 space-y-1">
          <p><strong>Gmail:</strong> smtp.gmail.com | Port: 587 | Encryption: TLS</p>
          <p><strong>Gmail (with App Password):</strong> Use your Gmail address as username and App Password as password</p>
          <p><strong>Outlook:</strong> smtp-mail.outlook.com | Port: 587 | Encryption: TLS</p>
          <p><strong>SendGrid:</strong> smtp.sendgrid.net | Port: 587 | Encryption: TLS</p>
          <p><strong>Mailgun:</strong> smtp.mailgun.org | Port: 587 | Encryption: TLS</p>
        </div>
        <div className="mt-3 text-xs text-blue-700 border-t border-blue-200 pt-3">
          <p className="font-semibold">🔐 Security Note:</p>
          <p>For Gmail, you need to use an <strong>App Password</strong> (not your regular password). 
          Generate it from your Google Account → Security → App Passwords.</p>
        </div>
      </div>
    </div>
  );
};

export default SMTPSettingsPage;