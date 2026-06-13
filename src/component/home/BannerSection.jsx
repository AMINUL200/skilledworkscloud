import React from "react";

const BannerSection = () => {
  return (
    <section
      className="
        relative
        w-full

        h-[70vh]
        md:h-screen
        overflow-hidden
      "
    >
      {/* ================= VIDEO BACKGROUND ================= */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      >
        {/* <source src="/video/banner_video.mp4" type="video/mp4" /> */}
        <source src="/video/banner_video (2).mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ================= DARK OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      />

      {/* ================= BLUE GRADIENT OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#020617]/80
          via-[#0F172A]/60
          to-[#2563EB]/30
        "
      />

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative
          z-10

          h-full

          max-w-[1450px]
          mx-auto

          px-5
          lg:px-8

          flex
          items-center
        "
      >
        <div
          className="
            max-w-[760px]

            text-white

            pt-20
          "
        >
          {/* SMALL TAG */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-5
              py-2

              rounded-full

              bg-white/10
              backdrop-blur-md

              border
              border-white/20

              text-sm
              md:text-base
              font-medium

              mb-6
            "
          >
            Smart HR Technology
          </div>

          {/* HEADING */}

          <h1
            className="
              text-2xl
              sm:text-3xl
              lg:text-5xl

              font-black

              leading-tight
              lg:leading-[1.1]

              tracking-tight
            "
          >
            Transform Your Workforce Management with
            <span className="text-blue-400">
              {" "}
              Smart HR Automation
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-8

              text-lg
              md:text-xl

              leading-8
              md:leading-9

              text-gray-200

              max-w-[700px]
            "
          >
            Simplify HR operations, reduce manual work,
            improve team productivity, and stay connected
            with your workforce anytime, anywhere.
          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-10

              flex
              flex-wrap
              gap-5
            "
          >
            {/* PRIMARY BUTTON */}

            <button
              className="
                px-8
                py-4

                rounded-2xl

                bg-[#2563EB]

                text-white
                font-semibold
                text-lg

                shadow-[0_10px_40px_rgba(37,99,235,0.45)]

                hover:bg-blue-700
                hover:scale-105

                transition-all
                duration-300
              "
            >
              Get Started Today
            </button>

            {/* SECOND BUTTON */}

            {/* <button
              className="
                px-8
                py-4

                rounded-2xl

                border
                border-white/20

                bg-white/10
                backdrop-blur-md

                text-white
                font-semibold
                text-lg

                hover:bg-white
                hover:text-black

                transition-all
                duration-300
              "
            >
              Explore Features
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;