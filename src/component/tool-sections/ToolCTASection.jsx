import React from "react";
import {
  ArrowRight,
  Phone,
  Calendar,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ToolCTASection = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div
          className="
            relative
            rounded-[40px]
            overflow-hidden
            bg-gradient-to-br
            from-primary
            via-primary-dark
            to-primary
            shadow-button
          "
        >
          {/* Decorative Blur */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              {/* Left Content */}
              <div>
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4 py-2
                    rounded-full
                    bg-white/10
                    text-white
                    backdrop-blur-md
                  "
                >
                  <ShieldCheck size={18} />
                  Trusted Immigration Solutions
                </div>

                <h2
                  className="
                    mt-6
                    text-4xl
                    md:text-5xl
                    lg:text-6xl
                    font-black
                    text-white
                    leading-tight
                  "
                >
                  Need Expert
                  <span className="block">
                    Immigration Advice?
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    text-lg
                    text-white/80
                    leading-relaxed
                    max-w-2xl
                  "
                >
                  Our tools provide instant results, but
                  for personalised guidance our expert
                  consultants are here to help you every
                  step of your immigration journey.
                </p>

                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {[
                    "Free Initial Consultation",
                    "Experienced Specialists",
                    "Fast Response Time",
                    "Tailored Advice",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-green-300"
                      />

                      <span className="text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mt-10">
                  <button className="btn btn-glass">
                    Book Consultation
                    <Calendar size={18} />
                  </button>

                  <button
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-7 py-4
                      rounded-2xl
                      bg-white
                      text-primary
                      font-semibold
                      hover:scale-105
                      transition-all
                    "
                  >
                    Get Started
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right Card */}
              <div>
                <div
                  className="
                    bg-white
                    rounded-[32px]
                    p-8
                    shadow-card
                  "
                >
                  <div
                    className="
                      w-20
                      h-20
                      rounded-3xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      mx-auto
                    "
                  >
                    <Phone
                      size={36}
                      className="text-primary"
                    />
                  </div>

                  <h3
                    className="
                      text-3xl
                      font-black
                      text-center
                      text-text
                      mt-6
                    "
                  >
                    Speak To An Expert
                  </h3>

                  <p
                    className="
                      text-center
                      text-text-light
                      mt-4
                      leading-relaxed
                    "
                  >
                    Book a free consultation and get
                    professional guidance tailored to
                    your immigration goals.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-5 mt-8">
                    <div
                      className="
                        bg-primary-light
                        rounded-2xl
                        p-5
                        text-center
                      "
                    >
                      <h4
                        className="
                          text-3xl
                          font-black
                          text-primary
                        "
                      >
                        10K+
                      </h4>

                      <p className="text-sm text-text-light mt-1">
                        Happy Clients
                      </p>
                    </div>

                    <div
                      className="
                        bg-primary-light
                        rounded-2xl
                        p-5
                        text-center
                      "
                    >
                      <h4
                        className="
                          text-3xl
                          font-black
                          text-primary
                        "
                      >
                        98%
                      </h4>

                      <p className="text-sm text-text-light mt-1">
                        Success Rate
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    className="
                      btn
                      btn-primary
                      w-full
                      mt-8
                    "
                  >
                    Schedule Free Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div
          className="
            mt-12
            grid
            md:grid-cols-3
            gap-6
          "
        >
          {[
            {
              title: "100% Secure",
              desc: "Your information is protected.",
            },
            {
              title: "Expert Guidance",
              desc: "Professional immigration support.",
            },
            {
              title: "Fast Processing",
              desc: "Quick and reliable assistance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                border
                border-border
                rounded-[24px]
                p-6
                shadow-card
                text-center
              "
            >
              <h4
                className="
                  text-xl
                  font-bold
                  text-text
                "
              >
                {item.title}
              </h4>

              <p
                className="
                  mt-2
                  text-text-light
                "
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolCTASection;