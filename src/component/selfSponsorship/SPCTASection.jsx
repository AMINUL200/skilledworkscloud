import React from "react";
import { ArrowRight, Download } from "lucide-react";

const SPCTASection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FBFF] overflow-hidden w-full">
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* CARD */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-[32px] border border-border bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] px-5 sm:px-10 lg:px-16 xl:px-20 py-10 sm:py-14 text-center">

        {/* BG GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          {/* TAG */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold">
            Your UK Future
          </div>

          {/* HEADING */}
          <h2 className="mt-4 sm:mt-5 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight leading-tight text-text">
            Be Your Own Sponsor
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-text-light">
            Take the first step toward immigration freedom and business ownership in the UK
          </p>

          {/* BUTTONS */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">

            {/* GUIDEBOOK */}
            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white border border-border hover:border-primary/30 text-text px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
              Download your free Guidebook
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* CONTACT */}
            <button className="btn btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:scale-105 transition-all duration-300">
              Contact Us
            </button>

          </div>
        </div>
      </div>

    </div>
  </section>
);

export default SPCTASection;