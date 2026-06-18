import React, { useState } from "react";
import {
  CheckCircle2,
  User,
  Briefcase,
  Globe,
  ShieldCheck,
  ArrowRight,
  Award,
  Clock3,
} from "lucide-react";

const ToolEligibilitySection = () => {
  const [formData, setFormData] = useState({
    age: "",
    country: "",
    employed: "",
    visaType: "",
  });

  const [showResult, setShowResult] = useState(false);

  const handleCheck = () => {
    setShowResult(true);
  };

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
            <ShieldCheck size={18} />
            Eligibility Assessment
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
            Check Your
            <span className="block text-primary">
              Eligibility Instantly
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
            Complete a quick assessment to discover
            whether you're eligible for UK immigration,
            sponsorship or visa pathways.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-5 gap-10 mt-16">
          {/* Form */}
          <div
            className="
              lg:col-span-3
              bg-white
              border
              border-border
              rounded-[36px]
              shadow-card
              p-8 lg:p-10
            "
          >
            <h3
              className="
                text-3xl
                font-black
                text-text
              "
            >
              Eligibility Assessment Form
            </h3>

            <p
              className="
                mt-3
                text-text-light
              "
            >
              Fill out the details below to get
              an instant eligibility result.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">
              {/* Age */}
              <div>
                <label className="block mb-3 font-semibold">
                  Age
                </label>

                <div className="relative">
                  <User
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
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        age: e.target.value,
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
                      outline-none
                      focus:border-primary
                    "
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block mb-3 font-semibold">
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
                      outline-none
                      focus:border-primary
                    "
                  >
                    <option>Select Country</option>
                    <option>India</option>
                    <option>Bangladesh</option>
                    <option>Pakistan</option>
                    <option>Nepal</option>
                  </select>
                </div>
              </div>

              {/* Employment */}
              <div>
                <label className="block mb-3 font-semibold">
                  Employment Status
                </label>

                <div className="relative">
                  <Briefcase
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
                    value={formData.employed}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employed: e.target.value,
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
                      outline-none
                      focus:border-primary
                    "
                  >
                    <option>Select Status</option>
                    <option>Employed</option>
                    <option>Self Employed</option>
                    <option>Student</option>
                    <option>Unemployed</option>
                  </select>
                </div>
              </div>

              {/* Visa Type */}
              <div>
                <label className="block mb-3 font-semibold">
                  Visa Route
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
                    outline-none
                    focus:border-primary
                  "
                >
                  <option>Select Route</option>
                  <option>Skilled Worker</option>
                  <option>Student Visa</option>
                  <option>Spouse Visa</option>
                  <option>ILR</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCheck}
              className="
                btn
                btn-primary
                mt-8
              "
            >
              Check Eligibility
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Result Panel */}
          <div
            className="
              lg:col-span-2
              bg-gradient-to-br
              from-primary
              via-primary-dark
              to-primary
              rounded-[36px]
              p-8
              text-white
              shadow-button
            "
          >
            {!showResult ? (
              <>
                <h3
                  className="
                    text-3xl
                    font-black
                  "
                >
                  Your Result
                </h3>

                <p className="mt-4 text-white/80">
                  Complete the form and receive
                  an instant eligibility assessment.
                </p>

                <ShieldCheck
                  size={120}
                  className="
                    mx-auto
                    mt-16
                    opacity-30
                  "
                />
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={28} />

                  <h3
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    Eligible
                  </h3>
                </div>

                <p className="mt-5 text-white/90">
                  Based on the provided information,
                  you appear to meet the preliminary
                  eligibility criteria.
                </p>

                <div
                  className="
                    mt-10
                    bg-white/10
                    rounded-3xl
                    p-6
                  "
                >
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Eligibility Score</span>
                      <strong>92%</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Assessment</span>
                      <strong>Strong Candidate</strong>
                    </div>

                    <div className="flex justify-between">
                      <span>Status</span>
                      <strong>Qualified</strong>
                    </div>
                  </div>
                </div>

                <button
                  className="
                    btn
                    btn-glass
                    mt-8
                    w-full
                  "
                >
                  Book Consultation
                </button>
              </>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {[
            {
              icon: Award,
              title: "Expert Criteria",
              desc: "Built using immigration guidance and expert knowledge.",
            },
            {
              icon: Clock3,
              title: "Instant Result",
              desc: "Receive your assessment within seconds.",
            },
            {
              icon: ShieldCheck,
              title: "100% Free",
              desc: "No hidden charges or registration required.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-3xl
                border
                border-border
                shadow-card
                p-7
              "
            >
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-primary-light
                  flex
                  items-center
                  justify-center
                "
              >
                <item.icon
                  size={24}
                  className="text-primary"
                />
              </div>

              <h3
                className="
                  mt-5
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
                  leading-relaxed
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

export default ToolEligibilitySection;