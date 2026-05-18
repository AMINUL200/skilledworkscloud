import React from "react";

import {
  ArrowRight,
} from "lucide-react";

const EcosystemSection = () => {
  const ecosystemCards = [
    {
      id: "01",
      title: "Check eligibility",
      description: "Use smart tools to assess your options.",
      company: "Work Permit Cloud",
      color: "text-primary",
    },
    {
      id: "02",
      title: "Stay compliant",
      description: "HR & compliance retainers to meet Home Office rules.",
      company: "WPC HR",
      color: "text-green-600",
    },
    {
      id: "03",
      title: "Resolve legal issues",
      description: "Expert support for suspensions, revocations and appeals.",
      company: "WPC Lawyers",
      color: "text-yellow-600",
    },
    {
      id: "04",
      title: "Hire & grow",
      description: "Sponsor-verified hiring and accountancy support.",
      company: "WPC Jobs",
      color: "text-primary",
    },
    {
      id: "05",
      title: "Manage finances",
      description: "Sponsor-friendly accounting, payroll and tax support.",
      company: "Accountants",
      color: "text-primary",
    },
    {
      id: "06",
      title: "Expand globally",
      description: "UK services across the UK and MENA region.",
      company: "Global Services",
      color: "text-primary",
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        py-20
        lg:py-28
        bg-gradient-to-br
        from-[#0B4EA2]
        via-[#0F5CC0]
        to-[#1C75FF]
      "
    >
      {/* GLOW EFFECTS */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-white/10
          rounded-full
          blur-3xl
          animate-pulse
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-blue-300/10
          rounded-full
          blur-3xl
          animate-pulse
          delay-1000
        "
      />

      {/* CONTAINER */}
      <div
        className="
          relative
          max-w-[1450px]
          mx-auto
          px-5
          lg:px-8
        "
      >
        {/* TOP CONTENT */}
        <div className="text-center max-w-4xl mx-auto">
          <p
            className="
              text-blue-100
              text-lg
              font-medium
              inline-block
              px-4
              py-2
              rounded-full
              bg-white/5
              backdrop-blur-sm
            "
          >
            Immigration, HR, legal and hiring — one platform
          </p>

          <h2
            className="
              mt-6
              text-3xl
              md:text-4xl
              xl:text-5xl
              font-black
              leading-tight
              text-white
              tracking-tight
            "
          >
            A Complete Immigration & 
            <span className="block mt-2">Business Ecosystem</span>
          </h2>

          <p
            className="
              mt-6
              max-w-3xl
              mx-auto
              text-lg
              md:text-xl
              leading-relaxed
              text-blue-100
            "
          >
            From eligibility to hiring, compliance and legal support —
            everything is connected in one platform.
          </p>
        </div>

        {/* CARDS GRID */}
        <div
          className="
            mt-16
            lg:mt-20
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-6
            gap-6
          "
        >
          {ecosystemCards.map((card, index) => (
            <div
              key={index}
              className="
                relative
                group
                bg-white
                rounded-[32px]
                px-7
                py-8
                min-h-[380px]
                shadow-[0_15px_50px_rgba(15,23,42,0.12)]
                transition-all
                duration-500
                hover:-translate-y-3
                hover:shadow-[0_25px_70px_rgba(15,23,42,0.18)]
                overflow-hidden
                cursor-pointer
              "
            >
              {/* HOVER GRADIENT */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-blue-50
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                "
              />

              {/* NUMBER */}
              <div
                className="
                  relative
                  text-primary
                  text-[22px]
                  font-mono
                  font-semibold
                "
              >
                {card.id}
              </div>

              {/* TITLE */}
              <h3
                className="
                  relative
                  mt-5
                  text-[22px]
                  md:text-[24px]
                  leading-[1.2]
                  font-black
                  tracking-tight
                  text-text
                  capitalize
                "
              >
                {card.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  relative
                  mt-4
                  text-[14px]
                  leading-relaxed
                  text-text-light
                "
              >
                {card.description}
              </p>

              {/* BOTTOM SECTION */}
              <div
                className="
                  absolute
                  bottom-8
                  left-7
                  right-7
                "
              >
                <div className="h-px bg-border" />

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <h4
                    className={`
                      text-[14px]
                      font-bold
                      transition-colors
                      duration-300
                      ${card.color}
                    `}
                  >
                    {card.company}
                  </h4>

                  <button
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      text-primary
                      group-hover:bg-primary
                      group-hover:text-white
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                    aria-label={`Learn more about ${card.company}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;