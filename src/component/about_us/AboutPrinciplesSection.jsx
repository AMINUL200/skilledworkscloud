import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { getImageUrl } from "../../utils/getImageUrl";

const PrincipleCard = ({ item, centered }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: item.dark
          ? "linear-gradient(135deg, #172554 0%, #1E3A8A 100%)"
          : "linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)",
        padding: "18px 20px",
        boxShadow: hovered
          ? "0 20px 48px rgba(15,23,42,0.18)"
          : "0 6px 24px rgba(15,23,42,0.10)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow blob */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "100px", height: "100px",
          top: "-30px", right: "-30px",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(20px)",
        }}
      />

      <h3
        className="font-bold text-white relative z-10"
        style={{
          fontSize: "clamp(0.82rem, 1.1vw, 0.95rem)",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "12px",
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      <div className="flex flex-col gap-2 relative z-10">
        {item.points.map((point, i) => (
          <div key={i} className="flex items-start gap-2">
            <div
              className="flex items-center justify-center rounded-full shrink-0 mt-0.5"
              style={{ width: "16px", height: "16px", background: "rgba(255,255,255,0.2)", minWidth: "16px" }}
            >
              <Check size={9} color="white" strokeWidth={3} />
            </div>
            <p
              className="text-white/85 leading-snug"
              style={{ fontSize: "clamp(0.68rem, 0.88vw, 0.78rem)" }}
            >
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPrinciplesSection = ({ data }) => {
  console.log("About Principles Section Data:", data);

  // If no data, return null
  if (!data) {
    return null;
  }

  // Get image URL with base UR

  // Build principles array from API data
  const principles = [
    {
      title: data.card1_title || "Making Life Easy",
      dark: false,
      points: data.card1_desc || [
        "Dedicated time to organise patient needs",
        "Take away the health burden to make life easy",
        "Offer customised healthcare solutions"
      ],
    },
    {
      title: data.card2_title || "Doing Things Fast",
      dark: true,
      points: data.card2_desc || [
        "Get the right result first time",
        "Streamline your health process",
        "Save time with instant booking"
      ],
    },
    {
      title: data.card3_title || "Complying with all Health Regulations",
      dark: false,
      points: data.card3_desc || [
        "Ministry of Health latest policy & guidelines",
        "Automated check of health records",
        "Insights — implementation — right results"
      ],
      centered: true,
    },
    {
      title: data.card4_title || "Doing Things Right",
      dark: true,
      points: data.card4_desc || [
        "Do the right thing first time",
        "No more, no less! Ensuring patients are compliant",
        "Get it right first time"
      ],
    },
    {
      title: data.card5_title || "Transforming Healthcare",
      dark: false,
      points: data.card5_desc || [
        "Choose the right specialist",
        "Guiding patients down the right path",
        "Better results, better health"
      ],
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-12 lg:py-14"
      style={{ background: "var(--color-background)" }}
    >
      {/* Glow */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 items-start">

          {/* ── LEFT: Two images ── */}
          <div className="flex flex-col gap-4">
            {/* Top image */}
            <div className="relative rounded-2xl overflow-hidden group" style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.10)" }}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={getImageUrl(data.mobile_image1) || getImageUrl(data.web_image1) || "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1400&auto=format&fit=crop"}
                />
                <source
                  media="(min-width: 769px)"
                  srcSet={getImageUrl(data.web_image1) || "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1400&auto=format&fit=crop"}
                />
                <img
                  src={getImageUrl(data.web_image1) || "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1400&auto=format&fit=crop"}
                  alt={data.image1_alt || "Knowledge and Expertise"}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ height: "clamp(300px, 22vh, 280px)" }}
                />
              </picture>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="font-black text-white leading-tight"
                  style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {data.image1_alt || "Knowledge & Expertise"}
                </h3>
                <p
                  className="mt-0.5"
                  style={{ fontSize: "clamp(0.68rem, 0.85vw, 0.75rem)", color: "rgba(191,219,254,0.9)" }}
                >
                  Professional healthcare guidance backed by experience.
                </p>
              </div>
            </div>

            {/* Bottom image */}
            <div className="relative rounded-2xl overflow-hidden group" style={{ boxShadow: "0 12px 40px rgba(15,23,42,0.10)" }}>
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={getImageUrl(data.mobile_image2) || getImageUrl(data.web_image2) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                />
                <source
                  media="(min-width: 769px)"
                  srcSet={getImageUrl(data.web_image2) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                />
                <img
                  src={getImageUrl(data.web_image2) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                  alt={data.image2_alt || "Team Collaboration"}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ height: "clamp(300px, 22vh, 280px)" }}
                />
              </picture>
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }} />
              <div className="absolute bottom-0 left-0 p-4">
                <h3
                  className="font-black text-white leading-tight"
                  style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {data.image2_alt || "Team Collaboration"}
                </h3>
                <p
                  className="mt-0.5"
                  style={{ fontSize: "clamp(0.68rem, 0.85vw, 0.75rem)", color: "rgba(191,219,254,0.9)" }}
                >
                  Working together to achieve the best results.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Principles ── */}
          <div>
            {/* Badge */}
            <span
              className="inline-block font-semibold rounded-full mb-3"
              style={{
                background: "#DBEAFE",
                color: "var(--color-primary)",
                border: "1px solid #BFDBFE",
                fontSize: "clamp(0.62rem, 0.8vw, 0.7rem)",
                padding: "4px 12px",
                letterSpacing: "0.05em",
              }}
            >
              {data.batch || "Our Principles"}
            </span>

            {/* Heading */}
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.3rem, 2.2vw, 1.85rem)",
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: "8px",
              }}
            >
              {data.title || "Our Core Principles"}
            </h2>

            {/* Description */}
            <p
              className="mb-5"
              style={{
                fontSize: "clamp(0.76rem, 1vw, 0.875rem)",
                color: "var(--color-text-secondary)",
                lineHeight: 1.65,
                maxWidth: "480px",
              }}
            >
              {data.description || "We strive to become an effective Healthcare & Patient Management partner for our client's day-to-day wellbeing."}
            </p>

            {/* 
              Cards layout matching the reference image:
              Row 1: card[0] | card[1]   (both left-aligned)
              Row 2:   empty  | card[2]  (card offset right — centered)
              Row 3: card[3] | card[4]   (both left-aligned)
            */}
            <div className="flex flex-col gap-3">

              {/* Row 1: col-0 and col-1 side by side */}
              <div className="grid grid-cols-2 gap-3">
                <PrincipleCard item={principles[0]} />
                <PrincipleCard item={principles[1]} />
              </div>

              {/* Row 2: right-offset single card (matches reference exactly) */}
              <div className="flex justify-center gap-3">
                <PrincipleCard item={principles[2]} />
              </div>

              {/* Row 3: col-3 and col-4 side by side */}
              <div className="grid grid-cols-2 gap-3">
                <PrincipleCard item={principles[3]} />
                <PrincipleCard item={principles[4]} />
              </div>
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

export default AboutPrinciplesSection;