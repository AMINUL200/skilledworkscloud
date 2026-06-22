import React from "react";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const TeamBanner = ({ data }) => {
  console.log("TeamBanner data:", data);

  // If no data, return null or show fallback
  if (!data) {
    return null;
  }



  return (
    <section
      className="
        relative
        w-full
        h-[55vh]
        min-h-[480px]
        flex
        items-center
        pt-10 md:pt-20
        overflow-hidden
      "
    >
      {/* BACKGROUND IMAGE - Dynamic from API */}
      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url('${getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"}')`,
        }}
      />

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#0F172A]/95
          via-[#0F172A]/85
          to-[#2563EB]/60
        "
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-[1400px]
          mx-auto
          px-6
          lg:px-10
          w-full
        "
      >
        <div className="max-w-[700px]">
          {/* TOP BADGE - Optional */}
          {data.title_meta && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/20 mb-4">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                {data.title_meta}
              </span>
            </div>
          )}

          {/* TITLE - Dynamic from API */}
          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              leading-tight
              text-white
            "
          >
            {data.title || "Welcome to"}
            <span className="block text-blue-400">
              {data.highlighted_title || "Skilled Works Cloud Team"}
            </span>
          </h1>

          {/* DESCRIPTION - Dynamic from API */}
          <p
            className="
              mt-5
              text-sm
              sm:text-base
              lg:text-lg
              leading-7
              text-blue-100
            "
          >
            {data.description || "The Skilled Works Cloud team is a dedicated group of professionals who excel in the field of immigration and work permits. With their unwavering commitment to helping clients navigate the complex landscape of global work permits, they have established themselves as industry leaders."}
          </p>

          {/* BUTTONS - Dynamic from API */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* PRIMARY BUTTON - Dynamic */}
            {data.button1_name && (
              <Link
                to={data.button1_url || "#"}
                className="
                  group
                  px-6
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-semibold
                  flex
                  items-center
                  gap-2
                  transition-all
                  duration-300
                "
              >
                {data.button1_name}
                <ArrowRight
                  className="
                    w-4
                    h-4
                    group-hover:translate-x-1
                    transition-all
                  "
                />
              </Link>
            )}

            {/* SECONDARY BUTTON - Dynamic */}
            {data.button2_name && (
              <Link
                to={data.button2_url || "#"}
                className="
                  px-6
                  py-3
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  backdrop-blur-md
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-white
                  hover:text-primary
                  transition-all
                  duration-300
                "
              >
                {data.button2_name}
              </Link>
            )}
          </div>

          {/* STATS - Optional section if needed */}
          <div
            className="
              mt-8
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-4
            "
          >
            {/* Stats can be added here if needed */}
          </div>
        </div>
      </div>

      {/* BOTTOM FADE */}
    </section>
  );
};

export default TeamBanner;