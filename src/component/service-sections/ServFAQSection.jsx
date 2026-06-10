import React, { useState } from "react";
import {
  Plus,
  Minus,
  Search,
  MessageCircle,
} from "lucide-react";

const ServFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What services do you provide?",
      answer:
        "We provide web development, mobile app development, UI/UX design, cloud solutions, AI integration, and digital consulting services tailored to business needs.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Project timelines vary depending on scope and complexity. Most projects take between 2 and 12 weeks from planning to deployment.",
    },
    {
      question: "Do you provide ongoing support?",
      answer:
        "Yes. We offer maintenance, updates, monitoring, optimization, and dedicated support after project delivery.",
    },
    {
      question: "Can you work with existing systems?",
      answer:
        "Absolutely. We frequently integrate with existing software, APIs, CRMs, ERP systems, and third-party platforms.",
    },
    {
      question: "How much does a project cost?",
      answer:
        "Pricing depends on project requirements. We provide transparent estimates after understanding your goals and scope.",
    },
    {
      question: "Do you sign NDA agreements?",
      answer:
        "Yes. We respect confidentiality and are happy to sign NDA agreements before discussing sensitive business information.",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
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
            FAQ
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Frequently Asked
            <span className="block text-primary">
              Questions
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
            Find answers to the most common questions about
            our services, process, pricing, and support.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mt-12">
          <div
            className="
              flex
              items-center
              gap-3
              bg-white
              border
              border-border
              rounded-2xl
              px-5
              py-4
              shadow-card
            "
          >
            <Search className="w-5 h-5 text-text-light" />

            <input
              type="text"
              placeholder="Search your question..."
              className="
                w-full
                outline-none
                bg-transparent
                text-text
              "
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="mt-14 space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-border
                  rounded-[28px]
                  overflow-hidden
                  shadow-card
                "
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    p-6
                    text-left
                  "
                >
                  <h3
                    className="
                      text-lg
                      lg:text-xl
                      font-bold
                      text-text
                    "
                  >
                    {faq.question}
                  </h3>

                  <div
                    className="
                      shrink-0
                      w-10
                      h-10
                      rounded-full
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`
                    transition-all
                    duration-300
                    overflow-hidden
                    ${
                      isOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px bg-border mb-5" />

                    <p
                      className="
                        text-text-light
                        leading-relaxed
                        text-lg
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Box */}
        <div
          className="
            mt-20
            bg-white
            border
            border-border
            rounded-[36px]
            p-10
            shadow-card
            text-center
          "
        >
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-primary-light
              flex
              items-center
              justify-center
            "
          >
            <MessageCircle
              className="
                w-10
                h-10
                text-primary
              "
            />
          </div>

          <h3
            className="
              mt-6
              text-3xl
              font-black
              text-text
            "
          >
            Still Have Questions?
          </h3>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              text-lg
              text-text-light
            "
          >
            Our experts are ready to answer your questions
            and help you choose the best solution for your
            business.
          </p>

          <button className="btn btn-primary mt-8">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServFAQSection;