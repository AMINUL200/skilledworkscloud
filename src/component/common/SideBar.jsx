import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X,
  ChevronRight,
  User,
  LayoutDashboard,
  LogOut,
  Info,
  Briefcase,
  ShieldCheck,
  FileCheck,
  Wrench,
  Building2,
  Newspaper,
  Phone,
  Calculator,
  Search,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Users,
  AlertCircle,
  Star,
  CheckSquare,
  Briefcase as BriefcaseIcon,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

const SideBar = ({ toggleMenu, isOpen }) => {
  const { services, loading } = useApp();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openNestedDropdowns, setOpenNestedDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- DYNAMIC SERVICES SECTIONS FOR SIDEBAR ---------------- */
  const getServiceSections = () => {
    if (!services || services.length === 0) return [];

    // Group services by category if you have a category field, or just use all services
    // Since your services structure has subcategories, we'll map them
    return services.map((service) => ({
      id: service.id || service.slug,
      label: service.name,
      icon: <Briefcase className="w-5 h-5" />,
      nestedDropdown: service.subcategories?.map((sub) => ({
        label: sub.name,
        path: `/services/${sub.slug}`,
      })) || [],
    }));
  };

  /* ---------------- SIDEBAR LINKS WITH DYNAMIC SERVICES ---------------- */
  const getSidebarLinks = () => {
    const dynamicServices = getServiceSections();

    const baseLinks = [
      {
        id: "about",
        label: "About",
        icon: <Info className="w-5 h-5" />,
        dropdown: [
          { id: "about-us", label: "About Us", path: "/about-us" },
          { id: "team", label: "Our Team", path: "/team" },
        ],
      },
      {
        id: "services",
        label: "Services",
        icon: <Briefcase className="w-5 h-5" />,
        dropdown: dynamicServices.length > 0 ? dynamicServices : [
          // Fallback hardcoded data if services not loaded
          {
            id: "sponsorship-licence",
            label: "Sponsorship Licence",
            nestedDropdown: [
              {
                label: "Sponsor Licence Renewal",
                path: "/services/sponsor-licence-renewal",
              },
              {
                label: "Sponsor Licence Suspension",
                path: "/services/sponsor-licence-suspension",
              },
              {
                label: "Sponsor Licence Application",
                path: "/services/sponsor-licence-application",
              },
            ],
          },
          // Add more fallback services if needed...
        ],
      },
      {
        id: "hr",
        label: "HR Compliance",
        path: "/hr-compliance",
        icon: <Building2 className="w-5 h-5" />,
      },
      {
        id: "self",
        label: "Self-Sponsorship",
        path: "/self-sponsorship",
        icon: <ShieldCheck className="w-5 h-5" />,
      },
      {
        id: "sponsor",
        label: "Sponsor Licence Checker",
        path: "/sponsor-checker",
        icon: <FileCheck className="w-5 h-5" />,
      },
      {
        id: "tools",
        label: "Tools",
        icon: <Wrench className="w-5 h-5" />,
        dropdown: [
          {
            id: "sponsor-licence",
            label: "Get Your Sponsor Licence Today",
            path: "/tools/get-your-sponsor-licence",
            icon: <FileCheck className="w-4 h-4" />,
          },
          {
            id: "sponsor-status",
            label: "Sponsor Licence Status Check",
            path: "/tools/sponsor-licence-status-check",
            icon: <Search className="w-4 h-4" />,
          },
          {
            id: "ilr-eligibility",
            label: "ILR Eligibility - Free Assessment",
            path: "/tools/ilr-eligibility",
            icon: <ClipboardCheck className="w-4 h-4" />,
          },
          {
            id: "ihs",
            label: "IHS & Visa Fee Calculator",
            path: "/tools/ihs-visa-fee-calculator",
            icon: <Calculator className="w-4 h-4" />,
          },
          {
            id: "right-to-work",
            label: "Right To Work Check",
            path: "/tools/right-to-work-check",
            icon: <CheckSquare className="w-4 h-4" />,
          },
          {
            id: "additional-work",
            label: "Can I Take Additional Work?",
            path: "/tools/can-i-take-additional-work",
            icon: <BriefcaseIcon className="w-4 h-4" />,
          },
          {
            id: "sponsored-job",
            label: "Looking for a Sponsored Job?",
            path: "/tools/looking-for-sponsored-job",
            icon: <Users className="w-4 h-4" />,
          },
          {
            id: "hr-audit",
            label: "Get Free HR Compliance Audit",
            path: "/tools/free-hr-compliance-audit",
            icon: <AlertCircle className="w-4 h-4" />,
          },
          {
            id: "divider-1",
            type: "divider",
            label: "Resources & Additional Tools",
          },
          {
            id: "temporary-shortage",
            label: "Temporary Shortage Occupation",
            path: "/tools/temporary-shortage-occupation",
            icon: <Clock className="w-4 h-4" />,
          },
          {
            id: "rqf-level",
            label: "RQF Level 6",
            path: "/tools/rqf-level-6",
            icon: <GraduationCap className="w-4 h-4" />,
          },
          {
            id: "wpc-calculator",
            label: "WPC Visa Fee Calculator",
            path: "/tools/wpc-visa-fee-calculator",
            icon: <Calculator className="w-4 h-4" />,
          },
          {
            id: "supplementary",
            label: "Supplementary Employment",
            path: "/tools/supplementary-employment",
            icon: <BriefcaseIcon className="w-4 h-4" />,
          },
        ],
      },
      {
        id: "blogs",
        label: "Blogs",
        path: "/blogs",
        icon: <Newspaper className="w-5 h-5" />,
      },
      {
        id: "contact",
        label: "Contact",
        path: "/contact",
        icon: <Phone className="w-5 h-5" />,
      },
    ];

    return baseLinks;
  };

  const sidebarLinks = getSidebarLinks();

  /* ---------------- AUTH ---------------- */
  const isAuthenticated = false;
  const userData = { user_type: 2 };

  /* ---------------- CLOSE ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    if (isOpen) {
      toggleMenu();
    }
  }, [location.pathname]);

  /* ---------------- TOGGLE DROPDOWN ---------------- */
  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ---------------- TOGGLE NESTED DROPDOWN ---------------- */
  const toggleNestedDropdown = (id) => {
    setOpenNestedDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /* ---------------- ACTIVE PATH ---------------- */
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  /* ---------------- NAVIGATION ---------------- */
  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdowns({});
    setOpenNestedDropdowns({});
    toggleMenu();
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    navigate("/");
    toggleMenu();
  };

  /* ---------------- RENDER NESTED DROPDOWN ITEMS ---------------- */
  const renderNestedDropdownItems = (items, parentId) => {
    const isOpen = openNestedDropdowns[parentId];

    return (
      <div>
        <div
          onClick={() => toggleNestedDropdown(parentId)}
          className={`
            flex items-center justify-between
            px-4 py-3 ml-6
            rounded-xl
            cursor-pointer
            transition-all duration-300
            ${
              isOpen
                ? "bg-primary-light text-primary"
                : "text-text-light hover:bg-primary-light hover:text-primary"
            }
          `}
        >
          <span className="text-sm font-medium">View All</span>
          <ChevronRight
            className={`
              w-4 h-4 transition-all duration-300
              ${isOpen ? "rotate-90" : ""}
            `}
          />
        </div>

        <div
          className={`
            overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="ml-10 mt-2 space-y-1">
            {items.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate(item.path)}
                className={`
                  flex items-center gap-2
                  px-4 py-2 rounded-lg
                  text-sm cursor-pointer
                  transition-all duration-200
                  ${
                    isActivePath(item.path)
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                      : "text-text-light hover:bg-primary-light hover:text-primary"
                  }
                `}
              >
                <div className="w-1 h-1 rounded-full bg-current" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ---------------- RENDER DROPDOWN WITH NESTED ITEMS ---------------- */
  const renderDropdownWithNested = (item) => {
    const isOpen = openDropdowns[item.id];

    // If it's the services dropdown and still loading
    if (item.id === "services" && loading) {
      return (
        <div key={item.id} className="mb-2">
          <div className="flex items-center gap-3 px-4 py-4">
            {item.icon}
            <span className="font-semibold text-[15px] text-gray-400">
              Loading services...
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={item.id} className="mb-2">
        <div
          onClick={() => toggleDropdown(item.id)}
          className={`
            flex items-center justify-between
            px-4 py-4
            rounded-2xl
            cursor-pointer
            transition-all duration-300
            ${
              isOpen
                ? "bg-primary-light text-primary"
                : "text-text-light hover:bg-primary-light hover:text-primary"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="font-semibold text-[15px]">{item.label}</span>
          </div>
          <ChevronRight
            className={`
              w-5 h-5 transition-all duration-300
              ${isOpen ? "rotate-90" : ""}
            `}
          />
        </div>

        {/* Nested Dropdown Content */}
        <div
          className={`
            overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="mt-2 space-y-1">
            {item.dropdown?.map((subItem) => (
              <div key={subItem.id}>
                {subItem.nestedDropdown ? (
                  // Title with nested dropdown
                  <div>
                    <div className="px-4 py-3 ml-3">
                      <h3 className="text-sm font-bold text-primary">
                        {subItem.label}
                      </h3>
                    </div>
                    {renderNestedDropdownItems(
                      subItem.nestedDropdown,
                      subItem.id,
                    )}
                  </div>
                ) : (
                  // Regular dropdown item
                  <div
                    onClick={() => handleNavigate(subItem.path)}
                    className={`
                      flex items-center gap-2
                      px-4 py-3 ml-6 rounded-xl
                      text-sm cursor-pointer
                      transition-all duration-200
                      ${
                        isActivePath(subItem.path)
                          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                          : "text-text-light hover:bg-primary-light hover:text-primary"
                      }
                    `}
                  >
                    <ChevronRight size={14} />
                    <span>{subItem.label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ---------------- RENDER REGULAR DROPDOWN ---------------- */
  const renderRegularDropdown = (item) => {
    const isOpen = openDropdowns[item.id];

    return (
      <div key={item.id} className="mb-2">
        <div
          onClick={() => toggleDropdown(item.id)}
          className={`
            flex items-center justify-between
            px-4 py-4
            rounded-2xl
            cursor-pointer
            transition-all duration-300
            ${
              isOpen
                ? "bg-primary-light text-primary"
                : "text-text-light hover:bg-primary-light hover:text-primary"
            }
          `}
        >
          <div className="flex items-center gap-3">
            {item.icon}
            <span className="font-semibold text-[15px]">{item.label}</span>
          </div>
          <ChevronRight
            className={`
              w-5 h-5 transition-all duration-300
              ${isOpen ? "rotate-90" : ""}
            `}
          />
        </div>

        <div
          className={`
            overflow-hidden transition-all duration-300
            ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="mt-2 ml-6 space-y-1">
            {item.dropdown?.map((subItem) => {
              // Check if it's a divider
              if (subItem.type === "divider") {
                return (
                  <div
                    key={subItem.id}
                    className="px-4 py-3 mt-2 border-t border-gray-200"
                  >
                    <span className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">
                      {subItem.label}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={subItem.id}
                  onClick={() => handleNavigate(subItem.path)}
                  className={`
                    flex items-center gap-2
                    px-4 py-3 rounded-xl
                    text-sm cursor-pointer
                    transition-all duration-200
                    ${
                      isActivePath(subItem.path)
                        ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md"
                        : "text-text-light hover:bg-primary-light hover:text-primary"
                    }
                  `}
                >
                  {subItem.icon && (
                    <span className="text-gray-400">{subItem.icon}</span>
                  )}
                  <ChevronRight size={14} className="text-gray-400" />
                  <span>{subItem.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  /* ---------------- RENDER SIMPLE LINK ---------------- */
  const renderSimpleLink = (item) => {
    const isActive = item.path && isActivePath(item.path);

    return (
      <div
        key={item.id}
        onClick={() => handleNavigate(item.path)}
        className={`
          flex items-center gap-3
          px-4 py-4
          rounded-2xl
          cursor-pointer
          transition-all duration-300
          mb-2
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
              : "text-text-light hover:bg-primary-light hover:text-primary"
          }
        `}
      >
        {item.icon}
        <span className="font-semibold text-[15px]">{item.label}</span>
      </div>
    );
  };

  /* ---------------- RENDER NAV ITEM ---------------- */
  const renderNavItem = (item) => {
    if (item.dropdown && item.dropdown.length > 0) {
      // Check if any dropdown item has nestedDropdown (Services section)
      const hasNested = item.dropdown.some((subItem) => subItem.nestedDropdown);
      if (hasNested) {
        return renderDropdownWithNested(item);
      }
      return renderRegularDropdown(item);
    } else {
      return renderSimpleLink(item);
    }
  };

  return (
    <>
      {/* ---------------- OVERLAY ---------------- */}
      <div
        onClick={toggleMenu}
        className={`
          fixed inset-0 z-40
          bg-black/40
          backdrop-blur-sm
          transition-all duration-300
          md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* ---------------- SIDEBAR ---------------- */}
      <aside
        className={`
          fixed top-0 right-0 z-50
          h-full w-[380px]
          bg-white/95
          backdrop-blur-2xl
          border-l border-white/40
          shadow-[0_20px_80px_rgba(15,23,42,0.18)]
          transition-all duration-300
          flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-between p-6 border-b border-border">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-blue-500
                  to-blue-700
                  flex items-center justify-center
                  shadow-lg
                "
              >
                <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="white" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text">SWC</h1>
                <p className="text-xs text-text-light">Skilled Workers Cloud</p>
              </div>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={toggleMenu}
              className="
                w-11 h-11
                rounded-xl
                bg-primary-light
                flex items-center justify-center
                hover:bg-primary
                hover:text-white
                transition-all duration-300
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ---------------- NAVIGATION (SCROLLABLE) ---------------- */}
        <nav
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-4
            py-5
            scroll-smooth
          "
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 #F1F5F9",
          }}
        >
          {sidebarLinks.map((item) => renderNavItem(item))}
        </nav>

        {/* ---------------- FOOTER ---------------- */}
        <div className="flex-shrink-0">
          <div className="border-t border-border p-5">
            {!isAuthenticated && (
              <button
                onClick={() => {
                  navigate("/signin");
                  toggleMenu();
                }}
                className="btn btn-primary w-full py-4"
              >
                <User className="w-5 h-5" />
                <span>Get Started</span>
              </button>
            )}

            {isAuthenticated && userData?.user_type === 4 && (
              <button
                onClick={handleLogout}
                className="btn btn-danger w-full py-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}

            {isAuthenticated && userData?.user_type !== 4 && (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  toggleMenu();
                }}
                className="btn btn-primary w-full py-4"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        nav::-webkit-scrollbar {
          width: 6px;
        }
        nav::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        nav::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
};

export default SideBar;