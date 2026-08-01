import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { 
  Save, Plus, Edit, Trash2, X, 
  CheckCircle, XCircle, Search,
  Users, Shield, BarChart,
  DollarSign, Percent
} from 'lucide-react';

const ManageNationalInsuranceCategory = () => {
  const [categories, setCategories] = useState([]);
  const [niBands, setNiBands] = useState([]);
  const [taxYears, setTaxYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [showNiBandForm, setShowNiBandForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingNiBand, setEditingNiBand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    is_active: true
  });

  const [niBandFormData, setNiBandFormData] = useState({
    tax_year_id: '',
    ni_category_id: '',
    name: '',
    from_amount: '',
    to_amount: '',
    employee_rate: '',
    employer_rate: '',
    is_active: true
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchNiBands();
    fetchTaxYears();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/calculator/ni-category/list');
      if (response.data.status && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching NI categories:', error);
    }
  };

  const fetchNiBands = async () => {
    try {
      setFetching(true);
      const response = await api.get('/admin/calculator/ni-band/list');
      if (response.data.status && response.data.data) {
        setNiBands(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching NI bands:', error);
    } finally {
      setFetching(false);
    }
  };

  const fetchTaxYears = async () => {
    try {
      const response = await api.get('/admin/calculator/tax-year/list');
      if (response.data.status && response.data.data) {
        setTaxYears(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tax years:', error);
    }
  };

  // Category CRUD
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleNiBandChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNiBandFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({
      code: '',
      description: '',
      is_active: true
    });
    setShowForm(true);
    setShowNiBandForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleAddNiBand = () => {
    setEditingNiBand(null);
    setNiBandFormData({
      tax_year_id: '',
      ni_category_id: '',
      name: '',
      from_amount: '',
      to_amount: '',
      employee_rate: '',
      employer_rate: '',
      is_active: true
    });
    setShowNiBandForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      code: category.code || '',
      description: category.description || '',
      is_active: category.is_active !== undefined ? category.is_active : true
    });
    setShowForm(true);
    setShowNiBandForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditNiBand = (band) => {
    setEditingNiBand(band);
    setNiBandFormData({
      tax_year_id: band.tax_year_id || '',
      ni_category_id: band.ni_category_id || '',
      name: band.name || '',
      from_amount: band.from_amount || '',
      to_amount: band.to_amount || '',
      employee_rate: band.employee_rate || '',
      employer_rate: band.employer_rate || '',
      is_active: band.is_active !== undefined ? band.is_active : true
    });
    setShowNiBandForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this NI category?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/ni-category/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'NI category deleted successfully!'
        });
        await fetchCategories();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete NI category'
        });
      }
    } catch (error) {
      console.error('Error deleting NI category:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete NI category'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNiBand = async (id) => {
    if (!window.confirm('Are you sure you want to delete this NI band?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/ni-band/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'NI band deleted successfully!'
        });
        await fetchNiBands();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete NI band'
        });
      }
    } catch (error) {
      console.error('Error deleting NI band:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete NI band'
      });
    } finally {
      setLoading(false);
    }
  };

  // Validation
  const validateForm = () => {
    if (!formData.code.trim()) {
      setMessage({ type: 'error', text: 'NI category code is required!' });
      return false;
    }

    if (formData.code.length > 1) {
      setMessage({ type: 'error', text: 'NI category code must be a single letter!' });
      return false;
    }

    if (!formData.description.trim()) {
      setMessage({ type: 'error', text: 'Description is required!' });
      return false;
    }

    return true;
  };

  const validateNiBandForm = () => {
    if (!niBandFormData.tax_year_id) {
      setMessage({ type: 'error', text: 'Please select a tax year!' });
      return false;
    }

    if (!niBandFormData.ni_category_id) {
      setMessage({ type: 'error', text: 'Please select an NI category!' });
      return false;
    }

    if (!niBandFormData.name.trim()) {
      setMessage({ type: 'error', text: 'Band name is required!' });
      return false;
    }

    if (!niBandFormData.from_amount) {
      setMessage({ type: 'error', text: 'From amount is required!' });
      return false;
    }

    if (!niBandFormData.to_amount) {
      setMessage({ type: 'error', text: 'To amount is required!' });
      return false;
    }

    if (parseFloat(niBandFormData.to_amount) <= parseFloat(niBandFormData.from_amount)) {
      setMessage({ type: 'error', text: 'To amount must be greater than from amount!' });
      return false;
    }

    if (!niBandFormData.employee_rate) {
      setMessage({ type: 'error', text: 'Employee rate is required!' });
      return false;
    }

    if (parseFloat(niBandFormData.employee_rate) < 0 || parseFloat(niBandFormData.employee_rate) > 100) {
      setMessage({ type: 'error', text: 'Employee rate must be between 0 and 100!' });
      return false;
    }

    if (!niBandFormData.employer_rate) {
      setMessage({ type: 'error', text: 'Employer rate is required!' });
      return false;
    }

    if (parseFloat(niBandFormData.employer_rate) < 0 || parseFloat(niBandFormData.employer_rate) > 100) {
      setMessage({ type: 'error', text: 'Employer rate must be between 0 and 100!' });
      return false;
    }

    return true;
  };

  // Submit Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        is_active: formData.is_active
      };

      if (editingCategory) {
        submitData.id = editingCategory.id;
      }

      const response = await api.post('/admin/calculator/ni-category/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `NI category ${editingCategory ? 'updated' : 'added'} successfully!`
        });

        await fetchCategories();
        setShowForm(false);
        setEditingCategory(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save NI category'
        });
      }
    } catch (error) {
      console.error('Error saving NI category:', error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setMessage({
          type: 'error',
          text: `Validation Error: ${errorMessages}`
        });
      } else if (error.response?.data?.message) {
        setMessage({
          type: 'error',
          text: error.response.data.message
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

  const handleNiBandSubmit = async (e) => {
    e.preventDefault();

    if (!validateNiBandForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        tax_year_id: parseInt(niBandFormData.tax_year_id),
        ni_category_id: parseInt(niBandFormData.ni_category_id),
        name: niBandFormData.name.trim(),
        from_amount: parseFloat(niBandFormData.from_amount),
        to_amount: parseFloat(niBandFormData.to_amount),
        employee_rate: parseFloat(niBandFormData.employee_rate),
        employer_rate: parseFloat(niBandFormData.employer_rate),
        is_active: niBandFormData.is_active
      };

      if (editingNiBand) {
        submitData.id = editingNiBand.id;
      }

      const response = await api.post('/admin/calculator/ni-band/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `NI band ${editingNiBand ? 'updated' : 'added'} successfully!`
        });

        await fetchNiBands();
        setShowNiBandForm(false);
        setEditingNiBand(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save NI band'
        });
      }
    } catch (error) {
      console.error('Error saving NI band:', error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(', ');
        setMessage({
          type: 'error',
          text: `Validation Error: ${errorMessages}`
        });
      } else if (error.response?.data?.message) {
        setMessage({
          type: 'error',
          text: error.response.data.message
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
    setShowNiBandForm(false);
    setEditingCategory(null);
    setEditingNiBand(null);
    setMessage({ type: '', text: '' });
  };

  // Filter functions
  const filteredCategories = categories.filter((category) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      category.code.toLowerCase().includes(searchLower) ||
      category.description.toLowerCase().includes(searchLower)
    );
  });

  const filteredNiBands = niBands.filter((band) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      band.name.toLowerCase().includes(searchLower) ||
      band.tax_year?.name.toLowerCase().includes(searchLower) ||
      band.category?.code.toLowerCase().includes(searchLower)
    );
  });

  const getCategoryDescription = (code) => {
    const descriptions = {
      'A': 'Standard Employee (most common)',
      'B': 'Married Woman\'s Reduced Rate',
      'C': 'Employees over State Pension age',
      'J': 'Employees who can defer National Insurance',
      'M': 'Employees under 21',
      'Z': 'Employees under 21 (deferred)',
      'H': 'Apprentices under 25',
    };
    return descriptions[code] || '';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatRate = (rate) => {
    return `${parseFloat(rate || 0).toFixed(1)}%`;
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Manage NI Categories & Bands
              </h2>
              <p className="text-sm text-gray-600">Manage National Insurance categories and bands for UK Salary Calculator</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
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
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Manage NI Categories & Bands
            </h2>
            <p className="text-sm text-gray-600">Manage National Insurance categories and bands for UK Salary Calculator</p>
          </div>
          {!showForm && !showNiBandForm && (
            <div className="flex gap-2">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add NI Category
              </button>
              <button
                onClick={handleAddNiBand}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add NI Band
              </button>
            </div>
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

        {/* Category Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NI Category Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., A"
                  maxLength="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase text-center text-xl font-bold"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g., Standard Employee"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Common NI Categories:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div><span className="font-mono font-bold text-blue-600">A</span> - Standard Employee</div>
                    <div><span className="font-mono font-bold text-blue-600">B</span> - Married Woman's Reduced Rate</div>
                    <div><span className="font-mono font-bold text-blue-600">C</span> - Over State Pension age</div>
                    <div><span className="font-mono font-bold text-blue-600">J</span> - Can defer NI</div>
                    <div><span className="font-mono font-bold text-blue-600">M</span> - Under 21</div>
                    <div><span className="font-mono font-bold text-blue-600">Z</span> - Under 21 (deferred)</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

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
                    {editingCategory ? 'Update Category' : 'Add Category'}
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
        )}

        {/* NI Band Form */}
        {showNiBandForm && (
          <form onSubmit={handleNiBandSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Year *
                </label>
                <select
                  name="tax_year_id"
                  value={niBandFormData.tax_year_id}
                  onChange={handleNiBandChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                >
                  <option value="">Select a tax year</option>
                  {taxYears.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.name} - {year.region?.name || ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NI Category *
                </label>
                <select
                  name="ni_category_id"
                  value={niBandFormData.ni_category_id}
                  onChange={handleNiBandChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                >
                  <option value="">Select an NI category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.code} - {category.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Band Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={niBandFormData.name}
                  onChange={handleNiBandChange}
                  placeholder="e.g., Primary Threshold"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Amount (£) *
                </label>
                <input
                  type="number"
                  name="from_amount"
                  value={niBandFormData.from_amount}
                  onChange={handleNiBandChange}
                  placeholder="e.g., 12570"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Amount (£) *
                </label>
                <input
                  type="number"
                  name="to_amount"
                  value={niBandFormData.to_amount}
                  onChange={handleNiBandChange}
                  placeholder="e.g., 50270"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Rate (%) *
                </label>
                <input
                  type="number"
                  name="employee_rate"
                  value={niBandFormData.employee_rate}
                  onChange={handleNiBandChange}
                  placeholder="e.g., 8"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employer Rate (%) *
                </label>
                <input
                  type="number"
                  name="employer_rate"
                  value={niBandFormData.employer_rate}
                  onChange={handleNiBandChange}
                  placeholder="e.g., 13.8"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={niBandFormData.is_active}
                    onChange={handleNiBandChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {editingNiBand ? 'Update NI Band' : 'Add NI Band'}
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
        )}

        {/* List View */}
        {!showForm && !showNiBandForm && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'categories'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                NI Categories
              </button>
              <button
                onClick={() => setActiveTab('bands')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'bands'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart className="w-4 h-4 inline mr-2" />
                NI Bands
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'categories' ? 'NI categories' : 'NI bands'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'categories' ? (
              // Categories Table
              filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {categories.length === 0 ? 'No NI categories added yet' : 'No categories match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredCategories.map((category) => (
                          <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-lg">
                                {category.code}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                              <div>
                                {category.description}
                                <span className="block text-xs text-gray-400 mt-0.5">
                                  {getCategoryDescription(category.code)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {category.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {category.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(category)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(category.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredCategories.length} of {categories.length} NI categories
                  </div>
                </>
              )
            ) : (
              // NI Bands Table
              filteredNiBands.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {niBands.length === 0 ? 'No NI bands added yet' : 'No bands match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax Year</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From - To</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rates</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredNiBands.map((band) => (
                          <tr key={band.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{band.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{band.tax_year?.name || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {band.category?.code || '-'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {formatCurrency(band.from_amount)} - {formatCurrency(band.to_amount)}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <div>Employee: {formatRate(band.employee_rate)}</div>
                              <div>Employer: {formatRate(band.employer_rate)}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                band.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {band.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {band.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditNiBand(band)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteNiBand(band.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Showing {filteredNiBands.length} of {niBands.length} NI bands
                  </div>
                </>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageNationalInsuranceCategory;