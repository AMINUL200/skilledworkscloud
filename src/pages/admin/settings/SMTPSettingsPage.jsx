import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app'; // Changed from 'app' to 'api'

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
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing SMTP settings on component mount
  useEffect(() => {
    fetchSMTPSettings();
  }, []);

  const fetchSMTPSettings = async () => {
    try {
      setFetching(true);
      const response = await api.get('/api/admin/smtp-settings'); // Changed from app.get to api.get
      
      if (response.data.status && response.data.data) {
        setFormData({
          mailer: response.data.data.mailer || 'smtp',
          host: response.data.data.host || 'smtp.gmail.com',
          port: response.data.data.port || 587,
          username: response.data.data.username || '',
          password: '', // Don't populate password for security
          encryption: response.data.data.encryption || 'tls',
          from_address: response.data.data.from_address || '',
          from_name: response.data.data.from_name || ''
        });
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
      // If no settings found (404 or error), it's a new setup
      if (error.status === 404) {
        setIsEditing(false);
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let response;
      if (isEditing) {
        response = await api.put('/api/admin/smtp-settings/update', formData);
      } else {
        response = await api.post('/api/admin/smtp-settings/add', formData);
      }

      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: response.data.message || `SMTP settings ${isEditing ? 'updated' : 'added'} successfully!` 
        });
        setIsEditing(true);
        
        // Refetch to get updated data (especially for password field being cleared)
        await fetchSMTPSettings();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 3000);
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to save SMTP settings. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/admin/smtp-settings/test', formData);
      
      if (response.data.status) {
        setMessage({ 
          type: 'success', 
          text: 'Test email sent successfully! SMTP configuration is working.' 
        });
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Test failed! Please check your SMTP settings.' });
      }
    } catch (error) {
      console.error('Error testing SMTP:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to test SMTP connection. Please check your settings.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading SMTP settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SMTP Settings</h1>
        <p className="text-gray-600 mt-2">Configure your email server settings for sending emails</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              Username *
            </label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="admin@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password / App Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditing ? "Leave blank to keep current password" : "Enter password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="admin@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="Laravel API"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

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
            onClick={handleTestConnection}
            disabled={loading}
            className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Test Connection
          </button>
        </div>
      </form>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">💡 Common SMTP Settings:</h3>
        <div className="text-xs text-blue-700 space-y-1">
          <p><strong>Gmail:</strong> smtp.gmail.com | Port: 587 | Encryption: TLS</p>
          <p><strong>Outlook:</strong> smtp-mail.outlook.com | Port: 587 | Encryption: TLS</p>
          <p><strong>SendGrid:</strong> smtp.sendgrid.net | Port: 587 | Encryption: TLS</p>
          <p><strong>Mailgun:</strong> smtp.mailgun.org | Port: 587 | Encryption: TLS</p>
        </div>
      </div>
    </div>
  );
};

export default SMTPSettingsPage;