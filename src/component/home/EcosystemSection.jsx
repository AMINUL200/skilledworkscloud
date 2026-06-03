import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Gavel,
  Users,
  Briefcase,
  Globe,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const EcosystemSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const ecosystemCards = [
    {
      id: "01",
      title: "Check eligibility",
      description: "Use smart tools to assess your options.",
      company: "Work Permit Cloud",
      icon: CheckCircle,
      fullDescription:
        "Our smart assessment tools analyze your profile against UK immigration requirements, providing instant eligibility scores and personalized recommendations for visa pathways.",
      features: ["Instant assessment", "Smart recommendations", "Success rate tracking", "Document checklist"],
    },
    {
      id: "02",
      title: "Stay compliant",
      description: "HR & compliance retainers to meet Home Office rules.",
      company: "WPC HR",
      icon: Shield,
      fullDescription:
        "Stay ahead of changing immigration laws with our dedicated HR compliance team. We monitor Home Office rule changes and keep your business fully compliant.",
      features: ["Auto-updates", "Document tracking", "Risk alerts", "Compliance audits"],
    },
    {
      id: "03",
      title: "Resolve legal issues",
      description: "Expert support for suspensions, revocations and appeals.",
      company: "WPC Lawyers",
      icon: Gavel,
      fullDescription:
        "When immigration issues arise, our specialist lawyers provide strategic defense, appeal representation, and expert guidance through complex legal challenges.",
      features: ["24/7 support", "Case tracking", "Legal library", "Appeal management"],
    },
    {
      id: "04",
      title: "Hire & grow",
      description: "Sponsor-verified hiring and accountancy support.",
      company: "WPC Jobs",
      icon: Users,
      fullDescription:
        "Access our sponsor-verified talent pool and streamline your hiring process with integrated background checks and compliance verification.",
      features: ["Verified talent", "Smart matching", "Onboarding tools", "Background checks"],
    },
    {
      id: "05",
      title: "Manage finances",
      description: "Sponsor-friendly accounting, payroll and tax support.",
      company: "Accountants",
      icon: Briefcase,
      fullDescription:
        "Specialized accounting services for sponsored workers, including tax optimization, payroll management, and financial compliance reporting.",
      features: ["Tax optimization", "Payroll automation", "Real-time reports", "Financial planning"],
    },
    {
      id: "06",
      title: "Expand globally",
      description: "UK services across the UK and MENA region.",
      company: "Global Services",
      icon: Globe,
      fullDescription:
        "Global mobility solutions spanning the UK and MENA region, helping businesses expand internationally with local expertise and compliance support.",
      features: ["Multi-country", "Local experts", "Compliance ready", "Global mobility"],
    },
  ];

  const toggleMobileCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-br from-[#0B4EA2] via-[#0F5CC0] to-[#1C75FF]">
      {/* GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative max-w-[1450px] mx-auto px-5 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span className="text-blue-100 text-sm font-medium">
              Immigration, HR, legal and hiring — one platform
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight text-white tracking-tight">
            A Complete Immigration &
            <span className="block mt-2">Business Ecosystem</span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-xl leading-relaxed text-blue-100">
            From eligibility to hiring, compliance and legal support — everything is connected in one platform.
          </p>
        </div>

        {/* ── DESKTOP: horizontal expand cards (lg+) ── */}
        <div
          className="hidden lg:flex gap-3 overflow-hidden justify-center"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {ecosystemCards.map((card, index) => {
            const isHovered = hoveredCard === index;
            const Icon = card.icon;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                className="relative bg-white rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                style={{
                  width: isHovered ? "32%" : "11.6%",
                  minHeight: "380px",
                  transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  willChange: "width",
                }}
              >
                {/* TOP ACCENT BAR */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B4EA2] via-[#1C75FF] to-[#0B4EA2]" />

                {/* COLLAPSED VIEW */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-2 transition-opacity duration-200"
                  style={{ opacity: isHovered ? 0 : 1, pointerEvents: isHovered ? "none" : "auto" }}
                >
                  <div className="p-2.5 rounded-xl bg-blue-50">
                    <Icon className="w-5 h-5 text-[#0B4EA2]" />
                  </div>
                  <p
                    className="text-[12px] font-black text-[#0B4EA2] tracking-tight whitespace-nowrap select-none"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                    }}
                  >
                    {card.title}
                  </p>
                  <p className="text-[10px] font-mono font-semibold text-gray-300">{card.id}</p>
                </div>

                {/* EXPANDED VIEW */}
                <div
                  className="absolute inset-0 p-6 flex flex-col transition-opacity duration-200"
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? "auto" : "none" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex p-2.5 rounded-xl bg-blue-50">
                      <Icon className="w-5 h-5 text-[#0B4EA2]" />
                    </div>
                    <span className="text-[#0B4EA2] text-xs font-mono font-bold">{card.id}</span>
                  </div>
                  <h3 className="text-[18px] font-black tracking-tight text-gray-900 mb-1.5 capitalize leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-gray-400 mb-4">{card.description}</p>
                  <div className="bg-blue-50 rounded-xl p-3.5 mb-4">
                    <p className="text-[13px] text-gray-700 leading-relaxed">{card.fullDescription}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                      Key Features
                    </p>
                    <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                      {card.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0B4EA2] shrink-0" />
                          <span className="text-[12px] text-gray-600 leading-tight">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0B4EA2]">{card.company}</span>
                    <button className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B4EA2] hover:bg-[#0B4EA2] hover:text-white transition-all duration-200">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP HINT */}
        <div className="hidden lg:flex justify-center mt-8">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-blue-100 text-sm px-4 py-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Hover over any card to expand
          </span>
        </div>

        {/* ── MOBILE / TABLET: accordion cards (below lg) ── */}
        <div className="lg:hidden flex flex-col gap-3">
          {ecosystemCards.map((card, index) => {
            const isOpen = expandedCard === index;
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => toggleMobileCard(index)}
              >
                {/* TOP ACCENT */}
                <div className="h-1 bg-gradient-to-r from-[#0B4EA2] via-[#1C75FF] to-[#0B4EA2]" />

                {/* ALWAYS VISIBLE ROW */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 shrink-0">
                    <Icon className="w-5 h-5 text-[#0B4EA2]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-gray-300">{card.id}</span>
                    </div>
                    <h3 className="text-[15px] font-black text-gray-900 capitalize leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[12px] text-gray-400 mt-0.5 leading-snug">{card.description}</p>
                  </div>
                  <div
                    className="shrink-0 w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0B4EA2] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* EXPANDABLE CONTENT */}
                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{ maxHeight: isOpen ? "400px" : "0px", transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                  <div className="px-5 pb-5 border-t border-gray-100">
                    <div className="bg-blue-50 rounded-xl p-3.5 mt-4 mb-4">
                      <p className="text-[13px] text-gray-700 leading-relaxed">{card.fullDescription}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                        Key Features
                      </p>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                        {card.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0B4EA2] shrink-0" />
                            <span className="text-[12px] text-gray-600">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#0B4EA2]">{card.company}</span>
                      <button
                        className="flex items-center gap-2 bg-[#0B4EA2] text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-[#0d4fa8] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default EcosystemSection;
