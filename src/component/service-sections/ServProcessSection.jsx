import React from "react";
import {
  Search,
  Lightbulb,
  Palette,
  Code2,
  Rocket,
  Users,
  Target,
  Settings,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const ServProcessSection = ({ data }) => {

  // Extract data with fallbacks
  const {
    batch = "OUR PROCESS",
    title = "Simple Process,",
    highlighted_title = "Exceptional Results",
    description = "We follow a structured and transparent workflow that ensures efficiency, quality, and successful outcomes for every project.",
    steps = [],
    title2 = "A Proven Workflow That Delivers Results",
    short_desc = "From consultation to launch, our step-by-step process ensures efficiency, transparency, and measurable outcomes.",
    button_name = "Get Started",
    button_url = "/contact-us",
  } = data || {};

  // Map step numbers to icons
  const getIconForStep = (stepNumber) => {
    const iconMap = {
      "01": Search,
      "02": Lightbulb,
      "03": Palette,
      "04": Code2,
      "05": Rocket,
      "06": Users,
      "07": Target,
      "08": Settings,
      "09": TrendingUp,
      "10": Rocket,
    };
    return iconMap[stepNumber] || Search;
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

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

        {/* Process Timeline */}
        {steps && steps.length > 0 && (
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
              {steps.map((item, index) => {
                const Icon = getIconForStep(item.number);
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`
                      relative
                      flex
                      items-center
                      ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}
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
                          ${isEven ? "lg:mr-16" : "lg:ml-16"}
                        `}
                      >
                        <span
                          className="
                            text-primary
                            font-black
                            text-5xl
                          "
                        >
                          {item.number}
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

                        {item.description && (
                          <p
                            className="
                              mt-4
                              text-text-light
                              leading-relaxed
                            "
                          >
                            {item.description}
                          </p>
                        )}
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

export default ServProcessSection;