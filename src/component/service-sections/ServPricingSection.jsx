import React from "react";
import {
  Check,
  ArrowRight,
  Crown,
  Rocket,
  Building2,
  Briefcase,
  Users,
  Shield,
  Zap,
  Award,
  Globe,
  Star,
} from "lucide-react";

const ServPricingSection = ({ data }) => {
  console.log("ServPricingSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "PRICING",
    title = "Flexible Plans For",
    highlighted_title = "Every Business Size",
    description = "Transparent pricing options designed to match your goals, budget, and project requirements.",
    plans = [],
    title2 = "Need Something Custom?",
    short_desc = "Every business is different. Let's discuss your requirements and create a custom solution tailored to your goals and budget.",
    button_name = "Schedule Consultation",
    button_url = "/contact",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    rocket: Rocket,
    crown: Crown,
    building: Building2,
    building2: Building2,
    briefcase: Briefcase,
    users: Users,
    shield: Shield,
    zap: Zap,
    award: Award,
    globe: Globe,
    star: Star,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || Rocket;
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

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

        {/* Pricing Cards */}
        {plans && plans.length > 0 && (
          <div className={`grid lg:grid-cols-${Math.min(plans.length, 3)} gap-8 mt-20`}>
            {plans.map((plan, index) => {
              const Icon = getIcon(plan.icon);
              const isPopular = plan.batch && plan.batch.toLowerCase() === "most popular";

              return (
                <div
                  key={index}
                  className={`
                    relative
                    rounded-[36px]
                    border
                    p-8
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    ${
                      isPopular
                        ? `
                          bg-white
                          border-primary
                          shadow-[0_20px_60px_rgba(37,99,235,0.18)]
                          lg:scale-105
                        `
                        : `
                          bg-white
                          border-border
                          shadow-card
                        `
                    }
                  `}
                >
                  {isPopular && (
                    <div
                      className="
                        absolute
                        top-5
                        right-5
                        px-4
                        py-2
                        rounded-full
                        bg-primary
                        text-white
                        text-xs
                        font-bold
                      "
                    >
                      {plan.batch}
                    </div>
                  )}

                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-text
                    "
                  >
                    {plan.title}
                  </h3>

                  {plan.subtitle && (
                    <p
                      className="
                        mt-2
                        text-text-light
                      "
                    >
                      {plan.subtitle}
                    </p>
                  )}

                  <div className="mt-8">
                    <span
                      className="
                        text-5xl
                        font-black
                        text-text
                      "
                    >
                      {plan.price}
                    </span>
                  </div>

                  <div
                    className="
                      h-px
                      bg-border
                      my-8
                    "
                  />

                  <div className="space-y-4">
                    {plan.features && plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        <Check
                          className="
                            w-5
                            h-5
                            text-success
                          "
                        />

                        <span className="text-text-light">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plan.button_name && plan.button_url && (
                    <a
                      href={plan.button_url}
                      className={`
                        mt-10
                        w-full
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        ${
                          isPopular
                            ? "btn btn-primary"
                            : "btn btn-outline"
                        }
                      `}
                    >
                      {plan.button_name}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner */}
        {(title2 || short_desc || button_name) && (
          <div
            className="
              mt-20
              rounded-[32px]
              bg-gradient-to-r
              from-primary
              via-primary-dark
              to-primary
              p-10
              lg:p-14
              text-white
              text-center
              shadow-button
            "
          >
            {title2 && (
              <h3 className="text-3xl lg:text-4xl font-black">
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
                  leading-relaxed
                "
              >
                {short_desc}
              </p>
            )}

            {button_name && button_url && (
              <a
                href={button_url}
                className="
                  inline-flex
                  items-center
                  gap-3
                  mt-6
                  px-8
                  py-4
                  bg-white
                  text-primary
                  font-bold
                  rounded-2xl
                  hover:bg-gray-100
                  transition-all
                  duration-300
                  shadow-lg
                  hover:shadow-xl
                  hover:-translate-y-1
                "
              >
                {button_name}
                <ArrowRight className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServPricingSection;