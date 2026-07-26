import React from "react";
import {
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const ServCaseStudySection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
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
            SUCCESS STORY
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Helping Businesses
            <span className="block text-primary">
              Hire Global Talent
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
            Discover how we helped a growing UK company obtain
            a Sponsor Licence and successfully recruit skilled
            overseas professionals.
          </p>
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
            Sponsor Licence Success Story
          </div>

          {/* Title */}
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
            Sponsor Licence Approved For UK Technology Company
          </h3>

          {/* Intro */}
          <p
            className="
              mt-6
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            A rapidly expanding technology company faced
            difficulties recruiting qualified local talent.
            To support business growth, they needed a Sponsor
            Licence to legally employ skilled professionals
            from overseas.
          </p>

          {/* Challenge */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold text-text mb-4">
              Immigration Challenge
            </h4>

            <p className="text-text-light leading-relaxed text-lg">
              The company had never applied for a Sponsor
              Licence before and was unfamiliar with Home
              Office requirements. They lacked compliant HR
              processes and were concerned about application
              delays or rejection.
            </p>
          </div>

          {/* Strategy */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold text-text mb-4">
              Our Legal Strategy
            </h4>

            <p className="text-text-light leading-relaxed text-lg">
              Our immigration specialists conducted a detailed
              compliance review, prepared supporting evidence,
              implemented compliant HR systems, and managed the
              Sponsor Licence application process from start
              to finish.
            </p>
          </div>

          {/* Services Provided */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold text-text mb-4">
              Services Provided
            </h4>

            <div className="flex flex-wrap gap-3">
              {[
                "Sponsor Licence Application",
                "Compliance Audit",
                "Document Preparation",
                "HR System Review",
                "Home Office Guidance",
                "Ongoing Compliance Support",
              ].map((service) => (
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

          {/* Results */}
          <div className="mt-12">
            <h4 className="text-2xl font-bold text-text mb-5">
              Results Achieved
            </h4>

            <ul className="space-y-4">
              {[
                "Sponsor Licence successfully approved",
                "Application processed without complications",
                "Successfully recruited skilled overseas workers",
                "100% compliance with Home Office requirements",
                "Reduced recruitment delays significantly",
                "Established long-term immigration support",
              ].map((item) => (
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

          {/* Client Testimonial */}
          <div
            className="
              mt-12
              p-8
              rounded-3xl
              bg-primary-light
              border border-primary/10
            "
          >
            <h4 className="text-2xl font-bold text-white mb-4">
              Client Testimonial
            </h4>

            <p
              className="
                text-lg
                text-white
                italic
                leading-relaxed
              "
            >
              "The team guided us through every stage of the
              Sponsor Licence process. Their expertise ensured
              a smooth approval and allowed us to recruit the
              international talent our business needed."
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <button className="btn btn-primary">
              Book A Free Consultation
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServCaseStudySection;