import React from "react";

const steps = [
  {
    id: "1",
    title: "Establish Your UK Business",
    description:
      "Set up a legal UK company with our expert guidance. Whether you're starting a tech firm, restaurant, or consulting business, we'll handle registration, HMRC compliance, and more — all in just the first month.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Apply for Sponsor Licence",
    description:
      "With our support, submit your sponsor licence application to the Home Office. We'll prepare all documents and ensure compliance, aiming for approval within 8 weeks — or as fast as 10 days with priority service.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Sponsor Yourself",
    description:
      "Once approved, issue a Certificate of Sponsorship (CoS) through your own company. This allows you to apply for a Skilled Worker visa, securing your stay in the UK with full independence.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Begin Your UK Journey",
    description:
      "Apply for your Skilled Worker visa with our guidance and start building your business in the UK. The entire process takes just 3–4 months, giving you the freedom to live and work on your terms.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop",
  },
];

const SelfSponsorshipStepsSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FBFF] w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── HEADER ── */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text">
          How Self-Sponsorship Works
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-text-light leading-6 sm:leading-7">
          A streamlined path to UK immigration that gives you complete control of your future
        </p>
      </div>

      {/* ── STEPS GRID ── */}
      <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl sm:rounded-[28px] border border-border bg-white shadow-[0_6px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.09)] transition-all duration-500"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">

              {/* LEFT — CONTENT */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
                {/* STEP PILL */}
                <div className="inline-flex items-center gap-2 self-start mb-3 sm:mb-4">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-md">
                    {step.id}
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[3px] text-primary">
                    Step {step.id}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-black leading-tight text-text">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm lg:text-[15px] leading-5 sm:leading-6 text-text-light">
                  {step.description}
                </p>
              </div>

              {/* RIGHT — IMAGE */}
              <div className="relative min-h-[200px] sm:min-h-full overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {/* LEFT FADE for seamless blend */}
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default SelfSponsorshipStepsSection;