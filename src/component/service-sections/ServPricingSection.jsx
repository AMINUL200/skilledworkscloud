import React from "react";
import {
  Check,
  ArrowRight,
  Crown,
  Rocket,
  Building2,
} from "lucide-react";

const ServPricingSection = () => {
  const plans = [
    {
      icon: Rocket,
      title: "Starter",
      price: "$999",
      subtitle: "Perfect for startups & small businesses",
      features: [
        "Responsive Website",
        "Up to 5 Pages",
        "Basic SEO Setup",
        "Contact Forms",
        "30 Days Support",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      icon: Crown,
      title: "Professional",
      price: "$2,999",
      subtitle: "Ideal for growing businesses",
      features: [
        "Custom Design",
        "CMS Integration",
        "Advanced SEO",
        "Analytics Setup",
        "Priority Support",
        "Performance Optimization",
      ],
      buttonText: "Most Popular",
      popular: true,
    },
    {
      icon: Building2,
      title: "Enterprise",
      price: "Custom",
      subtitle: "Tailored solutions for enterprises",
      features: [
        "Unlimited Pages",
        "Custom Integrations",
        "Dedicated Team",
        "Advanced Security",
        "Cloud Infrastructure",
        "Long-Term Support",
      ],
      buttonText: "Contact Sales",
      popular: false,
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
            PRICING
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Flexible Plans For
            <span className="block text-primary">
              Every Business Size
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
            Transparent pricing options designed to match
            your goals, budget, and project requirements.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

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
                    plan.popular
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
                {plan.popular && (
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
                    MOST POPULAR
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

                <p
                  className="
                    mt-2
                    text-text-light
                  "
                >
                  {plan.subtitle}
                </p>

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
                  {plan.features.map((feature) => (
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

                <button
                  className={`
                    mt-10
                    w-full
                    ${
                      plan.popular
                        ? "btn btn-primary"
                        : "btn btn-outline"
                    }
                  `}
                >
                  {plan.buttonText}

                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default ServPricingSection;