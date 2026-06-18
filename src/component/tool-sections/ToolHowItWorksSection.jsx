import React from "react";
import {
  FileText,
  Search,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock3,
  Lock,
  BadgeCheck,
} from "lucide-react";

const ToolHowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Submit Information",
      description:
        "Enter your details, company information, visa route, or eligibility requirements.",
    },
    {
      number: "02",
      icon: Search,
      title: "System Analysis",
      description:
        "Our intelligent system validates and processes the information instantly.",
    },
    {
      number: "03",
      icon: ShieldCheck,
      title: "Assessment & Verification",
      description:
        "The platform checks eligibility, compliance, sponsorship, and requirements.",
    },
    {
      number: "04",
      icon: CheckCircle2,
      title: "Get Results",
      description:
        "Receive instant results, recommendations, and next-step guidance.",
    },
  ];

  const benefits = [
    {
      icon: Clock3,
      title: "Instant Results",
      description: "Get answers within seconds.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Your information stays protected.",
    },
    {
      icon: BadgeCheck,
      title: "Accurate Analysis",
      description: "Built using verified immigration rules.",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
            "
          >
            How It Works
          </div>

          <h2
            className="
              mt-6
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Simple Process.
            <span className="block text-primary">
              Powerful Results.
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
            Our tools are designed to provide accurate
            insights quickly and efficiently through a
            streamlined process.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20">
          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-4
              gap-8
            "
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="
                    relative
                    bg-white
                    border
                    border-border
                    rounded-[32px]
                    p-8
                    shadow-card
                    hover:-translate-y-2
                    transition-all
                    duration-300
                  "
                >
                  {/* Number */}
                  <div
                    className="
                      absolute
                      top-6
                      right-6
                      text-5xl
                      font-black
                      text-primary/10
                    "
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon
                      size={28}
                      className="text-primary"
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-text
                    "
                  >
                    {step.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-text-light
                      leading-relaxed
                    "
                  >
                    {step.description}
                  </p>

                  {/* Arrow */}
                  {index !== steps.length - 1 && (
                    <ArrowRight
                      className="
                        hidden
                        xl:block
                        absolute
                        -right-6
                        top-1/2
                        -translate-y-1/2
                        text-primary
                        z-10
                      "
                      size={28}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Banner */}
        <div
          className="
            mt-20
            rounded-[36px]
            overflow-hidden
            bg-gradient-to-r
            from-primary
            via-primary-dark
            to-primary
            text-white
            shadow-button
          "
        >
          <div className="grid lg:grid-cols-2 gap-10 p-10 lg:p-14">
            <div>
              <h3
                className="
                  text-4xl
                  font-black
                "
              >
                Fast. Secure.
                <br />
                Reliable.
              </h3>

              <p
                className="
                  mt-6
                  text-white/80
                  text-lg
                  leading-relaxed
                "
              >
                Our intelligent tools are designed to
                simplify complex immigration and visa
                processes, helping you make informed
                decisions faster.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                justify-center
              "
            >
              <div
                className="
                  grid
                  grid-cols-2
                  gap-6
                  w-full
                "
              >
                <div
                  className="
                    bg-white/10
                    rounded-3xl
                    p-6
                    text-center
                  "
                >
                  <h4 className="text-4xl font-black">
                    50K+
                  </h4>

                  <p className="mt-2 text-white/80">
                    Assessments
                  </p>
                </div>

                <div
                  className="
                    bg-white/10
                    rounded-3xl
                    p-6
                    text-center
                  "
                >
                  <h4 className="text-4xl font-black">
                    99%
                  </h4>

                  <p className="mt-2 text-white/80">
                    Accuracy
                  </p>
                </div>

                <div
                  className="
                    bg-white/10
                    rounded-3xl
                    p-6
                    text-center
                  "
                >
                  <h4 className="text-4xl font-black">
                    24/7
                  </h4>

                  <p className="mt-2 text-white/80">
                    Availability
                  </p>
                </div>

                <div
                  className="
                    bg-white/10
                    rounded-3xl
                    p-6
                    text-center
                  "
                >
                  <h4 className="text-4xl font-black">
                    100%
                  </h4>

                  <p className="mt-2 text-white/80">
                    Free Tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-8
            mt-16
          "
        >
          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-border
                  rounded-[30px]
                  p-8
                  shadow-card
                  text-center
                "
              >
                <div
                  className="
                    w-16
                    h-16
                    mx-auto
                    rounded-2xl
                    bg-primary-light
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    size={28}
                    className="text-primary"
                  />
                </div>

                <h3
                  className="
                    mt-6
                    text-xl
                    font-bold
                    text-text
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-text-light
                  "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolHowItWorksSection;