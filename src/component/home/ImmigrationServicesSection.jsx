import React, { useState } from "react";
import { ArrowRight, FileText, ShieldCheck, Briefcase, Package, Heart, Globe } from "lucide-react";

const services = [
  {
    title: "Doctor Search",
    icon: FileText,
    color: "#2563EB",
    iconBg: "#DBEAFE",
    items: [
      "Find by Specialty",
      "Filter by Location",
      "Search by Availability",
    ],
  },
  {
    title: "Health Compliance",
    icon: ShieldCheck,
    color: "#22C55E",
    iconBg: "#DCFCE7",
    items: [
      "Medical Record Access",
      "Insurance Verification",
      "Health Screening",
    ],
  },
  {
    title: "Specialist Visas",
    icon: Briefcase,
    color: "#06B6D4",
    iconBg: "#CFFAFE",
    items: [
      "Cardiologist",
      "Neurologist",
      "Orthopedic Surgeon",
    ],
  },
  {
    title: "Teleconsultation",
    icon: Package,
    color: "#7C3AED",
    iconBg: "#EDE9FE",
    items: [
      "Video Consultation",
      "Chat with Doctor",
      "Follow-up Sessions",
    ],
  },
  {
    title: "Family & Child Care",
    icon: Heart,
    color: "#EF4444",
    iconBg: "#FEE2E2",
    items: [
      "Pediatrics",
      "Maternity Care",
      "Family Health Plans",
    ],
  },
  {
    title: "Global Health",
    icon: Globe,
    color: "#F59E0B",
    iconBg: "#FEF3C7",
    items: [
      "Medical Tourism",
      "International Insurance",
      "Cross-border Care",
    ],
  },
];

const ServicesSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14"
      style={{ background: "var(--color-background)" }}
    >
      {/* Background glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "500px", height: "500px",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3"
            style={{ background: "#EFF6FF", color: "var(--color-primary)", border: "1px solid #DBEAFE" }}
          >
            Our Services
          </span>
          <h2
            className="font-extrabold leading-tight"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Complete Healthcare Services
          </h2>
          <p
            className="mt-2 mx-auto"
            style={{
              fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              maxWidth: "480px",
            }}
          >
            From specialist search to teleconsultation, we handle every aspect
            of your healthcare journey.
          </p>
        </div>

        {/* ── Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${service.color}08 0%, white 100%)`
                    : "var(--color-card)",
                  border: `1.5px solid ${isHovered ? service.color + "30" : "var(--color-border)"}`,
                  boxShadow: isHovered
                    ? `0 12px 32px ${service.color}15`
                    : "0 2px 10px rgba(15,23,42,0.04)",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.28s ease",
                  padding: "16px 18px",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover bg sweep */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}06 0%, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />

                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0 transition-transform duration-300"
                    style={{
                      width: "44px",
                      height: "44px",
                      background: service.iconBg,
                      transform: isHovered ? "scale(1.1) rotate(-4deg)" : "scale(1)",
                    }}
                  >
                    <Icon size={20} style={{ color: service.color }} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3
                      className="font-bold leading-tight mb-2.5"
                      style={{
                        fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
                        color: "var(--color-text-primary)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Items */}
                    <div className="space-y-1.5">
                      {service.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <div
                            className="rounded-full shrink-0"
                            style={{
                              width: "6px",
                              height: "6px",
                              background: isHovered ? service.color : "#CBD5E1",
                              transition: "background 0.3s ease",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "clamp(0.72rem, 0.9vw, 0.8rem)",
                              color: isHovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                              transition: "color 0.3s ease",
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: "26px",
                      height: "26px",
                      background: isHovered ? service.color : "var(--color-background)",
                      border: `1px solid ${isHovered ? service.color : "var(--color-border)"}`,
                    }}
                  >
                    <ArrowRight
                      size={12}
                      style={{ color: isHovered ? "white" : "var(--color-text-secondary)" }}
                    />
                  </div>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                  style={{
                    height: "2px",
                    background: `linear-gradient(90deg, ${service.color}, transparent)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── CTA Button ── */}
        <div className="flex justify-center mt-8">
          <button
            className="flex items-center gap-2 px-7 py-2.5 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--color-primary)",
              fontSize: "0.875rem",
              boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--color-primary-hover)"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--color-primary)"}
          >
            View All Services
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
};

export default ServicesSection;