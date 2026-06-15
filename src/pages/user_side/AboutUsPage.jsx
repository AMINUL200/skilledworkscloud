import React, { useEffect, useState } from "react";
import AboutBanner from "../../component/about_us/AboutBanner";
import AboutCompanySection from "../../component/about_us/AboutCompanySection";
import AboutStorySection from "../../component/about_us/AboutStorySection";
import AboutPrinciplesSection from "../../component/about_us/AboutPrinciplesSection";
import PageLoader from "../../component/common/PageLoader";

const AboutUsPage = () => {

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  } , []);

  if (loading) {
    return <PageLoader />;
  }

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
