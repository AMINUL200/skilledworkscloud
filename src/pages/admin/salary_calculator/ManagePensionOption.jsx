import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { 
  Save, Plus, Edit, Trash2, X, 
  CheckCircle, XCircle, Search,
  PiggyBank, Percent, DollarSign, Users
} from 'lucide-react';

const ManagePensionOption = () => {
  const [pensionOptions, setPensionOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingOption, setEditingOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    employee_rate: '',
    employer_rate: '',
    is_percentage: true,
    is_active: true
  });

  // Fetch pension options on component mount
  useEffect(() => {
    fetchPensionOptions();
  }, []);

  const fetchPensionOptions = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/calculator/pension-option/list');

      if (response.data.status && response.data.data) {
        setPensionOptions(response.data.data);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to fetch pension options'
        });
      }
    } catch (error) {
      console.error('Error fetching pension options:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch pension options'
      });
    } finally {
      setFetching(false);
    }
  };

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

  const handleAddNew = () => {
    setEditingOption(null);
    setFormData({
      name: '',
      code: '',
      employee_rate: '',
      employer_rate: '',
      is_percentage: true,
      is_active: true
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (option) => {
    setEditingOption(option);
    setFormData({
      name: option.name || '',
      code: option.code || '',
      employee_rate: option.employee_rate || '',
      employer_rate: option.employer_rate || '',
      is_percentage: option.is_percentage !== undefined ? option.is_percentage : true,
      is_active: option.is_active !== undefined ? option.is_active : true
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this pension option?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/pension-option/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Pension option deleted successfully!'
        });
        await fetchPensionOptions();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete pension option'
        });
      }
    } catch (error) {
      console.error('Error deleting pension option:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete pension option'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Pension option name is required!' });
      return false;
    }

    if (!formData.code.trim()) {
      setMessage({ type: 'error', text: 'Pension option code is required!' });
      return false;
    }

    if (formData.code.length > 2) {
      setMessage({ type: 'error', text: 'Pension code must be 2 characters!' });
      return false;
    }

    if (!formData.employee_rate || parseFloat(formData.employee_rate) < 0) {
      setMessage({ type: 'error', text: 'Please enter a valid employee rate!' });
      return false;
    }

    if (!formData.employer_rate || parseFloat(formData.employer_rate) < 0) {
      setMessage({ type: 'error', text: 'Please enter a valid employer rate!' });
      return false;
    }

    // If percentage, rates should be between 0 and 100
    if (formData.is_percentage) {
      if (parseFloat(formData.employee_rate) > 100) {
        setMessage({ type: 'error', text: 'Employee rate cannot exceed 100%!' });
        return false;
      }
      if (parseFloat(formData.employer_rate) > 100) {
        setMessage({ type: 'error', text: 'Employer rate cannot exceed 100%!' });
        return false;
      }
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
        employee_rate: parseFloat(formData.employee_rate),
        employer_rate: parseFloat(formData.employer_rate),
        is_percentage: formData.is_percentage,
        is_active: formData.is_active
      };

      if (editingOption) {
        submitData.id = editingOption.id;
      }

      const response = await api.post('/admin/calculator/pension-option/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Pension option ${editingOption ? 'updated' : 'added'} successfully!`
        });

        await fetchPensionOptions();
        setShowForm(false);
        setEditingOption(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save pension option'
        });
      }
    } catch (error) {
      console.error('Error saving pension option:', error);

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
    setEditingOption(null);
    setMessage({ type: '', text: '' });
  };

  // Filter pension options based on search
  const filteredOptions = pensionOptions.filter((option) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      option.name.toLowerCase().includes(searchLower) ||
      option.code.toLowerCase().includes(searchLower)
    );
  });

  // Get pension option description
  const getOptionDescription = (code) => {
    const descriptions = {
      'AE': 'Auto-Enrolment - UK government mandated workplace pension',
      'PE': 'Personal Pension - Private pension scheme',
      'SS': 'Salary Sacrifice - Employee sacrifices salary for pension',
      'RE': 'Relief at Source - Tax relief applied at source',
      'EM': 'Employer - Employer contributes to employee pension',
    };
    return descriptions[code] || '';
  };

  const formatRate = (rate, isPercentage) => {
    if (isPercentage) {
      return `${parseFloat(rate || 0).toFixed(1)}%`;
    }
    return `£${parseFloat(rate || 0).toFixed(2)}`;
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-blue-600" />
                Manage Pension Options
              </h2>
              <p className="text-sm text-gray-600">Manage pension options for UK Salary Calculator</p>
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
              <PiggyBank className="w-5 h-5 text-blue-600" />
              Manage Pension Options
            </h2>
            <p className="text-sm text-gray-600">Manage pension options for UK Salary Calculator</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Pension Option
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
              {/* Pension Option Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pension Option Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Auto Enrolment"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Pension Option Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pension Option Code *
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g., AE"
                  maxLength="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase text-center font-bold"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">2 letter code (e.g., AE, PE, SS)</p>
              </div>

              {/* Employee Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Rate *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="employee_rate"
                    value={formData.employee_rate}
                    onChange={handleChange}
                    placeholder={formData.is_percentage ? "e.g., 5" : "e.g., 50"}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-8"
                    required
                    disabled={saving}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                    {formData.is_percentage ? '%' : '£'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.is_percentage ? 'Percentage of salary' : 'Fixed amount'}
                </p>
              </div>

              {/* Employer Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employer Rate *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="employer_rate"
                    value={formData.employer_rate}
                    onChange={handleChange}
                    placeholder={formData.is_percentage ? "e.g., 3" : "e.g., 30"}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-8"
                    required
                    disabled={saving}
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                    {formData.is_percentage ? '%' : '£'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.is_percentage ? 'Percentage of salary' : 'Fixed amount'}
                </p>
              </div>

              {/* Rate Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate Type
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="is_percentage"
                      value="true"
                      checked={formData.is_percentage === true}
                      onChange={() => setFormData(prev => ({ ...prev, is_percentage: true }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={saving}
                    />
                    Percentage (%)
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="is_percentage"
                      value="false"
                      checked={formData.is_percentage === false}
                      onChange={() => setFormData(prev => ({ ...prev, is_percentage: false }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      disabled={saving}
                    />
                    Fixed Amount (£)
                  </label>
                </div>
              </div>

              {/* Common Pension Options Reference */}
              <div className="md:col-span-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">Common Pension Options:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div><span className="font-mono font-bold text-blue-600">AE</span> - Auto-Enrolment</div>
                    <div><span className="font-mono font-bold text-blue-600">PE</span> - Personal Pension</div>
                    <div><span className="font-mono font-bold text-blue-600">SS</span> - Salary Sacrifice</div>
                    <div><span className="font-mono font-bold text-blue-600">RE</span> - Relief at Source</div>
                    <div><span className="font-mono font-bold text-blue-600">EM</span> - Employer</div>
                  </div>
                </div>
              </div>

              {/* Status */}
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
                <p className="text-xs text-gray-500 mt-1">When inactive, this pension option won't be displayed</p>
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
                    {editingOption ? 'Update Option' : 'Add Option'}
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
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pension options by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {filteredOptions.length === 0 ? (
              <div className="text-center py-12">
                <PiggyBank className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {pensionOptions.length === 0 ? 'No pension options added yet' : 'No options match your search'}
                </p>
                {pensionOptions.length === 0 && (
                  <button
                    onClick={handleAddNew}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Pension Option
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Employee Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Employer Rate
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredOptions.map((option) => (
                        <tr key={option.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-medium text-gray-900">{option.name}</span>
                              <span className="block text-xs text-gray-400 mt-0.5">
                                {getOptionDescription(option.code)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                              {option.code}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">
                              {formatRate(option.employee_rate, option.is_percentage)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="font-semibold text-green-600">
                              {formatRate(option.employer_rate, option.is_percentage)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              option.is_percentage
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {option.is_percentage ? 'Percentage' : 'Fixed Amount'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              option.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {option.is_active ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3" />
                                  Inactive
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(option)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(option.id)}
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

                {/* Count */}
                <div className="mt-4 text-sm text-gray-500">
                  Showing {filteredOptions.length} of {pensionOptions.length} pension options
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManagePensionOption;