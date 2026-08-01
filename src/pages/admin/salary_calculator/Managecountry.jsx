import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { 
  Save, Plus, Edit, Trash2, X, Globe, 
  CheckCircle, XCircle, Eye, EyeOff,
  Search, ChevronDown, ChevronUp, MapPin,
  ChevronRight
} from 'lucide-react';

const ManageCountry = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [showRegionForm, setShowRegionForm] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [editingRegion, setEditingRegion] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('countries'); // 'countries' | 'regions'
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    iso3: '',
    currency: '',
    currency_symbol: '',
    is_active: true
  });

  const [regionFormData, setRegionFormData] = useState({
    country_id: '',
    name: '',
    code: '',
    is_active: true
  });

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries();
    fetchRegions();
  }, []);

  const fetchCountries = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/calculator/country/list');

      if (response.data.status && response.data.data) {
        setCountries(response.data.data);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to fetch countries'
        });
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch countries'
      });
    } finally {
      setFetching(false);
    }
  };

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

  // Country CRUD
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

  const handleRegionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegionFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddNew = () => {
    setEditingCountry(null);
    setFormData({
      name: '',
      code: '',
      iso3: '',
      currency: '',
      currency_symbol: '',
      is_active: true
    });
    setShowForm(true);
    setShowRegionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleAddRegion = (countryId = null) => {
    setEditingRegion(null);
    setRegionFormData({
      country_id: countryId || '',
      name: '',
      code: '',
      is_active: true
    });
    setShowRegionForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (country) => {
    setEditingCountry(country);
    setFormData({
      name: country.name || '',
      code: country.code || '',
      iso3: country.iso3 || '',
      currency: country.currency || '',
      currency_symbol: country.currency_symbol || '',
      is_active: country.is_active !== undefined ? country.is_active : true
    });
    setShowForm(true);
    setShowRegionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditRegion = (region) => {
    setEditingRegion(region);
    setRegionFormData({
      country_id: region.country_id || '',
      name: region.name || '',
      code: region.code || '',
      is_active: region.is_active !== undefined ? region.is_active : true
    });
    setShowRegionForm(true);
    setShowForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this country?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/country/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Country deleted successfully!'
        });
        await fetchCountries();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete country'
        });
      }
    } catch (error) {
      console.error('Error deleting country:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete country'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRegion = async (id) => {
    if (!window.confirm('Are you sure you want to delete this region?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/region/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Region deleted successfully!'
        });
        await fetchRegions();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete region'
        });
      }
    } catch (error) {
      console.error('Error deleting region:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete region'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Country name is required!' });
      return false;
    }

    if (!formData.code.trim()) {
      setMessage({ type: 'error', text: 'Country code is required!' });
      return false;
    }

    if (formData.code.length > 2) {
      setMessage({ type: 'error', text: 'Country code must be 2 characters!' });
      return false;
    }

    if (!formData.currency.trim()) {
      setMessage({ type: 'error', text: 'Currency is required!' });
      return false;
    }

    return true;
  };

  const validateRegionForm = () => {
    if (!regionFormData.country_id) {
      setMessage({ type: 'error', text: 'Please select a country!' });
      return false;
    }

    if (!regionFormData.name.trim()) {
      setMessage({ type: 'error', text: 'Region name is required!' });
      return false;
    }

    if (!regionFormData.code.trim()) {
      setMessage({ type: 'error', text: 'Region code is required!' });
      return false;
    }

    if (regionFormData.code.length > 3) {
      setMessage({ type: 'error', text: 'Region code must be 3 characters!' });
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
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        iso3: formData.iso3.trim().toUpperCase() || '',
        currency: formData.currency.trim().toUpperCase(),
        currency_symbol: formData.currency_symbol || '',
        is_active: formData.is_active
      };

      if (editingCountry) {
        submitData.id = editingCountry.id;
      }

      const response = await api.post('/admin/calculator/country/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Country ${editingCountry ? 'updated' : 'added'} successfully!`
        });

        await fetchCountries();
        setShowForm(false);
        setEditingCountry(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save country'
        });
      }
    } catch (error) {
      console.error('Error saving country:', error);

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

  const handleRegionSubmit = async (e) => {
    e.preventDefault();

    if (!validateRegionForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        country_id: parseInt(regionFormData.country_id),
        name: regionFormData.name.trim(),
        code: regionFormData.code.trim().toUpperCase(),
        is_active: regionFormData.is_active
      };

      if (editingRegion) {
        submitData.id = editingRegion.id;
      }

      const response = await api.post('/admin/calculator/region/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Region ${editingRegion ? 'updated' : 'added'} successfully!`
        });

        await fetchRegions();
        setShowRegionForm(false);
        setEditingRegion(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save region'
        });
      }
    } catch (error) {
      console.error('Error saving region:', error);

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
    setShowRegionForm(false);
    setEditingCountry(null);
    setEditingRegion(null);
    setMessage({ type: '', text: '' });
  };

  // Filter countries based on search
  const filteredCountries = countries.filter((country) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.currency.toLowerCase().includes(searchLower)
    );
  });

  // Filter regions based on search
  const filteredRegions = regions.filter((region) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      region.name.toLowerCase().includes(searchLower) ||
      region.code.toLowerCase().includes(searchLower) ||
      region.country?.name.toLowerCase().includes(searchLower)
    );
  });

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Manage Countries & Regions
              </h2>
              <p className="text-sm text-gray-600">Manage countries and regions for UK Salary Calculator</p>
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
              <Globe className="w-5 h-5 text-blue-600" />
              Manage Countries & Regions
            </h2>
            <p className="text-sm text-gray-600">Manage countries and regions for UK Salary Calculator</p>
          </div>
          {!showForm && !showRegionForm && (
            <div className="flex gap-2">
              <button
                onClick={handleAddNew}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Country
              </button>
              <button
                onClick={() => handleAddRegion()}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Region
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

        {/* Country Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., United Kingdom"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country Code (2 letters) *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., GB"
                  maxLength="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">ISO 3166-1 alpha-2 code</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISO3 Code (3 letters)
                </label>
                <input
                  type="text"
                  name="iso3"
                  value={formData.iso3}
                  onChange={handleChange}
                  placeholder="e.g., GBR"
                  maxLength="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency Code *
                </label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  placeholder="e.g., GBP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  name="currency_symbol"
                  value={formData.currency_symbol}
                  onChange={handleChange}
                  placeholder="e.g., £"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    {editingCountry ? 'Update Country' : 'Add Country'}
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

        {/* Region Form */}
        {showRegionForm && (
          <form onSubmit={handleRegionSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <select
                  name="country_id"
                  value={regionFormData.country_id}
                  onChange={handleRegionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={regionFormData.name}
                  onChange={handleRegionChange}
                  placeholder="e.g., England"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Code (3 letters) *
                </label>
                <input
                  type="text"
                  name="code"
                  value={regionFormData.code}
                  onChange={handleRegionChange}
                  placeholder="e.g., ENG"
                  maxLength="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  required
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={regionFormData.is_active}
                    onChange={handleRegionChange}
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
                    {editingRegion ? 'Update Region' : 'Add Region'}
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
        {!showForm && !showRegionForm && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('countries')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'countries'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Globe className="w-4 h-4 inline mr-2" />
                Countries
              </button>
              <button
                onClick={() => setActiveTab('regions')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'regions'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MapPin className="w-4 h-4 inline mr-2" />
                Regions
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'countries' ? 'countries' : 'regions'} by name, code...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {activeTab === 'countries' ? (
              // Countries Table
              filteredCountries.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {countries.length === 0 ? 'No countries added yet' : 'No countries match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ISO3</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Currency</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Symbol</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredCountries.map((country) => (
                          <tr key={country.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{country.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {country.code}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{country.iso3 || '-'}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{country.currency}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{country.currency_symbol || '-'}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                country.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {country.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {country.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEdit(country)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(country.id)}
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
                    Showing {filteredCountries.length} of {countries.length} countries
                  </div>
                </>
              )
            ) : (
              // Regions Table
              filteredRegions.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {regions.length === 0 ? 'No regions added yet' : 'No regions match your search'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Country</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredRegions.map((region) => (
                          <tr key={region.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{region.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {region.code}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{region.country?.name || '-'}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                region.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {region.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {region.is_active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditRegion(region)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRegion(region.id)}
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
                    Showing {filteredRegions.length} of {regions.length} regions
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

export default ManageCountry;