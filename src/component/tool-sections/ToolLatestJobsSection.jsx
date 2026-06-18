import React from "react";
import {
  Building2,
  MapPin,
  Clock3,
  PoundSterling,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Users,
} from "lucide-react";

const ToolLatestJobsSection = () => {
  const jobs = [
    {
      title: "Senior React Developer",
      company: "Tech Solutions Ltd",
      location: "London",
      salary: "£45,000 - £60,000",
      type: "Full Time",
      mode: "Hybrid",
      sponsorship: true,
      featured: true,
    },
    {
      title: "Backend Engineer",
      company: "Cloud Systems UK",
      location: "Manchester",
      salary: "£40,000 - £55,000",
      type: "Full Time",
      mode: "Remote",
      sponsorship: true,
    },
    {
      title: "Software Engineer",
      company: "Digital Future",
      location: "Birmingham",
      salary: "£42,000 - £58,000",
      type: "Full Time",
      mode: "Hybrid",
      sponsorship: true,
    },
    {
      title: "Frontend Developer",
      company: "NextGen Tech",
      location: "Leeds",
      salary: "£38,000 - £52,000",
      type: "Permanent",
      mode: "Onsite",
      sponsorship: true,
    },
    {
      title: "DevOps Engineer",
      company: "Cloudify Ltd",
      location: "Liverpool",
      salary: "£50,000 - £70,000",
      type: "Full Time",
      mode: "Remote",
      sponsorship: true,
    },
  ];

  const featuredJob = jobs.find((job) => job.featured);

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
            Sponsored Opportunities
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
            Latest
            <span className="block text-primary">
              Sponsored Jobs
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
            Explore the newest UK employers actively
            offering sponsorship opportunities for
            international professionals.
          </p>
        </div>

        {/* Featured Job */}
        <div
          className="
            mt-16
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
          <div className="grid lg:grid-cols-2 gap-10 p-10 lg:p-14">
            <div>
              <span
                className="
                  inline-flex
                  items-center
                  px-4 py-2
                  rounded-full
                  bg-white/20
                  text-sm
                  font-semibold
                "
              >
                Featured Opportunity
              </span>

              <h3
                className="
                  mt-6
                  text-4xl
                  font-black
                "
              >
                {featuredJob.title}
              </h3>

              <p
                className="
                  mt-4
                  text-xl
                  text-white/80
                "
              >
                {featuredJob.company}
              </p>

              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  {featuredJob.location}
                </div>

                <div className="flex items-center gap-2">
                  <PoundSterling size={18} />
                  {featuredJob.salary}
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={18} />
                  {featuredJob.type}
                </div>
              </div>

              <button
                className="
                  btn
                  btn-glass
                  mt-10
                "
              >
                Apply Now
                <ArrowRight size={18} />
              </button>
            </div>

            <div
              className="
                flex
                items-center
                justify-center
              "
            >
              <div
                className="
                  w-44
                  h-44
                  rounded-[40px]
                  bg-white/10
                  backdrop-blur-lg
                  flex
                  items-center
                  justify-center
                "
              >
                <Building2 size={90} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div
          className="
            mt-14
            bg-white
            rounded-[30px]
            p-6
            border
            border-border
            shadow-card
          "
        >
          <div className="flex flex-wrap gap-4">
            {[
              "All Jobs",
              "Remote",
              "Hybrid",
              "Full Time",
              "Part Time",
              "Engineering",
              "Healthcare",
            ].map((item, index) => (
              <button
                key={index}
                className="
                  px-5 py-3
                  rounded-2xl
                  border
                  border-border
                  hover:bg-primary
                  hover:text-white
                  transition-all
                "
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          {jobs.slice(1).map((job, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[32px]
                border
                border-border
                shadow-card
                p-8
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              <div className="flex items-start justify-between">
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-primary-light
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Building2
                    size={28}
                    className="text-primary"
                  />
                </div>

                <span
                  className="
                    px-3 py-2
                    rounded-full
                    bg-success/10
                    text-success
                    text-sm
                    font-semibold
                  "
                >
                  Sponsorship
                </span>
              </div>

              <h3
                className="
                  mt-6
                  text-2xl
                  font-bold
                  text-text
                "
              >
                {job.title}
              </h3>

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
                  {job.mode}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {job.type}
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  className="
                    btn
                    btn-primary
                    flex-1
                  "
                >
                  Apply Now
                </button>

                <button
                  className="
                    btn
                    btn-outline
                  "
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="
            mt-16
            bg-white
            rounded-[36px]
            border
            border-border
            shadow-card
            p-10
            text-center
          "
        >
          <h3
            className="
              text-3xl
              font-black
              text-text
            "
          >
            Want More Sponsored Jobs?
          </h3>

          <p
            className="
              mt-4
              text-text-light
              max-w-2xl
              mx-auto
            "
          >
            Get notified whenever new sponsorship
            opportunities become available.
          </p>

          <button
            className="
              btn
              btn-primary
              mt-8
            "
          >
            Join Job Alerts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ToolLatestJobsSection;