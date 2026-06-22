import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  Clock3,
  Award,
  Headphones,
  BriefcaseBusiness,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Immigration Experts",
    description:
      "Our specialists stay up-to-date with the latest immigration laws and policies to provide accurate guidance.",
  },
  {
    icon: Award,
    title: "High Success Rate",
    description:
      "We carefully prepare every application to maximize approval chances and reduce delays.",
  },
  {
    icon: Users,
    title: "Personalized Support",
    description:
      "Every client receives tailored advice and a strategy designed around their unique circumstances.",
  },
  {
    icon: Clock3,
    title: "Fast & Efficient Service",
    description:
      "We streamline the application process and keep you informed at every stage.",
  },
  {
    icon: Headphones,
    title: "Dedicated Case Management",
    description:
      "A dedicated advisor will guide you through your journey and answer your questions promptly.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business & Personal Solutions",
    description:
      "From sponsor licences to family visas, we provide complete immigration solutions.",
  },
];

const ServWhyChooseUsSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleMobileCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              px-5 py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            WHY CHOOSE US
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
              leading-tight
            "
          >
            Why Thousands Trust
            <span className="block text-primary">
              SWC Global
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            We provide trusted immigration advice, strategic
            guidance, and end-to-end support to help individuals,
            families, and businesses achieve their immigration
            goals with confidence.
          </p>
        </div>

        {/* ── DESKTOP: single row, hover-to-expand cards (lg+) ── */}
        <div
          className="hidden lg:flex gap-3 overflow-hidden justify-center mt-20"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {features.map((item, index) => {
            const isHovered = hoveredCard === index;
            const Icon = item.icon;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                className="
                  relative
                  bg-white
                  border
                  border-border
                  rounded-3xl
                  overflow-hidden
                  cursor-pointer
                  flex-shrink-0
                  shadow-card
                "
                style={{
                  width: isHovered ? "30%" : "12.4%",
                  minHeight: "340px",
                  transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "width",
                }}
              >
                {/* COLLAPSED VIEW */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-2 transition-opacity duration-200"
                  style={{ opacity: isHovered ? 0 : 1, pointerEvents: isHovered ? "none" : "auto" }}
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p
                    className="text-[13px] font-bold text-text tracking-tight whitespace-nowrap select-none"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {item.title}
                  </p>
                </div>

                {/* EXPANDED VIEW */}
                <div
                  className="absolute inset-0 p-8 flex flex-col transition-opacity duration-200"
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      mb-6
                    "
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold text-text mb-4 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-text-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP HINT */}
        <div className="hidden lg:flex justify-center mt-8">
          <span
            className="
              inline-flex
              items-center
              gap-2
              bg-primary-light
              text-primary
              text-sm
              font-medium
              px-4 py-2
              rounded-full
            "
          >
            Hover over any card to expand
          </span>
        </div>

        {/* ── MOBILE / TABLET: accordion cards (below lg) ── */}
        <div className="lg:hidden flex flex-col gap-3 mt-20">
          {features.map((item, index) => {
            const isOpen = expandedCard === index;
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-border
                  rounded-3xl
                  overflow-hidden
                  cursor-pointer
                  shadow-card
                "
                onClick={() => toggleMobileCard(index)}
              >
                {/* ALWAYS VISIBLE ROW */}
                <div className="flex items-center gap-4 px-6 py-5">
                  <div
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="flex-1 text-base font-bold text-text leading-snug">
                    {item.title}
                  </h3>
                  <div
                    className="
                      shrink-0
                      w-8 h-8
                      rounded-lg
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      text-primary
                      transition-transform
                      duration-300
                    "
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* EXPANDABLE CONTENT */}
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: isOpen ? "200px" : "0px",
                    transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-text-light leading-relaxed mt-4">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div
          className="
            mt-16
            bg-white
            border
            border-border
            rounded-[32px]
            p-8
            lg:p-10
            shadow-card
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              justify-between
              gap-8
            "
          >
            <div>
              <h3
                className="
                  text-3xl
                  font-black
                  text-text
                "
              >
                Your Immigration Journey Starts Here
              </h3>

              <p
                className="
                  mt-3
                  text-text-light
                  max-w-2xl
                "
              >
                Whether you're applying for a visa, sponsor
                licence, settlement, or business immigration
                route, our team is ready to support you every
                step of the way.
              </p>
            </div>

            <button
              className="
                px-8
                py-4
                rounded-2xl
                bg-primary
                text-white
                font-semibold
                hover:scale-105
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Book Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServWhyChooseUsSection;