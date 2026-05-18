import React from "react";
import { Star, ArrowRight } from "lucide-react";

const stats = [
  { value: "100%", label: "Control" },
  { value: "90%", label: "Success Rate" },
  { value: "3-4", label: "Months Process" },
];

const certs = [
  { src: "https://upload.wikimedia.org/wikipedia/en/0/0d/Immigration_Advice_Authority_logo.png", alt: "IAA" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cyber_Essentials_logo.svg/512px-Cyber_Essentials_logo.svg.png", alt: "Cyber Essentials" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cyber_Essentials_logo.svg/512px-Cyber_Essentials_logo.svg.png", alt: "Cyber Plus" },
];

const SPBannerSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#EEF5FD] overflow-hidden w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] 2xl:grid-cols-[1fr_560px] gap-10 lg:gap-14 xl:gap-20 items-center">

        {/* ── LEFT ── */}
        <div className="w-full min-w-0">

          {/* TRUST BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#DDE7FF] text-primary text-xs sm:text-sm font-medium">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
            Trusted by 1,000+ professionals worldwide
          </div>

          {/* HEADING */}
          <h1 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-black leading-[1.15] tracking-tight text-text">
            Own Your UK Future: Become Your Own Visa Sponsor
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-text-light max-w-2xl">
            Set up a legal UK company with our expert guidance. Whether you're starting a tech firm,
            restaurant, or consulting business, we'll handle registration, HMRC compliance, and more —
            all in just the first month.
          </p>

          {/* STATS */}
          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:gap-6 md:gap-10 max-w-lg">
            {stats.map((s, i) => (
              <div key={i}>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-text">{s.value}</h3>
                <p className="mt-1.5 text-xs sm:text-sm md:text-base text-text leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CERTIFICATIONS */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            {certs.map((c, i) => (
              <div
                key={i}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden p-2"
              >
                <img src={c.src} alt={c.alt} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>

          {/* CTA BUTTON */}
          <button className="btn btn-primary mt-8 sm:mt-10 px-6 sm:px-8 py-3 sm:py-3.5 rounded-[18px] sm:rounded-[22px] text-sm sm:text-base font-semibold flex items-center gap-2">
            Start Your Journey
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className="relative flex justify-center w-full min-w-0">

          {/* IMAGE */}
          <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-[28px] lg:rounded-[36px] shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-white/40">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop"
              alt="Self Sponsorship"
              className="w-full h-[300px] sm:h-[420px] md:h-[500px] lg:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/30 via-transparent to-transparent" />
          </div>

          {/* FLOATING CARD */}
          <div className="hidden lg:flex absolute -bottom-8 -left-8 bg-white rounded-2xl sm:rounded-[24px] shadow-[0_16px_50px_rgba(15,23,42,0.10)] border border-border px-5 sm:px-6 py-4 sm:py-5 items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
              🇬🇧
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-text">UK Business Setup</h4>
              <p className="mt-0.5 text-xs sm:text-sm text-text-light">Fast-track self sponsorship support</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default SPBannerSection;