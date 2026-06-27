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

  // Map category names to colors and gradients
  const getCategoryStyle = (name) => {
    const styleMap = {
      "sponsorship licencee": {
        color: "#2563EB",
        gradient: "from-blue-500 to-blue-700",
        description: "Expert guidance for sponsor licence applications and maintenance",
        features: ["Full application support", "Compliance audit", "Suspension defense"],
      },
      "immigration compliance": {
        color: "#10B981",
        gradient: "from-emerald-500 to-teal-600",
        description: "Stay compliant with Home Office regulations and avoid penalties",
        features: ["Right to work checks", "Compliance visits", "Civil penalty defense"],
      },
      "skilled worker visas": {
        color: "#8B5CF6",
        gradient: "from-purple-500 to-purple-700",
        description: "Visa solutions for skilled professionals coming to the UK",
        features: ["Certificate of sponsorship", "Visa processing", "Dependent visas"],
      },
      "temporary (tier 5) visas": {
        color: "#F59E0B",
        gradient: "from-amber-500 to-orange-600",
        description: "Temporary work visas for cultural and charitable workers",
        features: ["Tier 5 sponsorship", "Short-term assignments", "Cultural exchange"],
      },
      "partner and family visas": {
        color: "#EC4899",
        gradient: "from-pink-500 to-rose-600",
        description: "Family reunion and partner visa applications",
        features: ["Spouse visa support", "Document preparation", "Priority service"],
      },
      "global business mobility": {
        color: "#06B6D4",
        gradient: "from-cyan-500 to-blue-600",
        description: "International business mobility and expansion solutions",
        features: ["UK Expansion visa", "Global talent mobility", "Compliance support"],
      },
      "standard visitor visa": {
        color: "#3B82F6",
        gradient: "from-blue-500 to-indigo-600",
        description: "Visitor visas for tourism, business, and family visits",
        features: ["Standard visitor", "Business visitor", "Family visitor"],
      },
      "study visas": {
        color: "#14B8A6",
        gradient: "from-teal-500 to-emerald-600",
        description: "Student visas for academic and educational pursuits",
        features: ["CAS support", "Maintenance funds", "Dependent visas"],
      },
      "business visas": {
        color: "#F97316",
        gradient: "from-orange-500 to-red-600",
        description: "Entrepreneur and business founder visa solutions",
        features: ["Self-sponsorship", "Innovator visa", "Business plan review"],
      },
      "scale up visa": {
        color: "#8B5CF6",
        gradient: "from-violet-500 to-purple-600",
        description: "Fast-track visas for rapidly growing businesses",
        features: ["Scale-up sponsorship", "Fast-track processing", "Talent attraction"],
      },
    };
    return styleMap[name?.toLowerCase()] || {
      color: "#2563EB",
      gradient: "from-blue-500 to-blue-700",
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Immigration Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No services available at the moment. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with modern design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Expertise
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Immigration Services
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                        ? "bg-white shadow-xl border-l-4"
                        : "bg-transparent hover:bg-white/50 border-l-4 border-transparent"
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
                        className={`font-semibold ${isActive ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {service.label}
                      </h3>
                      {isActive && (
                        <p className="text-sm text-gray-500 mt-1">
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
                className="bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
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

                {/* Features List */}
                {/* <div className="p-8 border-b border-gray-100">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Key Features
                  </h4>
                  <div className="space-y-3">
                    {activeServiceData.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2
                          className="w-5 h-5"
                          style={{ color: activeServiceData.color }}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Service Links */}
                {activeServiceData.nestedDropdown &&
                  activeServiceData.nestedDropdown.length > 0 && (
                    <div className="p-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                        Available Services
                      </h4>
                      <div className="space-y-2">
                        {activeServiceData.nestedDropdown.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.path}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group/link"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: activeServiceData.color }}
                              />
                              <span className="text-gray-700 group-hover/link:text-gray-900 transition-colors">
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
                              className="w-4 h-4 text-gray-400 opacity-0 group-hover/link:opacity-100 transition-all"
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