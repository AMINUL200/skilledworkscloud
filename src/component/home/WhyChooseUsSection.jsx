import React, { useState } from "react";
import { Check, Phone, Calendar, ShieldCheck, Users, Globe, Trophy, ArrowRight, Star, Clock } from "lucide-react";

const features = [
  "Comprehensive Doctor Search & Specialist Matching",
  "Robust Appointment Scheduling & Reminder System",
  "Award-Winning Patient Management Platform",
  "Outsourced Teleconsultation Services",
  "Ministry of Health Compliance & Certification",
  "Expert Guidance on Medical Record Management",
  "Professional Advice on Insurance & Billing",
];

const cards = [
  {
    title: "Certified Doctors",
    description: "Board-certified specialists you can trust",
    icon: ShieldCheck,
    stat: "500+",
  },
  {
    title: "Expert Specialists",
    description: "Wide range of medical expertise available",
    icon: Users,
    stat: "20+",
  },
  {
    title: "Complete Care",
    description: "End-to-end patient support",
    icon: Globe,
    stat: "24/7",
  },
  {
    title: "Proven Results",
    description: "Patients successfully treated",
    icon: Trophy,
    stat: "20K+",
  },
];

const WhyChooseUsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{ background: "#EEF5FD" }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Cards (was on right) */}
          <div className="order-2 lg:order-1">
            {/* 2x2 Grid Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {cards.map((card, index) => {
                const Icon = card.icon;
                const isHovered = hoveredCard === index;
                
                return (
                  <div
                    key={index}
                    className="relative group rounded-2xl p-5 transition-all duration-300 cursor-pointer"
                    style={{
                      background: "white",
                      boxShadow: isHovered
                        ? "0 20px 30px -12px rgba(0, 0, 0, 0.1)"
                        : "0 1px 3px rgba(0, 0, 0, 0.05)",
                      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        background: "var(--color-primary)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                    
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "#EFF6FF" }}
                    >
                      <Icon size={22} style={{ color: "var(--color-primary)" }} strokeWidth={1.8} />
                    </div>
                    
                    {/* Stat Badge */}
                    <div
                      className="inline-block text-xs font-bold px-2 py-0.5 rounded mb-2"
                      style={{ background: "#EFF6FF", color: "var(--color-primary)" }}
                    >
                      {card.stat}
                    </div>
                    
                    <h3
                      className="font-bold mb-1"
                      style={{
                        fontSize: "1rem",
                        color: "var(--color-text-primary)",
                      }}
                    >
                      {card.title}
                    </h3>
                    
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Info Card */}
            <div
              className="rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg"
              style={{
                background: "white",
                border: "1px solid #E2E8F0",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star size={18} style={{ color: "var(--color-primary)" }} />
                <h3
                  className="font-bold"
                  style={{
                    fontSize: "1.1rem",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Expert Medical Team
                </h3>
              </div>
              
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Our dedicated team of experienced medical professionals is
                well-versed in assisting patients from initial consultation to
                full recovery — locally and internationally.
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t" style={{ borderColor: "#E2E8F0" }}>
                <div className="flex items-center gap-1">
                  <Clock size={12} style={{ color: "var(--color-primary)" }} />
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>24/7 Available</span>
                </div>
                <div className="w-1 h-1 rounded-full" style={{ background: "#CBD5E1" }} />
                <div className="flex items-center gap-1">
                  <Users size={12} style={{ color: "var(--color-primary)" }} />
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>50+ Experts</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Content (was on left) */}
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
              style={{ background: "#DBEAFE" }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-primary)" }}
              >
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4"
              style={{
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Why Doctor Appointment
            </h2>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-secondary)", lineHeight: 1.7 }}
            >
              DoctorAppointment specializes in connecting patients with the right
              specialists quickly and efficiently. Our platform is built for
              reliability, transparency, and the best patient experience possible.
            </p>

            {/* Feature List - New design */}
            <div className="space-y-3 mb-6">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-2 rounded-lg transition-all duration-300 hover:translate-x-1"
                  style={{
                    background: "transparent",
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                    style={{ width: "20px", height: "20px", background: "#DCFCE7" }}
                  >
                    <Check size={11} style={{ color: "#16A34A" }} strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-text-primary)", lineHeight: 1.5 }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* View More Features */}
            <button
              className="flex items-center gap-1 text-sm font-medium mb-6 transition-all duration-300 hover:gap-2"
              style={{ color: "var(--color-primary)" }}
            >
              View all features
              <ArrowRight size={14} />
            </button>

            {/* Bottom Description */}
            <p
              className="text-sm leading-relaxed mb-6 p-4 rounded-xl"
              style={{
                color: "var(--color-text-secondary)",
                background: "white",
                borderLeft: `3px solid var(--color-primary)`,
              }}
            >
              At DoctorAppointment, we are committed to helping patients navigate
              the healthcare system with ease. Our comprehensive services and
              intuitive platform are designed to simplify access to quality care
              while ensuring the highest standards of medical excellence.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                style={{
                  background: "var(--color-primary)",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                }}
              >
                <Phone size={16} />
                Call Us Now
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
              </button>

              <button
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                style={{
                  background: "white",
                  color: "var(--color-primary)",
                  border: `1.5px solid var(--color-primary)`,
                  fontSize: "0.875rem",
                }}
              >
                <Calendar size={16} />
                Book Appointment
              </button>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t" style={{ borderColor: "#E2E8F0" }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={{ background: "#CBD5E1" }}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  Trusted by 10,000+ patients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;