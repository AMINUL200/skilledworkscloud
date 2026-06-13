import React, { useState } from 'react'
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
  Clock,
  CheckCircle2
} from 'lucide-react'

const ServServiceOverviewSection = () => {
  const [activeService, setActiveService] = useState(0)

  const servicesData = [
    {
      id: "sponsorship-licence",
      label: "Sponsorship Licence",
      icon: Shield,
      color: "#2563EB",
      gradient: "from-blue-500 to-blue-700",
      description: "Expert guidance for sponsor licence applications and maintenance",
      features: ["Full application support", "Compliance audit", "Suspension defense"],
      nestedDropdown: [
        { label: "Sponsor Licence Renewal", path: "/services/sponsor-licence-renewal", popular: true },
        { label: "Sponsor Licence Suspension", path: "/services/sponsor-licence-suspension" },
        { label: "Sponsor Licence Application", path: "/services/sponsor-licence-application", popular: true },
      ],
    },
    {
      id: "immigration-compliance",
      label: "Immigration Compliance",
      icon: FileCheck,
      color: "#10B981",
      gradient: "from-emerald-500 to-teal-600",
      description: "Stay compliant with Home Office regulations and avoid penalties",
      features: ["Right to work checks", "Compliance visits", "Civil penalty defense"],
      nestedDropdown: [
        { label: "Civil Penalty", path: "/services/civil-penalty" },
        { label: "HO Compliance Visit", path: "/services/ho-compliance-visit", popular: true },
        { label: "Right to Work Check", path: "/services/right-to-work-check" },
      ],
    },
    {
      id: "skilled-worker-visas",
      label: "Skilled Worker Visas",
      icon: Users,
      color: "#8B5CF6",
      gradient: "from-purple-500 to-purple-700",
      description: "Visa solutions for skilled professionals coming to the UK",
      features: ["Certificate of sponsorship", "Visa processing", "Dependent visas"],
      nestedDropdown: [
        { label: "Skilled Worker Visa", path: "/services/skilled-worker-visa", popular: true },
        { label: "Minister of Religion Visa", path: "/services/minister-of-religion-visa" },
        { label: "Health Care Visa", path: "/services/health-care-visa", popular: true },
      ],
    },
    {
      id: "temporary-visas",
      label: "Temporary Visas",
      icon: Globe,
      color: "#F59E0B",
      gradient: "from-amber-500 to-orange-600",
      description: "Temporary work visas for cultural and charitable workers",
      features: ["Tier 5 sponsorship", "Short-term assignments", "Cultural exchange"],
      nestedDropdown: [
        { label: "Religious Worker Visa", path: "/services/religious-worker-visa" },
        { label: "Creative Worker Visa", path: "/services/creative-worker-visa" },
        { label: "Charity Worker Visa", path: "/services/charity-worker-visa" },
      ],
    },
    {
      id: "partner-family-visas",
      label: "Family Visas",
      icon: Heart,
      color: "#EC4899",
      gradient: "from-pink-500 to-rose-600",
      description: "Family reunion and partner visa applications",
      features: ["Spouse visa support", "Document preparation", "Priority service"],
      nestedDropdown: [
        { label: "Spouse Visa", path: "/services/spouse-visa", popular: true },
        { label: "Dependent Visa", path: "/services/dependent-visa" },
        { label: "Unmarried Partner Visa", path: "/services/unmarried-partner-visa" },
      ],
    },
    {
      id: "global-business-mobility",
      label: "Global Business",
      icon: Building2,
      color: "#06B6D4",
      gradient: "from-cyan-500 to-blue-600",
      description: "International business mobility and expansion solutions",
      features: ["UK Expansion visa", "Global talent mobility", "Compliance support"],
      nestedDropdown: [
        { label: "Graduate Trainee Visa", path: "/services/graduate-trainee-visa" },
        { label: "UK Expansion Worker Visa", path: "/services/uk-expansion-worker-visa", popular: true },
        { label: "Specialist Worker Visa", path: "/services/specialist-worker-visa" },
      ],
    },
    {
      id: "standard-visitor-visa",
      label: "Visitor Visas",
      icon: Briefcase,
      color: "#3B82F6",
      gradient: "from-blue-500 to-indigo-600",
      description: "Visitor visas for tourism, business, and family visits",
      features: ["Standard visitor", "Business visitor", "Family visitor"],
      nestedDropdown: [
        { label: "Tourist Visa", path: "/services/tourist-visa" },
        { label: "Business Visit", path: "/services/business-visit", popular: true },
        { label: "UK Fiancé Visa", path: "/services/uk-fiance-visa" },
      ],
    },
    {
      id: "study-visas",
      label: "Study Visas",
      icon: GraduationCap,
      color: "#14B8A6",
      gradient: "from-teal-500 to-emerald-600",
      description: "Student visas for academic and educational pursuits",
      features: ["CAS support", "Maintenance funds", "Dependent visas"],
      nestedDropdown: [
        { label: "Student Visa", path: "/services/student-visa", popular: true },
        { label: "Child Student Visa", path: "/services/child-student-visa" },
        { label: "Graduate Visa", path: "/services/graduate-visa", popular: true },
      ],
    },
    {
      id: "business-visas",
      label: "Business Visas",
      icon: TrendingUp,
      color: "#F97316",
      gradient: "from-orange-500 to-red-600",
      description: "Entrepreneur and business founder visa solutions",
      features: ["Self-sponsorship", "Innovator visa", "Business plan review"],
      nestedDropdown: [
        { label: "Self-Sponsorship In UK", path: "/services/self-sponsorship", popular: true },
        { label: "Innovator Founder Visa", path: "/services/innovator-founder-visa" },
        { label: "Turkish Businessperson Visa", path: "/services/turkish-businessperson-visa" },
      ],
    },
    {
      id: "scale-up-visa",
      label: "Scale Up Visa",
      icon: TrendingUp,
      color: "#8B5CF6",
      gradient: "from-violet-500 to-purple-600",
      description: "Fast-track visas for rapidly growing businesses",
      features: ["Scale-up sponsorship", "Fast-track processing", "Talent attraction"],
      nestedDropdown: [
        { label: "Scale-up Visa", path: "/services/scale-up-visa", popular: true },
        { label: "Scale-up Sponsor Licence", path: "/services/scale-up-sponsor-licence" },
        { label: "Scale up Business", path: "/services/scale-up-business" },
      ],
    },
  ]

  const activeServiceData = servicesData[activeService]

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
            Comprehensive visa and immigration solutions tailored to your unique needs
          </p>
        </div>

        {/* Modern Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Side - Service Categories */}
          <div className="space-y-3">
            {servicesData.map((service, idx) => {
              const Icon = service.icon
              const isActive = activeService === idx
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(idx)}
                  className={`
                    w-full text-left p-4 rounded-2xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-white shadow-xl border-l-4' 
                      : 'bg-transparent hover:bg-white/50 border-l-4 border-transparent'
                    }
                  `}
                  style={{ borderLeftColor: isActive ? service.color : 'transparent' }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-2 rounded-xl transition-all duration-300 group-hover:scale-110"
                      style={{ 
                        background: isActive ? `${service.color}15` : '#F3F4F6',
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: service.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                        {service.label}
                      </h3>
                      {isActive && (
                        <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                      )}
                    </div>
                    <ArrowRight 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{ color: service.color }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right Side - Active Service Details */}
          <div className="lg:sticky lg:top-24">
            <div 
              className="bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{ boxShadow: `0 20px 40px -12px ${activeServiceData.color}20` }}
            >
              {/* Hero Section */}
              <div 
                className="relative p-8 text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${activeServiceData.color}, ${activeServiceData.color}CC)`
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                    <activeServiceData.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{activeServiceData.label}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {activeServiceData.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 border-b border-gray-100">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Key Features
                </h4>
                <div className="space-y-3">
                  {activeServiceData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: activeServiceData.color }} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Links */}
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
                            style={{ background: `${activeServiceData.color}15`, color: activeServiceData.color }}
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

                <button 
                  className="w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${activeServiceData.color}, ${activeServiceData.color}CC)`,
                    color: 'white'
                  }}
                >
                  Get Started
                </button>
              </div>

              {/* Bottom Decoration */}
              <div 
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${activeServiceData.color}, transparent)` }}
              />
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-6 mt-6 text-center">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">24/7 Support</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">98% Success Rate</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">IAA Regulated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServServiceOverviewSection