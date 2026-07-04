import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  Package,
  FileText,
  Globe,
  Mail,
  UserCog,
  Tag,
  TrendingUp,
  FileQuestion,
  Plus,
  X,
  Search,
  ArrowRight,
  Shield,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Dashboard cards configuration - Easy to add/remove
  const dashboardCards = [
    {
      id: "manage-banners",
      title: "Manage Banners",
      description: "Create and manage website banners",
      icon: <LayoutDashboard className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      path: "/admin/manage-banners",
      status: "active",
      created: "2024-01-15",
    },
    {
      id: "manage-blogs",
      title: "Manage Blogs",
      description: "Create, edit and manage blog posts",
      icon: <FileText className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      path: "/admin/manage-blogs",
      status: "active",
      created: "2024-01-15",
    },
    {
      id: "manage-about",
      title: "Manage About",
      description: "Edit about page content and sections",
      icon: <UserCog className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      path: "/admin/manage-about",
      status: "active",
      created: "2024-01-20",
    },
    {
      id: "manage-social",
      title: "Social Responsibilities",
      description: "Manage social responsibility content",
      icon: <Globe className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
      path: "/admin/manage-social-responsibilities",
      status: "active",
      created: "2024-01-22",
    },
    {
      id: "manage-teams",
      title: "Manage Teams",
      description: "Manage team members and profiles",
      icon: <Users className="w-8 h-8" />,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      borderColor: "border-pink-200",
      path: "/admin/manage-teams",
      status: "active",
      created: "2024-01-25",
    },
    {
      id: "service-categories",
      title: "Service Categories",
      description: "Manage service categories and subcategories",
      icon: <Tag className="w-8 h-8" />,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200",
      path: "/admin/service-categories",
      status: "active",
      created: "2024-02-01",
    },
    {
      id: "service-hero",
      title: "Service Hero",
      description: "Manage service page hero section",
      icon: <LayoutDashboard className="w-8 h-8" />,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      borderColor: "border-cyan-200",
      path: "/admin/service-hero",
      status: "active",
      created: "2024-02-05",
    },
    {
      id: "service-details",
      title: "Service Details",
      description: "Manage service details sections",
      icon: <Package className="w-8 h-8" />,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      borderColor: "border-teal-200",
      path: "/admin/service-details-first",
      status: "active",
      created: "2024-02-10",
    },
    {
      id: "manage-faq",
      title: "Manage FAQ",
      description: "Manage frequently asked questions",
      icon: <FileQuestion className="w-8 h-8" />,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-200",
      path: "/admin/manage-faq",
      status: "active",
      created: "2024-02-15",
    },
    {
      id: "site-settings",
      title: "Site Settings",
      description: "Configure site settings and preferences",
      icon: <Settings className="w-8 h-8" />,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      textColor: "text-slate-600",
      borderColor: "border-slate-200",
      path: "/admin/site-settings",
      status: "active",
      created: "2024-02-20",
    },
    {
      id: "smtp-settings",
      title: "SMTP Settings",
      description: "Configure email server settings",
      icon: <Mail className="w-8 h-8" />,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      textColor: "text-rose-600",
      borderColor: "border-rose-200",
      path: "/admin/smtp-settings",
      status: "inactive",
      created: "2024-02-25",
    },
    {
      id: "seo-settings",
      title: "SEO Settings",
      description: "Manage SEO meta tags and settings",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
      borderColor: "border-violet-200",
      path: "/admin/seo-settings",
      status: "active",
      created: "2024-03-01",
    },
  ];

  // Filter cards based on search term
  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (path) => {
    navigate(path);
  };

  // Stats
  const totalModules = dashboardCards.length;
  const activeModules = dashboardCards.filter(card => card.status === "active").length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your admin panel from here</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-50 rounded-lg text-blue-600 text-sm font-medium">
            {totalModules} Modules
          </div>
          <div className="px-4 py-2 bg-green-50 rounded-lg text-green-600 text-sm font-medium">
            {activeModules} Active
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Modules</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalModules}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active</p>
              <h3 className="text-2xl font-bold text-green-600 mt-1">{activeModules}</h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Inactive</p>
              <h3 className="text-2xl font-bold text-gray-400 mt-1">
                {totalModules - activeModules}
              </h3>
            </div>
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Last Updated</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">Today</h3>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg border ${
              viewMode === "grid"
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "border-gray-300 text-gray-400 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg border ${
              viewMode === "list"
                ? "bg-blue-50 border-blue-500 text-blue-600"
                : "border-gray-300 text-gray-400 hover:bg-gray-50"
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards Grid/List */}
      {filteredCards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">No modules found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search terms</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.path)}
              className={`group bg-white rounded-xl border ${card.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}
            >
              {/* Gradient Bar */}
              <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />

              <div className="p-6">
                {/* Icon */}
                <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={card.textColor}>{card.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                  {card.description}
                </p>

                {/* Status and Action */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                      card.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {card.status === "active" ? "Active" : "Inactive"}
                  </span>
                  <div className="flex items-center gap-1 text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Manage
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCards.map((card) => (
                  <tr
                    key={card.id}
                    onClick={() => handleCardClick(card.path)}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                          <div className={`w-5 h-5 ${card.textColor}`}>{card.icon}</div>
                        </div>
                        <span className="font-medium text-gray-900">{card.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{card.description}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          card.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {card.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{card.created}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
        <p>Showing {filteredCards.length} of {dashboardCards.length} modules</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;