import React from "react";
import { Plane } from "lucide-react";

const AboutCompanySection = () => (
  <section className="relative py-12 sm:py-16 lg:py-20 bg-background overflow-hidden w-full">
    <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* ── LEFT — IMAGE COLLAGE ── */}
        <div className="relative w-full">

          {/* DASHED PATH */}
          <div className="absolute left-[-20px] top-[80px] hidden lg:block pointer-events-none">
            <svg width="520" height="420" viewBox="0 0 520 420" fill="none">
              <path
                d="M20 130 C20 70, 80 70, 105 105 C155 170, 170 200, 120 270 C88 312, 110 360, 210 360 C335 360 350 210, 445 118"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeDasharray="9 9"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* AIRPLANE ICON */}
          <div className="absolute top-4 left-[56%] z-20 hidden lg:flex w-14 h-14 rounded-full bg-white shadow-lg items-center justify-center">
            <Plane className="w-7 h-7 text-primary rotate-45" />
          </div>

          {/* COLLAGE CONTAINER */}
          <div className="relative w-full max-w-[560px] h-[420px] sm:h-[480px] lg:h-[520px]">

            {/* TOP IMAGE */}
            <div className="absolute top-0 left-6 w-[54%] h-[48%] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.12)] border-[6px] border-white z-10">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </div>

            {/* SMALL RIGHT IMAGE */}
            <div className="absolute top-[28%] right-0 w-[30%] h-[30%] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(15,23,42,0.12)] border-[6px] border-white z-20">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Business Discussion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* LARGE BOTTOM IMAGE */}
            <div className="absolute bottom-0 left-0 w-[80%] h-[56%] rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.14)] border-[6px] border-white">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
                alt="Office Team"
                className="w-full h-full object-cover"
              />
            </div>

            {/* EXPERIENCE CARD */}
            <div className="absolute bottom-6 -left-4 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-[22px] bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_14px_40px_rgba(37,99,235,0.35)] flex flex-col items-center justify-center text-white">
              <h3 className="text-2xl sm:text-3xl font-black leading-none">20+</h3>
              <p className="mt-1.5 text-[10px] sm:text-xs text-center leading-4 text-blue-100">
                Years of<br />Experience
              </p>
            </div>

          </div>
        </div>

        {/* ── RIGHT — CONTENT ── */}
        <div className="lg:pl-6 w-full min-w-0">

          {/* LABEL */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-xs sm:text-sm font-semibold mb-4">
            About Our Company
          </div>

          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text leading-[1.1] mb-4 sm:mb-5">
            About Us
          </h2>

          {/* BODY */}
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-6 sm:leading-7 text-text-light">
            <p>
              WorkPermitCloud is an innovative Legal and HR-tech company established in 2020.
              We specialise in Business Immigration and HR systems in the UK.
            </p>
            <p>
              We offer IAA regulated immigration services to clients. We advise and process
              application bundles for Sponsorship Licence Applications, HR file preparations
              for Home Office compliance, Recruitment, Certificate of Sponsorship (CoS) and
              processing Visa Applications on behalf of our clients.
            </p>
            <p>
              Since its inception in 2020, we have served more than 1000+ clients with a
              commendable success rate.
            </p>
            <p>
              We have developed software solutions (SaaS) for HR Management Systems as per
              the guidance of the Home Office to cater for the needs of our clients.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 sm:mt-7 flex flex-wrap gap-3 sm:gap-4">
            <button className="btn btn-primary px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.30)] hover:scale-105 transition-all duration-300">
              Learn More
            </button>
            <button className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-primary/20 bg-white text-primary text-sm sm:text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default AboutCompanySection;