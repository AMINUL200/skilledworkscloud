import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What exactly is a Self Sponsorship Visa for the UK?",
    answer: "Self-sponsorship is a route where you establish or own a UK business, obtain a sponsor licence for that business, and then sponsor yourself for a Skilled Worker visa. It allows entrepreneurs and professionals to build a future in the UK while running their own company.",
  },
  {
    question: "Who can typically apply for a Self Sponsorship Visa in the UK?",
    answer: "Professionals, entrepreneurs, business owners, graduates, and skilled workers who want more control over their immigration journey can often explore the self-sponsorship route, provided they meet UK immigration and sponsorship requirements.",
  },
  {
    question: "How does the self-sponsorship route generally work for a UK visa?",
    answer: "The process usually involves establishing a UK company, creating a compliant business structure, applying for a sponsor licence, assigning yourself a Certificate of Sponsorship (CoS), and then applying for a Skilled Worker visa.",
  },
  {
    question: "Is a specific amount of investment capital mandatory for self-sponsorship?",
    answer: "There is no fixed minimum investment amount set specifically for self-sponsorship. However, you should have enough resources to establish and operate your business realistically and compliantly.",
  },
  {
    question: "Does my UK business need to be innovative to self-sponsor my visa?",
    answer: "No. Unlike some entrepreneur routes, self-sponsorship does not require your business idea to be innovative. Many industries and traditional business models can qualify if they meet sponsorship requirements.",
  },
  {
    question: "What role does a 'Sponsor Licence' play in the self-sponsorship process?",
    answer: "The sponsor licence is essential because it allows your UK company to legally sponsor skilled workers — including yourself — under the Skilled Worker visa route.",
  },
  {
    question: "Will I need to draw a minimum salary if I self-sponsor my UK visa?",
    answer: "Yes. Your sponsored role generally needs to meet the applicable Skilled Worker salary thresholds and job requirements set by UK immigration rules.",
  },
  {
    question: "Can I bring my family members to the UK if I opt for self-sponsorship?",
    answer: "Yes. Eligible dependants such as your partner and children can usually accompany you to the UK under the Skilled Worker dependant route.",
  },
  {
    question: "How long can I stay in the UK with a self-sponsored visa, and can it lead to settlement?",
    answer: "A self-sponsored Skilled Worker visa can often lead to Indefinite Leave to Remain (ILR) after 5 years, provided you continue meeting the relevant immigration requirements.",
  },
];

const SPFaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F8FBFF] overflow-hidden w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-text-light leading-6">
            Everything you need to know about Self-Sponsorship
          </p>
        </div>

        {/* ── FAQ LIST ── */}
        <div className="mt-8 sm:mt-10 lg:mt-12 space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/20 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
                    : "border-border bg-white"
                }`}
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 sm:gap-6 text-left px-4 sm:px-6 py-4 sm:py-5"
                >
                  <h3 className="text-sm sm:text-base lg:text-[17px] font-semibold leading-6 text-text">
                    {faq.question}
                  </h3>

                  <div className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary"
                  }`}>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </div>
                </button>

                {/* ANSWER */}
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-5 border-t border-border">
                      <p className="pt-4 text-xs sm:text-sm lg:text-[15px] leading-5 sm:leading-6 text-text-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white border border-border rounded-xl sm:rounded-2xl px-5 sm:px-7 py-4 sm:py-5 shadow-sm">
            <span className="text-sm sm:text-base font-medium text-text text-center sm:text-left">
              Still have questions about self-sponsorship?
            </span>
            <button className="btn btn-primary px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold whitespace-nowrap">
              Speak To An Adviser
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SPFaqSection;