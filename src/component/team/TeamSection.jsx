import React from "react";
import {
  ArrowRight,
  Linkedin,
  Mail,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";

const TeamSection = ({ members, sectionInfo }) => {
  console.log("TeamSection members:", members);
  console.log("TeamSection sectionInfo:", sectionInfo);
  const navigate = useNavigate();

  // If no data, return null or show fallback
  if (!members || members.length === 0) {
    return null;
  }

  // Get image URL with base URL
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_STORAGE_BASE_URL || ''}${path}`;
  };

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
        {/* HEADER - Dynamic from API */}
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
            {sectionInfo?.batch || "Our Experts Team"}
          </div>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-slate-900
            "
          >
            {sectionInfo?.title || "Meet Our Professionals"}
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
            {sectionInfo?.description || "Our experienced immigration advisers, legal specialists, and HR consultants work together to deliver world-class support for businesses and individuals."}
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
            {members.map((member) => (
              <div
                key={member.id}
                onClick={() =>
                  navigate(`/team/${member.slug || member.id}`)
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
                    src={getImageUrl(member.web_image) || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=900&auto=format&fit=crop"}
                    alt={member.image_alt || member.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                    loading="lazy"
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

                  {/* SOCIAL BUTTONS - Using email from API */}
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
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
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
                      </a>
                    )}
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
                      {member.designation}
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