import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ChevronRight,
  Heart
} from 'lucide-react';

const Footer = () => {
  // Footer links organized based on sidebar structure
  const footerLinks = {
    company: {
      title: "Company",
      links: [
        { name: "About Us", url: "/company" },
        { name: "Our Team", url: "/team" },
        { name: "Careers", url: "/careers" },
        { name: "Blog", url: "/blogs" },
        { name: "Contact", url: "/contact" }
      ]
    },
    services: {
      title: "Services",
      links: [
        { name: "Visa Services", url: "/visa-services" },
        { name: "Immigration", url: "/immigration" },
        { name: "HR Compliance", url: "/hr-compliance" },
        { name: "Sponsor Licence Checker", url: "/sponsor-checker" },
        { name: "Self Sponsorship", url: "/self-sponsorship" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Visa Calculator", url: "/visa-calculator" },
        { name: "Eligibility Checker", url: "/eligibility-checker" },
        { name: "Documentation", url: "/docs" },
        { name: "FAQs", url: "/faqs" },
        { name: "Support", url: "/support" }
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy Policy", url: "/privacy" },
        { name: "Terms of Service", url: "/terms" },
        { name: "Cookie Policy", url: "/cookies" },
        { name: "Compliance", url: "/compliance" }
      ]
    }
  };

  const socialLinks = [
    { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, url: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, url: "https://instagram.com", label: "Instagram" }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@swc.com", href: "mailto:hello@swc.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Business Avenue, London, UK", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-navy to-navy-light text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Top Section with Newsletter */}
        <div className="mb-16 pb-8 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-gray-300 text-lg">
                Get the latest immigration news and visa updates directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <button className="btn btn-primary px-8 py-4 whitespace-nowrap">
                Subscribe
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h3 className="text-xl font-bold text-white relative inline-block pb-2">
                {section.title}
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-primary-light rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.url}
                      className="text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg">
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="white" strokeWidth="4"/>
                <path d="M16 24L24 14L32 24L24 34L16 24Z" fill="white"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Skilled Workers Cloud (SWC). 
                All rights reserved.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
            <span>for the global workforce</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl"></div>
    </footer>
  );
};

export default Footer;