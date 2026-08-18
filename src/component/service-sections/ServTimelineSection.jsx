import React from "react";
import {
  Search,
  PencilRuler,
  Code2,
  Rocket,
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Database,
  PlugZap,
  Headphones,
  Briefcase,
  Users,
  Shield,
  ArrowRight,
} from "lucide-react";

const ServTimelineSection = ({ data }) => {

  // Extract data with fallbacks
  const {
    batch = "PROJECT TIMELINE",
    title = "Your Journey To",
    highlighted_title = "Project Success",
    description = "Every project follows a structured timeline designed to ensure quality delivery, complete transparency, and predictable outcomes.",
    timelines = [],
    title2 = "Transparent Progress At Every Stage",
    short_desc = "You'll always know what stage your project is in, what has been completed, and what's coming next. No surprises, just clear communication and results.",
    button_name = "Schedule Consultation",
    button_url = "/contact-us",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    search: Search,
    pencil: PencilRuler,
    pencilruler: PencilRuler,
    code: Code2,
    code2: Code2,
    rocket: Rocket,
    globe: Globe,
    shoppingcart: ShoppingCart,
    "shopping-cart": ShoppingCart,
    dashboard: LayoutDashboard,
    layoutdashboard: LayoutDashboard,
    database: Database,
    plugzap: PlugZap,
    headphones: Headphones,
    briefcase: Briefcase,
    users: Users,
    shield: Shield,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || Search;
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

        {/* Desktop Timeline */}
        {timelines && timelines.length > 0 && (
          <>
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

                <div className={`grid grid-cols-${Math.min(timelines.length, 4)} gap-8`}>
                  {timelines.map((item, index) => {
                    const Icon = getIcon(item.icon);

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
                          {item.batch}
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
                  {timelines.map((item, index) => {
                    const Icon = getIcon(item.icon);

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
                          {item.batch}
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

                        {item.description && (
                          <p
                            className="
                              mt-2
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
              </div>
            </div>
          </>
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

export default ServTimelineSection;