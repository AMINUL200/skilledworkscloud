import React, { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  ArrowRight,
  CheckCircle2,
  Clock3,
  PoundSterling,
} from "lucide-react";

const ToolJobSearchSection = () => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    location: "",
    visaType: "",
  });

  const jobs = [
    {
      title: "Senior React Developer",
      company: "Tech Solutions Ltd",
      location: "London",
      salary: "£45,000 - £60,000",
      type: "Full Time",
      sponsorship: true,
    },
    {
      title: "Software Engineer",
      company: "Global Systems",
      location: "Manchester",
      salary: "£40,000 - £55,000",
      type: "Full Time",
      sponsorship: true,
    },
    {
      title: "Backend Developer",
      company: "Digital UK",
      location: "Birmingham",
      salary: "£42,000 - £58,000",
      type: "Hybrid",
      sponsorship: true,
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
            <Briefcase size={18} />
            Sponsored Job Finder
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
            Find Your Next
            <span className="block text-primary">
              Sponsored Job
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
            Search UK employers offering visa sponsorship
            opportunities and start your career journey.
          </p>
        </div>

        {/* Search Card */}
        <div
          className="
            mt-14
            bg-white
            rounded-[36px]
            border
            border-border
            shadow-card
            p-8 lg:p-10
          "
        >
          <div className="grid lg:grid-cols-4 gap-5">
            {/* Keyword */}
            <div className="relative">
              <Search
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
                type="text"
                placeholder="Job title or keyword"
                value={searchData.keyword}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    keyword: e.target.value,
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

            {/* Location */}
            <div className="relative">
              <MapPin
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
                type="text"
                placeholder="Location"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    location: e.target.value,
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

            {/* Visa Type */}
            <select
              value={searchData.visaType}
              onChange={(e) =>
                setSearchData({
                  ...searchData,
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
              <option>Visa Route</option>
              <option>Skilled Worker</option>
              <option>Health Care</option>
              <option>Scale Up</option>
            </select>

            {/* Search Button */}
            <button
              className="
                btn
                btn-primary
                h-14
                w-full
              "
            >
              Search Jobs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-12
          "
        >
          {[
            {
              value: "5,000+",
              label: "Active Jobs",
            },
            {
              value: "1,200+",
              label: "Sponsors",
            },
            {
              value: "95%",
              label: "Success Rate",
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
                p-6
                text-center
              "
            >
              <h3
                className="
                  text-4xl
                  font-black
                  text-primary
                "
              >
                {item.value}
              </h3>

              <p className="mt-2 text-text-light">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Jobs */}
        <div className="mt-16">
          <div className="flex items-center justify-between">
            <h3
              className="
                text-3xl
                font-black
                text-text
              "
            >
              Featured Opportunities
            </h3>

            <button
              className="
                text-primary
                font-semibold
                flex
                items-center
                gap-2
              "
            >
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-border
                  rounded-[32px]
                  shadow-card
                  p-7
                  hover:-translate-y-2
                  transition-all
                  duration-300
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
                  <Building2
                    size={24}
                    className="text-primary"
                  />
                </div>

                <h4
                  className="
                    mt-5
                    text-2xl
                    font-bold
                    text-text
                  "
                >
                  {job.title}
                </h4>

                <p
                  className="
                    mt-2
                    text-text-light
                  "
                >
                  {job.company}
                </p>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <PoundSterling size={16} />
                    {job.salary}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {job.type}
                  </div>

                  {job.sponsorship && (
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-3
                        py-2
                        rounded-full
                        bg-success/10
                        text-success
                        text-sm
                        font-semibold
                      "
                    >
                      <CheckCircle2 size={16} />
                      Sponsorship Available
                    </div>
                  )}
                </div>

                <button
                  className="
                    btn
                    btn-outline
                    w-full
                    mt-8
                  "
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className="
            mt-16
            bg-gradient-to-r
            from-primary
            to-primary-dark
            rounded-[36px]
            p-10
            text-center
            text-white
            shadow-button
          "
        >
          <h3
            className="
              text-3xl
              font-black
            "
          >
            Looking For Sponsorship?
          </h3>

          <p
            className="
              mt-4
              text-white/80
              max-w-2xl
              mx-auto
            "
          >
            Connect with verified UK employers
            actively hiring international talent.
          </p>

          <button
            className="
              btn
              btn-glass
              mt-8
            "
          >
            Explore Opportunities
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolJobSearchSection;