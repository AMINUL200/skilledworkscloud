import React, { useEffect, useState } from 'react'
import ServBannerSection from '../../component/common/service_page_sections/ServBannerSection'
import ServServiceOverviewSection from '../../component/common/service_page_sections/ServServiceOverviewSection'
import ServCustomerReview from '../../component/common/service_page_sections/ServCustomerReview'
import ServCTASection from '../../component/common/service_page_sections/ServCTASection'
import PageLoader from '../../component/common/PageLoader'

const ServicePage = () => {

  
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
      <ServBannerSection />
      <ServServiceOverviewSection />
      <ServCustomerReview/>
      <ServCTASection/>
    </div>
  )
}

export default ServicePage
