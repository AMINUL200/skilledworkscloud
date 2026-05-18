import React from "react";

import {
  ArrowRight,
  Linkedin,
  Mail,
} from "lucide-react";

import Marquee from "react-fast-marquee";

import { useNavigate } from "react-router-dom";

const TeamSection = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: "Shakib Hasan",
      role: "CEO & Immigration Adviser",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop",
    },

    {
      id: 2,
      name: "Sarah Ahmed",
      role: "Senior HR Consultant",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop",
    },

    {
      id: 3,
      name: "David Miller",
      role: "Legal Compliance Expert",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop",
    },

    {
      id: 4,
      name: "Nazmun Nahar",
      role: "Visa Case Specialist",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=900&auto=format&fit=crop",
    },

    {
      id: 5,
      name: "Farhad Ahmed",
      role: "Sponsor Licence Adviser",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop",
    },

    {
      id: 6,
      name: "Emily Watson",
      role: "Business Immigration Lawyer",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop",
    },
  ];

  return (
    <section
      className="
        relative

        py-24

        bg-[#F4F8FF]

        overflow-hidden
      "
    >
      {/* BACKGROUND BLUR */}

      <div
        className="
          absolute
          top-0
          left-0

          w-[400px]
          h-[400px]

          bg-blue-200/40

          rounded-full

          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0

          w-[350px]
          h-[350px]

          bg-indigo-200/40

          rounded-full

          blur-3xl
        "
      />

      <div
        className="
          relative
          z-10

          max-w-[1500px]
          mx-auto

          px-6
          lg:px-10
        "
      >
        {/* HEADER */}

        <div className="text-center mb-16">
          <div
            className="
              inline-flex
              items-center

              px-5
              py-2

              rounded-full

              bg-blue-100

              text-primary
              text-sm
              font-semibold

              mb-5
            "
          >
            Our Experts Team
          </div>

          <h2
            className="
              text-4xl
              md:text-5xl

              font-bold

              text-slate-900
            "
          >
            Meet Our Professionals
          </h2>

          <p
            className="
              mt-5

              max-w-[750px]
              mx-auto

              text-base
              md:text-lg

              leading-8

              text-slate-600
            "
          >
            Our experienced immigration advisers,
            legal specialists, and HR consultants
            work together to deliver world-class
            support for businesses and individuals.
          </p>
        </div>

        {/* TEAM SLIDER */}

        <Marquee
          speed={45}
          pauseOnHover={true}
          gradient={false}
        >
          <div
            className="
              flex
              items-stretch
              gap-8

              pr-8
            "
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() =>
                  navigate(`/team/${member.id}`)
                }
                className="
                  group

                  relative

                  w-[320px]

                  rounded-[32px]

                  overflow-hidden

                  bg-white

                  border
                  border-slate-200

                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]

                  cursor-pointer

                  transition-all
                  duration-500

                  hover:-translate-y-3
                  hover:shadow-[0_20px_60px_rgba(37,99,235,0.18)]
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    relative

                    h-[360px]

                    overflow-hidden
                  "
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="
                      w-full
                      h-full

                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-110
                    "
                  />

                  {/* OVERLAY */}

                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* SOCIAL */}

                  <div
                    className="
                      absolute
                      top-5
                      right-5

                      flex
                      flex-col
                      gap-3

                      opacity-0
                      translate-x-5

                      group-hover:opacity-100
                      group-hover:translate-x-0

                      transition-all
                      duration-500
                    "
                  >
                    <button
                      className="
                        w-11
                        h-11

                        rounded-full

                        bg-white/90

                        flex
                        items-center
                        justify-center

                        text-primary

                        hover:bg-primary
                        hover:text-white

                        transition-all
                      "
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>

                    <button
                      className="
                        w-11
                        h-11

                        rounded-full

                        bg-white/90

                        flex
                        items-center
                        justify-center

                        text-primary

                        hover:bg-primary
                        hover:text-white

                        transition-all
                      "
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0

                      w-full

                      p-6
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-bold

                        text-white
                      "
                    >
                      {member.name}
                    </h3>

                    <p
                      className="
                        mt-2

                        text-sm

                        text-blue-100
                      "
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* BOTTOM */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    px-6
                    py-5
                  "
                >
                  <span
                    className="
                      text-sm
                      font-semibold

                      text-primary
                    "
                  >
                    View Profile
                  </span>

                  <div
                    className="
                      w-11
                      h-11

                      rounded-full

                      bg-blue-50

                      flex
                      items-center
                      justify-center

                      text-primary

                      transition-all
                      duration-300

                      group-hover:bg-primary
                      group-hover:text-white
                    "
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default TeamSection;