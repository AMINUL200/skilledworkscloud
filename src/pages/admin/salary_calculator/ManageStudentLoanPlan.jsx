import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { 
  Save, Plus, Edit, Trash2, X, 
  CheckCircle, XCircle, Search,
  GraduationCap, BookOpen, DollarSign
} from 'lucide-react';

const ManageStudentLoanPlan = () => {
  const [loanPlans, setLoanPlans] = useState([]);
  const [taxYears, setTaxYears] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    tax_year_id: '',
    name: '',
    threshold: '',
    rate: '',
    is_active: true
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchTaxYears();
    fetchLoanPlans();
  }, []);

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

  const fetchLoanPlans = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/calculator/student-loan-plan/list');

      if (response.data.status && response.data.data) {
        setLoanPlans(response.data.data);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to fetch student loan plans'
        });
      }
    } catch (error) {
      console.error('Error fetching student loan plans:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch student loan plans'
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
    setEditingPlan(null);
    setFormData({
      tax_year_id: '',
      name: '',
      threshold: '',
      rate: '',
      is_active: true
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      tax_year_id: plan.tax_year_id || '',
      name: plan.name || '',
      threshold: plan.threshold || '',
      rate: plan.rate || '',
      is_active: plan.is_active !== undefined ? plan.is_active : true
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student loan plan?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/calculator/student-loan-plan/delete/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Student loan plan deleted successfully!'
        });
        await fetchLoanPlans();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to delete student loan plan'
        });
      }
    } catch (error) {
      console.error('Error deleting student loan plan:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete student loan plan'
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.tax_year_id) {
      setMessage({ type: 'error', text: 'Please select a tax year!' });
      return false;
    }

    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Plan name is required!' });
      return false;
    }

    if (!formData.threshold || parseFloat(formData.threshold) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid threshold amount!' });
      return false;
    }

    if (!formData.rate || parseFloat(formData.rate) <= 0 || parseFloat(formData.rate) > 100) {
      setMessage({ type: 'error', text: 'Please enter a valid rate between 1 and 100!' });
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
        tax_year_id: parseInt(formData.tax_year_id),
        name: formData.name.trim(),
        threshold: parseFloat(formData.threshold),
        rate: parseFloat(formData.rate),
        is_active: formData.is_active
      };

      if (editingPlan) {
        submitData.id = editingPlan.id;
      }

      const response = await api.post('/admin/calculator/student-loan-plan/save', submitData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Student loan plan ${editingPlan ? 'updated' : 'added'} successfully!`
        });

        await fetchLoanPlans();
        setShowForm(false);
        setEditingPlan(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save student loan plan'
        });
      }
    } catch (error) {
      console.error('Error saving student loan plan:', error);

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
    setEditingPlan(null);
    setMessage({ type: '', text: '' });
  };

  // Filter loan plans based on search
  const filteredPlans = loanPlans.filter((plan) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      plan.name.toLowerCase().includes(searchLower) ||
      plan.tax_year?.name.toLowerCase().includes(searchLower)
    );
  });

  // Get plan description
  const getPlanDescription = (name) => {
    const descriptions = {
      'Plan 1': 'For students who started before 2012',
      'Plan 2': 'For students who started between 2012 and 2023',
      'Plan 4': 'For Scottish students',
      'Plan 5': 'For students who started from August 2023',
      'Postgraduate': 'For postgraduate students (Master\'s and PhD)',
    };
    return descriptions[name] || '';
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
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Manage Student Loan Plans
              </h2>
              <p className="text-sm text-gray-600">Manage student loan plans for UK Salary Calculator</p>
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
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Manage Student Loan Plans
            </h2>
            <p className="text-sm text-gray-600">Manage student loan plans for UK Salary Calculator</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Loan Plan
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
              {/* Tax Year */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Year *
                </label>
                <select
                  name="tax_year_id"
                  value={formData.tax_year_id}
                  onChange={handleChange}
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

              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Plan 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Student Loan Plans Reference */}
              <div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 h-full flex items-center">
                  <div className="text-sm">
                    <p className="font-semibold text-blue-800 mb-1">Common Plans:</p>
                    <div className="space-y-0.5">
                      <div><span className="font-mono font-bold text-blue-600">Plan 1</span> - Pre-2012</div>
                      <div><span className="font-mono font-bold text-blue-600">Plan 2</span> - 2012-2023</div>
                      <div><span className="font-mono font-bold text-blue-600">Plan 4</span> - Scottish</div>
                      <div><span className="font-mono font-bold text-blue-600">Plan 5</span> - Post-2023</div>
                      <div><span className="font-mono font-bold text-blue-600">Postgraduate</span> - Master's/PhD</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threshold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Threshold (£) *
                </label>
                <input
                  type="number"
                  name="threshold"
                  value={formData.threshold}
                  onChange={handleChange}
                  placeholder="e.g., 28470"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Annual income threshold before repayment starts</p>
              </div>

              {/* Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate (%) *
                </label>
                <input
                  type="number"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  placeholder="e.g., 9"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">Percentage of income above threshold</p>
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
                <p className="text-xs text-gray-500 mt-1">When inactive, this student loan plan won't be displayed</p>
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
                    {editingPlan ? 'Update Plan' : 'Add Plan'}
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
                  placeholder="Search loan plans by name or tax year..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {filteredPlans.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {loanPlans.length === 0 ? 'No student loan plans added yet' : 'No plans match your search'}
                </p>
                {loanPlans.length === 0 && (
                  <button
                    onClick={handleAddNew}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add Your First Loan Plan
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
                          Plan Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Tax Year
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Threshold
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rate
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
                      {filteredPlans.map((plan) => (
                        <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-medium text-gray-900">{plan.name}</span>
                              <span className="block text-xs text-gray-400 mt-0.5">
                                {getPlanDescription(plan.name)}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {plan.tax_year?.name || '-'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {formatCurrency(plan.threshold)}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">
                              {formatRate(plan.rate)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              plan.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {plan.is_active ? (
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
                                onClick={() => handleEdit(plan)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(plan.id)}
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
                  Showing {filteredPlans.length} of {loanPlans.length} student loan plans
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageStudentLoanPlan;