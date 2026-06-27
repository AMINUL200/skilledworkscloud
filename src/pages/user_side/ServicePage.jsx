import React, { useEffect, useState } from 'react';
import ServBannerSection from '../../component/common/service_page_sections/ServBannerSection';
import ServServiceOverviewSection from '../../component/common/service_page_sections/ServServiceOverviewSection';
import ServCustomerReview from '../../component/common/service_page_sections/ServCustomerReview';
import ServCTASection from '../../component/common/service_page_sections/ServCTASection';
import PageLoader from '../../component/common/PageLoader';
import ServFaqSection from '../../component/common/service_page_sections/ServFaqSection';
import { api } from '../../utils/app';

const ServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [serviceData, setServiceData] = useState({
    hero: null,
    categories: [],
    testimonials: [],
    faqs: []
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/services-home');
        
        if (response.data.status && response.data.data) {
          setServiceData({
            hero: response.data.data.hero || null,
            categories: response.data.data.categories || [],
            testimonials: response.data.data.testimonials || [],
            faqs: response.data.data.faqs || []
          });
        }
      } catch (error) {
        console.error('Error fetching service page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <ServBannerSection data={serviceData.hero} />
      <ServServiceOverviewSection categories={serviceData.categories} />
      <ServCustomerReview testimonials={serviceData.testimonials} />
      <ServFaqSection faqs={serviceData.faqs} />
      <ServCTASection />
    </div>
  );
};

export default ServicePage;