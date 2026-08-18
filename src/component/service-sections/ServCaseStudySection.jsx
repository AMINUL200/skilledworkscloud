import React from "react";
import {
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const ServCaseStudySection = ({ data }) => {

  // Extract data with fallbacks
  const {
    batch = "SUCCESS STORY",
    title = "Helping Businesses",
    highlighted_title = "Hire Global Talent",
    description = "Discover how we helped a growing UK company obtain a Sponsor Licence and successfully recruit skilled overseas professionals.",
    title2 = "Sponsor Licence Approved For UK Technology Company",
    short_desc = "A rapidly expanding technology company faced difficulties recruiting qualified local talent.",
    challenge_title = "Immigration Challenge",
    challenge_desc = "The company needed approval before hiring overseas workers.",
    strategy_title = "Our Legal Strategy",
    strategy_desc = "We prepared documentation, compliance reports and HR systems.",
    services = [],
    results = [],
    testimonial_title = "Client Testimonial",
    testimonial_desc = "The team guided us through every stage of the Sponsor Licence process. Their expertise ensured a smooth approval.",
    button_name = "Book A Consultation",
    button_url = "/contact",
  } = data || {};

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          {batch && (
            <div
              className="
                inline-flex
                items-center
                px-5 py-2
                rounded-full
                bg-primary-light
                text-white
                font-semibold
                text-sm
                mb-6
              "
            >
              {batch}
            </div>
          )}

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            {title}
            {highlighted_title && (
              <span className="block text-primary">
                {highlighted_title}
              </span>
            )}
          </h2>

          {description && (
            <p
              className="
                mt-6
                text-lg
                text-text-light
                leading-relaxed
              "
            >
              {description}
            </p>
          )}
        </div>

        {/* Case Study Content */}
        <div
          className="
            mt-20
            bg-white
            border
            border-border
            rounded-[40px]
            p-8
            lg:p-16
            shadow-card
          "
        >
          {/* Category */}
          {batch && (
            <div
              className="
                inline-flex
                px-4
                py-2
                rounded-full
                bg-primary-light
                text-white
                font-semibold
                text-sm
              "
            >
              {batch}
            </div>
          )}

          {/* Title */}
          {title2 && (
            <h3
              className="
                mt-6
                text-3xl
                lg:text-5xl
                font-black
                text-text
                leading-tight
              "
            >
              {title2}
            </h3>
          )}

          {/* Intro */}
          {short_desc && (
            <p
              className="
                mt-6
                text-lg
                text-text-light
                leading-relaxed
              "
            >
              {short_desc}
            </p>
          )}

          {/* Challenge */}
          {(challenge_title || challenge_desc) && (
            <div className="mt-12">
              {challenge_title && (
                <h4 className="text-2xl font-bold text-text mb-4">
                  {challenge_title}
                </h4>
              )}

              {challenge_desc && (
                <p className="text-text-light leading-relaxed text-lg">
                  {challenge_desc}
                </p>
              )}
            </div>
          )}

          {/* Strategy */}
          {(strategy_title || strategy_desc) && (
            <div className="mt-12">
              {strategy_title && (
                <h4 className="text-2xl font-bold text-text mb-4">
                  {strategy_title}
                </h4>
              )}

              {strategy_desc && (
                <p className="text-text-light leading-relaxed text-lg">
                  {strategy_desc}
                </p>
              )}
            </div>
          )}

          {/* Services Provided */}
          {services && services.length > 0 && (
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-text mb-4">
                Services Provided
              </h4>

              <div className="flex flex-wrap gap-3">
                {services.map((service) => (
                  <span
                    key={service}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-primary-light
                      text-white
                      font-medium
                    "
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {results && results.length > 0 && (
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-text mb-5">
                Results Achieved
              </h4>

              <ul className="space-y-4">
                {results.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    <CheckCircle2
                      className="
                        w-6
                        h-6
                        text-green-500
                        mt-0.5
                        flex-shrink-0
                      "
                    />

                    <span className="text-lg text-text-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Client Testimonial */}
          {(testimonial_title || testimonial_desc) && (
            <div
              className="
                mt-12
                p-8
                rounded-3xl
                bg-primary-light
                border border-primary/10
              "
            >
              {testimonial_title && (
                <h4 className="text-2xl font-bold text-white mb-4">
                  {testimonial_title}
                </h4>
              )}

              {testimonial_desc && (
                <p
                  className="
                    text-lg
                    text-white
                    italic
                    leading-relaxed
                  "
                >
                  "{testimonial_desc}"
                </p>
              )}
            </div>
          )}

          {/* CTA */}
          {button_name && button_url && (
            <div className="mt-12">
              <a
                href={button_url}
                className="
                  inline-flex
                  items-center
                  gap-2
                  btn
                  btn-primary
                "
              >
                {button_name}
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServCaseStudySection;