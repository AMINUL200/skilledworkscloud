import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
  Clock3,
  MessageSquare,
} from "lucide-react";

const ToolFaqSection = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    {
      question: "How accurate are the tool results?",
      answer:
        "Our tools are built using official immigration guidance and industry best practices. Results should be considered preliminary assessments and not legal advice.",
    },
    {
      question: "Are these tools completely free to use?",
      answer:
        "Yes. All assessment, calculator and eligibility tools are completely free and available 24/7.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account is required. You can use most tools instantly without registration.",
    },
    {
      question: "Can I save my results?",
      answer:
        "Once connected to our backend system, you'll be able to save and download reports.",
    },
    {
      question: "What should I do after getting my result?",
      answer:
        "You can book a consultation with our immigration experts or explore relevant services based on your assessment.",
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
              px-4 py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
            "
          >
            <HelpCircle size={18} />
            Frequently Asked Questions
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
            Got Questions?
            <span className="block text-primary">
              We've Got Answers
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
            Find answers to common questions about our
            immigration tools, assessments and calculators.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="relative">
            <Search
              size={20}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-text-light
              "
            />

            <input
              type="text"
              placeholder="Search questions..."
              className="
                w-full
                h-16
                pl-14
                pr-5
                rounded-2xl
                border
                border-border
                bg-white
                shadow-card
                outline-none
                focus:border-primary
              "
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            "General",
            "Eligibility",
            "Calculator",
            "Visa",
            "Compliance",
          ].map((item, index) => (
            <button
              key={index}
              className="
                px-5 py-3
                rounded-full
                bg-white
                border
                border-border
                text-text-light
                hover:bg-primary
                hover:text-white
                transition-all
              "
            >
              {item}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto mt-16 space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="
                bg-white
                border
                border-border
                rounded-[28px]
                shadow-card
                overflow-hidden
              "
            >
              <button
                onClick={() =>
                  setActiveFaq(
                    activeFaq === index ? null : index
                  )
                }
                className="
                  w-full
                  flex
                  justify-between
                  items-center
                  p-6
                  text-left
                "
              >
                <h3
                  className="
                    text-lg
                    lg:text-xl
                    font-semibold
                    text-text
                    pr-5
                  "
                >
                  {faq.question}
                </h3>

                {activeFaq === index ? (
                  <ChevronUp
                    className="text-primary"
                    size={22}
                  />
                ) : (
                  <ChevronDown
                    className="text-text-light"
                    size={22}
                  />
                )}
              </button>

              <div
                className={`
                  transition-all duration-300 overflow-hidden
                  ${
                    activeFaq === index
                      ? "max-h-60 pb-6 px-6"
                      : "max-h-0"
                  }
                `}
              >
                <p
                  className="
                    text-text-light
                    leading-relaxed
                  "
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-20
          "
        >
          {[
            {
              icon: ShieldCheck,
              value: "99%",
              label: "Accuracy Rate",
            },
            {
              icon: Clock3,
              value: "24/7",
              label: "Tool Availability",
            },
            {
              icon: MessageSquare,
              value: "50K+",
              label: "Questions Answered",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-white
                  rounded-[30px]
                  border
                  border-border
                  shadow-card
                  p-8
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
                    mt-5
                    text-4xl
                    font-black
                    text-primary
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                    mt-2
                    text-text-light
                  "
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
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
          <div className="p-10 lg:p-14 text-center">
            <h3
              className="
                text-3xl
                lg:text-4xl
                font-black
              "
            >
              Still Have Questions?
            </h3>

            <p
              className="
                mt-4
                text-white/80
                max-w-2xl
                mx-auto
              "
            >
              Speak with our experts and get
              personalized guidance for your
              immigration journey.
            </p>

            <button
              className="
                btn
                btn-glass
                mt-8
              "
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolFaqSection;