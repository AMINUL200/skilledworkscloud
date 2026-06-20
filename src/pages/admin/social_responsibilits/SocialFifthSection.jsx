import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, Heart, BookOpen, MoveUp, MoveDown } from 'lucide-react';

const SocialFifthSection = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    title_meta: '',
    description: '',
    desc_meta: '',
    position: 0,
    heading: '',
    desc2: '',
    status: 1
  });

  // Fetch all programs on component mount
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      const response = await api.get('/admin/sr-fifth-section-list');

      if (response.data.status && response.data.data) {
        // Sort by position
        const sortedData = response.data.data.sort((a, b) => a.position - b.position);
        setPrograms(sortedData);
      }
    } catch (error) {
      console.error('Error fetching SR fifth section:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch programs'
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

  const handleAddNew = () => {
    setEditingProgram(null);
    setFormData({
      title: '',
      title_meta: '',
      description: '',
      desc_meta: '',
      position: programs.length,
      heading: '',
      desc2: '',
      status: 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEdit = (program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title || '',
      title_meta: program.title_meta || '',
      description: program.description || '',
      desc_meta: program.desc_meta || '',
      position: program.position || 0,
      heading: program.heading || '',
      desc2: program.desc2 || '',
      status: program.status !== undefined ? program.status : 1
    });
    setShowForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sr-fifth-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Program deleted successfully!'
        });
        await fetchPrograms();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete program'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    
    const updatedPrograms = [...programs];
    const temp = updatedPrograms[index];
    updatedPrograms[index] = updatedPrograms[index - 1];
    updatedPrograms[index - 1] = temp;
    
    // Update positions
    updatedPrograms.forEach((program, idx) => {
      program.position = idx;
    });
    
    setPrograms(updatedPrograms);
    await updatePositions(updatedPrograms);
  };

  const handleMoveDown = async (index) => {
    if (index === programs.length - 1) return;
    
    const updatedPrograms = [...programs];
    const temp = updatedPrograms[index];
    updatedPrograms[index] = updatedPrograms[index + 1];
    updatedPrograms[index + 1] = temp;
    
    // Update positions
    updatedPrograms.forEach((program, idx) => {
      program.position = idx;
    });
    
    setPrograms(updatedPrograms);
    await updatePositions(updatedPrograms);
  };

  const updatePositions = async (updatedPrograms) => {
    try {
      // Send position updates to the server
      for (const program of updatedPrograms) {
        const submitData = new FormData();
        submitData.append('position', program.position);
        submitData.append('_method', 'PUT');
        
        await api.post(`/admin/sr-fifth-section/${program.id}`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setMessage({
        type: 'success',
        text: 'Positions updated successfully!'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating positions:', error);
      setMessage({
        type: 'error',
        text: 'Failed to update positions. Please try again.'
      });
      // Refresh to get correct order
      await fetchPrograms();
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

    if (!formData.heading) {
      setMessage({ type: 'error', text: 'Heading is required!' });
      return false;
    }

    if (!formData.desc2) {
      setMessage({ type: 'error', text: 'Secondary Description is required!' });
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
      if (editingProgram) {
        // Update existing program - pass id in the URL
        // submitData.append('_method', 'PUT');
        submitData.append('id', editingProgram.id); // Append ID to form data for update
        response = await api.post(`/admin/sr-fifth-section/save`, submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new program
        response = await api.post('/admin/sr-fifth-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Program ${editingProgram ? 'updated' : 'added'} successfully!`
        });

        await fetchPrograms();
        setShowForm(false);
        setEditingProgram(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save program'
        });
      }
    } catch (error) {
      console.error('Error saving program:', error);

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
    setEditingProgram(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Social Responsibility Section: (5) 
              </h2>
              <p className="text-sm text-gray-600">Manage programs and initiatives</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading programs...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Social Responsibility Section: (5)
            </h2>
            <p className="text-sm text-gray-600">Manage programs and initiatives</p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Program
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
                  placeholder="e.g., Education Programs"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.title.length}
                </p>
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
                  placeholder="Meta title for this program"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  placeholder="Enter program description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.description.length}
                </p>
              </div>

              {/* Description Meta */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description Meta
                </label>
                <input
                  type="text"
                  name="desc_meta"
                  value={formData.desc_meta}
                  onChange={handleChange}
                  placeholder="Meta description for this program"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="number"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={saving}
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Order of display (0 = first)</p>
              </div>

              {/* Heading */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading *
                </label>
                <input
                  type="text"
                  name="heading"
                  value={formData.heading}
                  onChange={handleChange}
                  placeholder="e.g., Why Education Matters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.heading.length}
                </p>
              </div>

              {/* Secondary Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Description *
                </label>
                <textarea
                  name="desc2"
                  value={formData.desc2}
                  onChange={handleChange}
                  placeholder="Enter secondary description"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Characters: {formData.desc2.length}
                </p>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">When inactive, this program won't be displayed on the website</p>
              </div>
            </div>

            {/* Action Buttons */}
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
                    {editingProgram ? 'Update Program' : 'Add Program'}
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
          /* Programs List */
          <>
            {programs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No programs added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Your First Program
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {programs.map((program, index) => (
                  <div
                    key={program.id}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Heart className="w-5 h-5 text-green-500" />
                          <span className="text-xs text-gray-500">
                            Position: {program.position}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            program.status === 1
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {program.status === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {program.title}
                        </h3>
                        <p className="text-gray-600 mt-2">{program.description}</p>
                        
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <h4 className="text-sm font-medium text-gray-700">{program.heading}</h4>
                          <p className="text-sm text-gray-600 mt-1">{program.desc2}</p>
                        </div>
                        
                        <p className="text-xs text-gray-400 mt-2">
                          Updated: {new Date(program.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(program)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(program.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className={`p-2 rounded-md transition-colors ${
                              index === 0
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-blue-600 hover:bg-blue-50'
                            }`}
                            title="Move Up"
                          >
                            <MoveUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveDown(index)}
                            disabled={index === programs.length - 1}
                            className={`p-2 rounded-md transition-colors ${
                              index === programs.length - 1
                                ? 'text-gray-300 cursor-not-allowed'
                                : 'text-blue-600 hover:bg-blue-50'
                            }`}
                            title="Move Down"
                          >
                            <MoveDown className="w-4 h-4" />
                          </button>
                        </div>
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

export default SocialFifthSection;