import React from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const AboutBanner = ({ data }) => {
  // Debug log to check the data
  // console.log("About Banner Data:", data);

  // If no data, show loading or return null
  if (!data) {
    return null;
  }



  return (
    <section className="relative w-full min-h-[50vh] flex items-center overflow-hidden pt-10 md:pt-16">
      {/* BG IMAGE - Dynamic from API */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ 
          backgroundImage: `url('${getImageUrl(data.bg_image) || "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2070&auto=format&fit=crop"}')` 
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/75 to-[#2563EB]/60" />

      {/* LIGHT EFFECT */}
      <div className="absolute -top-24 -right-24 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-12 lg:py-14">
        <div className="max-w-[640px]">
          {/* HEADING - Dynamic from API */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-white">
            {data.title || "Get To Know"}
            <br />
            <span className="text-blue-400">
              {data.highlighted_text || "Who We Are"}
            </span>
          </h1>

          {/* DESCRIPTION - Dynamic from API */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-blue-100 max-w-[560px]">
            {data.description || "We're here to listen, assist, and provide the support you need. Your voice matters to us, and our contact page is the channel through which we can amplify it."}
          </p>

          {/* BUTTONS - Dynamic from API */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
            {data.button1_name && (
              <Link
                to={data.button1_url || "#"}
                className="group h-10 sm:h-11 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm sm:text-base font-semibold flex items-center gap-2 shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:scale-105 transition-all duration-300"
              >
                {data.button1_name}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {data.button2_name && (
              <Link
                to={data.button2_url || "#"}
                className="h-10 sm:h-11 px-5 sm:px-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-semibold flex items-center gap-2 hover:bg-white hover:text-primary transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4" />
                {data.button2_name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;