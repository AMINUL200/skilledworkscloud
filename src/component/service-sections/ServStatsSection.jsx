import React from "react";
import {
  Briefcase,
  Trophy,
  Clock3,
  Headphones,
  Rocket,
  Users,
  Shield,
} from "lucide-react";

const ServStatsSection = ({ data }) => {
  console.log("ServStatsSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "OUR IMPACT",
    title = "Trusted By Businesses",
    highlighted_title = "Across Industries",
    description = "Our track record reflects our commitment to delivering innovative, scalable, and high-quality solutions.",
    feature = [],
    tag_line = "Delivering Excellence, Innovation, and Long-Term Business Value",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    briefcase: Briefcase,
    trophy: Trophy,
    clock: Clock3,
    clock3: Clock3,
    headphones: Headphones,
    rocket: Rocket,
    users: Users,
    shield: Shield,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || Briefcase;
  };

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
            {batch && (
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
                {batch}
              </div>
            )}

            <h2
              className="
                mt-5
                text-3xl
                lg:text-4xl
                font-black
                text-text
              "
            >
              {title}
              {highlighted_title && (
                <span className="block text-primary">
                  {highlighted_title}
                </span>
              )}
            </h2>

            {description && (
              <p
                className="
                  mt-4
                  max-w-2xl
                  mx-auto
                  text-text-light
                  leading-relaxed
                "
              >
                {description}
              </p>
            )}
          </div>

          {/* Stats */}
          {feature && feature.length > 0 && (
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
              {feature.map((item, index) => {
                const Icon = getIcon(item.icon);

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
                      {item.number}
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
                      {item.title}
                    </h4>

                    {/* Description */}
                    {item.description && (
                      <p
                        className="
                          mt-3
                          text-text-light
                          leading-relaxed
                        "
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Bar */}
          {tag_line && (
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
                {tag_line}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServStatsSection;