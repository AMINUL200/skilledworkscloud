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

const SideBar = ({ toggleMenu, isOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [openNestedDropdowns, setOpenNestedDropdowns] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- SIDEBAR LINKS WITH NESTED SERVICES ---------------- */
  const sidebarLinks = [
    {
      id: "about",
      label: "About",
      icon: <Info className="w-5 h-5" />,
      dropdown: [
        { id: "about-us", label: "About Us", path: "/about-us" },
        { id: "team", label: "Our Team", path: "/team" },
        {
          id: "csr",
          label: "Corporate Social Responsibility",
          path: "/corporate-social-responsibility",
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      dropdown: [
        {
          id: "sponsorship-licence",
          label: "Sponsorship Licence",
          nestedDropdown: [
            { label: "Sponsor Licence Renewal", path: "/services/sponsor-licence-renewal" },
            { label: "Sponsor Licence Suspension", path: "/services/sponsor-licence-suspension" },
            { label: "Sponsor Licence Application", path: "/services/sponsor-licence-application" },
          ],
        },
        {
          id: "immigration-compliance",
          label: "Immigration Compliance",
          nestedDropdown: [
            { label: "Civil Penalty", path: "/services/civil-penalty" },
            { label: "HO Compliance Visit", path: "/services/ho-compliance-visit" },
            { label: "Right to Work Check", path: "/services/right-to-work-check" },
          ],
        },
        {
          id: "skilled-worker-visas",
          label: "Skilled Worker Visas",
          nestedDropdown: [
            { label: "Skilled Worker Visa", path: "/services/skilled-worker-visa" },
            { label: "Minister of Religion Visa", path: "/services/minister-of-religion-visa" },
            { label: "Health Care Visa", path: "/services/health-care-visa" },
          ],
        },
        {
          id: "temporary-visas",
          label: "Temporary (Tier 5) Visas",
          nestedDropdown: [
            { label: "Religious Worker Visa", path: "/services/religious-worker-visa" },
            { label: "Creative Worker Visa", path: "/services/creative-worker-visa" },
            { label: "Charity Worker Visa", path: "/services/charity-worker-visa" },
          ],
        },
        {
          id: "partner-family-visas",
          label: "Partner and Family Visas",
          nestedDropdown: [
            { label: "Spouse Visa", path: "/services/spouse-visa" },
            { label: "Dependent Visa", path: "/services/dependent-visa" },
            { label: "Unmarried Partner Visa", path: "/services/unmarried-partner-visa" },
          ],
        },
        {
          id: "global-business-mobility",
          label: "Global Business Mobility",
          nestedDropdown: [
            { label: "Graduate Trainee Visa", path: "/services/graduate-trainee-visa" },
            { label: "UK Expansion Worker Visa", path: "/services/uk-expansion-worker-visa" },
            { label: "Specialist Worker Visa", path: "/services/specialist-worker-visa" },
          ],
        },
        {
          id: "standard-visitor-visa",
          label: "Standard Visitor Visa",
          nestedDropdown: [
            { label: "Tourist Visa", path: "/services/tourist-visa" },
            { label: "Business Visit", path: "/services/business-visit" },
            { label: "UK Fiancé Visa", path: "/services/uk-fiance-visa" },
          ],
        },
        {
          id: "study-visas",
          label: "Study Visas",
          nestedDropdown: [
            { label: "Student Visa", path: "/services/student-visa" },
            { label: "Child Student Visa", path: "/services/child-student-visa" },
            { label: "Graduate Visa", path: "/services/graduate-visa" },
          ],
        },
        {
          id: "business-visas",
          label: "Business Visas",
          nestedDropdown: [
            { label: "Self-Sponsorship In UK", path: "/services/self-sponsorship" },
            { label: "Innovator Founder Visa", path: "/services/innovator-founder-visa" },
            { label: "Turkish Businessperson Visa", path: "/services/turkish-businessperson-visa" },
          ],
        },
        {
          id: "scale-up-visa",
          label: "Scale Up Visa",
          nestedDropdown: [
            { label: "Scale-up Visa", path: "/services/scale-up-visa" },
            { label: "Scale-up Sponsor Licence", path: "/services/scale-up-sponsor-licence" },
            { label: "Scale up Business", path: "/services/scale-up-business" },
          ],
        },
      ],
    },
    {
      id: "sponsor",
      label: "Sponsor Licence Checker",
      path: "/sponsor-checker",
      icon: <FileCheck className="w-5 h-5" />,
    },
    {
      id: "self",
      label: "Self-Sponsorship",
      path: "/self-sponsorship",
      icon: <ShieldCheck className="w-5 h-5" />,
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
          icon: <FileCheck className="w-4 h-4" />
        },
        { 
          id: "sponsor-status", 
          label: "Sponsor Licence Status Check", 
          path: "/tools/sponsor-licence-status-check",
          icon: <Search className="w-4 h-4" />
        },
        { 
          id: "ilr-eligibility", 
          label: "ILR Eligibility - Free Assessment", 
          path: "/tools/ilr-eligibility",
          icon: <ClipboardCheck className="w-4 h-4" />
        },
        { 
          id: "ihs", 
          label: "IHS & Visa Fee Calculator", 
          path: "/tools/ihs-visa-fee-calculator",
          icon: <Calculator className="w-4 h-4" />
        },
        { 
          id: "right-to-work", 
          label: "Right To Work Check", 
          path: "/tools/right-to-work-check",
          icon: <CheckSquare className="w-4 h-4" />
        },
        { 
          id: "additional-work", 
          label: "Can I Take Additional Work?", 
          path: "/tools/can-i-take-additional-work",
          icon: <BriefcaseIcon className="w-4 h-4" />
        },
        { 
          id: "sponsored-job", 
          label: "Looking for a Sponsored Job?", 
          path: "/tools/looking-for-sponsored-job",
          icon: <Users className="w-4 h-4" />
        },
        { 
          id: "hr-audit", 
          label: "Get Free HR Compliance Audit", 
          path: "/tools/free-hr-compliance-audit",
          icon: <AlertCircle className="w-4 h-4" />
        },
        // Divider - Resources & Additional Tools
        {
          id: "divider-1",
          type: "divider",
          label: "Resources & Additional Tools",
        },
        { 
          id: "temporary-shortage", 
          label: "Temporary Shortage Occupation", 
          path: "/tools/temporary-shortage-occupation",
          icon: <Clock className="w-4 h-4" />
        },
        { 
          id: "rqf-level", 
          label: "RQF Level 6", 
          path: "/tools/rqf-level-6",
          icon: <GraduationCap className="w-4 h-4" />
        },
        { 
          id: "wpc-calculator", 
          label: "WPC Visa Fee Calculator", 
          path: "/tools/wpc-visa-fee-calculator",
          icon: <Calculator className="w-4 h-4" />
        },
        { 
          id: "supplementary", 
          label: "Supplementary Employment", 
          path: "/tools/supplementary-employment",
          icon: <BriefcaseIcon className="w-4 h-4" />
        },
      ],
    },
    {
      id: "hr",
      label: "HR Compliance",
      path: "/hr-compliance",
      icon: <Building2 className="w-5 h-5" />,
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
            ${isOpen
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
                  ${isActivePath(item.path)
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
            ${isOpen
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
                    {renderNestedDropdownItems(subItem.nestedDropdown, subItem.id)}
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
                      ${isActivePath(subItem.path)
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
            ${isOpen
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
                    ${isActivePath(subItem.path)
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
          ${isActive
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
      const hasNested = item.dropdown.some(subItem => subItem.nestedDropdown);
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
                  <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="4" />
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
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E1 #F1F5F9'
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
              <button onClick={handleLogout} className="btn btn-danger w-full py-4">
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
          background: #F1F5F9;
          border-radius: 10px;
        }
        nav::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </>
  );
};

export default SideBar;