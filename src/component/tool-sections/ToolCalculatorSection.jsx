import React, { useState } from "react";
import {
  Calculator,
  PoundSterling,
  Globe,
  Calendar,
  CheckCircle2,
} from "lucide-react";

const ToolCalculatorSection = () => {
  const [formData, setFormData] = useState({
    country: "",
    visaType: "",
    duration: "",
  });

  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const visaFee = 719;
    const ihsFee = Number(formData.duration || 1) * 1035;

    setResult({
      visaFee,
      ihsFee,
      total: visaFee + ihsFee,
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
            "
          >
            <Calculator size={18} />
            Visa Fee Calculator
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
            Calculate Your
            <span className="block text-primary">
              Immigration Costs
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
            Estimate visa fees, immigration health surcharge
            and additional government charges instantly.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="
            mt-16
            grid
            lg:grid-cols-2
            gap-10
          "
        >
          {/* Left Form */}
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
            <h3
              className="
                text-2xl
                font-bold
                text-text
              "
            >
              Calculator Details
            </h3>

            <div className="mt-8 space-y-6">
              {/* Country */}
              <div>
                <label className="block mb-2 font-medium">
                  Country
                </label>

                <div className="relative">
                  <Globe
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-text-light
                    "
                  />

                  <select
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        country: e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-14
                      pl-12
                      pr-4
                      rounded-2xl
                      border
                      border-border
                      focus:border-primary
                      outline-none
                    "
                  >
                    <option>Select Country</option>
                    <option>India</option>
                    <option>Bangladesh</option>
                    <option>Pakistan</option>
                  </select>
                </div>
              </div>

              {/* Visa Type */}
              <div>
                <label className="block mb-2 font-medium">
                  Visa Type
                </label>

                <select
                  value={formData.visaType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      visaType: e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-14
                    px-4
                    rounded-2xl
                    border
                    border-border
                    focus:border-primary
                    outline-none
                  "
                >
                  <option>Select Visa Type</option>
                  <option>Skilled Worker</option>
                  <option>Student Visa</option>
                  <option>Spouse Visa</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-2 font-medium">
                  Duration (Years)
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-text-light
                    "
                  />

                  <input
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: e.target.value,
                      })
                    }
                    className="
                      w-full
                      h-14
                      pl-12
                      pr-4
                      rounded-2xl
                      border
                      border-border
                      focus:border-primary
                      outline-none
                    "
                    placeholder="Enter years"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                className="
                  btn
                  btn-primary
                  w-full
                  h-14
                "
              >
                Calculate Cost
              </button>
            </div>
          </div>

          {/* Right Result */}
          <div
            className="
              bg-gradient-to-br
              from-primary
              via-primary-dark
              to-primary
              rounded-[32px]
              p-8
              text-white
              shadow-button
            "
          >
            <div className="flex items-center gap-3">
              <PoundSterling size={28} />

              <h3
                className="
                  text-2xl
                  font-bold
                "
              >
                Cost Summary
              </h3>
            </div>

            {result ? (
              <>
                <div className="mt-10 space-y-6">
                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >
                    <span>Visa Fee</span>
                    <span className="font-bold">
                      £{result.visaFee}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >
                    <span>IHS Fee</span>
                    <span className="font-bold">
                      £{result.ihsFee}
                    </span>
                  </div>

                  <div className="border-t border-white/20 pt-6">
                    <div
                      className="
                        flex
                        justify-between
                        items-center
                      "
                    >
                      <span className="text-xl">
                        Total Cost
                      </span>

                      <span
                        className="
                          text-4xl
                          font-black
                        "
                      >
                        £{result.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    mt-10
                    bg-white/10
                    rounded-2xl
                    p-5
                  "
                >
                  <div className="flex gap-3">
                    <CheckCircle2 size={20} />

                    <p>
                      This is an estimated amount and
                      may vary depending on your
                      circumstances.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="
                  mt-12
                  text-center
                "
              >
                <Calculator
                  size={80}
                  className="mx-auto opacity-50"
                />

                <p className="mt-6 text-white/80">
                  Fill the form and calculate your
                  immigration costs instantly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Benefits */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-14
          "
        >
          {[
            "Instant Calculation",
            "Government Fee Estimates",
            "100% Free To Use",
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                border
                border-border
                rounded-3xl
                p-6
                shadow-card
                text-center
              "
            >
              <CheckCircle2
                className="
                  mx-auto
                  text-success
                "
              />

              <h4
                className="
                  mt-4
                  font-semibold
                  text-text
                "
              >
                {item}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolCalculatorSection;