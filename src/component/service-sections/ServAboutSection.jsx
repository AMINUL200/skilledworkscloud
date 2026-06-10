import React from "react";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Rocket,
} from "lucide-react";

const ServAboutSection = () => {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Experienced Team",
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Innovative Solutions",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Trusted Support",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: "Proven Results",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-white
                border border-border
                shadow-card
                p-3
              "
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
                alt="About Service"
                className="
                  w-full
                  h-[550px]
                  object-cover
                  rounded-[24px]
                "
              />
            </div>

            {/* Floating Card */}
            <div
              className="
                absolute
                -bottom-8
                right-8
                bg-white
                p-6
                rounded-3xl
                shadow-card
                border border-border
              "
            >
              <h4 className="text-3xl font-black text-primary">
                10+
              </h4>

              <p className="text-text-light font-medium">
                Years Industry Experience
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Small Label */}
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
              ABOUT OUR SERVICES
            </div>

            {/* Heading */}
            <h2
              className="
                text-4xl
                lg:text-5xl
                font-black
                text-text
                leading-tight
              "
            >
              We Build Modern Solutions
              <span className="block text-primary">
                For Growing Businesses
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-8
                text-lg
                leading-relaxed
                text-text-light
              "
            >
              Our mission is to help businesses accelerate
              growth through innovative digital solutions,
              expert consulting, and long-term strategic
              partnerships. We focus on delivering measurable
              results while maintaining the highest standards
              of quality and customer satisfaction.
            </p>

            <p
              className="
                mt-5
                text-lg
                leading-relaxed
                text-text-light
              "
            >
              From startups to enterprise organizations,
              we provide scalable services tailored to your
              unique business requirements and future goals.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex items-center gap-4
                    p-5
                    bg-background
                    rounded-3xl
                    border border-border
                    hover:border-primary/30
                    transition-all duration-300
                  "
                >
                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-primary-light
                      flex items-center justify-center
                    "
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      font-semibold
                      text-text
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              className="
                mt-10
                p-6
                rounded-3xl
                bg-gradient-to-r
                from-primary-light
                to-white
                border border-primary/10
              "
            >
              <h4 className="text-xl font-bold text-text">
                Ready to Transform Your Business?
              </h4>

              <p className="mt-2 text-text-light">
                Let our experts help you build scalable,
                innovative, and future-ready solutions.
              </p>

              <button className="btn btn-primary mt-5">
                Talk To Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServAboutSection;