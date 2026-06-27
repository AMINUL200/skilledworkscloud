import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Star, User, Briefcase, MessageCircle, Heart } from 'lucide-react';

const ServiceDetailsTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    highlighted_title: '',
    description: '',
    name: '',
    designation: '',
    rating: 5,
    status: 1
  });

  // Fetch all testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/testimonial-section/list');

      if (response.data.status && response.data.data) {
        setTestimonials(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch testimonials'
      });
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

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating: rating
    }));
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setFormData({
      batch: '',
      title: '',
      highlighted_title: '',
      description: '',
      name: '',
      designation: '',
      rating: 5,
      status: 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      batch: testimonial.batch || '',
      title: testimonial.title || '',
      highlighted_title: testimonial.highlighted_title || '',
      description: testimonial.description || '',
      name: testimonial.name || '',
      designation: testimonial.designation || '',
      rating: testimonial.rating || 5,
      status: testimonial.status !== undefined ? (testimonial.status === true || testimonial.status === 1 ? 1 : 0) : 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/testimonial-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Testimonial deleted successfully!'
        });
        await fetchTestimonials();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete testimonial'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
   

  

    if (!formData.name) {
      setMessage({ type: 'error', text: 'Client name is required!' });
      return false;
    }

    if (!formData.designation) {
      setMessage({ type: 'error', text: 'Client designation is required!' });
      return false;
    }

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      setMessage({ type: 'error', text: 'Rating must be between 1 and 5!' });
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
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingTestimonial) {
        // Update existing testimonial
        submitData.append('id', editingTestimonial.id);
        response = await api.post('/admin/testimonial-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new testimonial
        response = await api.post('/admin/testimonial-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Testimonial ${editingTestimonial ? 'updated' : 'added'} successfully!`
        });

        await fetchTestimonials();
        setShowForm(false);
        setEditingTestimonial(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save testimonial'
        });
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);

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
    setEditingTestimonial(null);
    setMessage({ type: '', text: '' });
  };

  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  // Render rating stars for form
  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleRatingChange(i)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 ${i <= formData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      );
    }
    return stars;
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-yellow-600" />
                Service Details Testimonial
              </h2>
              <p className="text-sm text-gray-600">Manage client testimonials</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading testimonials...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-yellow-600" />
              Service Details Testimonial
            </h2>
            <p className="text-sm text-gray-600">Manage client testimonials</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
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
              {/* Batch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch / Subtitle
                </label>
                <input
                  type="text"
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  placeholder="e.g., TESTIMONIALS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  placeholder="Enter main title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  
                  disabled={saving}
                />
              </div>

              {/* Highlighted Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlighted Title
                </label>
                <input
                  type="text"
                  name="highlighted_title"
                  value={formData.highlighted_title}
                  onChange={handleChange}
                  placeholder="e.g., About SWC Global"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  
                  disabled={saving}
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., John Smith"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                  placeholder="e.g., Managing Director"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex gap-1 mt-1">
                  {renderRatingStars()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Selected: {formData.rating} star{formData.rating > 1 ? 's' : ''}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-end">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 ml-3">When inactive, this testimonial won't be displayed</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
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
          /* Testimonials List */
          <>
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No testimonials added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Add Your First Testimonial
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <MessageCircle className="w-5 h-5 text-yellow-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            testimonial.status === true || testimonial.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {testimonial.status === true || testimonial.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {testimonial.batch && (
                          <p className="text-sm text-yellow-600 font-medium">{testimonial.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {testimonial.title}
                          {testimonial.highlighted_title && (
                            <span className="text-yellow-600"> {testimonial.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{testimonial.description}</p>
                        
                        <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-200">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.designation}</p>
                              <div className="flex mt-1">
                                {renderStars(testimonial.rating || 5)}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(testimonial.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

export default ServiceDetailsTestimonial;