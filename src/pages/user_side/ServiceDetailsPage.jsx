import React from "react";
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
};

const ServiceDetailsPage = () => {
  const { slug } = useParams();

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return <div>Service Not Found</div>;
  }
  return (
    <div>
      {service.sections
        .sort((a, b) => a.order - b.order)
        .map((section) => {
          const SectionComponent = sectionMapper[section.type];

          if (!SectionComponent) return null;

          return <SectionComponent key={section.type} service={service} />;
        })}
    </div>
  );
};

export default ServiceDetailsPage;
