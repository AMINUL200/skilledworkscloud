import React from "react";
import {
  TrendingUp,
  Clock3,
  ShieldCheck,
  Rocket,
  DollarSign,
  Users,
  Briefcase,
  Trophy,
  Headphones,
  Award,
  Zap,
} from "lucide-react";

const ServBenefitsSection = ({ data }) => {
  console.log("ServBenefitsSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "BENEFITS",
    title = "Why Businesses Choose",
    highlighted_title = "Our Solutions",
    description = "We focus on delivering measurable value that helps organizations grow faster, operate smarter, and stay competitive in an evolving market.",
    features = [],
    statistics = [],
    title2 = "Investing In The Right Solution Today Creates Long-Term Business Success",
    short_desc = "Our goal is not only to deliver a service but to create measurable outcomes that drive growth, efficiency, and competitive advantage.",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    trendingup: TrendingUp,
    "trending-up": TrendingUp,
    clock: Clock3,
    clock3: Clock3,
    shield: ShieldCheck,
    shieldcheck: ShieldCheck,
    rocket: Rocket,
    dollar: DollarSign,
    dollarsign: DollarSign,
    users: Users,
    briefcase: Briefcase,
    trophy: Trophy,
    headphones: Headphones,
    award: Award,
    zap: Zap,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || TrendingUp;
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          {batch && (
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
              {batch}
            </div>
          )}

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
              leading-tight
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
                mt-6
                text-lg
                text-text-light
                leading-relaxed
              "
            >
              {description}
            </p>
          )}
        </div>

        {/* Benefits Grid */}
        {features && features.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
            {features.map((benefit, index) => {
              const Icon = getIcon(benefit.icon);

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-background
                    border border-border
                    rounded-[30px]
                    p-8
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-primary/20
                    hover:shadow-card
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      mb-6
                      group-hover:scale-110
                      transition-all
                      duration-300
                    "
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      text-xl
                      font-bold
                      text-text
                    "
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  {benefit.description && (
                    <p
                      className="
                        mt-4
                        text-text-light
                        leading-relaxed
                      "
                    >
                      {benefit.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Premium Stats Banner */}
        {statistics && statistics.length > 0 && (
          <div
            className="
              mt-20
              bg-gradient-to-r
              from-primary
              via-primary-dark
              to-primary
              rounded-[36px]
              p-10
              lg:p-14
              text-white
              shadow-button
            "
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
              {statistics.map((stat, index) => (
                <div key={index}>
                  <h3 className="text-5xl font-black">
                    {stat.number}
                  </h3>
                  <p className="mt-2 text-white/80">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Highlight */}
        {(title2 || short_desc) && (
          <div
            className="
              mt-12
              text-center
              max-w-4xl
              mx-auto
            "
          >
            {title2 && (
              <h3
                className="
                  text-3xl
                  font-black
                  text-text
                "
              >
                {title2}
              </h3>
            )}

            {short_desc && (
              <p
                className="
                  mt-4
                  text-lg
                  text-text-light
                  leading-relaxed
                "
              >
                {short_desc}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServBenefitsSection;