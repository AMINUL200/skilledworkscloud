import React, { useEffect, useState } from "react";
import ServHeroSection from "../../component/service-sections/ServHeroSection";
import ServAboutSection from "../../component/service-sections/ServAboutSection";
import ServFeaturesSection from "../../component/service-sections/ServFeaturesSection";
import ServBenefitsSection from "../../component/service-sections/ServBenefitsSection";
import ServServicesSection from "../../component/service-sections/ServServicesSection";
import ServProcessSection from "../../component/service-sections/ServProcessSection";
import ServTimelineSection from "../../component/service-sections/ServTimelineSection";
import ServTechnologiesSection from "../../component/service-sections/ServTechnologiesSection";
import ServPricingSection from "../../component/service-sections/ServPricingSection";
import ServPortfolioSection from "../../component/service-sections/ServPortfolioSection";
import ServCaseStudySection from "../../component/service-sections/ServCaseStudySection";
import ServTestimonialsSection from "../../component/service-sections/ServTestimonialsSection";
import ServFAQSection from "../../component/service-sections/ServFAQSection";
import ServCTASection from "../../component/service-sections/ServCTASection";
import ServContactSection from "../../component/service-sections/ServContactSection";
import ServStatsSection from "../../component/service-sections/ServStatsSection";
import ServGallerySection from "../../component/service-sections/ServGallerySection";
import ServTeamSection from "../../component/service-sections/ServTeamSection";
import { useParams } from "react-router-dom";
import { services } from "../../utils/services";
import PageLoader from "../../component/common/PageLoader";
import ServWhyChooseUsSection from "../../component/service-sections/ServWhyChooseUsSection";
import ServRequiredDocumentsSection from "../../component/service-sections/ServRequiredDocumentsSection";
import { api } from "../../utils/app";
import ServCommingSoon from "../../component/service-sections/ServCommingSoon";

const sectionMapper = {
  hero: ServHeroSection,
  stats: ServStatsSection,
  about: ServAboutSection,
  features: ServFeaturesSection,
  benefits: ServBenefitsSection,
  services: ServServicesSection,
  gallery: ServGallerySection,
  team: ServTeamSection,
  process: ServProcessSection,
  timeline: ServTimelineSection,
  technologies: ServTechnologiesSection,
  pricing: ServPricingSection,
  portfolio: ServPortfolioSection,
  "case-study": ServCaseStudySection,
  testimonials: ServTestimonialsSection,
  faq: ServFAQSection,
  cta: ServCTASection,
  contact: ServContactSection,
  why_choose: ServWhyChooseUsSection,
  req_doc: ServRequiredDocumentsSection,
};

const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState(null);


  const fetchServiceData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/service/${slug}`);

      if (response.data?.status) {
        setServiceData(response.data.data);
        console.log("Fetched service data:", response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    fetchServiceData();
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

  if(serviceData?.sections?.length === 0 ) {
    return <ServCommingSoon sectionName={slug} />;
  }


  return (
    <div>
      {serviceData?.sections?.map((section, index) => {
        const SectionComponent = sectionMapper[section.section_key];
        console.log("Section Available: ", SectionComponent)
        if (!SectionComponent) return <ServCommingSoon />;

        return (
          <SectionComponent
            key={index}
            data={section.data}
            service={serviceData}
          />
        );
      })}
    </div>
  );
};

export default ServiceDetailsPage;
