import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const auditPoints = [
  "Covers record keeping, reporting duties and right-to-work",
  "Tailored findings + recommended next steps",
  "PDF report emailed to you instantly",
  "Reviewed by IAA-regulated specialists",
];

const HRComplianceFreeAuditSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#EEF5FD] w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* MAIN CARD */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[36px] bg-gradient-to-r from-[#0B3B82] via-[#114C97] to-[#0F4FA8] px-5 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-12 shadow-[0_20px_80px_rgba(15,79,168,0.25)]">

        {/* GLOW */}
        <div className="absolute -top-32 -right-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />

        {/* CONTENT */}
        <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8 lg:gap-10 items-center">

          {/* LEFT */}
          <div className="w-full min-w-0">
            <p className="uppercase tracking-[3px] text-blue-300 text-[11px] sm:text-xs font-bold">
              FREE INTERACTIVE TOOL
            </p>

            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl xl:text-4xl 2xl:text-5xl font-black leading-[1.15] tracking-tight text-white">
              Run a Free HR Compliance Audit in 60 Seconds
            </h2>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-blue-100 max-w-3xl">
              A short interactive audit that highlights the most common gaps Home Office officers find
              during a sponsor compliance visit. Identify weak spots before they become a civil penalty.
            </p>

            {/* POINTS */}
            <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {auditPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-white">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start xl:items-end gap-3">
            <button className="group bg-white text-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-[18px] sm:rounded-[22px] text-sm sm:text-base font-bold shadow-[0_10px_40px_rgba(255,255,255,0.15)] hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Get My Free Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-blue-200 text-xs sm:text-sm font-medium">
              Takes less than 2 minutes • Free
            </p>
          </div>

        </div>
      </div>

    </div>
  </section>
);

export default HRComplianceFreeAuditSection;