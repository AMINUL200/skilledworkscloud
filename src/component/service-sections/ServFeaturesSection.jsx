import React from "react";
import {
  Globe,
  ShieldCheck,
  Zap,
  Layers3,
  Smartphone,
  BarChart3,
  Rocket,
  Users,
  Award,
  Clock,
  Headphones,
  Briefcase,
} from "lucide-react";

const ServFeaturesSection = ({ data }) => {
  console.log("ServFeaturesSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "FEATURES",
    title = "Powerful Features Built",
    highlighted_title = "For Modern Businesses",
    description = "We deliver innovative solutions packed with modern capabilities that help businesses improve efficiency, increase revenue, and create exceptional customer experiences.",
    features = [],
    title2 = "Everything You Need In One Solution",
    short_desc = "Our solutions combine performance, scalability, security, and innovation to help your business stay ahead of the competition.",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    globe: Globe,
    shield: ShieldCheck,
    shieldcheck: ShieldCheck,
    zap: Zap,
    layers: Layers3,
    layers3: Layers3,
    mobile: Smartphone,
    smartphone: Smartphone,
    chart: BarChart3,
    barchart3: BarChart3,
    rocket: Rocket,
    users: Users,
    award: Award,
    clock: Clock,
    headphones: Headphones,
    briefcase: Briefcase,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || Globe;
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Heading */}
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

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => {
              const Icon = getIcon(feature.icon);

              return (
                <div
                  key={index}
                  className="
                    group
                    relative
                    bg-white
                    rounded-[28px]
                    border border-border
                    p-8
                    shadow-card
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-primary/20
                  "
                >
                  {/* Hover Gradient */}
                  <div
                    className="
                      absolute
                      inset-0
                      opacity-0
                      group-hover:opacity-100
                      transition-all
                      duration-500
                      bg-gradient-to-br
                      from-primary/5
                      to-transparent
                    "
                  />

                  {/* Icon */}
                  <div
                    className="
                      relative
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
                      relative
                      text-xl
                      font-bold
                      text-text
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  {feature.description && (
                    <p
                      className="
                        relative
                        mt-4
                        text-text-light
                        leading-relaxed
                      "
                    >
                      {feature.description}
                    </p>
                  )}

                  {/* Bottom Accent */}
                  <div
                    className="
                      relative
                      mt-8
                      h-1
                      w-12
                      rounded-full
                      bg-primary
                      transition-all
                      duration-300
                      group-hover:w-24
                    "
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Info Banner */}
        {(title2 || short_desc) && (
          <div
            className="
              mt-20
              rounded-[32px]
              bg-gradient-to-r
              from-primary
              via-primary-dark
              to-primary
              p-10
              text-center
              text-white
              shadow-button
            "
          >
            {title2 && (
              <h3 className="text-3xl font-black">
                {title2}
              </h3>
            )}

            {short_desc && (
              <p
                className="
                  mt-4
                  max-w-3xl
                  mx-auto
                  text-white/80
                  text-lg
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

export default ServFeaturesSection;