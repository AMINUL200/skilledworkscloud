import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";

const AboutBanner = () => (
  <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden pt-10 md:pt-16">

    {/* BG IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop')" }}
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-[#2563EB]/60" />

    {/* LIGHT EFFECT */}
    <div className="absolute -top-24 -right-24 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

    {/* CONTENT */}
    <div className="relative z-10 w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
      <div className="max-w-[640px]">

     

        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-white">
          Get To Know
          <br />
          <span className="text-blue-400">Who We Are</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-blue-100 max-w-[560px]">
          We're here to listen, assist, and provide the support you need. Your voice matters to us,
          and our contact page is the channel through which we can amplify it.
          Whether you're a valued customer, a potential client, or simply curious about what we do,
          don't hesitate to drop us a line and let's start a great conversation.
        </p>

        {/* BUTTONS */}
        <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
          <button className="group h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm sm:text-base font-semibold flex items-center gap-2 shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:scale-105 transition-all duration-300">
            Explore More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="h-10 sm:h-11 px-5 sm:px-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-white hover:text-primary transition-all duration-300">
            <PhoneCall className="w-4 h-4" />
            Contact Us
          </button>
        </div>

      </div>
    </div>

    {/* BOTTOM FADE */}
    {/* <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-background to-transparent" /> */}
  </section>
);

export default AboutBanner;