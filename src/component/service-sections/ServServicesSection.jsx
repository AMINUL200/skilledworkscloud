import React from "react";
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  Database,
  PlugZap,
  Headphones,
  ArrowRight,
} from "lucide-react";

const ServServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Custom Website Development",
      description:
        "Modern, responsive, and SEO-friendly websites tailored to your business goals.",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Development",
      description:
        "Powerful online stores with secure payments and exceptional shopping experiences.",
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard Solutions",
      description:
        "Smart management systems that simplify business operations and reporting.",
    },
    {
      icon: Database,
      title: "Database & Backend Systems",
      description:
        "Scalable server-side architecture built for performance and reliability.",
    },
    {
      icon: PlugZap,
      title: "API Integrations",
      description:
        "Connect your systems seamlessly with third-party services and automation tools.",
    },
    {
      icon: Headphones,
      title: "Maintenance & Support",
      description:
        "Continuous monitoring, updates, and technical support after project delivery.",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />

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
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            OUR SERVICES
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
              leading-tight
            "
          >
            Solutions Designed
            <span className="block text-primary">
              For Every Business Need
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
            From strategy to execution, we provide complete
            digital solutions that help businesses innovate,
            grow, and succeed in today's competitive market.
          </p>
        </div>

        {/* Services List */}
        <div className="mt-16 space-y-6">
          {services.map((service, index) => {
            const Icon = service.icon;

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
                      <Icon className="w-8 h-8 text-primary" />
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
                    </div>
                  </div>

                  {/* Right */}
                  <button
                    className="
                      flex
                      items-center
                      gap-2
                      text-primary
                      font-semibold
                      shrink-0
                      group-hover:gap-4
                      transition-all
                    "
                  >
                    Learn More

                    <ArrowRight
                      className="
                        w-5
                        h-5
                      "
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div
          className="
            mt-16
            rounded-[36px]
            bg-gradient-to-r
            from-primary
            via-primary-dark
            to-primary
            p-10
            lg:p-14
            text-center
            text-white
            shadow-button
          "
        >
          <h3
            className="
              text-3xl
              lg:text-4xl
              font-black
            "
          >
            Need A Custom Solution?
          </h3>

          <p
            className="
              mt-4
              text-white/80
              text-lg
              max-w-3xl
              mx-auto
            "
          >
            Every business is unique. Our team can design
            and develop tailored solutions that perfectly
            match your requirements and future goals.
          </p>

          <button className="btn btn-glass mt-8">
            Discuss Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServServicesSection;