import React, { useState } from "react";
import { ArrowRight, Check, Stethoscope, Scale } from "lucide-react";

const doctorServices = [
  "Doctor search & specialist matching",
  "Skilled Worker, Health & Care appointments",
  "Indefinite Patient Record Management",
  "Certificate of Health & SMS appointment training",
  "HR compliance & mock health audits",
  "Partner and family healthcare plans",
];

const legalServices = [
  "Appointment cancellations & reschedules",
  "Judicial review of treatment decisions",
  "Medical billing appeals & tribunal support",
  "Family / Maternity health programs",
  "Landlord and Tenant health screenings",
  "Any other complex medical matter",
];

const RegulationSection = () => {
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14"
      style={{ background: "var(--color-background)" }}
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "600px", height: "600px",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p
            className="uppercase tracking-widest font-semibold mb-2"
            style={{
              fontSize: "clamp(0.6rem, 0.85vw, 0.72rem)",
              color: "var(--color-primary)",
              letterSpacing: "0.18em",
            }}
          >
            TWO CERTIFIED ENTITIES · ONE PLATFORM
          </p>

          <h2
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Whatever stage you're at, we have the right team for you.
          </h2>

          <p
            className="mt-3 mx-auto"
            style={{
              fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "560px",
            }}
          >
            Doctor Appointment handles bookings and health compliance under certified
            regulation. For complex matters requiring a specialist, our licensed
            medical legal team leads on appeals, disputes, and reviews.
          </p>
        </div>

        {/* ── Two Cards ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {/* ── LEFT CARD ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-card)",
              border: `1.5px solid ${hoveredLeft ? "var(--color-primary)33" : "var(--color-border)"}`,
              boxShadow: hoveredLeft
                ? "0 16px 40px rgba(37,99,235,0.10)"
                : "0 4px 20px rgba(15,23,42,0.06)",
              transform: hoveredLeft ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.3s ease",
              padding: "20px",
            }}
            onMouseEnter={() => setHoveredLeft(true)}
            onMouseLeave={() => setHoveredLeft(false)}
          >
            {/* Top badge */}
            <div
              className="flex items-center gap-3 rounded-xl mb-5"
              style={{
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                padding: "12px 14px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl shrink-0 font-black"
                style={{
                  width: "48px", height: "48px",
                  background: "#DBEAFE",
                  color: "var(--color-primary)",
                  fontSize: "clamp(0.65rem, 0.9vw, 0.75rem)",
                }}
              >
                <Stethoscope size={22} style={{ color: "var(--color-primary)" }} />
              </div>
              <div>
                <h3
                  className="font-bold leading-tight"
                  style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "var(--color-text-primary)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Doctor Appointment
                </h3>
                <p style={{ fontSize: "clamp(0.68rem, 0.85vw, 0.75rem)", color: "var(--color-text-secondary)" }}>
                  Regulated By
                </p>
                <p
                  className="font-bold"
                  style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "var(--color-primary)" }}
                >
                  MOH - F202100311
                </p>
              </div>
            </div>

            {/* Title + desc */}
            <h3
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                color: "var(--color-text-primary)",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "4px",
              }}
            >
              Need help booking?
            </h3>
            <p style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "var(--color-text-secondary)", marginBottom: "14px" }}>
              Doctor Appointment Ltd — certified healthcare booking platform
            </p>

            {/* Services list */}
            <div className="space-y-2 mb-5">
              {doctorServices.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                    style={{ width: "20px", height: "20px", background: "#DBEAFE" }}
                  >
                    <Check size={11} style={{ color: "var(--color-primary)" }} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "var(--color-text-primary)", lineHeight: 1.55 }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className="btn btn-primary btn-block"
              style={{
                background: "var(--color-primary)",
                padding: "10px 16px",
                fontSize: "clamp(0.75rem, 0.95vw, 0.825rem)",
                boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
              }}
              // onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-hover)"}
              // onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary)"}
            >
              Speak to an appointment adviser
              <ArrowRight size={14} />
            </button>
          </div>

          {/* ── RIGHT CARD ── */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "var(--color-card)",
              border: `1.5px solid ${hoveredRight ? "#F59E0B33" : "var(--color-border)"}`,
              boxShadow: hoveredRight
                ? "0 16px 40px rgba(245,158,11,0.10)"
                : "0 4px 20px rgba(15,23,42,0.06)",
              transform: hoveredRight ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.3s ease",
              padding: "20px",
            }}
            onMouseEnter={() => setHoveredRight(true)}
            onMouseLeave={() => setHoveredRight(false)}
          >
            {/* Top badge */}
            <div
              className="flex items-center gap-3 rounded-xl mb-5"
              style={{
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                padding: "12px 14px",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{ width: "48px", height: "48px", background: "#FEF3C7" }}
              >
                <Scale size={22} style={{ color: "#D97706" }} />
              </div>
              <div>
                <h3
                  className="font-bold leading-tight"
                  style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "var(--color-text-primary)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Medical Legal Team
                </h3>
                <p style={{ fontSize: "clamp(0.68rem, 0.85vw, 0.75rem)", color: "var(--color-text-secondary)" }}>
                  SRA — Authorised ABS
                </p>
                <p
                  className="font-bold"
                  style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "#D97706" }}
                >
                  SRA ID — 8003128
                </p>
              </div>
            </div>

            {/* Title + desc */}
            <h3
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                color: "var(--color-text-primary)",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "4px",
              }}
            >
              For complex matters requiring a specialist
            </h3>
            <p style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "var(--color-text-secondary)", marginBottom: "14px" }}>
              Medical Legal Ltd — SRA regulated, under Doctor Appointment Group
            </p>

            {/* Services list */}
            <div className="space-y-2 mb-5">
              {legalServices.map((s, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
                    style={{ width: "20px", height: "20px", background: "#FEF3C7" }}
                  >
                    <Check size={11} style={{ color: "#D97706" }} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)", color: "var(--color-text-primary)", lineHeight: 1.55 }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "#1E293B",
                padding: "10px 16px",
                fontSize: "clamp(0.75rem, 0.95vw, 0.825rem)",
                boxShadow: "0 4px 16px rgba(15,23,42,0.20)",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#0F172A"}
              onMouseLeave={e => e.currentTarget.style.background = "#1E293B"}
            >
              Speak to a specialist
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
};

export default RegulationSection;