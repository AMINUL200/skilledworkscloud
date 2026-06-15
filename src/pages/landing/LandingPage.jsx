import React, { useEffect, useState } from 'react'
import HeroSection from '../../component/home/HeroSection'
import EcosystemSection from '../../component/home/EcosystemSection'
import RegulationSection from '../../component/home/RegulationSection'
import ImmigrationServicesSection from '../../component/home/ImmigrationServicesSection'
import TestimonialsSection from '../../component/home/TestimonialsSection'
import WhyChooseUsSection from '../../component/home/WhyChooseUsSection'
import MediaInsightsSection from '../../component/home/MediaInsightsSection'
import BlogSection from '../../component/home/BlogSection'
import InsideWPCSection from '../../component/home/InsideWPCSection'
import TrustedClientsSection from '../../component/home/TrustedClientsSection'
import OfficeLocationsSection from '../../component/home/OfficeLocationsSection'
import BannerSection from '../../component/home/BannerSection'
import PageLoader from '../../component/common/PageLoader'

const LandingPage = () => {

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
    <div>
      {/* Banner Section */}
      <BannerSection />
      {/* Hero Section */}
      <HeroSection />
      {/* Ecosystem Section */}
      <EcosystemSection/>
      {/* Regulation Section */}
      <RegulationSection/>
      {/* Immigration Services Section */}
      <ImmigrationServicesSection/>
      {/*  Testimonials Section */}
      <TestimonialsSection/>
      {/* Why Choose Us Section */}
      <WhyChooseUsSection/>
      {/* Media Insights Section */}
      <MediaInsightsSection/>
      {/* Blog Section */}
      <BlogSection/>
      {/* Inside WPC Section */}
      <InsideWPCSection/>
      {/* Trusted Clients Section */}
      <TrustedClientsSection/>
      {/* Office Locations Section */}
      <OfficeLocationsSection/>

    </div>
  )
}

export default LandingPage
