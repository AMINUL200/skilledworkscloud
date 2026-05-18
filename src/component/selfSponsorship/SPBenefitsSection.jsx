import React from "react";

const benefits = [
  {
    title: "Complete Independence",
    description: "Break free from employer sponsorship. With self-sponsorship, you control your Skilled Worker visa and your future in the UK.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Business Ownership",
    description: "Own 100% of your UK business with no prior visa restrictions. Start your entrepreneurial journey while securing your immigration status.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Entrepreneurial Freedom",
    description: "Launch and grow your own business in the UK — whether it's tech, hospitality, or consulting — while ensuring your visa stability.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Path to Settlement",
    description: "The Skilled Worker visa through self-sponsorship offers a clear route to permanent residency in the UK after 5 years.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Bring Your Family",
    description: "Include your partner and children (under 18) as dependents, allowing your whole family to join you in the UK.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Flexibility",
    description: "Choose any legal business type that suits your vision, with no restrictive innovation requirements to hold you back.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
  },
];

const SPBenefitsSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FBFF] w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── HEADER ── */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text">
          Why Choose Self-Sponsorship?
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-text-light leading-6">
          Take control of your immigration journey with these unique advantages
        </p>
      </div>

      {/* ── BENEFITS GRID ── */}
      <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {benefits.map((benefit, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-2xl sm:rounded-[24px] bg-white border border-border shadow-[0_6px_24px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(15,23,42,0.09)] transition-all duration-500 flex flex-col"
          >
            {/* IMAGE */}
            <div className="relative aspect-[16/9] overflow-hidden shrink-0">
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
              <h3 className="text-base sm:text-lg lg:text-xl font-black leading-tight text-text">
                {benefit.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-5 sm:leading-6 text-text-light flex-1">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default SPBenefitsSection;