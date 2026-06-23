import React from "react";
import {
  Search,
  Lightbulb,
  Palette,
  Code2,
  Rocket,
} from "lucide-react";

const ServProcessSection = () => {
  const processSteps = [
    {
      step: "01",
      icon: Search,
      title: "Discovery & Consultation",
      description:
        "We start by understanding your business goals, challenges, and project requirements.",
    },
    {
      step: "02",
      icon: Lightbulb,
      title: "Planning & Strategy",
      description:
        "Our experts create a clear roadmap and strategic plan to ensure project success.",
    },
    {
      step: "03",
      icon: Palette,
      title: "Design & Development",
      description:
        "We craft modern user experiences and build powerful, scalable solutions.",
    },
    {
      step: "04",
      icon: Code2,
      title: "Testing & Optimization",
      description:
        "Every feature is thoroughly tested to ensure quality, performance, and security.",
    },
    {
      step: "05",
      icon: Rocket,
      title: "Launch & Growth",
      description:
        "After deployment, we continue supporting and optimizing your solution.",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="
              inline-flex
              items-center
              px-5 py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            OUR PROCESS
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
              leading-tight
            "
          >
            Simple Process,
            <span className="block text-primary">
              Exceptional Results
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            We follow a structured and transparent workflow that
            ensures efficiency, quality, and successful outcomes
            for every project.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="mt-20 relative">
          {/* Vertical Line */}
          <div
            className="
              absolute
              left-8
              lg:left-1/2
              top-0
              bottom-0
              w-[2px]
              bg-primary/20
              lg:-translate-x-1/2
            "
          />

          <div className="space-y-14">
            {processSteps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`
                    relative
                    flex
                    items-center
                    ${
                      isEven
                        ? "lg:flex-row"
                        : "lg:flex-row-reverse"
                    }
                  `}
                >
                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div
                      className={`
                        bg-background
                        border
                        border-border
                        rounded-[32px]
                        p-8
                        shadow-card
                        hover:border-primary/20
                        transition-all
                        duration-300
                        ${
                          isEven
                            ? "lg:mr-16"
                            : "lg:ml-16"
                        }
                      `}
                    >
                      <span
                        className="
                          text-primary
                          font-black
                          text-5xl
                        "
                      >
                        {item.step}
                      </span>

                      <h3
                        className="
                          mt-4
                          text-2xl
                          font-bold
                          text-text
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-4
                          text-text-light
                          leading-relaxed
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div
                    className="
                      absolute
                      left-8
                      lg:left-1/2
                      -translate-x-1/2
                      z-20
                    "
                  >
                    <div
                      className="
                        w-16
                        h-16
                        rounded-full
                        bg-white
                        border-4
                        border-primary
                        flex
                        items-center
                        justify-center
                        shadow-card
                      "
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>

                  {/* Empty Side */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default ServProcessSection;