import React from "react";
import { Check, Phone, Calendar, ShieldCheck, Users, Globe, Trophy } from "lucide-react";

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
    color: "#2563EB",
  },
  {
    title: "500+ Specialists",
    description: "Wide range of medical expertise available",
    icon: Users,
    color: "#06B6D4",
  },
  {
    title: "Complete Care",
    description: "End-to-end patient support from booking to recovery",
    icon: Globe,
    color: "#22C55E",
  },
  {
    title: "Proven Results",
    description: "20,000+ patients successfully treated",
    icon: Trophy,
    color: "#F59E0B",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14"
      style={{ background: "#EEF5FD" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-8 lg:gap-12 xl:gap-14 items-start">

          {/* ── LEFT ── */}
          <div>
            {/* Badge */}
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
              style={{ background: "#DBEAFE", color: "var(--color-primary)", border: "1px solid #BFDBFE" }}
            >
              Why Choose Us
            </span>

            {/* Heading */}
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Why Doctor Appointment
            </h2>

            {/* Description */}
            <p
              className="mt-3 leading-relaxed max-w-xl"
              style={{
                fontSize: "clamp(0.8rem, 1.1vw, 0.9rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              DoctorAppointment specializes in connecting patients with the right
              specialists quickly and efficiently. Our platform is built for
              reliability, transparency, and the best patient experience possible.
            </p>

            {/* Feature list */}
            <div className="mt-5 space-y-2.5">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                    style={{ width: "22px", height: "22px", background: "#DCFCE7" }}
                  >
                    <Check size={12} style={{ color: "#16A34A" }} strokeWidth={2.5} />
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
                      color: "var(--color-text-primary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom description */}
            <p
              className="mt-5 leading-relaxed max-w-xl"
              style={{
                fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
              }}
            >
              At DoctorAppointment, we are committed to helping patients navigate
              the healthcare system with ease. Our comprehensive services and
              intuitive platform are designed to simplify access to quality care
              while ensuring the highest standards of medical excellence.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                style={{
                  background: "var(--color-primary)",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-hover)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary)"}
              >
                <Phone size={15} />
                Call Us Now
              </button>

              <button
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 w-full sm:w-auto border"
                style={{
                  color: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                  background: "white",
                  fontSize: "0.875rem",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--color-primary)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
              >
                <Calendar size={15} />
                Book Appointment
              </button>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            className="rounded-2xl border p-4 sm:p-5"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(16px)",
              borderColor: "rgba(255,255,255,0.6)",
              boxShadow: "0 16px 48px rgba(15,23,42,0.08)",
            }}
          >
            {/* 2×2 grid cards */}
            <div className="grid grid-cols-2 gap-3">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={i}
                    className="relative flex flex-col items-center text-center rounded-xl p-4 overflow-hidden group transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}CC 100%)`,
                      boxShadow: `0 8px 24px ${card.color}33`,
                      minHeight: "150px",
                    }}
                  >
                    {/* Glow blob */}
                    <div
                      className="absolute top-0 right-0 rounded-full pointer-events-none"
                      style={{ width: "80px", height: "80px", background: "rgba(255,255,255,0.12)", filter: "blur(16px)" }}
                    />

                    {/* Icon bubble */}
                    <div
                      className="flex items-center justify-center rounded-xl mb-3"
                      style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.92)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" }}
                    >
                      <Icon size={22} style={{ color: card.color }} strokeWidth={1.8} />
                    </div>

                    <h3
                      className="font-bold text-white leading-tight"
                      style={{ fontSize: "clamp(0.78rem, 1.1vw, 0.9rem)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-1 text-white/80 leading-snug"
                      style={{ fontSize: "clamp(0.68rem, 0.9vw, 0.78rem)" }}
                    >
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom summary card */}
            <div
              className="mt-3 rounded-xl p-4 text-center border"
              style={{ background: "#F8FAFC", borderColor: "var(--color-border)" }}
            >
              <h3
                className="font-bold"
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                  color: "var(--color-text-primary)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Expert Medical Team
              </h3>
              <p
                className="mt-1.5 leading-relaxed"
                style={{
                  fontSize: "clamp(0.72rem, 0.95vw, 0.8rem)",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                Our dedicated team of experienced medical professionals is
                well-versed in assisting patients from initial consultation to
                full recovery — locally and internationally.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
};

export default WhyChooseUsSection;