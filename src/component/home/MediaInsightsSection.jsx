import React from "react";
import { Play, Share2, Facebook, Instagram, Linkedin, Phone } from "lucide-react";

const MediaInsightsSection = () => {
  const videos = [
    {
      title: "Impact on Business When Work Permit Licence is Suspended or Revoked",
      category: "Right-to-work",
      date: "29 April 2024",
      duration: "02:48",
      image: "https://images.unsplash.com/photo-1573497491765-55d7f8e0e3b8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "How to Prepare for a Self-Sponsorship Licence: Timeline & Tips",
      category: "Self-sponsorship",
      date: "5 April 2024",
      duration: "02:46",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Sponsor Licence Suspended? Here's What to Do!",
      category: "Self-sponsorship",
      date: "19 March 2024",
      duration: "02:44",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "BRP Card Update 2024: Can You Travel After Expiry?",
      category: "Licence",
      date: "2 February 2024",
      duration: "02:49",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const socialStats = [
    { icon: <Facebook className="w-7 h-7 sm:w-8 sm:h-8" />, value: "200K+", label: "Facebook Followers" },
    { icon: <span className="text-3xl sm:text-4xl font-black leading-none">♪</span>, value: "140K+", label: "TikTok Likes" },
    { icon: <Instagram className="w-7 h-7 sm:w-8 sm:h-8" />, value: "38K", label: "Instagram Views" },
    { icon: <span className="text-3xl sm:text-4xl font-black leading-none">📣</span>, value: "600K+", label: "Social Media Reach" },
  ];

  const socialIcons = [
    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Play className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />,
  ];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#EEF5FD] w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-primary leading-tight">
            Immigration Updates & Insights
          </h2>
          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-text">
            UK Immigration Vlogs | Visa & Compliance Videos
          </h3>
          <p className="mt-3 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-text-light">
            Watch our experts break down key immigration updates, compliance rules, and visa strategies
            for individuals and sponsors in the UK.
          </p>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-1 xl:grid-cols-[340px_1fr] 2xl:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="w-full min-w-0 flex flex-col gap-3 sm:gap-4">

            {/* STAT CARDS */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {socialStats.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 transition-transform duration-300"
                >
                  <div className="text-primary leading-none">{item.icon}</div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-black text-text leading-none">{item.value}</p>
                  <p className="text-[10px] sm:text-xs lg:text-[13px] text-text-light leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            {/* FOLLOW CARD */}
            <div className="bg-gradient-to-br from-[#1E63E9] to-[#2976FF] rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 text-center shadow-[0_10px_40px_rgba(30,99,233,0.20)]">
              <h3 className="text-base sm:text-lg lg:text-xl font-black text-white">
                Follow Us for Daily Updates
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm lg:text-[15px] leading-5 sm:leading-6 text-blue-100">
                Get the latest immigration news, policy changes, and success stories delivered to your feed
              </p>
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
                {socialIcons.map((icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button className="btn btn-primary py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold">
                Call Us
              </button>
              <button className="bg-white border border-border text-primary py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Email Us
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN — VIDEO CARDS ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
            {videos.map((video, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_6px_30px_rgba(15,23,42,0.07)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                {/* THUMBNAIL — aspect-video keeps proportions at every width */}
                <div className="relative aspect-video overflow-hidden shrink-0">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary fill-primary ml-0.5" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
                  <span className="self-start bg-red-700 text-white px-2 py-1 rounded-md text-[10px] sm:text-xs font-semibold">
                    {video.category}
                  </span>

                  <h3 className="text-[13px] sm:text-sm lg:text-[15px] font-semibold leading-5 sm:leading-6 text-text flex-1">
                    {video.title}
                  </h3>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-[11px] sm:text-xs text-text-light">{video.date}</p>
                    <div className="flex items-center gap-1.5">
                      <button className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-medium text-text hover:bg-primary hover:text-white transition-all duration-300">
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                      <span className="bg-red-50 text-red-500 px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold">
                        {video.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <button className="bg-white border border-border text-primary px-7 sm:px-10 py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold shadow-sm hover:bg-primary hover:text-white transition-all duration-300">
            See All Videos
          </button>
        </div>

      </div>
    </section>
  );
};

export default MediaInsightsSection;