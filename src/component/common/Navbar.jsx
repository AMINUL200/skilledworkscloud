import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";

const Navbar = ({ toggleMenu }) => {
  const { services, loading } = useApp();

  console.log("services info :: ", services);

  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const closeTimers = useRef({});
  const navigate = useNavigate();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- HOVER HELPERS ---------------- */
  const openMenu = (id) => {
    if (closeTimers.current[id]) {
      clearTimeout(closeTimers.current[id]);
      closeTimers.current[id] = null;
    }
    setOpenDropdowns({ [id]: true });
  };

  const closeMenu = (id, delay = 120) => {
    closeTimers.current[id] = setTimeout(() => {
      setOpenDropdowns((prev) => {
        if (!prev[id]) return prev;
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, delay);
  };

  /* ---------------- DYNAMIC SERVICES SECTIONS ---------------- */
  const getServiceSections = () => {
    if (!services || services.length === 0) return [];

    return services.map((service) => ({
      title: service.name,
      links:
        service.subcategories?.map((sub) => ({
          label: sub.name,
          path: `/services/${sub.slug}`,
        })) || [],
    }));
  };

  /* ---------------- NAVIGATION LINKS ---------------- */
  const navLinks = [
    {
      id: "about",
      label: "About",
      dropdown: [
        { id: "about-us", label: "About Us", path: "/about-us" },
        { id: "team", label: "Our Team", path: "/team" },
        // {
        //   id: "csr",
        //   label: "Corporate Social Responsibility",
        //   path: "/corporate-social-responsibility",
        // },
      ],
    },
    {
      id: "services",
      label: "Services",
      path: "/services",
      megaMenu: true,
      sections: getServiceSections(),
    },
    { id: "hr", label: "HR Compliance", path: "/hr-compliance" },
    { id: "self", label: "Self-Sponsorship", path: "/self-sponsorship" },
    {
      id: "sponsor",
      label: "Sponsor Licence Checker",
      path: "/sponsor-checker",
    },
    {
      id: "tools",
      label: "Tools",
      dropdown: [
        {
          id: "sponsor-licence",
          label: "Get Your Sponsor Licence Today",
          path: "/tool/sponsor-license-eligibility",
        },
        {
          id: "sponsor-status",
          label: "Sponsor Licence Status Check",
          path: "/tool/sponsored-licence-status-check",
        },
        {
          id: "ilr-eligibility",
          label: "ILR Eligibility - Free Assessment",
          path: "/tool/ilr-eligibility-calculator",
        },
        {
          id: "ihs",
          label: "IHS & Visa Fee Calculator",
          path: "/tool/ish-visa-fee-calculator",
        },
        {
          id: "right-to-work",
          label: "Right To Work Check",
          path: "/tool/right-to-work",
        },
        {
          id: "additional-work",
          label: "Can I Take Additional Work?",
          path: "/tool/can-i-take-additional-work",
        },
        {
          id: "sponsored-job",
          label: "Looking for a Sponsored Job?",
          path: "/tool/sponsored-job-eligibility",
        },
        {
          id: "hr-audit",
          label: "Get Free HR Compliance Audit",
          path: "/tool/free-hr-compliance-audit",
        },

        // Divider Title
        {
          id: "divider",
          type: "divider",
          label: "Resources & Additional Tools",
        },

        {
          id: "temporary-shortage",
          label: "Temporary Shortage Occupation",
          path: "/tools/temporary-shortage-occupation",
        },
        {
          id: "rqf-level",
          label: "RQF Level 6",
          path: "/tools/rqf-level-6",
        },
        {
          id: "wpc-calculator",
          label: "WPC Visa Fee Calculator",
          path: "/tools/wpc-visa-fee-calculator",
        },
        {
          id: "supplementary",
          label: "Supplementary Employment",
          path: "/tools/supplementary-employment",
        },
      ],
    },
    {
      id: "calculator",
      label: "Calculator",
      dropdown: [
        {
          id: "tax-calculator",
          label: "Salary Calculator",
          path: "/salary-calculator",
        },
        {
          id: "percentage-calculator",
          label: "Percentage Calculator",
          path: "/percentage-calculator",
        },
       

      
      ],
    },

    // { id: "tax-calculator", label: "Tax Calculator", path: "/tax-calculator" },
    { id: "blogs", label: "Blogs", path: "/blogs" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  // Update services sections when services data changes
  const servicesNavItem = navLinks.find((item) => item.id === "services");
  if (servicesNavItem) {
    servicesNavItem.sections = getServiceSections();
  }

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) clickedOutside = false;
      });
      document.querySelectorAll("[data-mega-panel]").forEach((el) => {
        if (el.contains(event.target)) clickedOutside = false;
      });
      if (clickedOutside) setOpenDropdowns({});
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  /* ---------------- NAV ITEM RENDERER ---------------- */
  const renderNavItem = (item) => {
    const hasDropdown =
      (item.dropdown && item.dropdown.length > 0) || item.megaMenu;
    const isOpen = !!openDropdowns[item.id];

    // Check if it's a services mega menu and has no sections yet
    if (
      item.id === "services" &&
      (!item.sections || item.sections.length === 0)
    ) {
      return (
        <div
          key={item.id}
          className="relative"
          ref={(el) => (dropdownRefs.current[item.id] = el)}
          onMouseEnter={() => openMenu(item.id)}
          onMouseLeave={() => closeMenu(item.id)}
        >
          <button
            onClick={() => {
              if (item.path) {
                handleNavigate(item.path);
              }
            }}
            className="flex items-center gap-1 text-[11px] min-[1286px]:text-[12px] font-medium text-text-light hover:text-primary transition-all duration-300"
          >
            <span>{item.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
            />
          </button>
        </div>
      );
    }

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
        onMouseEnter={() => openMenu(item.id)}
        onMouseLeave={() => closeMenu(item.id)}
      >
        {hasDropdown ? (
          <>
            <button
              onClick={() => {
                if (item.path) {
                  handleNavigate(item.path);
                }
              }}
              className="flex items-center gap-1 text-[11px] min-[1286px]:text-[14px] font-medium text-text-light hover:text-primary transition-all duration-300"
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>

            {/* ===== MEGA MENU - Responsive Width ===== */}
            {item.megaMenu ? (
              <div
                data-mega-panel
                onMouseEnter={() => openMenu(item.id)}
                onMouseLeave={() => closeMenu(item.id)}
                className={`
                  fixed left-0 right-0
                  bg-surface
                  rounded-none lg:rounded-[32px]
                  border-t lg:border-t-0 border-border
                  shadow-card
                  z-[999]
                  transition-all duration-300 ease-out
                  ${isOpen ? "opacity-100 visible translate-y-0 pointer-events-auto" : "opacity-0 invisible -translate-y-2 pointer-events-none"}
                `}
                style={{ top: scrolled ? "72px" : "90px" }}
              >
                <div className="w-full px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
                  {/* View All Services Link */}
                  <div className="mb-6 pb-4 border-b border-border">
                    <RouterLink
                      to="/services"
                      onClick={() => setOpenDropdowns({})}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
                    >
                      View All Services
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </RouterLink>
                  </div>

                  {/* Dynamic Responsive Grid */}
                  {item.sections && item.sections.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">
                      {item.sections.map((section, index) => (
                        <div key={index} className="min-w-0">
                          <h3 className="text-[12px] lg:text-[13px] font-bold uppercase tracking-wider text-primary mb-3 pb-2 border-b-2 border-primary/20">
                            {section.title}
                          </h3>
                          <div className="space-y-2">
                            {section.links.length > 0 ? (
                              section.links.map((link, i) => (
                                <RouterLink
                                  key={i}
                                  to={link.path}
                                  onClick={() => setOpenDropdowns({})}
                                  className="block text-[13px] lg:text-[14px] text-text-light hover:text-primary hover:translate-x-1 transition-all duration-200 leading-snug"
                                >
                                  {link.label}
                                </RouterLink>
                              ))
                            ) : (
                              <p className="text-[13px] text-text-muted italic">
                                No subcategories yet
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-text-light">Loading services...</p>
                    </div>
                  )}
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
              </div>
            ) : (
              /* ===== NORMAL DROPDOWN WITH SCROLL ===== */
              <div
                className={`
                  absolute top-full left-0 mt-5
                  w-64 sm:w-72
                  bg-surface/95 backdrop-blur-xl
                  border border-border/50
                  rounded-2xl sm:rounded-3xl
                  shadow-card
                  p-2 sm:p-3 z-50
                  transition-all duration-300
                  ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3"}
                `}
              >
                {/* Scrollable container with fixed height */}
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                  <div className="space-y-1">
                    {item.dropdown?.map((subItem) => {
                      // Check if it's a divider
                      if (subItem.type === "divider") {
                        return (
                          <div
                            key={subItem.id}
                            className="px-3 sm:px-4 py-2 mt-2 border-t border-border"
                          >
                            <span className="text-[11px] uppercase font-bold text-text-muted tracking-wider">
                              {subItem.label}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <RouterLink
                          key={subItem.id}
                          to={subItem.path}
                          onClick={() => setOpenDropdowns({})}
                          className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[14px] sm:text-[15px] font-medium text-text-light hover:text-white hover:bg-primary transition-all duration-300"
                        >
                          {subItem.label}
                        </RouterLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => handleNavigate(item.path)}
            className="text-[11px] min-[1286px]:text-[14px] font-medium text-text-light hover:text-primary transition-all duration-300"
          >
            {item.label}
          </button>
        )}
      </div>
    );
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 bg-surface
        ${scrolled ? "bg-surface backdrop-blur-xl shadow-card" : "bg-transparent"}
      `}
    >
      <div className="max-w-[1450px] mx-auto px-5 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-28 h-24 rounded-2xl flex items-center justify-center">
            <img
              src="/image/swc_logo_2.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-5">
          <nav className="flex items-center gap-6 xl:gap-8 bg-surface backdrop-blur-xl px-6 xl:px-8 py-3 xl:py-4 rounded-2xl shadow-card">
            {navLinks.map((item) => renderNavItem(item))}
          </nav>

          <button
            onClick={() =>
              window.open(
                "https://skilledworkerscloud.co.uk/hrms-v2/register",
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="btn btn-primary px-3 py-2 min-[1286px]:px-7 min-[1286px]:py-3 text-sm min-[1286px]:text-base"
          >
            SponicHr Login
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center shadow-sm"
          >
            <Menu className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--color-muted);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-text-muted);
        }
      `}</style>
    </header>
  );
};

export default Navbar;