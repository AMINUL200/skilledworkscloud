import React from "react";
import AboutBanner from "../../component/about_us/AboutBanner";
import AboutCompanySection from "../../component/about_us/AboutCompanySection";
import AboutStorySection from "../../component/about_us/AboutStorySection";
import AboutPrinciplesSection from "../../component/about_us/AboutPrinciplesSection";

const AboutUsPage = () => {
  return (
    <div className="bg-[#EEF5FD] overflow-hidden">
      {/* BANNER */}
      <AboutBanner />

      {/* About Company */}
      <AboutCompanySection />

      {/* About Story */}
      <AboutStorySection />

      {/* About Principles */}
      <AboutPrinciplesSection />
    </div>
  );
};

export default AboutUsPage;
