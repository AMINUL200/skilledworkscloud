import React from "react";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";

const pricingPlans = [
  {
    title: "Starter",
    price: "£199",
    description: "Perfect for startups and small businesses.",
    features: ["Basic HR Compliance", "Document Verification", "Email Support"],
  },
  {
    title: "Professional",
    price: "£499",
    description: "Advanced compliance management for growing businesses.",
    active: true,
    features: ["Sponsor Licence Support", "Right To Work Checks", "Priority Support"],
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Complete HR & immigration compliance solution.",
    features: ["Dedicated Consultant", "Compliance Audit", "24/7 Support"],
  },
];

const HRComplianceBanner = () => (
  <section className="relative overflow-hidden min-h-screen flex items-center w-full">

    {/* BG IMAGE */}
    <img
      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop"
      alt="HR Compliance"
      className="absolute inset-0 w-full h-full object-cover"
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#0F172A]/85 to-[#2563EB]/40" />

    {/* CONTAINER */}
    <div className="relative w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_820px] 2xl:grid-cols-[1fr_900px] gap-10 lg:gap-12 xl:gap-16 items-center">

        {/* ── LEFT ── */}
        <div className="w-full min-w-0 max-w-xl">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl text-blue-200 text-xs sm:text-sm font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            HR Compliance Solutions
          </div>

          {/* HEADING */}
          <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-black leading-[1.1] tracking-tight text-white">
            Smart HR Compliance
            <span className="block text-blue-400">For Modern Businesses</span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-slate-300">
            Stay compliant with UK immigration laws, sponsor licence requirements,
            right-to-work checks and HR monitoring systems using our advanced compliance services.
          </p>

          {/* BUTTONS */}
          <div className="mt-7 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button className="btn btn-primary px-6 sm:px-7 py-3 sm:py-3.5 rounded-[16px] sm:rounded-[20px] text-sm sm:text-base font-semibold">
              Contact Us
            </button>
            <button className="bg-white/10 backdrop-blur-xl border border-white/10 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-[16px] sm:rounded-[20px] text-sm sm:text-base font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── RIGHT — PRICING CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full min-w-0">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`
                relative rounded-2xl sm:rounded-[28px] border backdrop-blur-2xl
                p-5 sm:p-6 flex flex-col transition-all duration-500 hover:-translate-y-1.5
                ${plan.active
                  ? "bg-white text-text border-white shadow-[0_20px_60px_rgba(37,99,235,0.25)] sm:scale-[1.03]"
                  : "bg-white/10 border-white/10 text-white"}
              `}
            >
              {/* POPULAR BADGE */}
              {plan.active && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                  Most Popular
                </div>
              )}

              {/* PLAN NAME */}
              <p className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[2px] sm:tracking-[3px] ${plan.active ? "text-primary" : "text-blue-200"}`}>
                {plan.title}
              </p>

              {/* PRICE */}
              <div className="mt-4">
                <h3 className="text-3xl sm:text-4xl font-black">{plan.price}</h3>
                <p className={`mt-1.5 text-xs sm:text-sm ${plan.active ? "text-text-light" : "text-slate-300"}`}>
                  Per Month
                </p>
              </div>

              {/* DESCRIPTION */}
              <p className={`mt-4 text-xs sm:text-sm leading-5 sm:leading-6 ${plan.active ? "text-text-light" : "text-slate-300"}`}>
                {plan.description}
              </p>

              {/* DIVIDER */}
              <div className={`mt-4 sm:mt-5 h-px ${plan.active ? "bg-border" : "bg-white/10"}`} />

              {/* FEATURES */}
              <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 ${plan.active ? "bg-primary/10 text-primary" : "bg-white/10 text-blue-200"}`}>
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <p className={`text-xs sm:text-sm leading-5 sm:leading-6 ${plan.active ? "text-text" : "text-slate-200"}`}>
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA BUTTON */}
              <button className={`
                mt-6 w-full py-2.5 sm:py-3 rounded-xl sm:rounded-[18px]
                text-sm font-semibold transition-all duration-300
                ${plan.active
                  ? "bg-primary text-white hover:bg-primary-dark shadow-md"
                  : "bg-white/10 text-white hover:bg-white hover:text-primary"}
              `}>
                Book Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default HRComplianceBanner;