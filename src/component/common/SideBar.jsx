import React, { useState, useEffect } from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

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
} from "lucide-react";

const SideBar = ({
  toggleMenu,
  isOpen,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- SIDEBAR LINKS ---------------- */

  const sidebarLinks = [
    {
      id: "about",
      label: "About",
      icon: <Info className="w-5 h-5" />,
      dropdown: [
        {
          id: "company",
          label: "Company",
          path: "/company",
        },
        {
          id: "team",
          label: "Our Team",
          path: "/team",
        },
      ],
    },
    {
      id: "services",
      label: "Services",
      icon: <Briefcase className="w-5 h-5" />,
      dropdown: [
        {
          id: "visa",
          label: "Visa Services",
          path: "/visa-services",
        },
        {
          id: "immigration",
          label: "Immigration",
          path: "/immigration",
        },
        {
          id: "compliance",
          label: "HR Compliance",
          path: "/hr-compliance",
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
      label: "Self Sponsorship",
      path: "/self-sponsorship",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      id: "tools",
      label: "Tools",
      icon: <Wrench className="w-5 h-5" />,
      dropdown: [
        {
          id: "calculator",
          label: "Visa Calculator",
          path: "/visa-calculator",
        },
        {
          id: "eligibility",
          label: "Eligibility Checker",
          path: "/eligibility-checker",
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
  const userData = {
    user_type: 2,
  };

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

  /* ---------------- ACTIVE PATH ---------------- */

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  /* ---------------- NAVIGATION ---------------- */

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdowns({});
    toggleMenu();
  };

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    navigate("/");
    toggleMenu();
  };

  /* ---------------- DROPDOWN ITEM ---------------- */

  const renderDropdownItem = (item, level = 1) => {
    const hasSubDropdown = item.dropdown && item.dropdown.length > 0;
    const dropdownKey = `${item.id}-${level}`;
    const isOpen = openDropdowns[dropdownKey];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id}>
        {hasSubDropdown ? (
          <>
            <div
              onClick={() => toggleDropdown(dropdownKey)}
              className={`
                flex items-center justify-between
                px-4 py-3
                rounded-2xl
                cursor-pointer
                transition-all duration-300
                ${level > 1 ? "ml-6" : "ml-3"}
                ${isOpen 
                  ? "bg-primary-light text-primary" 
                  : "text-text-light hover:bg-primary-light hover:text-primary"
                }
              `}
            >
              <span className="font-medium text-sm">
                {item.label}
              </span>
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
              <div className="mt-2 space-y-1">
                {item.dropdown.map((subItem) =>
                  renderDropdownItem(subItem, level + 1)
                )}
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={() => handleNavigate(item.path)}
            className={`
              flex items-center
              px-4 py-3
              rounded-2xl
              cursor-pointer
              transition-all duration-300
              ${level > 1 ? "ml-6" : "ml-3"}
              ${isActive
                ? `
                  bg-gradient-to-r
                  from-blue-500
                  to-blue-700
                  text-white
                  shadow-lg
                `
                : `
                  text-text-light
                  hover:bg-primary-light
                  hover:text-primary
                `
              }
            `}
          >
            <span className="font-medium text-sm">
              {item.label}
            </span>
          </div>
        )}
      </div>
    );
  };

  /* ---------------- NAV ITEM ---------------- */

  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isOpen = openDropdowns[item.id];
    const isActive = item.path && isActivePath(item.path);

    return (
      <div key={item.id} className="mb-2">
        {hasDropdown ? (
          <>
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
                <span className="font-semibold text-[15px]">
                  {item.label}
                </span>
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
                ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="mt-2 space-y-1">
                {item.dropdown.map((dropdownItem) =>
                  renderDropdownItem(dropdownItem)
                )}
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={() => handleNavigate(item.path)}
            className={`
              flex items-center gap-3
              px-4 py-4
              rounded-2xl
              cursor-pointer
              transition-all duration-300
              ${isActive
                ? `
                  bg-gradient-to-r
                  from-blue-500
                  to-blue-700
                  text-white
                  shadow-lg
                `
                : `
                  text-text-light
                  hover:bg-primary-light
                  hover:text-primary
                `
              }
            `}
          >
            {item.icon}
            <span className="font-semibold text-[15px]">
              {item.label}
            </span>
          </div>
        )}
      </div>
    );
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
          h-full w-[340px]
          bg-white/90
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
          <div
            className="
              flex items-center justify-between
              p-6
              border-b border-border
            "
          >
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
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="white"
                    strokeWidth="4"
                  />
                  <path
                    d="M16 24L24 14L32 24L24 34L16 24Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text">
                  SWC
                </h1>
                <p className="text-xs text-text-light">
                  Skilled Workers Cloud
                </p>
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
                className="
                  btn btn-primary
                  w-full
                  py-4
                "
              >
                <User className="w-5 h-5" />
                <span>Get Started</span>
              </button>
            )}

            {isAuthenticated && userData?.user_type === 4 && (
              <button
                onClick={handleLogout}
                className="
                  btn btn-danger
                  w-full
                  py-4
                "
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
                className="
                  btn btn-primary
                  w-full
                  py-4
                "
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
        /* For Webkit browsers (Chrome, Safari, Edge) */
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