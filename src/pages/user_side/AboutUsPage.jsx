import React, { useEffect, useState } from "react";
import AboutBanner from "../../component/about_us/AboutBanner";
import AboutCompanySection from "../../component/about_us/AboutCompanySection";
import AboutStorySection from "../../component/about_us/AboutStorySection";
import AboutPrinciplesSection from "../../component/about_us/AboutPrinciplesSection";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";

const AboutUsPage = () => {
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState({
    firstSection: null,
    secondSection: null,
    thirdSection: null,
    fourthSection: null
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/about');
        
        if (response.data.status && response.data.data) {
          setAboutData({
            firstSection: response.data.data.about_first_section || null,
            secondSection: response.data.data.about_second_section || null,
            thirdSection: response.data.data.about_third_section || null,
            fourthSection: response.data.data.about_forth_section || null
          });
        }
      } catch (error) {
        console.error('Error fetching about page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-[#EEF5FD] overflow-hidden">
      {/* BANNER */}
      <AboutBanner data={aboutData.firstSection} />

      {/* About Company */}
      <AboutCompanySection data={aboutData.secondSection} />

      {/* About Story */}
      <AboutStorySection data={aboutData.thirdSection} />

      {/* About Principles */}
      <AboutPrinciplesSection data={aboutData.fourthSection} />
    </div>
  );
};

export default AboutUsPage;