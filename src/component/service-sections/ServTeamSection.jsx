import React from "react";
import {
  Linkedin,
  Twitter,
  Mail,
  Award,
} from "lucide-react";

const ServTeamSection = () => {
  const leaders = [
    {
      name: "John Anderson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200",
      description:
        "Leading digital transformation initiatives and business growth strategies for over 15 years.",
    },
    {
      name: "Sarah Williams",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
      description:
        "Expert in scalable systems, cloud architecture, and enterprise-grade solutions.",
    },
  ];

  const teamMembers = [
    {
      name: "Michael Brown",
      role: "Senior Developer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    },
    {
      name: "Emily Davis",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
    },
    {
      name: "David Wilson",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    },
    {
      name: "Sophia Miller",
      role: "Business Consultant",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    },
  ];

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              px-5
              py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            OUR TEAM
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Meet The Experts
            <span className="block text-primary">
              Behind Every Success
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
            Our team combines creativity, technology,
            and business expertise to deliver exceptional
            results for every client.
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mt-20">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-[36px]
                border
                border-border
                overflow-hidden
                shadow-card
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="
                      w-full
                      h-full
                      min-h-[350px]
                      object-cover
                      group-hover:scale-105
                      transition-all
                      duration-700
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      bg-primary-light
                      text-primary
                      text-sm
                      font-semibold
                    "
                  >
                    <Award className="w-4 h-4" />
                    Leadership
                  </div>

                  <h3
                    className="
                      mt-6
                      text-3xl
                      font-black
                      text-text
                    "
                  >
                    {leader.name}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-primary
                      font-semibold
                    "
                  >
                    {leader.role}
                  </p>

                  <p
                    className="
                      mt-5
                      text-text-light
                      leading-relaxed
                    "
                  >
                    {leader.description}
                  </p>

                  <div className="flex gap-3 mt-8">
                    <button
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-primary-light
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                    </button>

                    <button
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-primary-light
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Twitter className="w-5 h-5 text-primary" />
                    </button>

                    <button
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-primary-light
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Mail className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-[32px]
                overflow-hidden
                border
                border-border
                shadow-card
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="
                    w-full
                    h-72
                    object-cover
                    group-hover:scale-105
                    transition-all
                    duration-700
                  "
                />
              </div>

              <div className="p-6 text-center">
                <h3
                  className="
                    text-xl
                    font-bold
                    text-text
                  "
                >
                  {member.name}
                </h3>

                <p
                  className="
                    mt-2
                    text-primary
                    font-medium
                  "
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Statistics */}
        <div
          className="
            mt-20
            rounded-[36px]
            bg-gradient-to-r
            from-primary
            via-primary-dark
            to-primary
            p-10
            lg:p-14
            text-white
            shadow-button
          "
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-black">
                25+
              </h3>

              <p className="mt-2 text-white/80">
                Team Members
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                12+
              </h3>

              <p className="mt-2 text-white/80">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                250+
              </h3>

              <p className="mt-2 text-white/80">
                Projects Completed
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-black">
                98%
              </h3>

              <p className="mt-2 text-white/80">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Culture Card */}
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
            More Than A Team
          </h3>

          <p
            className="
              mt-5
              text-lg
              text-text-light
              max-w-3xl
              mx-auto
              leading-relaxed
            "
          >
            We are a group of passionate professionals who
            believe in innovation, collaboration, and creating
            meaningful impact through technology and strategic
            thinking.
          </p>

          <button className="btn btn-primary mt-8">
            Join Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServTeamSection;