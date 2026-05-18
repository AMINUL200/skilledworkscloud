import React from "react";

const steps = [
  {
    title: "Establish a UK Business",
    description:
      "We'll help you establish your company quickly and correctly. From registration to HMRC compliance, we handle the paperwork so you can focus on your business idea. This step takes just 1 month with our expert support.",
  },
  {
    title: "Create Your Business Plan",
    description:
      "Build a plan that works for you and the Home Office. Our team will guide you in crafting a business plan that showcases your vision and meets immigration requirements. You'll have a roadmap for success in no time.",
  },
  {
    title: "Apply for Your Sponsor Licence",
    description:
      "Get approved to sponsor yourself with an authorising officer in place. We'll prepare and submit your sponsor licence application, ensuring everything is in order for a smooth approval. Standard processing takes 8 weeks, or fast-track it to 10 days.",
  },
  {
    title: "Issue Your Certificate of Sponsorship",
    description:
      "Take control of your visa application. Once your licence is approved, we will assist your authorising officer to issue your own Certificate of Sponsorship (CoS) through your business. This is your key to applying for the Skilled Worker visa.",
  },
  {
    title: "Secure Your Visa and Start Your Journey",
    description:
      "Apply for your visa and begin building your future. With our guidance, submit your visa application and get ready to live and work in the UK on your terms. The entire process takes just 3–4 months.",
  },
];

const SPJourneySection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden w-full">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── HEADER ── */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold tracking-wide">
          Step by Step
        </div>
        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text">
          Your Self-Sponsorship Journey
        </h2>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-text-light leading-6">
          Once we go through the eligibility check, this is where we begin.
        </p>
      </div>

      {/* ── TIMELINE ── */}
      <div className="relative mt-14 sm:mt-16 lg:mt-20">

        {/* CENTER LINE */}
        <div className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary/10 via-primary to-primary/10" />

        <div className="space-y-8 sm:space-y-10 lg:space-y-14">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative flex flex-col lg:flex-row ${i % 2 === 0 ? "lg:justify-start" : "lg:justify-end"}`}
            >
              {/* TIMELINE DOT */}
              <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-[5px] border-white shadow-[0_0_0_6px_rgba(37,99,235,0.10)]" />

              {/* CARD */}
              <div className="relative w-full lg:w-[46%] bg-white rounded-2xl sm:rounded-[26px] border border-border shadow-[0_6px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] transition-all duration-500 p-5 sm:p-6 lg:p-8">

                {/* STEP NUMBER BADGE */}
                <div className="absolute -top-4 left-6 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">
                  0{i + 1}
                </div>

                <div className="pt-4 sm:pt-5">
                  <h3 className="text-base sm:text-lg lg:text-xl font-black leading-tight text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-5 sm:leading-6 text-text-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM INFO ── */}
      <div className="mt-12 sm:mt-14 lg:mt-16 flex justify-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-5 bg-[#F8FBFF] border border-border rounded-2xl sm:rounded-[26px] px-6 sm:px-8 lg:px-10 py-5 sm:py-6 shadow-sm">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
            🇬🇧
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black text-text">Full Process Timeline</h3>
            <p className="mt-1 text-xs sm:text-sm lg:text-base text-text-light leading-5 sm:leading-6">
              Complete your UK Self-Sponsorship journey in just{" "}
              <span className="font-bold text-primary">3–4 Months</span>{" "}
              with expert guidance at every stage.
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default SPJourneySection;