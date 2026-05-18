import React from "react";

import { ArrowRight } from "lucide-react";

const InsideWPCSection = () => {
  const galleryImages = [
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
    },

    {
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
    },

    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },

    {
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    },

    {
      image:
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
    },

    {
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section
      className="
        relative

        overflow-hidden

        py-24
        lg:py-28

        bg-[#EEF5FD]
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2

          w-[700px]
          h-[700px]

          bg-blue-100/20

          rounded-full

          blur-3xl
        "
      />

      {/* ================= CONTAINER ================= */}

      <div
        className="
          relative

          max-w-[1450px]
          mx-auto

          px-5
          lg:px-8
        "
      >
        {/* ================= HEADER ================= */}

        <div className="text-center">
          {/* HEADING */}

          <h2
            className="
              text-4xl
              md:text-5xl
              xl:text-6xl

              font-black

              tracking-tight

              text-primary
            "
          >
            Inside WorkPermitCloud
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-5

              text-lg
              md:text-xl

              text-text-light

              leading-9
            "
          >
            Discover our offices, team, and
            other moments & stories behind
            WPC
          </p>
        </div>

        {/* ================= GALLERY GRID ================= */}

        <div
          className="
            mt-20

            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-4
          "
        >
          {galleryImages.map((item, index) => (
            <div
              key={index}
              className={`
                relative
                group

                overflow-hidden

                rounded-[28px]

                shadow-[0_10px_40px_rgba(15,23,42,0.07)]

                ${
                  index === 2 || index === 3
                    ? "sm:col-span-2 lg:col-span-2 h-[420px]"
                    : "h-[424px]"
                }
              `}
            >
              {/* IMAGE */}

              <img
                src={item.image}
                alt="Inside WorkPermitCloud"
                className="
                  w-full
                  h-full

                  object-cover

                  group-hover:scale-105

                  transition-all
                  duration-700
                "
              />

              {/* OVERLAY */}

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/40
                  via-black/10
                  to-transparent

                  opacity-0

                  group-hover:opacity-100

                  transition-all
                  duration-500
                "
              />

              {/* BUTTON */}

              <div
                className="
                  absolute
                  bottom-5
                  left-5

                  opacity-0

                  translate-y-5

                  group-hover:opacity-100
                  group-hover:translate-y-0

                  transition-all
                  duration-500
                "
              >
                <button
                  className="
                    bg-white/90

                    backdrop-blur-xl

                    text-primary

                    px-5
                    py-3

                    rounded-2xl

                    text-sm
                    font-semibold

                    flex
                    items-center

                    gap-2

                    shadow-xl
                  "
                >
                  View Story

                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BUTTON ================= */}

        <div
          className="
            mt-16

            flex
            justify-center
          "
        >
          <button
            className="
              btn
              btn-primary

              px-10
              py-5

              rounded-[22px]

              text-lg
              font-semibold

              flex
              items-center

              gap-3
            "
          >
            View More

            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InsideWPCSection;