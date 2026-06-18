import React from "react";
import { Search, Calculator, ArrowRight } from "lucide-react";

const ToolHeroSection = ({ tool }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-white to-primary-light/30">
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <span
              className="
                inline-flex
                items-center
                px-4 py-2
                rounded-full
                bg-primary/10
                text-primary
                text-sm
                font-semibold
              "
            >
              Free Immigration Tool
            </span>

            <h1
              className="
                mt-6
                text-4xl
                md:text-5xl
                lg:text-6xl
                font-black
                leading-tight
                text-text
              "
            >
              {tool?.title || "Sponsor Licence Status Check"}
            </h1>

            <p
              className="
                mt-6
                text-lg
                text-text-light
                leading-relaxed
                max-w-2xl
              "
            >
              Check eligibility, calculate visa costs,
              verify sponsorship licences and access
              powerful immigration tools instantly.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  50K+
                </h3>
                <p className="text-text-light">
                  Checks Completed
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary">
                  99%
                </h3>
                <p className="text-text-light">
                  Accuracy Rate
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary">
                  24/7
                </h3>
                <p className="text-text-light">
                  Available
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div>
            <div
              className="
                bg-white
                rounded-[32px]
                p-8
                shadow-card
                border
                border-border
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="
                    w-12 h-12
                    rounded-2xl
                    bg-primary-light
                    flex items-center justify-center
                  "
                >
                  <Search className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="font-bold text-xl text-text">
                    Quick Tool Access
                  </h3>
                  <p className="text-text-light text-sm">
                    Get results instantly
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium text-text">
                    Sponsor Licence Number
                  </label>

                  <input
                    type="text"
                    placeholder="Enter licence number..."
                    className="
                      w-full
                      h-14
                      px-5
                      rounded-2xl
                      border
                      border-border
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-text">
                    Company Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter company name..."
                    className="
                      w-full
                      h-14
                      px-5
                      rounded-2xl
                      border
                      border-border
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>

                <button
                  className="
                    w-full
                    btn
                    btn-primary
                    h-14
                  "
                >
                  Check Status
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Info */}
              <div
                className="
                  mt-6
                  p-4
                  rounded-2xl
                  bg-primary-light/50
                "
              >
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />

                  <span className="font-medium text-text">
                    Free & Instant Results
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ToolHeroSection;