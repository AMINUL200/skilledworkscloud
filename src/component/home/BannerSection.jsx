import React from "react";

const BannerSection = () => {
  return (
    <section
      className="
        relative

        w-full
        h-screen

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
        <source src="/video/banner_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ================= DARK OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0

          bg-black/30
        "
      />

      {/* ================= BLUE GRADIENT OVERLAY ================= */}

      <div
        className="
          absolute
          inset-0

          bg-gradient-to-r
          from-[#020617]/40
          via-[#0F172A]/20
          to-[#2563EB]/20
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
        
      </div>
    </section>
  );
};

export default BannerSection;
