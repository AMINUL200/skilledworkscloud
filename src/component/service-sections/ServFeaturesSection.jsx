import React from "react";
import {
  Globe,
  ShieldCheck,
  Zap,
  Layers3,
  Smartphone,
  BarChart3,
} from "lucide-react";

const ServFeaturesSection = () => {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Expand your business worldwide with scalable and future-ready solutions.",
    },
    {
      icon: ShieldCheck,
      title: "Enterprise Security",
      description:
        "Advanced security practices to keep your data and users protected.",
    },
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Optimized architecture ensuring lightning-fast speed and reliability.",
    },
    {
      icon: Layers3,
      title: "Scalable Architecture",
      description:
        "Designed to grow alongside your business without limitations.",
    },
    {
      icon: Smartphone,
      title: "Responsive Experience",
      description:
        "Perfect user experience across desktop, tablet, and mobile devices.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track performance with powerful reporting and business intelligence.",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Heading */}
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
            FEATURES
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
            Powerful Features Built
            <span className="block text-primary">
              For Modern Businesses
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
            We deliver innovative solutions packed with modern
            capabilities that help businesses improve efficiency,
            increase revenue, and create exceptional customer
            experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

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
                  <Icon className="w-8 h-8 text-primary" />
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

        {/* Bottom Info Banner */}
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
          <h3 className="text-3xl font-black">
            Everything You Need In One Solution
          </h3>

          <p
            className="
              mt-4
              max-w-3xl
              mx-auto
              text-white/80
              text-lg
            "
          >
            Our solutions combine performance, scalability,
            security, and innovation to help your business
            stay ahead of the competition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServFeaturesSection;