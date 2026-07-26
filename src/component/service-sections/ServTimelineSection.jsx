import React from "react";
import {
  Search,
  PencilRuler,
  Code2,
  Rocket,
} from "lucide-react";

const ServTimelineSection = () => {
  const timeline = [
    {
      week: "Week 01",
      icon: Search,
      title: "Discovery",
      description:
        "Understanding goals, requirements, and project scope.",
    },
    {
      week: "Week 02",
      icon: PencilRuler,
      title: "Planning & Design",
      description:
        "Creating wireframes, UI concepts, and project roadmap.",
    },
    {
      week: "Week 03-05",
      icon: Code2,
      title: "Development",
      description:
        "Building and integrating all project functionality.",
    },
    {
      week: "Week 06",
      icon: Rocket,
      title: "Launch",
      description:
        "Deployment, optimization, and project delivery.",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

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
              text-white
              font-semibold
              text-sm
              mb-6
            "
          >
            PROJECT TIMELINE
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Your Journey To
            <span className="block text-primary">
              Project Success
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
            Every project follows a structured timeline
            designed to ensure quality delivery, complete
            transparency, and predictable outcomes.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block mt-24">
          <div className="relative">
            {/* Main Line */}
            <div
              className="
                absolute
                top-12
                left-0
                right-0
                h-[3px]
                bg-primary/20
              "
            />

            <div className="grid grid-cols-4 gap-8">
              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="relative text-center"
                  >
                    {/* Circle */}
                    <div
                      className="
                        relative z-10
                        mx-auto
                        w-24
                        h-24
                        rounded-full
                        bg-white
                        border-4
                        border-primary
                        shadow-card
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon className="w-10 h-10 text-primary" />
                    </div>

                    <span
                      className="
                        block
                        mt-6
                        text-primary
                        font-bold
                      "
                    >
                      {item.week}
                    </span>

                    <h3
                      className="
                        mt-3
                        text-xl
                        font-bold
                        text-text
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-text-light
                        leading-relaxed
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mt-16">
          <div className="relative">
            {/* Line */}
            <div
              className="
                absolute
                left-6
                top-0
                bottom-0
                w-[2px]
                bg-primary/20
              "
            />

            <div className="space-y-10">
              {timeline.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="
                      relative
                      pl-20
                    "
                  >
                    <div
                      className="
                        absolute
                        left-0
                        top-0
                        w-12
                        h-12
                        rounded-full
                        bg-white
                        border-2
                        border-primary
                        flex
                        items-center
                        justify-center
                        shadow-card
                      "
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <span
                      className="
                        text-primary
                        font-semibold
                      "
                    >
                      {item.week}
                    </span>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-bold
                        text-text
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-text-light
                        leading-relaxed
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default ServTimelineSection;