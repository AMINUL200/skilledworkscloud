import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/app';
import { Save, Plus, Edit, Trash2, X, FolderOpen, FolderTree, ChevronDown, ChevronRight, Layers } from 'lucide-react';

const ManageServiceCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showForm, setShowForm] = useState(false);
  const [showSubForm, setShowSubForm] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'sections'
  const [formData, setFormData] = useState({
    name: '',
    order: 0,
    status: 1
  });
  const [subFormData, setSubFormData] = useState({
    service_category_id: '',
    name: '',
    order: 0,
    status: 1
  });
  const [sectionFormData, setSectionFormData] = useState({
    service_sub_category_id: '',
    section_name: '',
    section_id: '',
    order_by: 0,
    status: 1
  });

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setFetching(true);
      setMessage({ type: '', text: '' });

      // Fetch categories
      const catResponse = await api.get('/admin/service-category/list');
      
      // Fetch subcategories
      const subResponse = await api.get('/admin/service-sub-category/list');

      // Fetch sections
      const sectionResponse = await api.get('/admin/service-sub-category-section/list');

      if (catResponse.data.status && catResponse.data.data) {
        const sortedData = catResponse.data.data.sort((a, b) => a.order - b.order);
        setCategories(sortedData);
      }

      if (subResponse.data.status && subResponse.data.data) {
        const sortedData = subResponse.data.data.sort((a, b) => a.order - b.order);
        setSubcategories(sortedData);
      }

      if (sectionResponse.data.status && sectionResponse.data.data) {
        const sortedData = sectionResponse.data.data.sort((a, b) => a.order_by - b.order_by);
        setSections(sortedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch data'
      });
    } finally {
      setFetching(false);
    }
  };

  // Get subcategories for a specific category
  const getSubcategoriesForCategory = (categoryId) => {
    return subcategories.filter(sub => sub.service_category_id === categoryId);
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  // Get subcategory name by ID
  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find(sub => sub.id === subcategoryId);
    return subcategory ? subcategory.name : 'N/A';
  };

  // Toggle functions
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const toggleSubcategory = (subcategoryId) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId]
    }));
  };

  // Category CRUD operations
  const handleCategoryChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      order: categories.length,
      status: 1
    });
    setShowForm(true);
    setShowSubForm(false);
    setShowSectionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      order: category.order || 0,
      status: category.status !== undefined ? category.status : 1
    });
    setShowForm(true);
    setShowSubForm(false);
    setShowSectionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteCategory = async (id) => {
    const hasSubs = subcategories.some(sub => sub.service_category_id === id);
    if (hasSubs) {
      setMessage({
        type: 'error',
        text: 'Cannot delete category with subcategories. Please delete subcategories first.'
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/service-category/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Category deleted successfully!'
        });
        await fetchAllData();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete category'
      });
    } finally {
      setLoading(false);
    }
  };

  // Subcategory CRUD operations
  const handleSubChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddSubCategory = (categoryId = null) => {
    setEditingSubCategory(null);
    setSubFormData({
      service_category_id: categoryId || '',
      name: '',
      order: 0,
      status: 1
    });
    setShowSubForm(true);
    setShowForm(false);
    setShowSectionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditSubCategory = (subcategory) => {
    setEditingSubCategory(subcategory);
    setSubFormData({
      service_category_id: subcategory.service_category_id || '',
      name: subcategory.name || '',
      order: subcategory.order || 0,
      status: subcategory.status !== undefined ? subcategory.status : 1
    });
    setShowSubForm(true);
    setShowForm(false);
    setShowSectionForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteSubCategory = async (id) => {
    // Check if subcategory has sections
    const hasSections = sections.some(section => section.service_sub_category_id === id);
    if (hasSections) {
      setMessage({
        type: 'error',
        text: 'Cannot delete subcategory with sections. Please delete sections first.'
      });
      return;
    }

    if (!window.confirm('Are you sure you want to delete this subcategory?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/service-sub-category/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Subcategory deleted successfully!'
        });
        await fetchAllData();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete subcategory'
      });
    } finally {
      setLoading(false);
    }
  };

  // Section CRUD operations
  const handleSectionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSectionFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));

    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const handleAddSection = () => {
    setEditingSection(null);
    setSectionFormData({
      service_sub_category_id: '',
      section_name: '',
      section_id: '',
      order_by: sections.length,
      status: 1
    });
    setShowSectionForm(true);
    setShowForm(false);
    setShowSubForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleEditSection = (section) => {
    setEditingSection(section);
    setSectionFormData({
      service_sub_category_id: section.service_sub_category_id || '',
      section_name: section.section_name || '',
      section_id: section.section_id || '',
      order_by: section.order_by || 0,
      status: section.status !== undefined ? section.status : 1
    });
    setShowSectionForm(true);
    setShowForm(false);
    setShowSubForm(false);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/service-sub-category-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Section deleted successfully!'
        });
        await fetchAllData();
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

  // Reorder functions for sections
  const handleSectionMoveUp = (index) => {
    if (index === 0) return;
    
    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[index - 1]] = 
    [updatedSections[index - 1], updatedSections[index]];
    
    updatedSections.forEach((section, idx) => {
      section.order_by = idx;
    });
    
    setSections(updatedSections);
    updateSectionOrders(updatedSections);
  };

  const handleSectionMoveDown = (index) => {
    if (index === sections.length - 1) return;
    
    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[index + 1]] = 
    [updatedSections[index + 1], updatedSections[index]];
    
    updatedSections.forEach((section, idx) => {
      section.order_by = idx;
    });
    
    setSections(updatedSections);
    updateSectionOrders(updatedSections);
  };

  const updateSectionOrders = async (updatedSections) => {
    try {
      for (const section of updatedSections) {
        const submitData = new FormData();
        submitData.append('id', section.id);
        submitData.append('service_sub_category_id', section.service_sub_category_id);
        submitData.append('section_name', section.section_name);
        submitData.append('section_id', section.section_id);
        submitData.append('order_by', section.order_by);
        submitData.append('status', section.status);
        
        await api.post('/admin/service-sub-category-section/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setMessage({
        type: 'success',
        text: 'Section order updated successfully!'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating section orders:', error);
      await fetchAllData();
    }
  };

  // Reorder functions for categories and subcategories
  const handleMoveUp = (index, type, items) => {
    if (index === 0) return;
    
    const updatedItems = [...items];
    [updatedItems[index], updatedItems[index - 1]] = 
    [updatedItems[index - 1], updatedItems[index]];
    
    updatedItems.forEach((item, idx) => {
      if (type === 'category') item.order = idx;
      else if (type === 'subcategory') item.order = idx;
    });
    
    if (type === 'category') {
      setCategories(updatedItems);
      updateCategoryOrders(updatedItems);
    } else if (type === 'subcategory') {
      setSubcategories(updatedItems);
      updateSubCategoryOrders(updatedItems);
    }
  };

  const handleMoveDown = (index, type, items) => {
    if (index === items.length - 1) return;
    
    const updatedItems = [...items];
    [updatedItems[index], updatedItems[index + 1]] = 
    [updatedItems[index + 1], updatedItems[index]];
    
    updatedItems.forEach((item, idx) => {
      if (type === 'category') item.order = idx;
      else if (type === 'subcategory') item.order = idx;
    });
    
    if (type === 'category') {
      setCategories(updatedItems);
      updateCategoryOrders(updatedItems);
    } else if (type === 'subcategory') {
      setSubcategories(updatedItems);
      updateSubCategoryOrders(updatedItems);
    }
  };

  const updateCategoryOrders = async (updatedCategories) => {
    try {
      for (const category of updatedCategories) {
        const submitData = new FormData();
        submitData.append('id', category.id);
        submitData.append('name', category.name);
        submitData.append('order', category.order);
        submitData.append('status', category.status);
        
        await api.post('/admin/service-category/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setMessage({
        type: 'success',
        text: 'Category order updated successfully!'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating category orders:', error);
      await fetchAllData();
    }
  };

  const updateSubCategoryOrders = async (updatedSubCategories) => {
    try {
      for (const subcategory of updatedSubCategories) {
        const submitData = new FormData();
        submitData.append('id', subcategory.id);
        submitData.append('service_category_id', subcategory.service_category_id);
        submitData.append('name', subcategory.name);
        submitData.append('order', subcategory.order);
        submitData.append('status', subcategory.status);
        
        await api.post('/admin/service-sub-category/save', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setMessage({
        type: 'success',
        text: 'Subcategory order updated successfully!'
      });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Error updating subcategory orders:', error);
      await fetchAllData();
    }
  };

  // Validate forms
  const validateCategoryForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Category name is required!' });
      return false;
    }

    const duplicate = categories.some(cat => 
      cat.name.toLowerCase() === formData.name.toLowerCase() && 
      cat.id !== editingCategory?.id
    );

    if (duplicate) {
      setMessage({ type: 'error', text: 'A category with this name already exists!' });
      return false;
    }

    return true;
  };

  const validateSubCategoryForm = () => {
    if (!subFormData.service_category_id) {
      setMessage({ type: 'error', text: 'Please select a parent category!' });
      return false;
    }

    if (!subFormData.name.trim()) {
      setMessage({ type: 'error', text: 'Subcategory name is required!' });
      return false;
    }

    const duplicate = subcategories.some(sub => 
      sub.name.toLowerCase() === subFormData.name.toLowerCase() && 
      sub.service_category_id === parseInt(subFormData.service_category_id) &&
      sub.id !== editingSubCategory?.id
    );

    if (duplicate) {
      setMessage({ type: 'error', text: 'A subcategory with this name already exists in this category!' });
      return false;
    }

    return true;
  };

  const validateSectionForm = () => {
    if (!sectionFormData.service_sub_category_id) {
      setMessage({ type: 'error', text: 'Please select a parent subcategory!' });
      return false;
    }

    if (!sectionFormData.section_name.trim()) {
      setMessage({ type: 'error', text: 'Section name is required!' });
      return false;
    }

    if (!sectionFormData.section_id.trim()) {
      setMessage({ type: 'error', text: 'Section ID is required!' });
      return false;
    }

    const duplicate = sections.some(section => 
      section.section_name.toLowerCase() === sectionFormData.section_name.toLowerCase() && 
      section.service_sub_category_id === parseInt(sectionFormData.service_sub_category_id) &&
      section.id !== editingSection?.id
    );

    if (duplicate) {
      setMessage({ type: 'error', text: 'A section with this name already exists in this subcategory!' });
      return false;
    }

    return true;
  };

  // Submit handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    if (!validateCategoryForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('order', formData.order);
      submitData.append('status', formData.status);

      if (editingCategory) {
        submitData.append('id', editingCategory.id);
      }

      const response = await api.post('/admin/service-category/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Category ${editingCategory ? 'updated' : 'added'} successfully!`
        });

        await fetchAllData();
        setShowForm(false);
        setEditingCategory(null);

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save category'
        });
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to save. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();

    if (!validateSubCategoryForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('service_category_id', subFormData.service_category_id);
      submitData.append('name', subFormData.name);
      submitData.append('order', subFormData.order);
      submitData.append('status', subFormData.status);

      if (editingSubCategory) {
        submitData.append('id', editingSubCategory.id);
      }

      const response = await api.post('/admin/service-sub-category/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Subcategory ${editingSubCategory ? 'updated' : 'added'} successfully!`
        });

        await fetchAllData();
        setShowSubForm(false);
        setEditingSubCategory(null);

        if (subFormData.service_category_id) {
          setExpandedCategories(prev => ({
            ...prev,
            [subFormData.service_category_id]: true
          }));
        }

        setTimeout(() => {
          setMessage({ type: '', text: '' });
        }, 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save subcategory'
        });
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to save. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();

    if (!validateSectionForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = new FormData();
      submitData.append('service_sub_category_id', sectionFormData.service_sub_category_id);
      submitData.append('section_name', sectionFormData.section_name);
      submitData.append('section_id', sectionFormData.section_id);
      submitData.append('order_by', sectionFormData.order_by);
      submitData.append('status', sectionFormData.status);

      if (editingSection) {
        submitData.append('id', editingSection.id);
      }

      const response = await api.post('/admin/service-sub-category-section/save', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Section ${editingSection ? 'updated' : 'added'} successfully!`
        });

        await fetchAllData();
        setShowSectionForm(false);
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
      setMessage({
        type: 'error',
        text: error.message || 'Failed to save. Please try again.'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setShowSubForm(false);
    setShowSectionForm(false);
    setEditingCategory(null);
    setEditingSubCategory(null);
    setEditingSection(null);
    setMessage({ type: '', text: '' });
  };

  // Render subcategory list for a category
  const renderSubcategories = (categoryId) => {
    const subs = getSubcategoriesForCategory(categoryId);
    
    if (subs.length === 0) {
      return (
        <div className="text-sm text-gray-500 py-2 px-4 italic">
          No subcategories yet
        </div>
      );
    }

    return (
      <div className="ml-8 mt-2 space-y-2">
        {subs.map((sub, index) => {
          const isExpanded = expandedSubcategories[sub.id] || false;
          
          return (
            <div key={sub.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleSubcategory(sub.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  <span className="text-xs text-gray-400 w-8">{sub.order || index}</span>
                  <FolderTree className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-gray-700">{sub.name}</span>
                  <span className="text-xs text-gray-400">{sub.slug}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    sub.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {sub.status === 1 ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleMoveUp(index, 'subcategory', subs)}
                    disabled={index === 0}
                    className={`p-1 rounded transition-colors ${
                      index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    title="Move Up"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleMoveDown(index, 'subcategory', subs)}
                    disabled={index === subs.length - 1}
                    className={`p-1 rounded transition-colors ${
                      index === subs.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    title="Move Down"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEditSubCategory(sub)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteSubCategory(sub.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-purple-600" />
                Service Management
              </h2>
              <p className="text-sm text-gray-600">Manage service categories, subcategories, and sections</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-purple-600" />
              Service Management
            </h2>
            <p className="text-sm text-gray-600">Manage service categories, subcategories, and sections</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 px-6">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('categories')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'categories'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Categories & Subcategories
            </div>
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'sections'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Sections
            </div>
          </button>
        </nav>
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

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <>
            {!showForm && !showSubForm && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
                <button
                  onClick={() => handleAddSubCategory()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Subcategory
                </button>
              </div>
            )}

            {/* Category Form */}
            {showForm && (
              <form onSubmit={handleCategorySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleCategoryChange}
                      placeholder="e.g., Temporary (Tier 5) Visas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleCategoryChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={saving}
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status === 1}
                        onChange={handleCategoryChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
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

            {/* Subcategory Form */}
            {showSubForm && (
              <form onSubmit={handleSubCategorySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Category *
                    </label>
                    <select
                      name="service_category_id"
                      value={subFormData.service_category_id}
                      onChange={handleSubChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={subFormData.name}
                      onChange={handleSubChange}
                      placeholder="e.g., Civil Penalty"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={subFormData.order}
                      onChange={handleSubChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={saving}
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={subFormData.status === 1}
                        onChange={handleSubChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
                        {editingSubCategory ? 'Update Subcategory' : 'Add Subcategory'}
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

            {/* Categories List */}
            {!showForm && !showSubForm && (
              <>
                {categories.length === 0 ? (
                  <div className="text-center py-12">
                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No categories added yet</p>
                    <button
                      onClick={handleAddCategory}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Add Your First Category
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.map((category, index) => {
                      const isExpanded = expandedCategories[category.id] || false;
                      const subs = getSubcategoriesForCategory(category.id);
                      
                      return (
                        <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3 flex-1">
                              <button
                                onClick={() => toggleCategory(category.id)}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-gray-500" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <span className="text-xs text-gray-400 w-8">{category.order || index}</span>
                              <FolderOpen className="w-5 h-5 text-purple-500" />
                              <span className="font-medium text-gray-900">{category.name}</span>
                              <span className="text-xs text-gray-400">{category.slug}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                category.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {category.status === 1 ? 'Active' : 'Inactive'}
                              </span>
                              <span className="text-xs text-gray-400 ml-2">
                                ({subs.length} subcategories)
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleMoveUp(index, 'category', categories)}
                                disabled={index === 0}
                                className={`p-1 rounded transition-colors ${
                                  index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                                }`}
                                title="Move Up"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleMoveDown(index, 'category', categories)}
                                disabled={index === categories.length - 1}
                                className={`p-1 rounded transition-colors ${
                                  index === categories.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                                }`}
                                title="Move Down"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleAddSubCategory(category.id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Add Subcategory"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Subcategories */}
                          {isExpanded && (
                            <div className="p-4 bg-white border-t border-gray-200">
                              {renderSubcategories(category.id)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Sections Tab */}
        {activeTab === 'sections' && (
          <>
            {!showSectionForm && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>
            )}

            {/* Section Form */}
            {showSectionForm && (
              <form onSubmit={handleSectionSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Subcategory *
                    </label>
                    <select
                      name="service_sub_category_id"
                      value={sectionFormData.service_sub_category_id}
                      onChange={handleSectionChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    >
                      <option value="">Select a subcategory</option>
                      {subcategories.map(sub => (
                        <option key={sub.id} value={sub.id}>
                          {sub.name} ({getCategoryName(sub.service_category_id)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Name *
                    </label>
                    <input
                      type="text"
                      name="section_name"
                      value={sectionFormData.section_name}
                      onChange={handleSectionChange}
                      placeholder="e.g., sv_first"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section ID *
                    </label>
                    <input
                      type="text"
                      name="section_id"
                      value={sectionFormData.section_id}
                      onChange={handleSectionChange}
                      placeholder="e.g., 1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      name="order_by"
                      value={sectionFormData.order_by}
                      onChange={handleSectionChange}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={saving}
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={sectionFormData.status === 1}
                        onChange={handleSectionChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
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
            )}

            {/* Sections List */}
            {!showSectionForm && (
              <>
                {sections.length === 0 ? (
                  <div className="text-center py-12">
                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No sections added yet</p>
                    <button
                      onClick={handleAddSection}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Add Your First Section
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Section Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Section ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subcategory
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sections.map((section, index) => (
                          <tr key={section.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{section.order_by || index}</span>
                                <div className="flex flex-col">
                                  <button
                                    onClick={() => handleSectionMoveUp(index)}
                                    disabled={index === 0}
                                    className={`p-1 rounded transition-colors ${
                                      index === 0
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                    title="Move Up"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleSectionMoveDown(index)}
                                    disabled={index === sections.length - 1}
                                    className={`p-1 rounded transition-colors ${
                                      index === sections.length - 1
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                                    }`}
                                    title="Move Down"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Layers className="w-4 h-4 text-green-500 mr-2" />
                                <span className="text-sm font-medium text-gray-900">
                                  {section.section_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {section.section_id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {getSubcategoryName(section.service_sub_category_id)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {getCategoryName(
                                subcategories.find(
                                  sub => sub.id === section.service_sub_category_id
                                )?.service_category_id
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                section.status === 1
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {section.status === 1 ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleEditSection(section)}
                                  className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSection(section.id)}
                                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-colors"
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
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageServiceCategory;