import React, { useState } from "react";
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
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    {
      id: 1,
      title: "Get Your SPL Today",
      description: "Check if your business is eligible",
      icon: <BadgeCheck className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "2.	SPL Status Check",
      description: "Calculate your total visa application cost",
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "Right to Work Check (RTW)",
      description: "Check your current licence status",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: 4,
      title: "Get Free HR Compliance Audit",
      description: "Check if supplementary employment is allowed",
      icon: <BriefcaseBusiness className="w-4 h-4" />,
    },
    {
      id: 5,
      title: "Get Free HR Compliance Audit",
      description: "Find hidden compliance risks",
      icon: <ClipboardCheck className="w-4 h-4" />,
    },
    {
      id: 6,
      title: "Right To Work Check",
      description: "Verify legal work eligibility in the UK",
      icon: <FileSearch className="w-4 h-4" />,
    },
  ];

  const stats = [
    { value: "3,000+", label: "Licences Approved" },
    { value: "98%", label: "Success Rate" },
    { value: "24/7", label: "Expert Support" },
  ];

  const trustItems = [
    {
      badge: "IAA",
      badgeBg: "bg-muted",
      badgeText: "text-primary",
      name: "Work Permit Cloud",
      sub: "IAA — F202100311",
    },
    {
      badge: "LAW",
      badgeBg: "bg-muted",
      badgeText: "text-primary",
      name: "WPC Lawyers",
      sub: "SRA ID — 8003128",
    },
    {
      badge: "CYBER",
      badgeBg: "bg-muted",
      badgeText: "text-primary",
      name: "Cyber Essentials",
      sub: "Plus Certified",
      noStars: true,
    },
    {
      badge: "G",
      badgeBg: "bg-surface border border-border",
      badgeText: "text-primary text-2xl font-black",
      name: "Google Reviews",
      sub: "4.9 · 733 reviews",
      yellowStars: true,
    },
    {
      badge: "★TP",
      badgeBg: "bg-muted",
      badgeText: "text-primary text-xs",
      name: "Trustpilot",
      sub: "4.9 · 189 reviews",
      greenStars: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background min-h-screen w-full pt-24 pb-16 lg:pt-28 lg:pb-20">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-muted/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-muted/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center">

          {/* ── LEFT ── */}
          <div className="space-y-6 w-full min-w-0">

            {/* Pill badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-muted text-primary px-4 py-2 rounded-full text-xs font-semibold tracking-wide border border-border">
              <span>IMMIGRATION</span><span className="opacity-40">•</span>
              <span>HR</span><span className="opacity-40">•</span>
              <span>LEGAL</span><span className="opacity-40">•</span>
              <span>HIRING</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
                <span className="text-black">Skilled</span>
                <br />
                <span className="text-primary">Works Clouds</span>
                <br />
                {/* <span className="text-primary">Cloud</span> */}
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-xl font-semibold text-text leading-snug">
              From Sponsor Licence to ILR — everything in between.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base leading-7 text-text-light max-w-xl">
              Our IAA-regulated immigration advisers provide complete, end-to-end
              support for UK businesses and individuals. From securing Sponsor
              Licences and managing HR compliance to guiding you through Skilled
              Worker Visas and Indefinite Leave to Remain (ILR), we make your
              immigration journey seamless and successful.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors duration-200">
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="inline-flex items-center gap-2 bg-transparent hover:bg-primary text-primary hover:text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold border-2 border-primary transition-all duration-200 hover:shadow-navy">
                Book Consultation
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-10 pt-5 border-t border-border">
              {stats.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-9 bg-border" />}
                  <div>
                    <p className="text-3xl xl:text-4xl font-black text-primary">{value}</p>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="w-full min-w-0">
            <div className="bg-muted border border-border rounded-2xl lg:rounded-3xl p-5 lg:p-6">

              {/* Panel header */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-border">
                <div>
                  <h2 className="text-sm font-bold text-text">For Employers & Sponsors</h2>
                  <p className="mt-1 text-xs text-text-light leading-relaxed">
                    Apply, manage, or check your UK Sponsor Licence.
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-text">Eligibility Tools</h2>
                  <p className="mt-1 text-xs text-text-light leading-relaxed">
                    Quick role, worker and right-to-work checks in under two minutes.
                  </p>
                </div>
              </div>

              {/* Tool cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                    className="group flex items-start gap-3 bg-surface rounded-xl border border-border hover:border-primary-bright px-3.5 py-3 cursor-pointer transition-all duration-200 hover:shadow-card"
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-muted group-hover:bg-border flex items-center justify-center text-primary transition-colors duration-200">
                      {tool.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] font-semibold text-text leading-tight line-clamp-2">
                        {tool.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-text-muted leading-relaxed line-clamp-1">
                        {tool.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className={`shrink-0 w-3.5 h-3.5 text-primary-bright self-center transition-all duration-200 ${
                        hoveredTool === tool.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-muted border border-border rounded-xl p-4">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 bg-muted text-primary px-3 py-1 rounded-full text-[11px] font-semibold mb-2 border border-border">
                    ★ 3,000+ licences approved
                  </div>
                  <p className="text-sm font-bold text-text leading-tight">
                    UK Employers:{" "}
                    <span className="font-medium text-primary">
                      Want to hire skilled workers from overseas?
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-text-light">Get your Sponsor Licence today</p>
                </div>
                <button className="shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors duration-200">
                  Get Sponsor Licence
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BAR ── */}
        <div className="mt-12 lg:mt-16 w-full">
          <div className="bg-surface border border-border rounded-2xl lg:rounded-3xl px-5 sm:px-8 lg:px-10 py-5 lg:py-6 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-center">

              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`
                      w-11 h-11 sm:w-12 sm:h-12 shrink-0
                      rounded-xl flex items-center justify-center
                      font-bold text-sm
                      ${item.badgeBg} ${item.badgeText}
                    `}
                  >
                    {item.badge}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-text leading-tight">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-text-muted">{item.sub}</p>
                    {item.yellowStars && (
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className="text-warning text-xs">★</span>
                        ))}
                      </div>
                    )}
                    {item.greenStars && (
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <div key={s} className="w-3.5 h-3.5 rounded-sm bg-success flex items-center justify-center">
                            <span className="text-white text-[8px]">★</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;