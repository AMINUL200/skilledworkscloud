import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronUp,
  Phone,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Reviews", path: "/reviews" },
    { name: "Pricing", path: "/pricing" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const externalLinks = [
    { name: "UK Visa and Immigration", url: "https://www.gov.uk/uk-visa", external: true },
    { name: "Companies House", url: "https://www.gov.uk/government/organisations/companies-house", external: true },
    { name: "Immigration Advice Authority", url: "https://www.gov.uk/immigration-advice-authority", external: true },
    { name: "Find a Job", url: "https://www.findajob.dwp.gov.uk/", external: true },
    { name: "Sponsor Licence Register", url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers", external: true },
  ];

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollTop();
  };

  return (
    <>
      <footer className="relative bg-navy text-white overflow-hidden">
        {/* Background Blur */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

        <div className="relative max-w-[1800px] mx-auto px-5 lg:px-10 py-20">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-10">
            {/* Accreditation */}
            <div>
              <div className="rounded-[24px] p-6">
                <img
                  src="/image/iaa-logo.webp"
                  alt="IAA"
                  className="h-20 object-contain"
                />

                <h3 className="text-2xl font-bold mt-6">
                  Accreditation
                </h3>

                <p className="mt-4 text-slate-300 leading-relaxed">
                  Regulated to provide immigration
                  services by the Immigration Advice
                  Authority (IAA).
                </p>

                <button
                  onClick={() => handleNavigation("/accreditation")}
                  className="block mt-5 text-primary-light underline hover:no-underline transition-all"
                >
                  Registration Number: F202100311
                </button>
              </div>

              <div className="rounded-[24px] p-6 mt-6">
                <img
                  src="/image/cyber-logo.webp"
                  alt="Cyber Essentials"
                  className="h-20 object-contain"
                />

                <h3 className="text-2xl font-bold mt-6">
                  Cyber Essentials
                </h3>

                <button
                  onClick={() => handleNavigation("/cyber-essentials")}
                  className="block mt-5 text-primary-light underline hover:no-underline transition-all"
                >
                  View Certification
                </button>
              </div>
            </div>

            {/* British Council */}
            <div>
              <div className="rounded-[24px] p-6 h-full">
                <img
                  src="/image/british-council.webp"
                  alt="British Council"
                  className="h-20 object-contain"
                />

                <h3 className="text-2xl font-bold mt-8 leading-relaxed">
                  UK Agent &
                  <br />
                  Counsellor
                  <br />
                  Training Certified
                </h3>

                <button
                  onClick={() => handleNavigation("/british-council")}
                  className="block mt-8 text-primary-light underline hover:no-underline transition-all"
                >
                  View Certification
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold mb-8">
                Quick Links
              </h3>

              <div className="space-y-3">
                {quickLinks.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className="
                      flex items-center gap-2
                      text-slate-300
                      hover:text-primary-light
                      hover:translate-x-1
                      transition-all duration-300
                      group
                    "
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div>
              <h3 className="text-2xl font-bold mb-8">
                External Links
              </h3>

              <div className="space-y-3">
                {externalLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-2
                      text-slate-300
                      hover:text-primary-light
                      hover:translate-x-1
                      transition-all duration-300
                      group
                    "
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-2xl font-bold">
                Subscribe To Our Newsletter
              </h3>

              <p className="mt-6 text-slate-300 leading-relaxed">
                Stay updated with immigration news,
                visa updates and policy changes.
              </p>

              <div className="mt-8">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    w-full
                    h-14
                    px-5
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    placeholder:text-slate-400
                    outline-none
                    focus:border-primary
                    transition-all
                  "
                />

                <button
                  className="
                    w-full
                    mt-4
                    btn
                    btn-primary
                    hover:scale-105
                    transition-all
                  "
                >
                  Subscribe Now
                </button>
              </div>

              {/* Contact */}
              <div className="mt-10">
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="flex items-center gap-3 mb-4 hover:text-primary-light transition-all group w-full"
                >
                  <Phone
                    size={18}
                    className="text-primary-light group-hover:scale-110 transition-all"
                  />
                  <span className="text-slate-300 group-hover:text-primary-light transition-all">
                    +44 123 456 7890
                  </span>
                </button>

                <button
                  onClick={() => handleNavigation("/contact")}
                  className="flex items-center gap-3 hover:text-primary-light transition-all group w-full"
                >
                  <Mail
                    size={18}
                    className="text-primary-light group-hover:scale-110 transition-all"
                  />
                  <span className="text-slate-300 group-hover:text-primary-light transition-all">
                    info@swc.com
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-slate-400 text-center lg:text-left">
                © {new Date().getFullYear()} Skilled Workers
                Cloud (SWC). All Rights Reserved.
              </p>

              {/* Social */}
              <div className="flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    hover:bg-primary
                    hover:scale-110
                    transition-all
                  "
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    hover:bg-primary
                    hover:scale-110
                    transition-all
                  "
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    hover:bg-primary
                    hover:scale-110
                    transition-all
                  "
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-11
                    h-11
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                    hover:bg-primary
                    hover:scale-110
                    transition-all
                  "
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back To Top */}
      <button
        onClick={scrollTop}
        className="
          fixed
          right-6
          bottom-28
          w-14
          h-14
          rounded-full
          bg-primary
          text-white
          flex
          items-center
          justify-center
          shadow-lg
          hover:scale-105
          hover:bg-primary-dark
          transition-all
          z-50
        "
      >
        <ChevronUp size={24} />
      </button>

      {/* Callback Button */}
      <button
        onClick={() => handleNavigation("/contact")}
        className="
          fixed
          right-6
          bottom-6
          bg-white
          border-2
          border-primary
          text-primary
          px-6
          py-4
          rounded-full
          shadow-xl
          flex
          items-center
          gap-3
          hover:bg-primary
          hover:text-white
          transition-all
          z-50
          hover:scale-105
        "
      >
        <Phone size={18} />
        <span className="font-semibold">
          Request Callback
        </span>
      </button>
    </>
  );
};

export default Footer;