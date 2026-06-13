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
      title: "Get Your Sponsor Licence Today",
      description: "Check if your business is eligible",
      icon: <BadgeCheck className="w-4 h-4" />,
    },
    {
      id: 2,
      title: "IHS & Visa Fee Calculator",
      description: "Calculate your total visa application cost",
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      id: 3,
      title: "Sponsor Licence Status Check",
      description: "Check your current licence status",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: 4,
      title: "Can I Take Additional Work?",
      description: "Check if supplementary employment is allowed",
      icon: <BriefcaseBusiness className="w-4 h-4" />,
    },
    {
      id: 5,
      title: "Free HR Compliance Audit",
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
      badgeBg: "bg-orange-50",
      badgeText: "text-orange-600",
      name: "Work Permit Cloud",
      sub: "IAA — F202100311",
    },
    {
      badge: "LAW",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-600",
      name: "WPC Lawyers",
      sub: "SRA ID — 8003128",
    },
    {
      badge: "CYBER",
      badgeBg: "bg-green-50",
      badgeText: "text-green-700",
      name: "Cyber Essentials",
      sub: "Plus Certified",
      noStars: true,
    },
    {
      badge: "G",
      badgeBg: "bg-white border border-gray-200",
      badgeText: "text-blue-500 text-2xl font-black",
      name: "Google Reviews",
      sub: "4.9 · 733 reviews",
      yellowStars: true,
    },
    {
      badge: "★TP",
      badgeBg: "bg-green-50",
      badgeText: "text-green-700 text-xs",
      name: "Trustpilot",
      sub: "4.9 · 189 reviews",
      greenStars: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white min-h-screen w-full pt-24 pb-16 lg:pt-28 lg:pb-20">

      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center">

          {/* ── LEFT ── */}
          <div className="space-y-6 w-full min-w-0">

            {/* Pill badge */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border border-blue-100">
              <span>IMMIGRATION</span><span className="opacity-40">•</span>
              <span>HR</span><span className="opacity-40">•</span>
              <span>LEGAL</span><span className="opacity-40">•</span>
              <span>HIRING</span>
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-gray-900">
                Skilled
                <br />
                <span className="text-blue-600">Works Clouds</span>
                <br />
                {/* <span className="text-blue-600">Cloud</span> */}
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-xl font-semibold text-gray-800 leading-snug">
              From Sponsor Licence to ILR — everything in between.
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base leading-7 text-gray-500 max-w-xl">
              Our IAA-regulated immigration advisers provide complete, end-to-end
              support for UK businesses and individuals. From securing Sponsor
              Licences and managing HR compliance to guiding you through Skilled
              Worker Visas and Indefinite Leave to Remain (ILR), we make your
              immigration journey seamless and successful.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors duration-200">
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold border border-gray-200 transition-colors duration-200">
                Book Consultation
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 sm:gap-10 pt-5 border-t border-gray-100">
              {stats.map(({ value, label }, i) => (
                <div key={label} className="flex items-center gap-4">
                  {i > 0 && <div className="w-px h-9 bg-gray-200" />}
                  <div>
                    <p className="text-3xl xl:text-4xl font-black text-blue-600">{value}</p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="w-full min-w-0">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl lg:rounded-3xl p-5 lg:p-6">

              {/* Panel header */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">For Employers & Sponsors</h2>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Apply, manage, or check your UK Sponsor Licence.
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Eligibility Tools</h2>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
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
                    className="group flex items-start gap-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 px-3.5 py-3 cursor-pointer transition-all duration-200 hover:shadow-sm"
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors duration-200">
                      {tool.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-[13px] font-semibold text-gray-900 leading-tight line-clamp-2">
                        {tool.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-gray-400 leading-relaxed line-clamp-1">
                        {tool.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight
                      className={`shrink-0 w-3.5 h-3.5 text-blue-500 self-center transition-all duration-200 ${
                        hoveredTool === tool.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[11px] font-semibold mb-2">
                    ★ 3,000+ licences approved
                  </div>
                  <p className="text-sm font-bold text-blue-900 leading-tight">
                    UK Employers:{" "}
                    <span className="font-medium text-blue-700">
                      Want to hire skilled workers from overseas?
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-blue-500">Get your Sponsor Licence today</p>
                </div>
                <button className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors duration-200">
                  Get Sponsor Licence
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BAR ── */}
        <div className="mt-12 lg:mt-16 w-full">
          <div className="bg-white border border-gray-200 rounded-2xl lg:rounded-3xl px-5 sm:px-8 lg:px-10 py-5 lg:py-6 w-full">
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
                    <p className="text-[13px] font-bold text-gray-900 leading-tight">{item.name}</p>
                    <p className="mt-0.5 text-[11px] text-gray-400">{item.sub}</p>
                    {item.yellowStars && (
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className="text-yellow-400 text-xs">★</span>
                        ))}
                      </div>
                    )}
                    {item.greenStars && (
                      <div className="flex gap-0.5 mt-1">
                        {[1,2,3,4,5].map(s => (
                          <div key={s} className="w-3.5 h-3.5 rounded-sm bg-green-500 flex items-center justify-center">
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