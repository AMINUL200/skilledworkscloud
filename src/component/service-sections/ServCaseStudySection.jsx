import React from "react";
import {
  TrendingUp,
  Clock3,
  Users,
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
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            CASE STUDY
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Real Results For
            <span className="block text-primary">
              Real Businesses
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
            Discover how our team transformed a healthcare
            organization through technology, automation,
            and strategic digital solutions.
          </p>
        </div>

        {/* Main Case Study */}
        <div
          className="
            mt-20
            bg-white
            border
            border-border
            rounded-[40px]
            overflow-hidden
            shadow-card
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600"
                alt="Case Study"
                className="
                  w-full
                  h-full
                  min-h-[500px]
                  object-cover
                "
              />
            </div>

            {/* Content */}
            <div className="p-10 lg:p-14">
              <div
                className="
                  inline-flex
                  px-4
                  py-2
                  rounded-full
                  bg-primary-light
                  text-primary
                  font-semibold
                  text-sm
                "
              >
                Healthcare Industry
              </div>

              <h3
                className="
                  mt-6
                  text-3xl
                  lg:text-4xl
                  font-black
                  text-text
                "
              >
                Healthcare Appointment Platform
              </h3>

              <p
                className="
                  mt-5
                  text-lg
                  text-text-light
                  leading-relaxed
                "
              >
                A growing healthcare organization struggled
                with appointment management, patient records,
                and communication inefficiencies.
              </p>

              {/* Challenge */}
              <div className="mt-10">
                <h4
                  className="
                    text-xl
                    font-bold
                    text-text
                    mb-3
                  "
                >
                  Challenge
                </h4>

                <p className="text-text-light leading-relaxed">
                  Manual booking systems caused delays,
                  patient dissatisfaction, and operational
                  inefficiencies across multiple clinics.
                </p>
              </div>

              {/* Solution */}
              <div className="mt-8">
                <h4
                  className="
                    text-xl
                    font-bold
                    text-text
                    mb-3
                  "
                >
                  Solution
                </h4>

                <p className="text-text-light leading-relaxed">
                  We developed a centralized healthcare
                  management platform featuring appointment
                  scheduling, telemedicine, patient records,
                  notifications, and payment integration.
                </p>
              </div>

              {/* Results */}
              <div className="mt-8">
                <h4
                  className="
                    text-xl
                    font-bold
                    text-text
                    mb-3
                  "
                >
                  Results
                </h4>

                <ul className="space-y-3">
                  {[
                    "300% increase in appointment bookings",
                    "85% reduction in manual workload",
                    "50,000+ patients onboarded",
                    "98% customer satisfaction",
                  ].map((item) => (
                    <li
                      key={item}
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <CheckCircle2
                        className="
                          w-5
                          h-5
                          text-success
                        "
                      />

                      <span className="text-text-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="btn btn-primary mt-10">
                Read Full Case Study

                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div
            className="
              bg-white
              rounded-[32px]
              border
              border-border
              shadow-card
              p-8
              text-center
            "
          >
            <TrendingUp
              className="
                w-12
                h-12
                text-primary
                mx-auto
              "
            />

            <h3
              className="
                mt-5
                text-5xl
                font-black
                text-primary
              "
            >
              300%
            </h3>

            <p className="mt-3 text-text-light">
              Business Growth
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-[32px]
              border
              border-border
              shadow-card
              p-8
              text-center
            "
          >
            <Clock3
              className="
                w-12
                h-12
                text-primary
                mx-auto
              "
            />

            <h3
              className="
                mt-5
                text-5xl
                font-black
                text-primary
              "
            >
              85%
            </h3>

            <p className="mt-3 text-text-light">
              Time Saved
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-[32px]
              border
              border-border
              shadow-card
              p-8
              text-center
            "
          >
            <Users
              className="
                w-12
                h-12
                text-primary
                mx-auto
              "
            />

            <h3
              className="
                mt-5
                text-5xl
                font-black
                text-primary
              "
            >
              50K+
            </h3>

            <p className="mt-3 text-text-light">
              Active Users
            </p>
          </div>
        </div>

        {/* Quote Section */}
        <div
          className="
            mt-16
            rounded-[36px]
            bg-gradient-to-r
            from-primary
            via-primary-dark
            to-primary
            p-10
            lg:p-14
            text-center
            text-white
            shadow-button
          "
        >
          <blockquote
            className="
              text-2xl
              lg:text-3xl
              font-bold
              leading-relaxed
              max-w-4xl
              mx-auto
            "
          >
            "The platform completely transformed how we
            manage appointments and patient communication.
            The impact was immediate and measurable."
          </blockquote>

          <div className="mt-8">
            <h4 className="font-bold text-xl">
              Sarah Johnson
            </h4>

            <p className="text-white/80">
              Operations Director
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServCaseStudySection;