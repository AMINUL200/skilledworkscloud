import React, { useState, useEffect } from "react";
import { api } from "../../../utils/app";
import {
  Save,
  Plus,
  Edit,
  Trash2,
  X,
  FileText,
  Image,
  Calendar,
  Eye,
  EyeOff,
  Star,
  Clock,
} from "lucide-react";
import CustomTextEditor from "../../../component/common/CustomTextEditor";

const BlogSecondSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    long_desc: "",
    desc_meta: "",
    date: "",
    image_alt: "",
    social_title: "",
    social_desc: "",
    facebook: "",
    linkedin: "",
    instagram: "",
    twitter: "",
    popular: 0,
    last_read: 0,
    status: 1,
  });

  const [webImage, setWebImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [webImagePreview, setWebImagePreview] = useState(null);
  const [mobileImagePreview, setMobileImagePreview] = useState(null);

  useEffect(() => {
    fetchBlogs();
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

  const fetchBlogs = async () => {
    try {
      setFetching(true);
      setMessage({ type: "", text: "" });

      const response = await api.get("/admin/blog-list");

      if (response.data.status && response.data.data) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to fetch blogs",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));

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

  const handleAddNew = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      category: "",
      long_desc: "",
      desc_meta: "",
      date: "",
      image_alt: "",
      social_title: "",
      social_desc: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      popular: 0,
      last_read: 0,
      status: 1,
    });
    setWebImage(null);
    setMobileImage(null);
    setWebImagePreview(null);
    setMobileImagePreview(null);
    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      long_desc: blog.long_desc || "",
      desc_meta: blog.desc_meta || "",
      date: blog.date || "",
      image_alt: blog.image_alt || "",
      social_title: blog.social_title || "",
      social_desc: blog.social_desc || "",
      facebook: blog.facebook || "",
      linkedin: blog.linkedin || "",
      instagram: blog.instagram || "",
      twitter: blog.twitter || "",
      popular: blog.popular || 0,
      last_read: blog.last_read || 0,
      status: blog.status !== undefined ? blog.status : 1,
    });

    if (blog.web_image) {
      const url = blog.web_image.startsWith("http")
        ? blog.web_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ""}${blog.web_image}`;
      setWebImagePreview(url);
    }
    if (blog.mobile_image) {
      const url = blog.mobile_image.startsWith("http")
        ? blog.mobile_image
        : `${import.meta.env.VITE_STORAGE_BASE_URL || ""}${blog.mobile_image}`;
      setMobileImagePreview(url);
    }

    setShowForm(true);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.delete(`/admin/blog/${id}`);

      if (response.data.status) {
        setMessage({
          type: "success",
          text: "Blog post deleted successfully!",
        });
        await fetchBlogs();
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to delete blog post",
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

    if (!formData.long_desc) {
      setMessage({ type: "error", text: "Description is required!" });
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
    setMessage({ type: "", text: "" });

    try {
      const submitData = new FormData();

      // Append all form data
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      if (webImage) {
        submitData.append("web_image", webImage);
      }
      if (mobileImage) {
        submitData.append("mobile_image", mobileImage);
      }

      let response;
      if (editingBlog) {
        // Update existing blog
        submitData.append("id", editingBlog.id);
        // submitData.append('_method', 'PUT');

        response = await api.post(`/admin/blog/save`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new blog
        response = await api.post("/admin/blog/save", submitData, {
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
            `Blog post ${editingBlog ? "updated" : "created"} successfully!`,
        });

        await fetchBlogs();
        setShowForm(false);
        setEditingBlog(null);

        setTimeout(() => {
          setMessage({ type: "", text: "" });
        }, 5000);
      } else {
        setMessage({
          type: "error",
          text: response.data.message || "Failed to save blog post",
        });
      }
    } catch (error) {
      console.error("Error saving blog:", error);

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
    setEditingBlog(null);
    setMessage({ type: "", text: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (fetching) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Blog Posts
              </h2>
              <p className="text-sm text-gray-600">
                Manage your blog posts and articles
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-500 mt-2">Loading blog posts...</span>
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
              <FileText className="w-5 h-5 text-blue-600" />
              Blog Posts
            </h2>
            <p className="text-sm text-gray-600">
              Manage your blog posts and articles
            </p>
          </div>
          {!showForm && (
            <button
              onClick={handleAddNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Blog Post
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
                  placeholder="Enter blog post title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={saving}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Technology, Business"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
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

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>

                <CustomTextEditor
                  value={formData.long_desc}
                  placeholder="Enter blog post content..."
                  height={400}
                  disabled={saving}
                  onChange={(content) =>
                    setFormData((prev) => ({
                      ...prev,
                      long_desc: content,
                    }))
                  }
                />
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
                  placeholder="Additional description meta"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={saving}
                />
              </div>

              {/* Social Media Section */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Social Media Sharing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Title
                    </label>
                    <input
                      type="text"
                      name="social_title"
                      value={formData.social_title}
                      onChange={handleChange}
                      placeholder="Title for social sharing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Description
                    </label>
                    <input
                      type="text"
                      name="social_desc"
                      value={formData.social_desc}
                      onChange={handleChange}
                      placeholder="Description for social sharing"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      placeholder="Facebook URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="Instagram URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter URL
                    </label>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      placeholder="Twitter URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={saving}
                    />
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
                      Recommended: 1200x630px. Max: 2MB
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

              {/* Popular & Last Read */}
              <div className="md:col-span-2 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Post Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="popular"
                        checked={formData.popular === 1}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={saving}
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Popular Post
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="last_read"
                        checked={formData.last_read === 1}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={saving}
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Last Read
                      </span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status === 1}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={saving}
                      />
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Eye className="w-4 h-4 text-green-500" />
                        Published
                      </span>
                    </label>
                  </div>
                </div>
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
                    {editingBlog ? "Update Post" : "Create Post"}
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
          /* Blog List */
          <>
            {blogs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No blog posts added yet</p>
                <button
                  onClick={handleAddNew}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Your First Blog Post
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex gap-4 flex-1">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {blog.web_image ? (
                          <img
                            src={`${import.meta.env.VITE_STORAGE_BASE_URL || ""}${blog.web_image}`}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                            }}
                          />
                        ) : (
                          <Image className="w-8 h-8 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-800 truncate">
                          {blog.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          {blog.category && (
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                              {blog.category}
                            </span>
                          )}
                          {blog.date && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(blog.date)}
                            </span>
                          )}
                          {blog.popular === 1 && (
                            <span className="text-xs flex items-center gap-1 text-yellow-600">
                              <Star className="w-3 h-3 fill-yellow-500" />
                              Popular
                            </span>
                          )}
                          {blog.last_read === 1 && (
                            <span className="text-xs flex items-center gap-1 text-blue-600">
                              <Clock className="w-3 h-3" />
                              Last Read
                            </span>
                          )}
                        </div>
                        {blog.long_desc && (
                          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {blog.long_desc
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 150)}
                            ...
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          blog.status === 1
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {blog.status === 1 ? "Published" : "Draft"}
                      </span>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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

export default BlogSecondSection;
