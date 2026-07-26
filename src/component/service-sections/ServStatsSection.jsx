import React from "react";
import {
  Briefcase,
  Trophy,
  Clock3,
  Headphones,
} from "lucide-react";

const ServStatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      value: "250+",
      label: "Projects Delivered",
      description:
        "Successfully completed projects across industries.",
    },
    {
      icon: Trophy,
      value: "98%",
      label: "Success Rate",
      description:
        "Consistently achieving client goals and expectations.",
    },
    {
      icon: Clock3,
      value: "12+",
      label: "Years Experience",
      description:
        "A decade of expertise in delivering quality solutions.",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Support",
      description:
        "Dedicated assistance whenever you need help.",
    },
  ];

  return (
    <section className="relative -mt-12 z-20">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div
          className="
            bg-white
            border
            border-border
            rounded-[36px]
            shadow-card
            overflow-hidden
          "
        >
          {/* Header */}
          <div
            className="
              text-center
              px-8
              pt-12
            "
          >
            <div
              className="
                inline-flex
                items-center
                px-5
                py-2
                rounded-full
                bg-primary-light
                text-white
                font-semibold
                text-sm
              "
            >
              OUR IMPACT
            </div>

            <h2
              className="
                mt-5
                text-3xl
                lg:text-4xl
                font-black
                text-text
              "
            >
              Trusted By Businesses
              <span className="block text-primary">
                Across Industries
              </span>
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                mx-auto
                text-text-light
                leading-relaxed
              "
            >
              Our track record reflects our commitment
              to delivering innovative, scalable, and
              high-quality solutions.
            </p>
          </div>

          {/* Stats */}
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              divide-y
              md:divide-y-0
              xl:divide-x
              divide-border
              mt-12
            "
          >
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    p-8
                    lg:p-10
                    text-center
                    hover:bg-primary-light/20
                    transition-all
                    duration-300
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      w-16
                      h-16
                      mx-auto
                      rounded-3xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    <Icon
                      className="
                        w-8
                        h-8
                        text-white
                      "
                    />
                  </div>

                  {/* Value */}
                  <h3
                    className="
                      mt-6
                      text-5xl
                      lg:text-6xl
                      font-black
                      text-primary
                    "
                  >
                    {item.value}
                  </h3>

                  {/* Label */}
                  <h4
                    className="
                      mt-3
                      text-xl
                      font-bold
                      text-text
                    "
                  >
                    {item.label}
                  </h4>

                  {/* Description */}
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

          {/* Bottom Bar */}
          <div
            className="
              bg-gradient-to-r
              from-primary
              via-primary-dark
              to-primary
              py-6
              px-8
              text-center
            "
          >
            <p
              className="
                text-white
                font-semibold
                text-lg
              "
            >
              Delivering Excellence, Innovation, and Long-Term
              Business Value
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServStatsSection;