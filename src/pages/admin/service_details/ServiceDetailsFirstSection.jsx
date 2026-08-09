import React, { useState, useEffect } from "react";
import { api } from "../../../utils/app";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  X,
  Image,
  Heart,
  Star,
  Users,
  Briefcase,
} from "lucide-react";

const ServiceDetailsFirstSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [featureInput, setFeatureInput] = useState("");
  const [formData, setFormData] = useState({
    batch: "",
    title: "",
    highlighted_title: "",
    description: "",
    title_meta: "",
    desc_meta: "",
    button1_name: "",
    button1_url: "",
    button2_name: "",
    button2_url: "",
    feature: [],
    image_alt: "",
    f_card: {
      number: "",
      title: "",
    },
    s_card: {
      number: "",
      title: "",
    },
    t_card: {
      number: "",
      title: "",
    },
    status: 1,
  });

  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);

  // Fetch all sections on component mount
  useEffect(() => {
    fetchSections();
  }, []);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (webImagePreview && webImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(webImagePreview);
      }
      if (mobileImagePreview && mobileImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(mobileImagePreview);
      }
    };
  }, [webImagePreview, mobileImagePreview]);

  const fetchSections = async () => {
    try {
      setFetching(true);
      setMessage({ type: "", text: "" });

      const response = await api.get("/admin/sv-first-section/list");

      if (response.data.status && response.data.data) {
        setSections(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to fetch sections",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle nested card fields
    if (name.startsWith("f_card_")) {
      const field = name.replace("f_card_", "");
      setFormData((prev) => ({
        ...prev,
        f_card: {
          ...prev.f_card,
          [field]: value,
        },
      }));
    } else if (name.startsWith("s_card_")) {
      const field = name.replace("s_card_", "");
      setFormData((prev) => ({
        ...prev,
        s_card: {
          ...prev.s_card,
          [field]: value,
        },
      }));
    } else if (name.startsWith("t_card_")) {
      const field = name.replace("t_card_", "");
      setFormData((prev) => ({
        ...prev,
        t_card: {
          ...prev.t_card,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
      }));
    }

    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        setMessage({
          type: "error",
          text: "Please upload a valid image file (JPEG, PNG, WEBP, or SVG)",
        });
        e.target.value = "";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setMessage({
          type: "error",
          text: "Image size should be less than 2MB",
        });
        e.target.value = "";
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      if (type === "web") {
        setWebImage(file);
        setWebImagePreview(previewUrl);
      } else {
        setMobileImage(file);
        setMobileImagePreview(previewUrl);
      }

      setMessage({ type: "", text: "" });
    }
  };

  const removeImage = (type) => {
    if (type === "web") {
      if (webImagePreview && webImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(webImagePreview);
      }
      setWebImage(null);
      setWebImagePreview(null);
      const input = document.querySelector('input[name="web_image"]');
      if (input) input.value = "";
    } else {
      if (mobileImagePreview && mobileImagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(mobileImagePreview);
      }
      setMobileImage(null);
      setMobileImagePreview(null);
      const input = document.querySelector('input[name="mobile_image"]');
      if (input) input.value = "";
    }
  };

  // Feature management
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        feature: [...prev.feature, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      feature: prev.feature.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleAddNew = () => {
    setEditingSection(null);
    setFormData({
      batch: "",
      title: "",
      highlighted_title: "",
      description: "",
      title_meta: "",
      desc_meta: "",
      button1_name: "",
      button1_url: "",
      button2_name: "",
      button2_url: "",
      feature: [],
      image_alt: "",
      f_card: {
        number: "",
        title: "",
      },
      s_card: {
        number: "",
        title: "",
      },
      t_card: {
        number: "",
        title: "",
      },
      status: 1,
    });
    setWebImage(null);
    setMobileImage(null);
    setWebImagePreview(null);
    setMobileImagePreview(null);
    setFeatureInput("");
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    setFormData({
      batch: section.batch || "",
      title: section.title || "",
      highlighted_title: section.highlighted_title || "",
      description: section.description || "",
      title_meta: section.title_meta || "",
      desc_meta: section.desc_meta || "",
      button1_name: section.button1_name || "",
      button1_url: section.button1_url || "",
      button2_name: section.button2_name || "",
      button2_url: section.button2_url || "",
      feature: section.feature || [],
      image_alt: section.image_alt || "",
      f_card: {
        number: section.f_card?.number || "",
        title: section.f_card?.title || "",
      },
      s_card: {
        number: section.s_card?.number || "",
        title: section.s_card?.title || "",
      },
      t_card: {
        number: section.t_card?.number || "",
        title: section.t_card?.title || "",
      },
      status: section.status !== undefined ? section.status : 1,
    });

    // Set image previews
    if (section.web_image) {
      const url = section.web_image.startsWith("http")
        ? section.web_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ""}${section.web_image}`;
      setWebImagePreview(url);
    }
    if (section.mobile_image) {
      const url = section.mobile_image.startsWith("http")
        ? section.mobile_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ""}${section.mobile_image}`;
      setMobileImagePreview(url);
    }

    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this section?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/sv-first-section/${id}`);

      if (response.data.status) {
        setMessage({
          type: "success",
          text: "Section deleted successfully!",
        });
        await fetchSections();
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Error deleting section:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete section",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.title) {
      setMessage({ type: "error", text: "Title is required!" });
      return false;
    }

    if (!formData.description) {
      setMessage({ type: "error", text: "Description is required!" });
      return false;
    }

    // Validate URLs if provided

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const submitData = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        // Feature array
        if (key === "feature") {
          formData.feature.forEach((item, index) => {
            submitData.append(`feature[${index}]`, item);
          });
        }

        // First card
        else if (key === "f_card") {
          submitData.append("f_card[number]", formData.f_card.number);

          submitData.append("f_card[title]", formData.f_card.title);
        }

        // Second card
        else if (key === "s_card") {
          submitData.append("s_card[number]", formData.s_card.number);

          submitData.append("s_card[title]", formData.s_card.title);
        }

        // Third card
        else if (key === "t_card") {
          submitData.append("t_card[number]", formData.t_card.number);

          submitData.append("t_card[title]", formData.t_card.title);
        }

        // Normal fields
        else if (formData[key] !== null && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      // Append images if exist
      if (webImage) submitData.append("web_image", webImage);
      if (mobileImage) submitData.append("mobile_image", mobileImage);

      let response;
      if (editingSection) {
        // Update existing section
        submitData.append("id", editingSection.id);
        response = await api.post("/admin/sv-first-section/save", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new section
        response = await api.post("/admin/sv-first-section/save", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.data.status) {
        setMessage({
          type: "success",
          text:
            response.data.message ||
            `Section ${editingSection ? "updated" : "added"} successfully!`,
        });

        await fetchSections();
        setShowForm(false);
        setEditingSection(null);

        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to save section",
        });
      }
    } catch (error) {
      console.error("Error saving section:", error);

      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join(", ");
        setMessage({
          type: "error",
          text: `Validation Error: ${errorMessages}`,
        });
      } else {
        setMessage({
          type: "error",
          text: error.message || "Failed to save. Please try again.",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSection(null);
    setMessage({ type: "", text: "" });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Service Details First Section
              </h2>
              <p className="text-sm text-gray-600">
                Manage service details hero section
              </p>
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
              <Briefcase className="w-5 h-5 text-blue-600" />
              Service Details First Section
            </h2>
            <p className="text-sm text-gray-600">
              Manage service details hero section
            </p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : message.type === "info"
                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                  : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <span className="flex-1">{message.text}</span>
            <button
              type="button"
              onClick={() => setMessage({ type: "", text: "" })}
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
                  placeholder="e.g., Professional Digital Services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  placeholder="e.g., Modern Solutions"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Image Alt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="image_alt"
                  value={formData.image_alt}
                  onChange={handleChange}
                  placeholder="Alt text for images"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Buttons Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Call-to-Action Buttons
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 1 Name
                    </label>
                    <input
                      type="text"
                      name="button1_name"
                      value={formData.button1_name}
                      onChange={handleChange}
                      placeholder="e.g., Get Started"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 1 URL
                    </label>
                    <input
                      type="text"
                      name="button1_url"
                      value={formData.button1_url}
                      onChange={handleChange}
                      placeholder="/contact"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 2 Name
                    </label>
                    <input
                      type="text"
                      name="button2_name"
                      value={formData.button2_name}
                      onChange={handleChange}
                      placeholder="e.g., View Portfolio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Button 2 URL
                    </label>
                    <input
                      type="text"
                      name="button2_url"
                      value={formData.button2_url}
                      onChange={handleChange}
                      placeholder="/portfolio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Features
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={handleFeatureKeyPress}
                      placeholder="Add feature (e.g., Free Consultation)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={saving}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {formData.feature.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {formData.feature.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-md border border-gray-200"
                        >
                          <span className="text-sm text-gray-700 flex items-center gap-2">
                            <Heart className="w-3 h-3 text-blue-500" />
                            {item}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            disabled={saving}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Statistics Cards
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* First Card */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Card 1
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="f_card_number"
                        value={formData.f_card.number}
                        onChange={handleChange}
                        placeholder="e.g., 250+"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                      <input
                        type="text"
                        name="f_card_title"
                        value={formData.f_card.title}
                        onChange={handleChange}
                        placeholder="e.g., Projects Delivered"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  {/* Second Card */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Card 2
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="s_card_number"
                        value={formData.s_card.number}
                        onChange={handleChange}
                        placeholder="e.g., 98%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                      <input
                        type="text"
                        name="s_card_title"
                        value={formData.s_card.title}
                        onChange={handleChange}
                        placeholder="e.g., Client Satisfaction"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                  </div>

                  {/* Third Card */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Card 3
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="t_card_number"
                        value={formData.t_card.number}
                        onChange={handleChange}
                        placeholder="e.g., 12+"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                      <input
                        type="text"
                        name="t_card_title"
                        value={formData.t_card.title}
                        onChange={handleChange}
                        placeholder="e.g., Years Experience"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Images
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Web Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Web Image
                    </label>
                    <input
                      type="file"
                      name="web_image"
                      onChange={(e) => handleImageChange(e, "web")}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 1920x600px. Max: 2MB
                    </p>

                    {webImagePreview && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img
                            src={webImagePreview}
                            alt="Web Image Preview"
                            className="max-w-full h-32 object-cover border border-gray-300 rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="200" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage("web")}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                            disabled={saving}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Image
                    </label>
                    <input
                      type="file"
                      name="mobile_image"
                      onChange={(e) => handleImageChange(e, "mobile")}
                      accept="image/jpeg,image/png,image/jpg,image/webp,image/svg+xml"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={saving}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommended: 768x400px. Max: 2MB
                    </p>

                    {mobileImagePreview && (
                      <div className="mt-3">
                        <div className="relative inline-block">
                          <img
                            src={mobileImagePreview}
                            alt="Mobile Image Preview"
                            className="max-w-full h-32 object-cover border border-gray-300 rounded"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect width="400" height="200" fill="%23f0f0f0"/%3E%3Ctext x="200" y="100" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage("mobile")}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                            disabled={saving}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status === 1}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={saving}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Active
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  When inactive, this section won't be displayed
                </p>
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
                    {editingSection ? "Update Section" : "Add Section"}
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
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No sections added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Your First Section
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              section.status === 1
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {section.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </div>

                        {section.batch && (
                          <p className="text-sm text-blue-600 font-medium">
                            {section.batch}
                          </p>
                        )}

                        <h3 className="text-xl font-semibold text-gray-800 mt-1">
                          {section.title}
                          {section.highlighted_title && (
                            <span className="text-blue-600">
                              {" "}
                              {section.highlighted_title}
                            </span>
                          )}
                        </h3>

                        <p className="text-gray-600 mt-2">
                          {section.description}
                        </p>

                        {/* Features */}
                        {section.feature && section.feature.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {section.feature.map((item, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          {section.f_card && section.f_card.number && (
                            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                              <p className="text-lg font-bold text-blue-600">
                                {section.f_card.number}
                              </p>
                              <p className="text-xs text-gray-500">
                                {section.f_card.title}
                              </p>
                            </div>
                          )}
                          {section.s_card && section.s_card.number && (
                            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                              <p className="text-lg font-bold text-blue-600">
                                {section.s_card.number}
                              </p>
                              <p className="text-xs text-gray-500">
                                {section.s_card.title}
                              </p>
                            </div>
                          )}
                          {section.t_card && section.t_card.number && (
                            <div className="bg-white rounded-lg p-3 text-center border border-blue-100">
                              <p className="text-lg font-bold text-blue-600">
                                {section.t_card.number}
                              </p>
                              <p className="text-xs text-gray-500">
                                {section.t_card.title}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {section.button1_name && (
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded">
                              {section.button1_name}
                            </span>
                          )}
                          {section.button2_name && (
                            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                              {section.button2_name}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-400 mt-3">
                          Updated:{" "}
                          {new Date(section.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(section)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
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

export default ServiceDetailsFirstSection;
