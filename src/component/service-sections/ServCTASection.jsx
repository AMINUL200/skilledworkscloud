import React from "react";
import {
  ArrowRight,
  Phone,
  Briefcase,
  Award,
  Users,
  Headphones,
} from "lucide-react";

const ServCTASection = () => {
  const stats = [
    {
      icon: Briefcase,
      value: "250+",
      label: "Projects Delivered",
    },
    {
      icon: Users,
      value: "98%",
      label: "Client Satisfaction",
    },
    {
      icon: Award,
      value: "12+",
      label: "Years Experience",
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-primary
          via-primary-dark
          to-navy
        "
      />

      {/* Decorative Blur */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-white/10
          rounded-full
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-white/10
          rounded-full
          blur-[140px]
        "
      />

      {/* Grid Pattern */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
          [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div
          className="
            text-center
            max-w-4xl
            mx-auto
          "
        >
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-white/10
              backdrop-blur-xl
              border
              border-white/20
              text-white
              font-semibold
              text-sm
            "
          >
            START YOUR JOURNEY
          </div>

          {/* Heading */}
          <h2
            className="
              mt-8
              text-4xl
              md:text-5xl
              lg:text-7xl
              font-black
              text-white
              leading-tight
            "
          >
            Ready To Transform
            <span className="block">
              Your Business?
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-8
              text-lg
              lg:text-xl
              text-white/80
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            Whether you're launching a new project,
            modernizing existing systems, or scaling
            your business, our experts are ready to
            help you achieve exceptional results.
          </p>

          {/* Buttons */}
          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-5
              mt-12
            "
          >
            <button
              className="
                btn
                bg-white
                text-primary
                hover:scale-105
                transition-all
                duration-300
                shadow-xl
              "
            >
              Start Your Project

              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              className="
                btn
                bg-white/10
                backdrop-blur-xl
                border
                border-white/20
                text-white
                hover:bg-white/20
                transition-all
                duration-300
              "
            >
              <Phone className="w-5 h-5" />

              Schedule Call
            </button>
          </div>

          {/* Stats */}
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-6
              mt-20
            "
          >
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/15
                    rounded-[28px]
                    p-6
                    text-center
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      mx-auto
                      rounded-2xl
                      bg-white/10
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-4xl
                      font-black
                      text-white
                    "
                  >
                    {item.value}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-white/70
                    "
                  >
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Trust Line */}
          <div
            className="
              mt-16
              flex
              flex-wrap
              justify-center
              gap-8
              text-white/70
              text-sm
              font-medium
            "
          >
            <span>✓ Free Consultation</span>
            <span>✓ No Hidden Costs</span>
            <span>✓ Expert Team</span>
            <span>✓ Fast Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServCTASection;