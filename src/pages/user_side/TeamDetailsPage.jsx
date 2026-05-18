import React from "react";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Calendar,
  BadgeCheck,
  BriefcaseBusiness,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const TeamDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const teamMembers = [
    {
      id: 1,
      name: "Shakib Hasan",
      role: "CEO & Immigration Adviser",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop",
      email: "shakib@workpermitcloud.co.uk",
      phone: "+44 203 000 0001",
      location: "London, United Kingdom",
      experience: "12+ Years Experience",
      expertise: [
        "Business Immigration",
        "Sponsor Licence",
        "UK Skilled Worker Visa",
        "HR Compliance",
      ],
      bio: `
      Shakib Hasan is a highly experienced immigration adviser
      specialising in UK business immigration and sponsorship
      compliance. Over the years, he has helped hundreds of
      companies successfully secure sponsor licences and manage
      international recruitment.

      His expertise in UK immigration law, compliance systems,
      and HR processes has made him a trusted adviser for
      businesses across the UK. He is passionate about helping
      entrepreneurs and organisations grow through global talent.
      `,
    },
  ];

  const member =
    teamMembers.find((item) => item.id === Number(id)) || teamMembers[0];

  return (
    <div className="bg-[#F5F9FF] min-h-screen">
      {/* HERO SECTION */}

      <section
        className="
    relative
    overflow-hidden
    bg-gradient-to-br
    from-[#0F172A]
    via-[#172554]
    to-[#2563EB]
    min-h-[50vh]
    flex
    items-center
    pt-20
    pb-14
  "
      >
        {/* BACKGROUND BLUR */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}
            <div>
              {/* NAME */}
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white">
                {member.name}
              </h1>

              {/* ROLE */}
              <p className="mt-3 text-base text-blue-200">{member.role}</p>

              {/* DESCRIPTION */}
              <p className="mt-4 text-sm leading-7 text-slate-200">
                Trusted immigration specialist helping businesses and
                individuals navigate UK sponsorship, compliance, and global
                mobility with confidence.
              </p>

              {/* INFO */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Mail, text: member.email },
                  { icon: Phone, text: member.phone },
                  { icon: MapPin, text: member.location },
                  { icon: Calendar, text: member.experience },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-white">{item.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="px-5 py-3 rounded-2xl bg-white text-primary text-sm font-semibold hover:scale-105 transition-all duration-300">
                  Book Consultation
                </button>
                <button className="px-5 py-3 rounded-2xl border border-white/20 bg-white/10 text-white text-sm font-semibold backdrop-blur-md hover:bg-white hover:text-primary transition-all duration-300">
                  Contact Adviser
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative flex justify-center">
              {/* BACK SHAPE */}
              <div className="absolute w-[320px] h-[360px] rounded-[40px] bg-gradient-to-br from-blue-500 to-cyan-400 rotate-6" />

              {/* IMAGE CARD */}
              <div className="relative w-full max-w-[320px] rounded-[40px] overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[340px] object-cover"
                />

                {/* SOCIAL */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                  {[Linkedin, Globe, Mail].map((Icon, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section className="py-24">
        <div
          className="
            max-w-[1400px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-3

              gap-10
            "
          >
            {/* BIO */}

            <div className="lg:col-span-2">
              <div
                className="
                  bg-white

                  rounded-[32px]

                  p-8
                  lg:p-12

                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                "
              >
                <h2
                  className="
                    text-3xl
                    font-bold

                    text-slate-900
                  "
                >
                  About {member.name}
                </h2>

                <div
                  className="
                    mt-8

                    space-y-6

                    text-slate-600
                    text-lg

                    leading-9
                  "
                >
                  {member.bio
                    .trim()
                    .split("\n")
                    .map(
                      (paragraph, index) =>
                        paragraph.trim() && <p key={index}>{paragraph}</p>,
                    )}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}

            <div className="space-y-8">
              {/* EXPERTISE */}

              <div
                className="
                  bg-white

                  rounded-[32px]

                  p-8

                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    mb-8
                  "
                >
                  <div
                    className="
                      w-12
                      h-12

                      rounded-2xl

                      bg-blue-100

                      flex
                      items-center
                      justify-center

                      text-primary
                    "
                  >
                    <BriefcaseBusiness className="w-5 h-5" />
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold

                      text-slate-900
                    "
                  >
                    Expertise
                  </h3>
                </div>

                <div className="space-y-4">
                  {member.expertise.map((item, index) => (
                    <div
                      key={index}
                      className="
                          flex
                          items-center
                          gap-3

                          p-4

                          rounded-2xl

                          bg-blue-50
                        "
                    >
                      <div
                        className="
                            w-3
                            h-3

                            rounded-full

                            bg-primary
                          "
                      />

                      <p
                        className="
                            text-slate-700
                            font-medium
                          "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CONTACT CARD */}

              <div
                className="
                  relative

                  overflow-hidden

                  rounded-[32px]

                  bg-gradient-to-br
                  from-primary
                  to-blue-700

                  p-8

                  text-white
                "
              >
                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-40
                    h-40

                    bg-white/10

                    rounded-full

                    blur-3xl
                  "
                />

                <div className="relative z-10">
                  <h3
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    Need Advice?
                  </h3>

                  <p
                    className="
                      mt-4

                      text-blue-100

                      leading-7
                    "
                  >
                    Speak directly with our experienced immigration team for
                    personalised guidance.
                  </p>

                  <button
                    className="
                      mt-8

                      w-full

                      py-4

                      rounded-2xl

                      bg-white

                      text-primary
                      font-semibold

                      hover:scale-105

                      transition-all
                    "
                  >
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamDetailsPage;
