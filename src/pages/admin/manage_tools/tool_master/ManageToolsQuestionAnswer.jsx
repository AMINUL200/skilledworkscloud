import React, { useState, useEffect } from 'react';
import { 
  Save, Plus, Edit, Trash2, X, FileText, HelpCircle, 
  ChevronDown, ChevronUp, Eye, CheckCircle, Circle,
  ArrowUp, ArrowDown
} from 'lucide-react';
import { api } from '../../../../utils/app';

const ManageToolsQuestionAnswer = () => {
  const [forms, setForms] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingOption, setEditingOption] = useState(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  // Form Data for Question
  const [questionData, setQuestionData] = useState({
    form_id: '',
    question_text: '',
    helper_text: '',
    question_type: 'multiple_choice',
    question_order: 1,
    is_required: 1
  });

  // Form Data for Option
  const [optionData, setOptionData] = useState({
    question_id: '',
    option_text: '',
    option_order: 1,
    score_value: 5
  });

  // Fetch forms on component mount
  useEffect(() => {
    fetchForms();
  }, []);

  // Fetch questions when form is selected
  useEffect(() => {
    if (selectedFormId) {
      fetchQuestions(selectedFormId);
    }
  }, [selectedFormId]);

  const fetchForms = async () => {
    try {
      setFetching(true);
      const response = await api.get('/admin/forms');

      if (response.data.status && response.data.data) {
        setForms(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedFormId(response.data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching forms:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to fetch forms'
      });
    } finally {
      setFetching(false);
    }
  };

  const fetchQuestions = async (formId) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/forms/${formId}/questions`);

      if (response.data.status && response.data.data) {
        setQuestions(response.data.data);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestionData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptionData(prev => ({
      ...prev,
      [name]: value
    }));
    if (message.text) setMessage({ type: '', text: '' });
  };

  const toggleQuestionExpand = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Question CRUD Operations
  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setQuestionData({
      form_id: selectedFormId,
      question_text: '',
      helper_text: '',
      question_type: 'multiple_choice',
      question_order: questions.length + 1,
      is_required: 1
    });
    setShowQuestionForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setQuestionData({
      form_id: question.form_id,
      question_text: question.question_text,
      helper_text: question.helper_text || '',
      question_type: question.question_type || 'multiple_choice',
      question_order: question.question_order || 1,
      is_required: question.is_required ? 1 : 0
    });
    setShowQuestionForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/questions/${questionId}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Question deleted successfully!'
        });
        await fetchQuestions(selectedFormId);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete question'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!questionData.question_text.trim()) {
      setMessage({ type: 'error', text: 'Question text is required!' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        form_id: selectedFormId,
        question_text: questionData.question_text.trim(),
        helper_text: questionData.helper_text.trim(),
        question_type: questionData.question_type,
        question_order: questionData.question_order,
        is_required: questionData.is_required
      };

      if (editingQuestion) {
        submitData.id = editingQuestion.id;
      }

      const response = await api.post('/admin/questions/save', submitData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Question ${editingQuestion ? 'updated' : 'added'} successfully!`
        });

        await fetchQuestions(selectedFormId);
        setShowQuestionForm(false);
        setEditingQuestion(null);

        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save question'
        });
      }
    } catch (error) {
      console.error('Error saving question:', error);
      if (error.response?.data?.message) {
        setMessage({ type: 'error', text: error.response.data.message });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to save. Please try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  // Option CRUD Operations
  const handleAddOption = (questionId) => {
    setEditingOption(null);
    setSelectedQuestionId(questionId);
    const existingOptions = questions.find(q => q.id === questionId)?.options || [];
    setOptionData({
      question_id: questionId,
      option_text: '',
      option_order: existingOptions.length + 1,
      score_value: 5
    });
    setShowOptionForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleEditOption = (option, questionId) => {
    setEditingOption(option);
    setSelectedQuestionId(questionId);
    setOptionData({
      question_id: questionId,
      option_text: option.option_text,
      option_order: option.option_order || 1,
      score_value: option.score_value || 5
    });
    setShowOptionForm(true);
    setMessage({ type: '', text: '' });
  };

  const handleDeleteOption = async (optionId) => {
    if (!window.confirm('Are you sure you want to delete this option?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/options/${optionId}`);

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: 'Option deleted successfully!'
        });
        await fetchQuestions(selectedFormId);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting option:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete option'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOption = async (e) => {
    e.preventDefault();

    if (!optionData.option_text.trim()) {
      setMessage({ type: 'error', text: 'Option text is required!' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const submitData = {
        question_id: selectedQuestionId,
        option_text: optionData.option_text.trim(),
        option_order: optionData.option_order,
        score_value: optionData.score_value
      };

      if (editingOption) {
        submitData.id = editingOption.id;
      }

      const response = await api.post('/admin/options/save', submitData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.status) {
        setMessage({
          type: 'success',
          text: response.data.message || `Option ${editingOption ? 'updated' : 'added'} successfully!`
        });

        await fetchQuestions(selectedFormId);
        setShowOptionForm(false);
        setEditingOption(null);

        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      } else {
        setMessage({
          type: 'error',
          text: response.data.message || 'Failed to save option'
        });
      }
    } catch (error) {
      console.error('Error saving option:', error);
      if (error.response?.data?.message) {
        setMessage({ type: 'error', text: error.response.data.message });
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to save. Please try again.' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancelQuestion = () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    setMessage({ type: '', text: '' });
  };

  const handleCancelOption = () => {
    setShowOptionForm(false);
    setEditingOption(null);
    setSelectedQuestionId(null);
    setMessage({ type: '', text: '' });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Manage Questions & Answers
              </h2>
              <p className="text-sm text-gray-600">Manage form questions and options</p>
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
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Manage Questions & Answers
            </h2>
            <p className="text-sm text-gray-600">Manage form questions and options</p>
          </div>
          {!showQuestionForm && !showOptionForm && (
            <div className="flex items-center gap-4">
              {/* Form Type Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Select Form:</label>
                <select
                  value={selectedFormId || ''}
                  onChange={(e) => setSelectedFormId(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {forms.map((form) => (
                    <option key={form.id} value={form.id}>
                      {form.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Question
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

        {/* Question Form */}
        {showQuestionForm && (
          <form onSubmit={handleSubmitQuestion} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <input
                  type="text"
                  name="question_text"
                  value={questionData.question_text}
                  onChange={handleQuestionChange}
                  placeholder="Enter question"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Helper Text
                </label>
                <input
                  type="text"
                  name="helper_text"
                  value={questionData.helper_text}
                  onChange={handleQuestionChange}
                  placeholder="Helper text (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Type
                  </label>
                  <select
                    name="question_type"
                    value={questionData.question_type}
                    onChange={handleQuestionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={saving}
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="single_choice">Single Choice</option>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Order
                  </label>
                  <input
                    type="number"
                    name="question_order"
                    value={questionData.question_order}
                    onChange={handleQuestionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={saving}
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_required"
                    checked={questionData.is_required === 1}
                    onChange={handleQuestionChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">Required</span>
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
                    {editingQuestion ? 'Update Question' : 'Add Question'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelQuestion}
                disabled={saving}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Option Form */}
        {showOptionForm && (
          <form onSubmit={handleSubmitOption} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {editingOption ? 'Edit Option' : 'Add Option'}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Option Text *
                </label>
                <input
                  type="text"
                  name="option_text"
                  value={optionData.option_text}
                  onChange={handleOptionChange}
                  placeholder="Enter option"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Option Order
                  </label>
                  <input
                    type="number"
                    name="option_order"
                    value={optionData.option_order}
                    onChange={handleOptionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={saving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Score Value
                  </label>
                  <input
                    type="number"
                    name="score_value"
                    value={optionData.score_value}
                    onChange={handleOptionChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={saving}
                  />
                </div>
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
                    {editingOption ? 'Update Option' : 'Add Option'}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancelOption}
                disabled={saving}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Questions List */}
        {!showQuestionForm && !showOptionForm && (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-500 mt-2 text-sm">Loading questions...</span>
                </div>
              </div>
            ) : questions.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No questions added for this form</p>
                <button
                  onClick={handleAddQuestion}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Question
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {questions.map((question) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => toggleQuestionExpand(question.id)}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500">
                            Q{question.question_order}:
                          </span>
                          <span className="font-medium text-gray-800">
                            {question.question_text}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {question.is_required && (
                            <span className="text-xs text-red-500">*</span>
                          )}
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {question.options?.length || 0} options
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddOption(question.id);
                          }}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Add Option"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditQuestion(question);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Question"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(question.id);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {expandedQuestions[question.id] ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {expandedQuestions[question.id] && (
                      <div className="p-4 bg-white border-t border-gray-200">
                        {question.helper_text && (
                          <p className="text-sm text-gray-500 mb-3">
                            <span className="font-medium">Helper:</span> {question.helper_text}
                          </p>
                        )}
                        
                        {question.options && question.options.length > 0 ? (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Options:</p>
                            {question.options.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-sm text-gray-600">
                                    {option.option_text}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    Order: {option.option_order}
                                  </span>
                                  <span className="text-xs text-blue-600">
                                    Score: {option.score_value}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleEditOption(option, question.id)}
                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteOption(option.id)}
                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500 text-sm">
                            No options added yet
                            <button
                              onClick={() => handleAddOption(question.id)}
                              className="ml-2 text-blue-600 hover:underline"
                            >
                              Add Option
                            </button>
                          </div>
                        )}
                      </div>
                    )}
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

export default ManageToolsQuestionAnswer;