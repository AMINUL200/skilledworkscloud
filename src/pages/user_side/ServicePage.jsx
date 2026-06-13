import React from 'react'
import ServBannerSection from '../../component/common/service_page_sections/ServBannerSection'
import ServServiceOverviewSection from '../../component/common/service_page_sections/ServServiceOverviewSection'
import ServCustomerReview from '../../component/common/service_page_sections/ServCustomerReview'
import ServCTASection from '../../component/common/service_page_sections/ServCTASection'

const ServicePage = () => {
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
