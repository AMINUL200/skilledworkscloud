import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const points = [
  "You already have a company or purchased a business in the UK",
  "You're on a PSW visa, student visa (course completed), or a skilled worker looking to switch paths.",
  "You're ready to take charge of your visa status with expert guidance.",
  "You have sufficient resources to support your business.",
];

const SPSuitabilitySection = () => (
  <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#4F8DF8] w-full">
    {/* BG GLOW */}
    <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-white/10 blur-[120px] rounded-full pointer-events-none" />

    <div className="relative z-10 max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_540px] gap-10 lg:gap-14 xl:gap-20 items-center">

        {/* ── LEFT ── */}
        <div className="text-white w-full min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            Is Self-Sponsorship Right for You?
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-white/90 max-w-2xl">
            The Self-Sponsorship route is perfect for ambitious professionals who want to control their
            UK immigration journey.
          </p>

          {/* POINTS */}
          <div className="mt-7 sm:mt-8 space-y-4 sm:space-y-5">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#22C55E] fill-[#DCFCE7] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-white">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="mt-8 sm:mt-10 inline-flex items-center gap-2.5 bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_rgba(34,197,94,0.35)]">
            Check Your Eligibility
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── RIGHT — IMAGE COLLAGE (lg+ only) ── */}
        <div className="relative h-[480px] xl:h-[520px] hidden lg:block w-full">

          {/* MAIN IMAGE */}
          <div className="absolute right-6 top-16 w-[340px] xl:w-[380px] h-[340px] xl:h-[380px] rounded-[32px] overflow-hidden border-[5px] border-white/20 shadow-[0_24px_60px_rgba(15,23,42,0.30)]">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop"
              alt="Eligibility"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TOP-LEFT CIRCLE */}
          <div className="absolute top-0 left-8 w-[150px] h-[150px] xl:w-[170px] xl:h-[170px] rounded-full overflow-hidden border-[4px] border-white/40 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
              alt="Business Meeting"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT SMALL CARD */}
          <div className="absolute right-0 bottom-20 w-[140px] xl:w-[160px] h-[180px] xl:h-[200px] rounded-[22px] overflow-hidden border-[4px] border-white/30 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
              alt="Consultant"
              className="w-full h-full object-cover"
            />
          </div>

          {/* BOTTOM-LEFT CARD */}
          <div className="absolute left-10 bottom-0 w-[140px] xl:w-[155px] h-[120px] xl:h-[135px] rounded-[20px] overflow-hidden border-[4px] border-white/30 shadow-[0_16px_40px_rgba(15,23,42,0.25)]">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
              alt="Paperwork"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default SPSuitabilitySection;