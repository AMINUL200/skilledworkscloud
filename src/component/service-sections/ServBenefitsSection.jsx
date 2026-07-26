import React from "react";
import {
  TrendingUp,
  Clock3,
  ShieldCheck,
  Rocket,
  DollarSign,
  Users,
} from "lucide-react";

const ServBenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Business Growth",
      description:
        "Increase efficiency, revenue, and customer engagement with modern solutions.",
    },
    {
      icon: Clock3,
      title: "Save Time",
      description:
        "Automate repetitive tasks and streamline operations for better productivity.",
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      description:
        "Optimize resources and lower operational expenses through smart systems.",
    },
    {
      icon: ShieldCheck,
      title: "Reliable Security",
      description:
        "Protect your business with secure, scalable, and future-ready solutions.",
    },
    {
      icon: Rocket,
      title: "Faster Delivery",
      description:
        "Accelerate project execution and bring ideas to market more quickly.",
    },
    {
      icon: Users,
      title: "Better Customer Experience",
      description:
        "Deliver exceptional experiences that improve customer satisfaction and loyalty.",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px]" />

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
            BENEFITS
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
            Why Businesses Choose
            <span className="block text-primary">
              Our Solutions
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
            We focus on delivering measurable value that helps
            organizations grow faster, operate smarter, and
            stay competitive in an evolving market.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

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
                <p
                  className="
                    mt-4
                    text-text-light
                    leading-relaxed
                  "
                >
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Premium Stats Banner */}
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
          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl font-black">
                250+
              </h3>
              <p className="mt-2 text-white/80">
                Projects Completed
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                98%
              </h3>
              <p className="mt-2 text-white/80">
                Client Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                12+
              </h3>
              <p className="mt-2 text-white/80">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                24/7
              </h3>
              <p className="mt-2 text-white/80">
                Dedicated Support
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Highlight */}
        <div
          className="
            mt-12
            text-center
            max-w-4xl
            mx-auto
          "
        >
          <h3
            className="
              text-3xl
              font-black
              text-text
            "
          >
            Investing In The Right Solution Today
            Creates Long-Term Business Success
          </h3>

          <p
            className="
              mt-4
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            Our goal is not only to deliver a service but to
            create measurable outcomes that drive growth,
            efficiency, and competitive advantage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServBenefitsSection;