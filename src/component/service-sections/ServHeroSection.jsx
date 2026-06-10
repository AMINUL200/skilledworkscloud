import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Briefcase,
} from "lucide-react";

const ServHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-40 pb-24">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2
                px-5 py-2 mb-8
                rounded-full
                bg-primary-light
                border border-primary/10
              "
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary font-semibold text-sm">
                Professional Digital Services
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                leading-tight
                text-text
              "
            >
              Transform Your Business With
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-primary
                  via-primary-dark
                  to-primary
                  bg-clip-text
                  text-transparent
                "
              >
                Modern Solutions
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-8
                text-lg
                lg:text-xl
                text-text-light
                max-w-2xl
                leading-relaxed
              "
            >
              We help businesses grow through cutting-edge web
              development, mobile applications, UI/UX design,
              cloud solutions, and digital transformation services.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="btn btn-primary btn-icon">
                Get Started
                <ArrowRight />
              </button>

              <button className="btn btn-outline">
                View Portfolio
              </button>
            </div>

            {/* Trust Items */}
            <div className="grid sm:grid-cols-2 gap-4 mt-12">
              {[
                "Free Consultation",
                "24/7 Support",
                "Expert Team",
                "Fast Delivery",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center gap-3
                    bg-white
                    px-4 py-3
                    rounded-2xl
                    shadow-card
                    border border-border
                  "
                >
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <span className="font-medium text-text">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="relative flex justify-center">
            {/* Main Image */}
            <div
              className="
                relative
                bg-white
                p-3
                rounded-[32px]
                shadow-card
                border border-border
              "
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200"
                alt="Service"
                className="
                  rounded-[24px]
                  w-full
                  max-w-[620px]
                  h-[500px]
                  object-cover
                "
              />
            </div>

            {/* Floating Card 1 */}
            <div
              className="
                absolute
                top-10
                -left-5
                bg-white
                rounded-3xl
                p-5
                shadow-card
                border border-border
              "
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-10 h-10 text-primary" />
                <div>
                  <h4 className="text-2xl font-bold text-text">
                    250+
                  </h4>
                  <p className="text-sm text-text-light">
                    Projects Delivered
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div
              className="
                absolute
                bottom-24
                -left-8
                bg-white
                rounded-3xl
                p-5
                shadow-card
                border border-border
              "
            >
              <div className="flex items-center gap-3">
                <Users className="w-10 h-10 text-primary" />
                <div>
                  <h4 className="text-2xl font-bold text-text">
                    98%
                  </h4>
                  <p className="text-sm text-text-light">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 3 */}
            <div
              className="
                absolute
                -bottom-6
                right-10
                bg-white
                rounded-3xl
                p-5
                shadow-card
                border border-border
              "
            >
              <div className="text-center">
                <h4 className="text-3xl font-black text-primary">
                  12+
                </h4>
                <p className="text-sm text-text-light">
                  Years Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServHeroSection;