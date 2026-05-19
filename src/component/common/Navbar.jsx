import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Menu, ChevronDown, Search } from "lucide-react";

const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);

  const [openDropdowns, setOpenDropdowns] = useState({});

  const dropdownRefs = useRef({});

  const navigate = useNavigate();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- NAVIGATION LINKS ---------------- */
  const navLinks = [
    {
      id: "about",
      label: "About",
      dropdown: [
        {
          id: "about-us",
          label: "About Us",
          path: "/about-us",
        },
        {
          id: "team",
          label: "Our Team",
          path: "/team",
        },
        {
          id : "corporate-social-responsibility",
          label: "Corporate Social Responsibility",
          path: "/corporate-social-responsibility",
        }
      ],
    },

    {
      id: "services",
      label: "Services",
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
    },

    {
      id: "self",
      label: "Self-Sponsorship",
      path: "/self-sponsorship",
    },

    {
      id: "tools",
      label: "Tools",
      dropdown: [
        {
          id: "ihs-calculator",
          label: "IHS & Visa Fee Calculator",
          path: "/ihs-visa-fee-calculator",
        },

        {
          id: "ilr-calculator",
          label: "ILR Calculator",
          path: "/ilr-calculator",
        },

        {
          id: "supplementary-employment",
          label: "Supplementary Employment",
          path: "/supplementary-employment",
        },

        {
          id: "temp-shortage",
          label: "Temp Shortage Occupation",
          path: "/temp-shortage-occupation",
        },

        {
          id: "rqf-level",
          label: "RQF Level 6",
          path: "/rqf-level-6",
        },
      ],
    },

    {
      id: "hr",
      label: "HR Compliance",
      path: "/hr-compliance",
    },

    {
      id: "blogs",
      label: "Blogs",
      path: "/blogs",
    },

    {
      id: "contact",
      label: "Contact",
      path: "/contact",
    },
  ];

  /* ---------------- CLOSE DROPDOWN OUTSIDE ---------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      let clickedOutside = true;

      Object.values(dropdownRefs.current).forEach((ref) => {
        if (ref && ref.contains(event.target)) {
          clickedOutside = false;
        }
      });

      if (clickedOutside) {
        setOpenDropdowns({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- NAVIGATION ---------------- */
  const handleNavigate = (path) => {
    navigate(path);
    setOpenDropdowns({});
  };

  /* ---------------- NAV ITEM ---------------- */
  const renderNavItem = (item) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;

    const isOpen = openDropdowns[item.id];

    return (
      <div
        key={item.id}
        className="relative"
        ref={(el) => (dropdownRefs.current[item.id] = el)}
        onMouseEnter={() =>
          setOpenDropdowns({
            [item.id]: true,
          })
        }
        onMouseLeave={() => setOpenDropdowns({})}
      >
        {hasDropdown ? (
          <>
            {/* NAV BUTTON */}
            <button
              className="
                flex items-center gap-1
                text-[15px]
                font-medium
                text-text-light
                hover:text-primary
                transition-all duration-300
              "
            >
              <span>{item.label}</span>

              <ChevronDown
                className={`
                  w-4 h-4
                  transition-all duration-300
                  ${isOpen ? "rotate-180 text-primary" : ""}
                `}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`
                absolute top-full left-0 mt-5
                w-72
                bg-white/95
                backdrop-blur-xl
                border border-white/50
                rounded-3xl
                shadow-[0_20px_60px_rgba(15,23,42,0.12)]
                p-3
                z-50

                transition-all duration-300

                ${
                  isOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-3"
                }
              `}
            >
              <div className="space-y-1">
                {item.dropdown.map((subItem) => (
                  <RouterLink
                    key={subItem.id}
                    to={subItem.path}
                    onClick={() => setOpenDropdowns({})}
                    className="
                        flex items-center
                        px-4 py-3
                        rounded-2xl

                        text-[15px]
                        font-medium

                        text-text-light

                        hover:bg-primary-light
                        hover:text-primary

                        transition-all duration-300
                      "
                  >
                    {subItem.label}
                  </RouterLink>
                ))}
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={() => handleNavigate(item.path)}
            className="
              text-[15px]
              font-medium
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

        ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm "
            : "bg-transparent "
        }
      `}
    >
      <div
        className="
          max-w-[1450px]
          mx-auto
          px-5 lg:px-8

          flex items-center justify-between
        "
      >
        {/* ---------------- LOGO ---------------- */}
        <div
          className="
            flex items-center gap-3
            cursor-pointer
          "
          onClick={() => navigate("/")}
        >
          {/* LOGO ICON */}
          <div
            className="
              w-28 h-26
              rounded-2xl

             
              flex items-center justify-center

           
            "
          >
            <img src="/image/swc_logo.png" alt="logo" className="w-full h-full"  />
          </div>

        </div>

        {/* ---------------- DESKTOP NAV ---------------- */}
        <div
          className="
            hidden lg:flex
            items-center gap-5
          "
        >
          {/* NAVIGATION */}
          <nav
            className="
              flex items-center gap-8

              bg-white/80
              backdrop-blur-xl

              border border-white/50

              rounded-full

              px-8 py-4

              shadow-[0_8px_30px_rgba(15,23,42,0.08)]
            "
          >
            {navLinks.map((item) => renderNavItem(item))}
          </nav>

          

          {/* CTA BUTTON */}
          <button
            className="
              btn btn-primary
              px-7 py-3
            "
          >
            Get Started
          </button>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="
              w-11 h-11

              rounded-xl

              bg-white

              border border-border

              flex items-center justify-center

              shadow-sm
            "
          >
            <Menu
              className="
                w-6 h-6
                text-text
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
