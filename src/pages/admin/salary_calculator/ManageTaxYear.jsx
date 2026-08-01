import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { 
  Save, Plus, Edit, Trash2, X, Calendar, 
  CheckCircle, XCircle, Search,
  ChevronDown, ChevronUp, Code,
  DollarSign, FileText
} from 'lucide-react';

const ManageTaxYear = () => {
  const [taxYears, setTaxYears] = useState([]);
  const [taxCodes, setTaxCodes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [showTaxCodeForm, setShowTaxCodeForm] = useState(false);
  const [editingTaxYear, setEditingTaxYear] = useState(null);
  const [editingTaxCode, setEditingTaxCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('taxYears'); // 'taxYears' | 'taxCodes'
  
  const [formData, setFormData] = useState({
    region_id: '',
    name: '',
    start_date: '',
    end_date: '',
    is_active: true
  });

  const [taxCodeFormData, setTaxCodeFormData] = useState({
    tax_year_id: '',
    code: '',
    personal_allowance: '',
    description: '',
    is_active: true
  });

  // Fetch regions, tax years, and tax codes on component mount
  useEffect(() => {
    fetchRegions();
    fetchTaxYears();
    fetchTaxCodes();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await api.get('/admin/calculator/region/list');
      if (response.data.status && response.data.data) {
        setRegions(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const fetchTaxYears = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/calculator/tax-year/list');

      if (response.data.status && response.data.data) {
        setTaxYears(response.data.data);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to fetch tax years'
        });
      }
    } catch (error) {
      console.error('Error fetching tax years:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch tax years'
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchTaxCodes = async () => {
    try {
      const response = await api.get('/admin/calculator/tax-code/list');
      if (response.data.status && response.data.data) {
        setTaxCodes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tax codes:', error);
    }
  };

  // Tax Year CRUD
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'start_date' && !formData.name) {
      const date = new Date(value);
      const year = date.getFullYear();
      const nextYear = year + 1;
      setFormData(prev => ({
        ...prev,
        start_date: value,
        name: `${year}/${nextYear}`
      }));
    }

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleTaxCodeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaxCodeFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddNew = () => {
    setEditingTaxYear(null);
    setFormData({
      region_id: '',
      name: '',
      start_date: '',
      end_date: '',
      is_active: true
    });
    setShowForm(true);
    setShowTaxCodeForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleAddTaxCode = (taxYearId = null) => {
    setEditingTaxCode(null);
    setTaxCodeFormData({
      tax_year_id: taxYearId || '',
      code: '',
      personal_allowance: '',
      description: '',
      is_active: true
    });
    setShowTaxCodeForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (taxYear) => {
    setEditingTaxYear(taxYear);
    setFormData({
      region_id: taxYear.region_id || '',
      name: taxYear.name || '',
      start_date: taxYear.start_date ? taxYear.start_date.split('T')[0] : '',
      end_date: taxYear.end_date ? taxYear.end_date.split('T')[0] : '',
      is_active: taxYear.is_active !== undefined ? taxYear.is_active : true
    });
    setShowForm(true);
    setShowTaxCodeForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditTaxCode = (taxCode) => {
    setEditingTaxCode(taxCode);
    setTaxCodeFormData({
      tax_year_id: taxCode.tax_year_id || '',
      code: taxCode.code || '',
      personal_allowance: taxCode.personal_allowance || '',
      description: taxCode.description || '',
      is_active: taxCode.is_active !== undefined ? taxCode.is_active : true
    });
    setShowTaxCodeForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tax year?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/tax-year/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Tax year deleted successfully!'
        });
        await fetchTaxYears();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete tax year'
        });
      }
    } catch (error) {
      console.error('Error deleting tax year:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete tax year'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTaxCode = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tax code?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/tax-code/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Tax code deleted successfully!'
        });
        await fetchTaxCodes();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete tax code'
        });
      }
    } catch (error) {
      console.error('Error deleting tax code:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete tax code'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.region_id) {
      setMessage({ type: 'error', text: 'Please select a region!' });
      return false;
    }

    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Tax year name is required!' });
      return false;
    }

    if (!formData.start_date) {
      setMessage({ type: 'error', text: 'Start date is required!' });
      return false;
    }

    if (!formData.end_date) {
      setMessage({ type: 'error', text: 'End date is required!' });
      return false;
    }

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      setMessage({ type: 'error', text: 'End date must be after start date!' });
      return false;
    }

    return true;
  };

  const validateTaxCodeForm = () => {
    if (!taxCodeFormData.tax_year_id) {
      setMessage({ type: 'error', text: 'Please select a tax year!' });
      return false;
    }

    if (!taxCodeFormData.code.trim()) {
      setMessage({ type: 'error', text: 'Tax code is required!' });
      return false;
    }

    if (!taxCodeFormData.personal_allowance) {
      setMessage({ type: 'error', text: 'Personal allowance is required!' });
      return false;
    }

    if (parseFloat(taxCodeFormData.personal_allowance) < 0) {
      setMessage({ type: 'error', text: 'Personal allowance must be a positive number!' });
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
      const submitData = {
        region_id: parseInt(formData.region_id),
        name: formData.name.trim(),
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active
      };

      if (editingTaxYear) {
        submitData.id = editingTaxYear.id;
      }

      const response = await api.post('/admin/calculator/tax-year/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Tax year ${editingTaxYear ? 'updated' : 'added'} successfully!`
        });

        await fetchTaxYears();
        setShowForm(false);
        setEditingTaxYear(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save tax year'
        });
      }
    } catch (error) {
      console.error('Error saving tax year:', error);

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

  const handleTaxCodeSubmit = async (e) => {
    e.preventDefault();

    if (!validateTaxCodeForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        tax_year_id: parseInt(taxCodeFormData.tax_year_id),
        code: taxCodeFormData.code.trim().toUpperCase(),
        personal_allowance: parseFloat(taxCodeFormData.personal_allowance),
        description: taxCodeFormData.description.trim() || '',
        is_active: taxCodeFormData.is_active
      };

      if (editingTaxCode) {
        submitData.id = editingTaxCode.id;
      }

      const response = await api.post('/admin/calculator/tax-code/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Tax code ${editingTaxCode ? 'updated' : 'added'} successfully!`
        });

        await fetchTaxCodes();
        setShowTaxCodeForm(false);
        setEditingTaxCode(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save tax code'
        });
      }
    } catch (error) {
      console.error('Error saving tax code:', error);

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
    setShowTaxCodeForm(false);
    setEditingTaxYear(null);
    setEditingTaxCode(null);
    setMessage({ type: '', text: '' });
  };

  // Filter functions
  const filteredTaxYears = taxYears.filter((taxYear) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      taxYear.name.toLowerCase().includes(searchLower) ||
      taxYear.region?.name.toLowerCase().includes(searchLower) ||
      taxYear.region?.code.toLowerCase().includes(searchLower)
    );
  });

  const filteredTaxCodes = taxCodes.filter((taxCode) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      taxCode.code.toLowerCase().includes(searchLower) ||
      taxCode.description.toLowerCase().includes(searchLower) ||
      taxCode.tax_year?.name.toLowerCase().includes(searchLower)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Manage Tax Years & Codes
              </h2>
              <p className="text-sm text-gray-600">Manage tax years and codes for UK Salary Calculator</p>
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
              <Calendar className="w-5 h-5 text-blue-600" />
              Manage Tax Years & Codes
            </h2>
            <p className="text-sm text-gray-600">Manage tax years and codes for UK Salary Calculator</p>
          </div>
          {!showForm && !showTaxCodeForm && (
            <div className="flex gap-2">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tax Year
              </button>
              <button
                onClick={() => handleAddTaxCode()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Tax Code
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

        {/* Tax Year Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  name="region_id"
                  value={formData.region_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                >
                  <option value="">Select a region</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name} ({region.code}) - {region.country?.name || ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Year Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., 2024/2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Format: YYYY/YYYY (e.g., 2024/2025)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
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
                    {editingTaxYear ? 'Update Tax Year' : 'Add Tax Year'}
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

        {/* Tax Code Form */}
        {showTaxCodeForm && (
          <form onSubmit={handleTaxCodeSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Year *
                </label>
                <select
                  name="tax_year_id"
                  value={taxCodeFormData.tax_year_id}
                  onChange={handleTaxCodeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                >
                  <option value="">Select a tax year</option>
                  {taxYears.map((taxYear) => (
                    <option key={taxYear.id} value={taxYear.id}>
                      {taxYear.name} - {taxYear.region?.name || ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={taxCodeFormData.code}
                  onChange={handleTaxCodeChange}
                  placeholder="e.g., 1257L"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Allowance (£) *
                </label>
                <input
                  type="number"
                  name="personal_allowance"
                  value={taxCodeFormData.personal_allowance}
                  onChange={handleTaxCodeChange}
                  placeholder="e.g., 12570"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={taxCodeFormData.description}
                  onChange={handleTaxCodeChange}
                  placeholder="e.g., Standard, Emergency, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={taxCodeFormData.is_active}
                    onChange={handleTaxCodeChange}
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
                    {editingTaxCode ? 'Update Tax Code' : 'Add Tax Code'}
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
        {!showForm && !showTaxCodeForm && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('taxYears')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'taxYears'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Tax Years
              </button>
              <button
                onClick={() => setActiveTab('taxCodes')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'taxCodes'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Tax Codes
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'taxYears' ? 'tax years' : 'tax codes'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'taxYears' ? (
              // Tax Years Table
              filteredTaxYears.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {taxYears.length === 0 ? 'No tax years added yet' : 'No tax years match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Region</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredTaxYears.map((taxYear) => (
                          <tr key={taxYear.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{taxYear.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {taxYear.region?.name || '-'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{formatDate(taxYear.start_date)}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{formatDate(taxYear.end_date)}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                taxYear.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {taxYear.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {taxYear.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(taxYear)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(taxYear.id)}
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
                    Showing {filteredTaxYears.length} of {taxYears.length} tax years
                  </div>
                </>
              )
            ) : (
              // Tax Codes Table
              filteredTaxCodes.length === 0 ? (
                <div className="text-center py-12">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {taxCodes.length === 0 ? 'No tax codes added yet' : 'No tax codes match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax Year</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Personal Allowance</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredTaxCodes.map((taxCode) => (
                          <tr key={taxCode.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {taxCode.code}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{taxCode.tax_year?.name || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              £{parseFloat(taxCode.personal_allowance).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{taxCode.description || '-'}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                taxCode.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {taxCode.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {taxCode.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditTaxCode(taxCode)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteTaxCode(taxCode.id)}
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
                    Showing {filteredTaxCodes.length} of {taxCodes.length} tax codes
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

export default ManageTaxYear;