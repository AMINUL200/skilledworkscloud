import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Layers, Rocket, Crown, Building, DollarSign, Check, MessageCircle } from 'lucide-react';

const ServiceDetailsNinthSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    batch: '',
    title: '',
    highlighted_title: '',
    description: '',
    title_meta: '',
    desc_meta: '',
    plans: [],
    title2: '',
    short_desc: '',
    button_name: '',
    button_url: '',
    status: 1
  });

  // Plan form state
  const [planFormData, setPlanFormData] = useState({
    icon: 'rocket',
    batch: '',
    title: '',
    subtitle: '',
    price: '',
    features: [],
    button_name: '',
    button_url: ''
  });
  const [editingPlanIndex, setEditingPlanIndex] = useState(null);
  const [featureInput, setFeatureInput] = useState('');

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sv-nineth-section/list');

      if (response.data.status && response.data.data) {
        setSections(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch sections'
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

  // Plan management
  const handlePlanChange = (e) => {
    const { name, value } = e.target;
    setPlanFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setPlanFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index) => {
    setPlanFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleAddPlan = () => {
    if (!planFormData.title || !planFormData.price) {
      setMessage({ type: 'error', text: 'Plan title and price are required!' });
      return;
    }

    setFormData(prev => ({
      ...prev,
      plans: [...prev.plans, { ...planFormData }]
    }));

    // Reset plan form
    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleEditPlan = (index) => {
    const plan = formData.plans[index];
    setPlanFormData({
      icon: plan.icon || 'rocket',
      batch: plan.batch || '',
      title: plan.title || '',
      subtitle: plan.subtitle || '',
      price: plan.price || '',
      features: plan.features || [],
      button_name: plan.button_name || '',
      button_url: plan.button_url || ''
    });
    setFeatureInput('');
    setEditingPlanIndex(index);
  };

  const handleUpdatePlan = () => {
    if (!planFormData.title || !planFormData.price) {
      setMessage({ type: 'error', text: 'Plan title and price are required!' });
      return;
    }

    const updatedPlans = [...formData.plans];
    updatedPlans[editingPlanIndex] = { ...planFormData };
    setFormData(prev => ({
      ...prev,
      plans: updatedPlans
    }));

    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
    setMessage({ type: '', text: '' });
  };

  const handleRemovePlan = (index) => {
    setFormData(prev => ({
      ...prev,
      plans: prev.plans.filter((_, i) => i !== index)
    }));
  };

  const handleCancelPlanEdit = () => {
    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'rocket':
        return <Rocket className="w-5 h-5" />;
      case 'crown':
        return <Crown className="w-5 h-5" />;
      case 'building':
        return <Building className="w-5 h-5" />;
      default:
        return <DollarSign className="w-5 h-5" />;
    }
  };

  const getIconBgColor = (iconName) => {
    switch(iconName) {
      case 'rocket':
        return 'bg-blue-100 text-blue-600';
      case 'crown':
        return 'bg-amber-100 text-amber-600';
      case 'building':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPlanBorderColor = (iconName) => {
    switch(iconName) {
      case 'rocket':
        return 'border-blue-200';
      case 'crown':
        return 'border-amber-200';
      case 'building':
        return 'border-purple-200';
      default:
        return 'border-gray-200';
    }
  };

  const getPlanGradient = (iconName) => {
    switch(iconName) {
      case 'rocket':
        return 'from-blue-50 to-blue-100';
      case 'crown':
        return 'from-amber-50 to-amber-100';
      case 'building':
        return 'from-purple-50 to-purple-100';
      default:
        return 'from-gray-50 to-gray-100';
    }
  };

  const handleAddNew = () => {
    setEditingSection(null);
    setFormData({
      batch: '',
      title: '',
      highlighted_title: '',
      description: '',
      title_meta: '',
      desc_meta: '',
      plans: [],
      title2: '',
      short_desc: '',
      button_name: '',
      button_url: '',
      status: 1
    });
    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      batch: section.batch || '',
      title: section.title || '',
      highlighted_title: section.highlighted_title || '',
      description: section.description || '',
      title_meta: section.title_meta || '',
      desc_meta: section.desc_meta || '',
      plans: section.plans || [],
      title2: section.title2 || '',
      short_desc: section.short_desc || '',
      button_name: section.button_name || '',
      button_url: section.button_url || '',
      status: section.status !== undefined ? section.status : 1
    });
    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-nineth-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Section deleted successfully!'
        });
        await fetchSections();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete section'
      });
    } finally {
      setLoading(false);
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

    if (!formData.title2) {
      setMessage({ type: 'error', text: 'Secondary Title is required!' });
      return false;
    }

    if (!formData.short_desc) {
      setMessage({ type: 'error', text: 'Short Description is required!' });
      return false;
    }

    if (!formData.button_name) {
      setMessage({ type: 'error', text: 'Button Name is required!' });
      return false;
    }

    if (!formData.button_url) {
      setMessage({ type: 'error', text: 'Button URL is required!' });
      return false;
    }

    if (formData.plans.length === 0) {
      setMessage({ type: 'error', text: 'At least one pricing plan is required!' });
      return false;
    }

    return true;
  };

  // FIXED: handleSubmit with proper features array handling
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
        if (key === 'plans') {
          // Send each plan as individual form fields with array notation
          formData[key].forEach((plan, index) => {
            submitData.append(`plans[${index}][icon]`, plan.icon || '');
            submitData.append(`plans[${index}][batch]`, plan.batch || '');
            submitData.append(`plans[${index}][title]`, plan.title || '');
            submitData.append(`plans[${index}][subtitle]`, plan.subtitle || '');
            submitData.append(`plans[${index}][price]`, plan.price || '');
            // Send features as array - each feature as separate array item
            if (plan.features && plan.features.length > 0) {
              plan.features.forEach((feature, featureIndex) => {
                submitData.append(`plans[${index}][features][${featureIndex}]`, feature);
              });
            } else {
              // Send empty array if no features
              submitData.append(`plans[${index}][features]`, '');
            }
            submitData.append(`plans[${index}][button_name]`, plan.button_name || '');
            submitData.append(`plans[${index}][button_url]`, plan.button_url || '');
          });
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append('id', editingSection.id);
        response = await api.post('/admin/sv-nineth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new section
        response = await api.post('/admin/sv-nineth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Section ${editingSection ? 'updated' : 'added'} successfully!`
        });

        await fetchSections();
        setShowForm(false);
        setEditingSection(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save section'
        });
      }
    } catch (error) {
      console.error('Error saving section:', error);

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
    setEditingSection(null);
    setPlanFormData({
      icon: 'rocket',
      batch: '',
      title: '',
      subtitle: '',
      price: '',
      features: [],
      button_name: '',
      button_url: ''
    });
    setFeatureInput('');
    setEditingPlanIndex(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Service Details Ninth Section
              </h2>
              <p className="text-sm text-gray-600">Manage service details pricing section</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Service Details Ninth Section
            </h2>
            <p className="text-sm text-gray-600">Manage service details pricing section</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
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
                  placeholder="e.g., PRICING"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
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
                  placeholder="e.g., Every Business Size"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Description Meta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description Meta
                </label>
                <input
                  type="text"
                  name="desc_meta"
                  value={formData.desc_meta}
                  onChange={handleChange}
                  placeholder="Meta description for this section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Secondary Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Title *
                </label>
                <input
                  type="text"
                  name="title2"
                  value={formData.title2}
                  onChange={handleChange}
                  placeholder="e.g., Need Something Custom?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="short_desc"
                  value={formData.short_desc}
                  onChange={handleChange}
                  placeholder="Short description for CTA section"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Button Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Name *
                </label>
                <input
                  type="text"
                  name="button_name"
                  value={formData.button_name}
                  onChange={handleChange}
                  placeholder="e.g., Schedule Consultation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Button URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button URL *
                </label>
                <input
                  type="text"
                  name="button_url"
                  value={formData.button_url}
                  onChange={handleChange}
                  placeholder="/contact"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>
            </div>

            {/* Plans Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Pricing Plans</h3>
              
              {/* Plan Form */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Icon
                    </label>
                    <select
                      name="icon"
                      value={planFormData.icon}
                      onChange={handlePlanChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    >
                      <option value="rocket">Rocket</option>
                      <option value="crown">Crown</option>
                      <option value="building">Building</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Batch (Optional)
                    </label>
                    <input
                      type="text"
                      name="batch"
                      value={planFormData.batch}
                      onChange={handlePlanChange}
                      placeholder="e.g., MOST POPULAR"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={planFormData.title}
                      onChange={handlePlanChange}
                      placeholder="e.g., Starter"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={planFormData.subtitle}
                      onChange={handlePlanChange}
                      placeholder="e.g., Perfect for startups"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Price *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={planFormData.price}
                      onChange={handlePlanChange}
                      placeholder="e.g., $999"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Button Name
                    </label>
                    <input
                      type="text"
                      name="button_name"
                      value={planFormData.button_name}
                      onChange={handlePlanChange}
                      placeholder="e.g., Get Started"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Button URL
                    </label>
                    <input
                      type="text"
                      name="button_url"
                      value={planFormData.button_url}
                      onChange={handlePlanChange}
                      placeholder="/contact"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Features
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={handleFeatureKeyPress}
                      placeholder="Add feature (e.g., Responsive Website)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {planFormData.features.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {planFormData.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200"
                        >
                          <Check className="w-3 h-3" />
                          {feature}
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="text-emerald-500 hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  {editingPlanIndex !== null ? (
                    <>
                      <button
                        type="button"
                        onClick={handleUpdatePlan}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Update Plan
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelPlanEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAddPlan}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Plan
                    </button>
                  )}
                </div>
              </div>

              {/* Plans List */}
              {formData.plans.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formData.plans.map((plan, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-br ${getPlanGradient(plan.icon)} border ${getPlanBorderColor(plan.icon)} rounded-lg p-4 hover:shadow-md transition-shadow relative`}
                    >
                      {plan.batch && (
                        <div className="absolute -top-2 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {plan.batch}
                        </div>
                      )}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${getIconBgColor(plan.icon)} mb-3`}>
                            {getIconComponent(plan.icon)}
                          </div>
                          <h4 className="text-lg font-bold text-gray-800">{plan.title}</h4>
                          {plan.subtitle && (
                            <p className="text-xs text-gray-500">{plan.subtitle}</p>
                          )}
                          <p className="text-2xl font-bold text-emerald-600 mt-2">{plan.price}</p>
                          {plan.features && plan.features.length > 0 && (
                            <ul className="mt-3 space-y-1">
                              {plan.features.map((feature, idx) => (
                                <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                          {plan.button_name && (
                            <div className="mt-3">
                              <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg">
                                {plan.button_name}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditPlan(index)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit"
                            disabled={saving}
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePlan(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Remove"
                            disabled={saving}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status === 1}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  disabled={saving}
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">When inactive, this section won't be displayed</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingSection ? 'Update Section' : 'Add Section'}
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
          /* Sections List */
          <>
            {sections.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            section.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {section.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        {section.batch && (
                          <p className="text-sm text-emerald-600 font-medium">{section.batch}</p>
                        )}
                        
                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-emerald-600"> {section.highlighted_title}</span>
                          )}
                        </h3>
                        
                        <p className="text-gray-600 mt-2">{section.description}</p>
                        
                        {/* Plans */}
                        {section.plans && section.plans.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                            {section.plans.map((plan, index) => (
                              <div
                                key={index}
                                className={`bg-white border ${getPlanBorderColor(plan.icon)} rounded-lg p-3 relative`}
                              >
                                {plan.batch && (
                                  <div className="absolute -top-2 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {plan.batch}
                                  </div>
                                )}
                                <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${getIconBgColor(plan.icon)} mb-2`}>
                                  {getIconComponent(plan.icon)}
                                </div>
                                <h4 className="text-sm font-bold text-gray-800">{plan.title}</h4>
                                <p className="text-lg font-bold text-emerald-600">{plan.price}</p>
                                {plan.features && plan.features.length > 0 && (
                                  <ul className="mt-2 space-y-0.5">
                                    {plan.features.slice(0, 3).map((feature, idx) => (
                                      <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                        <Check className="w-2 h-2 text-emerald-500" />
                                        {feature}
                                      </li>
                                    ))}
                                    {plan.features.length > 3 && (
                                      <li className="text-xs text-gray-400">+{plan.features.length - 3} more</li>
                                    )}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* CTA Section */}
                        <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
                          <h4 className="text-lg font-semibold text-gray-800">{section.title2}</h4>
                          <p className="text-sm text-gray-600 mt-1">{section.short_desc}</p>
                          {section.button_name && (
                            <div className="mt-3">
                              <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg">
                                {section.button_name}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-3">
                          Updated: {new Date(section.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(section.id)}
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

export default ServiceDetailsNinthSection;