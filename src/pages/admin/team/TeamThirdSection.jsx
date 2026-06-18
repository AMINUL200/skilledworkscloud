import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, User, Mail, Phone, MapPin, Briefcase, Star, Users, Calendar, ExternalLink } from 'lucide-react';

const TeamThirdSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    short_desc: '',
    long_desc: '',
    desc2: '',
    button1_name: '',
    button1_url: '',
    button2_name: '',
    button2_url: '',
    button3_name: '',
    button3_url: '',
    image_alt: '',
    expertise: [],
    status: 1
  });

  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);

  useEffect(() => {
    fetchMembers();
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

  const fetchMembers = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/team-member-list');

      if (response.data.status && response.data.data) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch team members'
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchMemberDetails = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/team-member/${id}`);

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        setFormData({
          name: data.name || '',
          designation: data.designation || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          experience: data.experience || '',
          short_desc: data.short_desc || '',
          long_desc: data.long_desc || '',
          desc2: data.desc2 || '',
          button1_name: data.button1_name || '',
          button1_url: data.button1_url || '',
          button2_name: data.button2_name || '',
          button2_url: data.button2_url || '',
          button3_name: data.button3_name || '',
          button3_url: data.button3_url || '',
          image_alt: data.image_alt || '',
          expertise: data.expertise || [],
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

        setEditingMember(data);
        setShowForm(true);
        setMessage({ type: '', text: '' });
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch member details'
      });
    } finally {
      setLoading(false);
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

  const handleAddExpertise = () => {
    if (expertiseInput.trim()) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, expertiseInput.trim()]
      }));
      setExpertiseInput('');
    }
  };

  const handleRemoveExpertise = (index) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const handleAddNew = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      designation: '',
      email: '',
      phone: '',
      address: '',
      experience: '',
      short_desc: '',
      long_desc: '',
      desc2: '',
      button1_name: '',
      button1_url: '',
      button2_name: '',
      button2_url: '',
      button3_name: '',
      button3_url: '',
      image_alt: '',
      expertise: [],
      status: 1
    });
    setWebImage(null);
    setMobileImage(null);
    setWebImagePreview(null);
    setMobileImagePreview(null);
    setExpertiseInput('');
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (member) => {
    fetchMemberDetails(member.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/team-member/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Team member deleted successfully!'
        });
        await fetchMembers();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete team member'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name) {
      setMessage({ type: 'error', text: 'Name is required!' });
      return false;
    }

    if (!formData.designation) {
      setMessage({ type: 'error', text: 'Designation is required!' });
      return false;
    }

    if (!formData.short_desc) {
      setMessage({ type: 'error', text: 'Short description is required!' });
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
        if (key === 'expertise') {
          submitData.append('expertise', JSON.stringify(formData.expertise));
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      if (webImage) {
        submitData.append('web_image', webImage);
      }
      if (mobileImage) {
        submitData.append('mobile_image', mobileImage);
      }

      const response = await api.post('/admin/team-member/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Team member ${editingMember ? 'updated' : 'added'} successfully!`
        });

        await fetchMembers();
        setShowForm(false);
        setEditingMember(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save team member'
        });
      }
    } catch (error) {
      console.error('Error saving team member:', error);

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

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Section 3: Team Members</h2>
              <p className="text-sm text-gray-600">Manage individual team members with detailed profiles</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading team members...</span>
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
            <h2 className="text-xl font-semibold text-gray-800">Section 3: Team Members</h2>
            <p className="text-sm text-gray-600">Manage individual team members with detailed profiles</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
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

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g., CEO & Immigration Advisor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+44 123456789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="London, UK"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="15+ Years Experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleChange}
                  placeholder="Brief description of the team member"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.short_desc.length}
                </p>
              </div>

              {/* Long Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Description
                </label>
                <textarea
                  name="long_desc"
                  value={formData.long_desc}
                  onChange={handleChange}
                  placeholder="Detailed description of the team member"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Description 2 */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Description
                </label>
                <textarea
                  name="desc2"
                  value={formData.desc2}
                  onChange={handleChange}
                  placeholder="Additional description or call to action text"
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Expertise */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={expertiseInput}
                    onChange={(e) => setExpertiseInput(e.target.value)}
                    placeholder="Add expertise (e.g., Business Immigration)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={saving}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddExpertise();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddExpertise}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={saving}
                  >
                    Add
                  </button>
                </div>
                {formData.expertise.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.expertise.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200"
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => handleRemoveExpertise(index)}
                          className="text-blue-500 hover:text-red-500 transition-colors"
                          disabled={saving}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Alt */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="image_alt"
                  value={formData.image_alt}
                  onChange={handleChange}
                  placeholder="Alt text for images"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 800x800px. Max: 2MB</p>

                    {webImagePreview && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img
                            src={webImagePreview}
                            alt="Web Image Preview"
                            className="w-32 h-32 object-cover border border-gray-300 rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: 400x400px. Max: 2MB</p>

                    {mobileImagePreview && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img
                            src={mobileImagePreview}
                            alt="Mobile Image Preview"
                            className="w-32 h-32 object-cover border border-gray-300 rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0f0f0"/%3E%3Ctext x="100" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
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

              {/* Buttons Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Action Buttons</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 1 Name
                    </label>
                    <input
                      type="text"
                      name="button1_name"
                      value={formData.button1_name}
                      onChange={handleChange}
                      placeholder="e.g., Book Consultation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 1 URL
                    </label>
                    <input
                      type="text"
                      name="button1_url"
                      value={formData.button1_url}
                      onChange={handleChange}
                      placeholder="/consultation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 Name
                      </label>
                      <input
                        type="text"
                        name="button2_name"
                        value={formData.button2_name}
                        onChange={handleChange}
                        placeholder="e.g., Contact Advisor"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 2 URL
                      </label>
                      <input
                        type="text"
                        name="button2_url"
                        value={formData.button2_url}
                        onChange={handleChange}
                        placeholder="/contact"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 3 Name
                      </label>
                      <input
                        type="text"
                        name="button3_name"
                        value={formData.button3_name}
                        onChange={handleChange}
                        placeholder="e.g., Schedule Meeting"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button 3 URL
                      </label>
                      <input
                        type="text"
                        name="button3_url"
                        value={formData.button3_url}
                        onChange={handleChange}
                        placeholder="/meeting"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                  </div>
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
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">When inactive, this team member won't be displayed on the website</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
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
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Members List */
          <>
            {members.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No team members added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Member
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {member.web_image ? (
                          <img
                            src={`${import.meta.env.VITE_STORAGE_BASE_URL || ''}${member.web_image}`}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '';
                            }}
                          />
                        ) : (
                          <User className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.designation}</p>
                        <div className="flex items-center gap-3 mt-1">
                          {member.email && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </span>
                          )}
                          {member.phone && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {member.phone}
                            </span>
                          )}
                          {member.experience && (
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {member.experience}
                            </span>
                          )}
                        </div>
                        {member.expertise && member.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.expertise.slice(0, 3).map((exp, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full"
                              >
                                {exp}
                              </span>
                            ))}
                            {member.expertise.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-full">
                                +{member.expertise.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.status === 1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {member.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {/* <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TeamThirdSection;