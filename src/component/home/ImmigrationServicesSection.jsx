import React, { useState } from "react";
import { 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  Package, 
  Heart, 
  Globe,
  Sparkles,
  Clock,
  CheckCircle2,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "01",
    title: "Doctor Search",
    icon: FileText,
    color: "#127afe",
    gradient: "from-primary-bright to-primary-light",
    items: ["Find by Specialty", "Filter by Location", "Search by Availability"],
    description: "Access 5,000+ verified doctors instantly with smart filtering by specialty and location.",
    features: ["5,000+ Doctors", "Smart Filtering", "Instant Booking"],
  },
  {
    id: "02",
    title: "Health Compliance",
    icon: ShieldCheck,
    color: "#16a34a",
    gradient: "from-success to-success/80",
    items: ["Medical Record Access", "Insurance Verification", "Health Screening"],
    description: "100% HIPAA compliant platform for secure health data management and insurance verification.",
    features: ["HIPAA Compliant", "Secure Data", "Insurance Ready"],
  },
  {
    id: "03",
    title: "Specialist Visas",
    icon: Briefcase,
    color: "#182e72",
    gradient: "from-primary to-primary-dark",
    items: ["Cardiologist", "Neurologist", "Orthopedic Surgeon"],
    description: "Fast-track specialist appointments with minimal waiting time across top disciplines.",
    features: ["Fast-track", "Top Specialists", "Low Wait Time"],
  },
  {
    id: "04",
    title: "Teleconsultation",
    icon: Package,
    color: "#f59e0b",
    gradient: "from-warning to-warning/80",
    items: ["Video Consultation", "Chat with Doctor", "Follow-up Sessions"],
    description: "Connect with doctors remotely. Average wait time of just 5 minutes, any time of day.",
    features: ["Video Calls", "Chat Support", "5 Min Wait"],
  },
  {
    id: "05",
    title: "Family & Child Care",
    icon: Heart,
    color: "#dc2626",
    gradient: "from-danger to-danger/80",
    items: ["Pediatrics", "Maternity Care", "Family Health Plans"],
    description: "24/7 pediatric emergency support and comprehensive family health plans for every stage.",
    features: ["24/7 Support", "Maternity Care", "Family Plans"],
  },
  {
    id: "06",
    title: "Global Health",
    icon: Globe,
    color: "#234a89",
    gradient: "from-primary-light to-primary",
    items: ["Medical Tourism", "International Insurance", "Cross-border Care"],
    description: "Comprehensive healthcare coverage in 150+ countries with international insurance support.",
    features: ["150+ Countries", "Global Coverage", "Medical Tourism"],
  },
];

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();
  
  const activeServiceData = services[activeService];

  return (
    <section className="py-20 lg:py-16 bg-gradient-to-br from-muted via-surface to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with modern design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10 border border-border mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Services
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4">
            <span className="text-black">Complete Healthcare</span>
            <span className="block text-primary">Services</span>
          </h2>
          
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            From specialist search to teleconsultation, we handle every aspect of your healthcare journey.
          </p>
        </div>

        {/* Modern Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Side - Service Categories */}
          <div className="space-y-3">
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeService === idx;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(idx)}
                  className={`
                    w-full text-left p-4 rounded-2xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-surface shadow-card border-l-4' 
                      : 'bg-transparent hover:bg-muted/50 border-l-4 border-transparent'
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
                      <h3 className={`font-semibold ${isActive ? 'text-text' : 'text-text-light'}`}>
                        {service.title}
                      </h3>
                      {isActive && (
                        <p className="text-sm text-text-light mt-1">{service.description}</p>
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
              className="bg-surface rounded-3xl overflow-hidden shadow-card transition-all duration-500"
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
                  <h3 className="text-2xl font-bold mb-2">{activeServiceData.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {activeServiceData.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="p-8 border-b border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                  Key Features
                </h4>
                <div className="space-y-3">
                  {activeServiceData.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: activeServiceData.color }} />
                      <span className="text-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Items */}
              <div className="p-8">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
                  What We Offer
                </h4>
                <div className="space-y-2">
                  {activeServiceData.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-all duration-200 group/link"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: activeServiceData.color }}
                        />
                        <span className="text-text hover:text-text transition-colors">
                          {item}
                        </span>
                      </div>
                      <ArrowRight 
                        className="w-4 h-4 text-text-muted opacity-0 group-hover/link:opacity-100 transition-all"
                        style={{ color: activeServiceData.color }}
                      />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => navigate("/services")}
                  className="w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${activeServiceData.color}, ${activeServiceData.color}CC)`,
                    color: 'white'
                  }}
                >
                  Learn More
                </button>
              </div>

              {/* Bottom Decoration */}
              <div 
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${activeServiceData.color}, transparent)` }}
              />
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;