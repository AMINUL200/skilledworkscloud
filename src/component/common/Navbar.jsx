import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});
  const closeTimers = useRef({}); // ← delay timers per item id
  const navigate = useNavigate();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- HOVER HELPERS ---------------- */
  const openMenu = (id) => {
    // Cancel any pending close for this id
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

  /* ---------------- NAVIGATION LINKS ---------------- */
  const navLinks = [
    {
      id: "about",
      label: "About",
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
      path: "/services", // Added path for services page
      megaMenu: true,
      sections: [
        {
          title: "Sponsorship Licence",
          links: [
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
        {
          title: "Immigration Compliance",
          links: [
            { label: "Civil Penalty", path: "/services/civil-penalty" },
            {
              label: "HO Compliance Visit",
              path: "/services/ho-compliance-visit",
            },
            {
              label: "Right to Work Check",
              path: "/services/right-to-work-check",
            },
          ],
        },
        {
          title: "Skilled Worker Visas",
          links: [
            {
              label: "Skilled Worker Visa",
              path: "/services/skilled-worker-visa",
            },
            {
              label: "Minister of Religion Visa",
              path: "/services/minister-of-religion-visa",
            },
            { label: "Health Care Visa", path: "/services/health-care-visa" },
          ],
        },
        {
          title: "Temporary (Tier 5) Visas",
          links: [
            {
              label: "Religious Worker Visa",
              path: "/services/religious-worker-visa",
            },
            {
              label: "Creative Worker Visa",
              path: "/services/creative-worker-visa",
            },
            {
              label: "Charity Worker Visa",
              path: "/services/charity-worker-visa",
            },
          ],
        },
        {
          title: "Partner and Family Visas",
          links: [
            { label: "Spouse Visa", path: "/services/spouse-visa" },
            { label: "Dependent Visa", path: "/services/dependent-visa" },
            {
              label: "Unmarried Partner Visa",
              path: "/services/unmarried-partner-visa",
            },
          ],
        },
        {
          title: "Global Business Mobility",
          links: [
            {
              label: "Graduate Trainee Visa",
              path: "/services/graduate-trainee-visa",
            },
            {
              label: "UK Expansion Worker Visa",
              path: "/services/uk-expansion-worker-visa",
            },
            {
              label: "Specialist Worker Visa",
              path: "/services/specialist-worker-visa",
            },
          ],
        },
        {
          title: "Standard Visitor Visa",
          links: [
            { label: "Tourist Visa", path: "/services/tourist-visa" },
            { label: "Business Visit", path: "/services/business-visit" },
            { label: "UK Fiancé Visa", path: "/services/uk-fiance-visa" },
          ],
        },
        {
          title: "Study Visas",
          links: [
            { label: "Student Visa", path: "/services/student-visa" },
            {
              label: "Child Student Visa",
              path: "/services/child-student-visa",
            },
            { label: "Graduate Visa", path: "/services/graduate-visa" },
          ],
        },
        {
          title: "Business Visas",
          links: [
            {
              label: "Self-Sponsorship In UK",
              path: "/services/self-sponsorship",
            },
            {
              label: "Innovator Founder Visa",
              path: "/services/innovator-founder-visa",
            },
            {
              label: "Turkish Businessperson Visa",
              path: "/services/turkish-businessperson-visa",
            },
          ],
        },
        {
          title: "Scale Up Visa",
          links: [
            { label: "Scale-up Visa", path: "/services/scale-up-visa" },
            {
              label: "Scale-up Sponsor Licence",
              path: "/services/scale-up-sponsor-licence",
            },
            { label: "Scale up Business", path: "/services/scale-up-business" },
          ],
        },
      ],
    },
    {
      id: "sponsor",
      label: "Sponsor Licence Checker",
      path: "/sponsor-checker",
    },
    { id: "self", label: "Self-Sponsorship", path: "/self-sponsorship" },
    {
      id: "tools",
      label: "Tools",
      dropdown: [
        {
          id: "ihs",
          label: "IHS & Visa Fee Calculator",
          path: "/ihs-visa-fee-calculator",
        },
        { id: "ilr", label: "ILR Calculator", path: "/ilr-calculator" },
        {
          id: "supplementary",
          label: "Supplementary Employment",
          path: "/supplementary-employment",
        },
        {
          id: "temp-shortage",
          label: "Temp Shortage Occupation",
          path: "/temp-shortage-occupation",
        },
        { id: "rqf", label: "RQF Level 6", path: "/rqf-level-6" },
      ],
    },
    { id: "hr", label: "HR Compliance", path: "/hr-compliance" },
    { id: "blogs", label: "Blogs", path: "/blogs" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  /* ---------------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;
      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) clickedOutside = false;
      });
      // Also check if click is inside any mega panel (fixed, outside DOM tree)
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
            {/* NAV TRIGGER BUTTON - Now clickable to navigate to services page */}
            <button
              onClick={() => {
                if (item.path) {
                  handleNavigate(item.path);
                }
              }}
              className="
                flex items-center gap-1
                text-[11px]
                min-[1286px]:text-[15px]
                font-medium
                text-text-light
                hover:text-primary
                transition-all duration-300
              "
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`
                  w-4 h-4 transition-transform duration-300
                  ${isOpen ? "rotate-180 text-primary" : ""}
                `}
              />
            </button>

            {/* ===== MEGA MENU ===== */}
            {item.megaMenu ? (
              <div
                data-mega-panel
                onMouseEnter={() => openMenu(item.id)}
                onMouseLeave={() => closeMenu(item.id)}
                className={`
                  fixed left-0 w-screen bg-white
                  border-t border-gray-100
                  shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                  z-[999]
                  transition-all duration-300 ease-out
                  ${
                    isOpen
                      ? "opacity-100 visible translate-y-0 pointer-events-auto"
                      : "opacity-0 invisible -translate-y-2 pointer-events-none"
                  }
                `}
                style={{ top: scrolled ? "72px" : "90px" }}
              >
                <div className="w-full px-10 py-10">
                  {/* View All Services Link */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <RouterLink
                      to="/services"
                      onClick={() => setOpenDropdowns({})}
                      className="
                        inline-flex items-center gap-2
                        text-primary font-semibold text-sm
                        hover:gap-3 transition-all duration-300
                      "
                    >
                      View All Services
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </RouterLink>
                  </div>

                  <div
                    className="grid gap-x-8 gap-y-10 mx-auto"
                    style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
                  >
                    {item.sections?.map((section, index) => (
                      <div key={index} className="min-w-0">
                        <h3
                          className="
                            text-[13px] font-bold uppercase tracking-wider
                            text-primary
                            mb-4 pb-2
                            border-b-2 border-primary/20
                          "
                        >
                          {section.title}
                        </h3>
                        <div className="space-y-2">
                          {section.links.map((link, i) => (
                            <RouterLink
                              key={i}
                              to={link.path}
                              onClick={() => setOpenDropdowns({})}
                              className="
                                block
                                text-[14px] text-gray-600
                                hover:text-primary hover:translate-x-1
                                transition-all duration-200
                                leading-snug
                              "
                            >
                              {link.label}
                            </RouterLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
              </div>
            ) : (
              /* ===== NORMAL DROPDOWN ===== */
              <div
                className={`
                  absolute top-full left-0 mt-5
                  w-72
                  bg-white/95 backdrop-blur-xl
                  border border-white/50
                  rounded-3xl
                  shadow-[0_20px_60px_rgba(15,23,42,0.12)]
                  p-3 z-50
                  transition-all duration-300
                  ${
                    isOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-3"
                  }
                `}
              >
                <div className="space-y-1">
                  {item.dropdown?.map((subItem) => (
                    <RouterLink
                      key={subItem.id}
                      to={subItem.path}
                      onClick={() => setOpenDropdowns({})}
                      className="
                        flex items-center
                        px-4 py-3 rounded-2xl
                        text-[15px] font-medium
                        text-text-light
                        hover:bg-primary-light hover:text-primary
                        transition-all duration-300
                      "
                    >
                      {subItem.label}
                    </RouterLink>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => handleNavigate(item.path)}
            className="
              text-[11px]
              min-[1286px]:text-[15px] font-medium
              text-text-light
              hover:text-primary
              transition-all duration-300
            "
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
        transition-all duration-300
        ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"}
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
              src="/image/swc_logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-5">
          <nav
            className="
              flex items-center gap-8
              bg-white/80 backdrop-blur-xl
              border border-white/50
              rounded-full
              px-8 py-4
              shadow-[0_8px_30px_rgba(15,23,42,0.08)]
            "
          >
            {navLinks.map((item) => renderNavItem(item))}
          </nav>

          <button
            className="
              px-2 py-2
              min-[1286px]:px-7
              min-[1286px]:py-3 rounded-2xl
              bg-primary text-white font-semibold
              hover:scale-105 transition-all duration-300
            "
          >
            Get Started
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="
              w-11 h-11 rounded-xl bg-white
              border border-border
              flex items-center justify-center shadow-sm
            "
          >
            <Menu className="w-6 h-6 text-text" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;