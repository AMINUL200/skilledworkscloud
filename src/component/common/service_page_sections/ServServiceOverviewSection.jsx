import React, { useState } from "react";
import {
  Briefcase,
  Shield,
  FileCheck,
  Users,
  Globe,
  Heart,
  Building2,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServServiceOverviewSection = ({ categories }) => {
  console.log("Service category:: ", categories);
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  // Map icon names to actual components
  const getIconComponent = (iconName) => {
    const iconMap = {
      briefcase: Briefcase,
      shield: Shield,
      filecheck: FileCheck,
      users: Users,
      globe: Globe,
      heart: Heart,
      building2: Building2,
      graduationcap: GraduationCap,
      trendingup: TrendingUp,
    };
    return iconMap[iconName?.toLowerCase()] || Briefcase;
  };

  // Map category names to colors and gradients - Updated with SWC brand colors
  const getCategoryStyle = (name) => {
    const styleMap = {
      "sponsorship licencee": {
        color: "#182e72",
        gradient: "from-primary to-primary-dark",
        description: "Expert guidance for sponsor licence applications and maintenance",
        features: ["Full application support", "Compliance audit", "Suspension defense"],
      },
      "immigration compliance": {
        color: "#16a34a",
        gradient: "from-success to-success/80",
        description: "Stay compliant with Home Office regulations and avoid penalties",
        features: ["Right to work checks", "Compliance visits", "Civil penalty defense"],
      },
      "skilled worker visas": {
        color: "#127afe",
        gradient: "from-primary-bright to-primary-light",
        description: "Visa solutions for skilled professionals coming to the UK",
        features: ["Certificate of sponsorship", "Visa processing", "Dependent visas"],
      },
      "temporary (tier 5) visas": {
        color: "#f59e0b",
        gradient: "from-warning to-warning/80",
        description: "Temporary work visas for cultural and charitable workers",
        features: ["Tier 5 sponsorship", "Short-term assignments", "Cultural exchange"],
      },
      "partner and family visas": {
        color: "#dc2626",
        gradient: "from-danger to-danger/80",
        description: "Family reunion and partner visa applications",
        features: ["Spouse visa support", "Document preparation", "Priority service"],
      },
      "global business mobility": {
        color: "#234a89",
        gradient: "from-primary-light to-primary",
        description: "International business mobility and expansion solutions",
        features: ["UK Expansion visa", "Global talent mobility", "Compliance support"],
      },
      "standard visitor visa": {
        color: "#182e72",
        gradient: "from-primary to-primary-dark",
        description: "Visitor visas for tourism, business, and family visits",
        features: ["Standard visitor", "Business visitor", "Family visitor"],
      },
      "study visas": {
        color: "#16a34a",
        gradient: "from-success to-success/80",
        description: "Student visas for academic and educational pursuits",
        features: ["CAS support", "Maintenance funds", "Dependent visas"],
      },
      "business visas": {
        color: "#f59e0b",
        gradient: "from-warning to-warning/80",
        description: "Entrepreneur and business founder visa solutions",
        features: ["Self-sponsorship", "Innovator visa", "Business plan review"],
      },
      "scale up visa": {
        color: "#127afe",
        gradient: "from-primary-bright to-primary-light",
        description: "Fast-track visas for rapidly growing businesses",
        features: ["Scale-up sponsorship", "Fast-track processing", "Talent attraction"],
      },
    };
    return styleMap[name?.toLowerCase()] || {
      color: "#182e72",
      gradient: "from-primary to-primary-dark",
      description: "Professional immigration services",
      features: ["Expert guidance", "Comprehensive support", "Tailored solutions"],
    };
  };

  // Transform API data to match the expected format
  const transformCategories = () => {
    if (!categories || categories.length === 0) {
      return [];
    }

    return categories.map((category) => {
      const style = getCategoryStyle(category.name);
      const Icon = getIconComponent(category.icon || "briefcase");
      
      return {
        id: category.slug || `category-${category.id}`,
        label: category.name,
        icon: Icon,
        color: style.color,
        gradient: style.gradient,
        description: category.description || style.description,
        features: style.features,
        nestedDropdown: category.subcategories?.map((sub) => ({
          label: sub.name,
          path: `/services/${sub.slug}`,
          popular: sub.popular || false,
        })) || [],
      };
    });
  };

  const servicesData = transformCategories();
  const activeServiceData = servicesData[activeService] || servicesData[0];

  // If no categories, show a fallback
  if (!categories || categories.length === 0) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-muted via-surface to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-text">
            Immigration Services
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            No services available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-muted via-surface to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with modern design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-white text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Expertise
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-text">Immigration</span>
            <span className="text-primary"> Services</span>
          </h2>

          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Comprehensive visa and immigration solutions tailored to your unique
            needs
          </p>
        </div>

        {/* Modern Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Service Categories */}
          <div className="space-y-3">
            {servicesData.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeService === idx;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(idx)}
                  className={`
                    w-full text-left p-4 rounded-2xl transition-all duration-300 group
                    ${
                      isActive
                        ? "bg-surface shadow-card border-l-4"
                        : "bg-transparent hover:bg-muted/50 border-l-4 border-transparent"
                    }
                  `}
                  style={{
                    borderLeftColor: isActive ? service.color : "transparent",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="p-2 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: isActive ? `${service.color}15` : "#F3F4F6",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: service.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-semibold ${isActive ? "text-text" : "text-text-light"}`}
                      >
                        {service.label}
                      </h3>
                      {isActive && (
                        <p className="text-sm text-text-light mt-1">
                          {service.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                      style={{ color: service.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side - Active Service Details */}
          {activeServiceData && (
            <div className="lg:sticky lg:top-24">
              <div
                className="bg-surface rounded-3xl overflow-hidden shadow-card transition-all duration-500"
                style={{
                  boxShadow: `0 20px 40px -12px ${activeServiceData.color}20`,
                }}
              >
                {/* Hero Section */}
                <div
                  className="relative p-8 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${activeServiceData.color}, ${activeServiceData.color}CC)`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="relative">
                    <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                      <activeServiceData.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {activeServiceData.label}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {activeServiceData.description}
                    </p>
                  </div>
                </div>

                {/* Service Links */}
                {activeServiceData.nestedDropdown &&
                  activeServiceData.nestedDropdown.length > 0 && (
                    <div className="p-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                        Available Services
                      </h4>
                      <div className="space-y-2">
                        {activeServiceData.nestedDropdown.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.path}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-all duration-200 group/link"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: activeServiceData.color }}
                              />
                              <span className="text-text hover:text-text transition-colors">
                                {item.label}
                              </span>
                              {item.popular && (
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    background: `${activeServiceData.color}15`,
                                    color: activeServiceData.color,
                                  }}
                                >
                                  Popular
                                </span>
                              )}
                            </div>
                            <ArrowRight
                              className="w-4 h-4 text-text-muted opacity-0 group-hover/link:opacity-100 transition-all"
                              style={{ color: activeServiceData.color }}
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Bottom Decoration */}
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${activeServiceData.color}, transparent)`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServServiceOverviewSection;