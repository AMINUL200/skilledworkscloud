import React from "react";
import { Check, ArrowRight } from "lucide-react";

const pricingPlans = [
  {
    title: "Starter HRMS",
    price: "£199",
    duration: "/month",
    active: false,
    features: ["Employee Database", "Right To Work Tracking", "Absence Management", "Basic Reporting", "Email Support"],
  },
  {
    title: "Professional HRMS",
    price: "£499",
    duration: "/month",
    active: true,
    features: ["Sponsor Licence Compliance", "Advanced HR Monitoring", "Alert Management", "Priority Support", "Full Reporting Dashboard"],
  },
  {
    title: "Enterprise HRMS",
    price: "Custom",
    duration: "",
    active: false,
    features: ["Unlimited Employees", "Dedicated Consultant", "Custom HR Workflows", "24/7 Support", "Complete Compliance Audit"],
  },
];

const notes = [
  "Price is exclusive of VAT",
  "Initial HR file setup isn't included - fees start from £750+VAT, depending on staff numbers and company size.",
  "No extra pre- or post-compliance visit support if your subscription is under 90 days.",
  "Employers will receive a complimentary allocation of checks based on their company size for an initial two-week period.",
];

const HRPricingSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#EEF5FD] w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── HEADER ── */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="uppercase tracking-[4px] text-primary text-[11px] sm:text-xs font-bold">
          HRMS Pricing
        </p>
        <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text">
          Flexible Pricing For Businesses
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-text-light">
          Smart HR compliance and sponsorship management plans for businesses of all sizes.
        </p>
      </div>

      {/* ── PRICING CARDS ── */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {pricingPlans.map((plan, i) => (
          <div
            key={i}
            className={`
              relative bg-white rounded-2xl sm:rounded-[28px] border p-6 sm:p-7 lg:p-8
              shadow-[0_6px_30px_rgba(15,23,42,0.05)] transition-all duration-500 hover:-translate-y-1.5
              ${plan.active
                ? "border-primary shadow-[0_16px_60px_rgba(37,99,235,0.18)] sm:scale-[1.02]"
                : "border-border"}
            `}
          >
            {/* POPULAR BADGE */}
            {plan.active && (
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">
                Most Popular
              </div>
            )}

            {/* PLAN NAME */}
            <p className="text-primary text-[11px] sm:text-xs font-bold uppercase tracking-[3px]">
              {plan.title}
            </p>

            {/* PRICE */}
            <div className="mt-4 flex items-end gap-1.5">
              <h3 className="text-4xl sm:text-5xl font-black text-text">{plan.price}</h3>
              {plan.duration && (
                <span className="mb-1.5 text-sm sm:text-base text-text-light">{plan.duration}</span>
              )}
            </div>

            {/* DIVIDER */}
            <div className="mt-5 h-px bg-border" />

            {/* FEATURES */}
            <div className="mt-5 space-y-3 sm:space-y-4">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-text-light">{feature}</p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button className="btn btn-primary mt-7 w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold">
              Book a demo
            </button>
          </div>
        ))}
      </div>

      {/* ── NOTES ── */}
      <div className="mt-8 sm:mt-10 space-y-2.5 sm:space-y-3">
        {notes.map((note, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="text-red-500 text-base leading-5 shrink-0">*</span>
            <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-text">{note}</p>
          </div>
        ))}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="mt-10 sm:mt-12 bg-white rounded-2xl sm:rounded-[28px] border border-border shadow-[0_6px_30px_rgba(15,23,42,0.05)] overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] items-center">

          {/* LEFT */}
          <div className="relative px-6 sm:px-10 py-8 sm:py-10">
            <div className="absolute left-0 top-0 w-2.5 sm:w-3 h-full bg-primary rounded-l-[28px]" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-primary">
              More than 50 Employees?
            </h3>
          </div>

          {/* RIGHT */}
          <div className="px-6 sm:px-8 py-6 sm:py-8 bg-[#F8FBFF] flex flex-col items-start xl:items-center">
            <p className="text-lg sm:text-xl font-semibold text-text">Ask for Quote</p>
            <button className="btn btn-primary mt-4 px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold flex items-center gap-2">
              Contact Us Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </div>
  </section>
);

export default HRPricingSection;