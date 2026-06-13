import React from "react";
import { Users, ArrowRight } from "lucide-react";

const TeamBanner = () => {
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
      {/* BACKGROUND IMAGE */}

      <div
        className="
          absolute
          inset-0

          bg-cover
          bg-center
        "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop')",
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
          {/* TOP BADGE */}

          {/* TITLE */}

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
            Welcome to
            <span className="block text-blue-400">Skilled Works Cloud Team</span>
          </h1>

          {/* DESCRIPTION */}

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
            The Skilled Works Cloud team is a dedicated group of professionals who
            excel in the field of immigration and work permits.
            <br />
            <br />
            With their unwavering commitment to helping clients navigate the
            complex landscape of global work permits, they have established
            themselves as industry leaders.
          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-8

              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* PRIMARY BUTTON */}

            <button
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
              Meet Our Team
              <ArrowRight
                className="
                  w-4
                  h-4

                  group-hover:translate-x-1

                  transition-all
                "
              />
            </button>

            {/* SECONDARY BUTTON */}

            <button
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
              Contact Us
            </button>
          </div>

          {/* STATS */}

          <div
            className="
              mt-8

              grid
              grid-cols-2
              sm:grid-cols-4

              gap-4
            "
          ></div>
        </div>
      </div>

      {/* BOTTOM FADE */}
    </section>
  );
};

export default TeamBanner;
