import React from "react";
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Database,
  PlugZap,
  Headphones,
  ArrowRight,
  Briefcase,
  Rocket,
  Users,
  Shield,
} from "lucide-react";

const ServServicesSection = ({ data }) => {
  console.log("ServServicesSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "OUR SERVICES",
    title = "Solutions Designed",
    highlighted_title = "For Every Business Need",
    description = "From strategy to execution, we provide complete digital solutions that help businesses innovate, grow, and succeed in today's competitive market.",
    services = [],
    title2 = "Need A Custom Solution?",
    short_desc = "Every business is unique. Our team can design and develop tailored solutions that perfectly match your requirements and future goals.",
    button_name = "Talk To Experts",
    button_url = "/contact",
  } = data || {};

  // Map icon names to components
  const iconMap = {
    globe: Globe,
    "shopping-cart": ShoppingCart,
    shoppingcart: ShoppingCart,
    dashboard: LayoutDashboard,
    layoutdashboard: LayoutDashboard,
    database: Database,
    plugzap: PlugZap,
    headphones: Headphones,
    briefcase: Briefcase,
    rocket: Rocket,
    users: Users,
    shield: Shield,
  };

  // Get icon component by name
  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || Globe;
  };

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />

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

        {/* Services List */}
        {services && services.length > 0 && (
          <div className="mt-16 space-y-6">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-white
                    border
                    border-border
                    rounded-[32px]
                    p-8
                    lg:p-10
                    shadow-card
                    hover:border-primary/20
                    hover:-translate-y-1
                    transition-all
                    duration-500
                  "
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Left */}
                    <div className="flex items-start gap-6">
                      <div
                        className="
                          w-16
                          h-16
                          rounded-3xl
                          bg-primary-light
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <div>
                        <h3
                          className="
                            text-2xl
                            font-bold
                            text-text
                          "
                        >
                          {service.title}
                        </h3>

                        {service.description && (
                          <p
                            className="
                              mt-3
                              text-text-light
                              leading-relaxed
                              max-w-3xl
                            "
                          >
                            {service.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right - Learn More Button */}
                    {service.button_name && service.button_url && (
                      <a
                        href={service.button_url}
                        className="
                          flex
                          items-center
                          gap-2
                          text-primary
                          font-semibold
                          shrink-0
                          group-hover:gap-4
                          transition-all
                          hover:text-primary-dark
                        "
                      >
                        {service.button_name}
                        <ArrowRight
                          className="
                            w-5
                            h-5
                          "
                        />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA Banner */}
        {(title2 || short_desc || button_name) && (
          <div
            className="
              mt-16
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
                  inline-block
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
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServServicesSection;