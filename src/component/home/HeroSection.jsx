import React from "react";

import {
  ArrowRight,
  ShieldCheck,
  BriefcaseBusiness,
  BadgeCheck,
  Search,
  Calculator,
  ClipboardCheck,
  FileSearch,
} from "lucide-react";

const HeroSection = () => {
  const tools = [
    {
      id: 1,
      title: "Get Your Sponsor Licence Today",
      description: "Check if your business is eligible",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "IHS & Visa Fee Calculator",
      description: "Calculate your total visa application cost",
      icon: <Calculator className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Sponsor Licence Status Check",
      description: "Check your current licence status",
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Can I Take Additional Work?",
      description: "Check if supplementary employment is allowed",
      icon: <BriefcaseBusiness className="w-5 h-5" />,
    },
    {
      id: 5,
      title: "Free HR Compliance Audit",
      description: "Find hidden compliance risks",
      icon: <ClipboardCheck className="w-5 h-5" />,
    },
    {
      id: 6,
      title: "Looking for Sponsored Jobs?",
      description: "Check if you are eligible for sponsored jobs",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      id: 7,
      title: "Right To Work Check",
      description: "Check if someone can legally work in the UK",
      icon: <FileSearch className="w-5 h-5" />,
    },
    {
      id: 8,
      title: "ILR Eligibility Assessment",
      description: "Find out when you can apply for settlement",
      icon: <BadgeCheck className="w-5 h-5" />,
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-background
        min-h-screen
        w-full
        pt-24
        pb-16
        lg:pt-28
        lg:pb-20
      "
    >
      {/* BACKGROUND GRADIENT */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-blue-50/40
          via-transparent
          to-slate-100/30
          pointer-events-none
        "
      />

      <div
        className="
          relative
          w-full
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-8
            xl:gap-14
            items-start
            lg:items-center
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-5 lg:space-y-6 w-full min-w-0">
            {/* SMALL BADGE */}
            <div
              className="
                inline-flex
                flex-wrap
                items-center
                gap-2
                bg-primary-light
                text-primary
                px-4
                py-2
                rounded-full
                text-xs
                sm:text-sm
                font-semibold
                shadow-sm
              "
            >
              <span>IMMIGRATION</span>
              <span>•</span>
              <span>HR</span>
              <span>•</span>
              <span>LEGAL</span>
              <span>•</span>
              <span>HIRING</span>
            </div>

            {/* HEADING */}
            <div className="space-y-1">
              <h1
                className="
                  text-5xl
                  sm:text-6xl
                  lg:text-5xl
                  xl:text-6xl
                  2xl:text-7xl
                  font-black
                  leading-[1.1]
                  tracking-tight
                "
              >
                <span className="text-text">UK</span>
                <br />
                <span
                  className="
                    bg-gradient-to-r
                    from-primary
                    via-primary-dark
                    to-primary-dark
                    bg-clip-text
                    text-transparent
                  "
                >
                  Immigration
                </span>
                <br />
                <span
                  className="
                    bg-gradient-to-r
                    from-primary
                    via-primary-dark
                    to-primary-dark
                    bg-clip-text
                    text-transparent
                  "
                >
                  Specialists
                </span>
              </h1>
            </div>

            {/* SUBTITLE */}
            <h2
              className="
                text-lg
                sm:text-xl
                lg:text-xl
                xl:text-2xl
                font-semibold
                text-text
                leading-tight
              "
            >
              From Sponsor Licence to ILR — everything in between.
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                text-sm
                sm:text-base
                lg:text-base
                leading-7
                text-text-light
                max-w-xl
              "
            >
              Our IAA-regulated immigration advisers provide complete,
              end-to-end support for UK businesses and individuals. From
              securing Sponsor Licences and managing HR compliance to guiding
              you through Skilled Worker Visas and Indefinite Leave to Remain
              (ILR), we make your immigration journey seamless and successful.
            </p>

            {/* BUTTONS */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
                pt-1
              "
            >
              <button
                className="
                  btn
                  btn-primary
                  px-6
                  py-3
                  text-sm
                  sm:text-base
                "
              >
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                className="
                  btn
                  btn-outline
                  px-6
                  py-3
                  text-sm
                  sm:text-base
                "
              >
                Book Consultation
              </button>
            </div>

            {/* STATS */}
            <div
              className="
                flex
                flex-wrap
                gap-6
                sm:gap-10
                pt-4
                border-t
                border-border
              "
            >
              {[
                { value: "3000+", label: "Licences Approved" },
                { value: "98%", label: "Success Rate" },
                { value: "24/7", label: "Expert Support" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <h3
                    className="
                      text-2xl
                      sm:text-3xl
                      lg:text-3xl
                      xl:text-4xl
                      font-black
                      text-primary
                    "
                  >
                    {value}
                  </h3>
                  <p className="mt-1 text-sm text-text-light font-medium">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="relative w-full min-w-0">
            {/* MAIN CARD */}
            <div
              className="
                relative
                rounded-2xl
                lg:rounded-[28px]
                bg-gradient-to-br
                from-[#0F3B74]
                via-[#0B4EA2]
                to-[#0F5CC0]
                p-4
                sm:p-5
                lg:p-6
                shadow-[0_20px_60px_rgba(15,92,192,0.25)]
                overflow-hidden
                w-full
              "
            >
              {/* GLOW EFFECT */}
              <div
                className="
                  absolute
                  -top-40
                  -right-40
                  w-[280px]
                  h-[280px]
                  rounded-full
                  bg-blue-400/20
                  blur-3xl
                  pointer-events-none
                "
              />

              {/* TOP TEXT */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2
                    className="
                      text-base
                      sm:text-lg
                      lg:text-xl
                      font-bold
                      text-white
                      leading-tight
                    "
                  >
                    For Employers & Sponsors
                  </h2>
                  <p className="mt-1.5 text-blue-100 text-xs sm:text-sm leading-relaxed">
                    Use smart tools to apply, manage, or check your UK Sponsor
                    Licence.
                  </p>
                </div>

                <div>
                  <h2
                    className="
                      text-base
                      sm:text-lg
                      lg:text-xl
                      font-bold
                      text-white
                      leading-tight
                    "
                  >
                    Eligibility Tools
                  </h2>
                  <p className="mt-1.5 text-blue-100 text-xs sm:text-sm leading-relaxed">
                    Quick role, worker and right-to-work checks you can run in
                    under two minutes.
                  </p>
                </div>
              </div>

              {/* ================= TOOL CARDS ================= */}
              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-2.5
                  sm:gap-3
                "
              >
                {tools.slice(0, 6).map((tool) => (
                  <div
                    key={tool.id}
                    className="
                      group
                      relative
                      bg-white
                      rounded-xl
                      lg:rounded-2xl
                      px-3
                      sm:px-4
                      py-3
                      overflow-hidden
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-r
                        from-blue-50/80
                        to-transparent
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-300
                      "
                    />

                    <div className="relative flex items-start gap-2.5 sm:gap-3">
                      {/* ICON */}
                      <div
                        className="
                          shrink-0
                          w-9 h-9
                          sm:w-10 sm:h-10
                          rounded-xl
                          bg-primary-light
                          flex
                          items-center
                          justify-center
                          text-primary
                        "
                      >
                        {tool.icon}
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3
                            className="
                              text-sm
                              sm:text-sm
                              lg:text-[15px]
                              font-bold
                              leading-tight
                              text-text
                              line-clamp-2
                            "
                          >
                            {tool.title}
                          </h3>
                          <button
                            className="
                              shrink-0
                              text-[10px]
                              font-semibold
                              bg-primary
                              text-white
                              px-2
                              py-1
                              rounded-full
                              hover:bg-primary-dark
                              transition-colors
                              duration-200
                              whitespace-nowrap
                            "
                          >
                            Learn More
                          </button>
                        </div>
                        <p
                          className="
                            mt-0.5
                            text-[11px]
                            sm:text-xs
                            leading-relaxed
                            text-text-light
                            line-clamp-1
                          "
                        >
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= BOTTOM CTA ================= */}
              <div
                className="
                  mt-4
                  rounded-xl
                  lg:rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-4
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    items-start
                    sm:items-center
                    justify-between
                    gap-3
                  "
                >
                  <div className="flex-1 min-w-0">
                    <div
                      className="
                        inline-flex
                        items-center
                        bg-green-100
                        text-green-700
                        px-3
                        py-1.5
                        rounded-full
                        text-[11px]
                        font-semibold
                      "
                    >
                      ★ 3,000+ licences approved
                    </div>
                    <h3
                      className="
                        mt-2.5
                        text-base
                        sm:text-lg
                        font-bold
                        leading-tight
                        text-white
                      "
                    >
                      UK EMPLOYERS:
                      <span className="text-blue-200">
                        {" "}
                        Want to hire skilled workers from overseas?
                      </span>
                    </h3>
                    <p className="mt-1 text-blue-100 text-xs sm:text-sm">
                      Get your Sponsor Licence today
                    </p>
                  </div>

                  <button
                    className="
                      btn
                      bg-white
                      text-primary
                      hover:bg-blue-50
                      px-4
                      py-2.5
                      rounded-xl
                      font-semibold
                      text-sm
                      whitespace-nowrap
                      shrink-0
                      flex
                      items-center
                      gap-2
                    "
                  >
                    Get sponsor licence
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= TRUST SECTION ================= */}
        <div className="mt-12 lg:mt-16 w-full">
          <div
            className="
              bg-white/90
              backdrop-blur-xl
              border border-white/40
              rounded-[24px]
              shadow-[0_10px_40px_rgba(15,23,42,0.06)]
              px-5
              sm:px-8
              lg:px-10
              py-5
              lg:py-6
              w-full
            "
          >
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                xl:grid-cols-5
                gap-5
                sm:gap-6
                lg:gap-8
                items-center
              "
            >
              {/* ITEM 1 — IAA */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14
                    shrink-0
                    rounded-2xl
                    bg-gradient-to-br from-orange-100 to-red-100
                    flex items-center justify-center
                    text-orange-500 font-black text-sm
                  "
                >
                  IAA
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-text leading-tight">
                    Work Permit Cloud
                  </h3>
                  <p className="mt-0.5 text-xs text-text-light">Regulated By</p>
                  <p className="mt-0.5 text-[13px] font-semibold text-text">
                    IAA - F202100311
                  </p>
                </div>
              </div>

              {/* ITEM 2 — LAW */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14
                    shrink-0
                    rounded-2xl
                    bg-primary-light
                    flex items-center justify-center
                    text-primary font-black text-sm
                  "
                >
                  LAW
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-text leading-tight">
                    WPC Lawyers
                  </h3>
                  <p className="mt-0.5 text-xs text-text-light">
                    SRA - Authorised ABS
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-text">
                    SRA ID - 8003128
                  </p>
                </div>
              </div>

              {/* ITEM 3 — CYBER */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14
                    shrink-0
                    rounded-2xl
                    bg-green-100
                    flex items-center justify-center
                    text-green-700 font-black text-xs
                  "
                >
                  CYBER
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-text leading-tight">
                    Cyber Essentials
                  </h3>
                  <p className="mt-0.5 text-xs text-text-light">
                    Plus Certified
                  </p>
                </div>
              </div>

              {/* ITEM 4 — GOOGLE */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-12 h-12 sm:w-14 sm:h-14
                    shrink-0
                    rounded-2xl
                    bg-white border border-border
                    flex items-center justify-center
                    text-3xl font-black
                  "
                >
                  <span className="text-blue-500">G</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-text leading-tight">
                    Google Reviews
                  </h3>
                  <p className="mt-0.5 text-xs text-text-light">
                    4.9 rating • 733 reviews
                  </p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ITEM 5 — TRUSTPILOT */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    px-3 py-2.5
                    shrink-0
                    rounded-2xl
                    bg-green-50
                    text-green-600 font-black text-sm
                    whitespace-nowrap
                  "
                >
                  Trustpilot
                </div>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold text-text leading-tight">
                    Trustpilot
                  </h3>
                  <p className="mt-0.5 text-xs text-text-light">
                    4.9 rating • 189 reviews
                  </p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="
                          w-4 h-4
                          rounded-sm
                          bg-green-500
                          flex items-center justify-center
                          text-white text-[9px]
                        "
                      >
                        ★
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;