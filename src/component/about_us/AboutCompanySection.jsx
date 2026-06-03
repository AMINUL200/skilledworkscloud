import React, { useState } from "react";
import { Plane, Award, Users, CheckCircle, Shield, Clock, ArrowRight, Quote, Star, Briefcase, Globe } from "lucide-react";

const AboutCompanySection = () => {
  const [activeTab, setActiveTab] = useState("story");

  const achievements = [
    { icon: Award, value: "1000+", label: "Happy Clients" },
    { icon: Users, value: "98%", label: "Success Rate" },
    { icon: Shield, value: "50+", label: "Experts" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started our journey in legal-tech" },
    { year: "2021", title: "First 100 Clients", description: "Achieved milestone" },
    { year: "2022", title: "SaaS Launch", description: "Launched HR management system" },
    { year: "2023", title: "1000+ Served", description: "Major milestone achieved" },
  ];

  const values = [
    { icon: Briefcase, title: "Innovation", description: "Cutting-edge legal tech solutions" },
    { icon: Shield, title: "Compliance", description: "Home Office guided systems" },
    { icon: Globe, title: "Global Reach", description: "UK & international expertise" },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white to-[#EEF5FD]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with pattern */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 mb-4">
            <Star size={14} style={{ color: "var(--color-primary)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              Who We Are
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            About WorkPermitCloud
          </h2>
          
          <div className="w-20 h-1 rounded-full mx-auto" style={{ background: "var(--color-primary)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT SIDE - Modern Stats & Features */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="p-2 rounded-xl" style={{ background: "#EFF6FF" }}>
                        <Icon size={20} style={{ color: "var(--color-primary)" }} />
                      </div>
                    </div>
                    <p className="text-2xl font-black mb-1" style={{ color: "var(--color-text-primary)" }}>
                      {item.value}
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-xl p-1 border border-gray-100">
              <div className="flex gap-1">
                {[
                  { id: "story", label: "Our Story" },
                  { id: "mission", label: "Mission & Vision" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: activeTab === tab.id ? "var(--color-primary)" : "transparent",
                      color: activeTab === tab.id ? "white" : "var(--color-text-secondary)",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              {activeTab === "story" ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Quote size={24} style={{ color: "var(--color-primary)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      WorkPermitCloud is an innovative Legal and HR-tech company established in 2020.
                      We specialise in Business Immigration and HR systems in the UK.
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed pl-9" style={{ color: "var(--color-text-secondary)" }}>
                    Since its inception in 2020, we have served more than 1000+ clients with a
                    commendable success rate.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Our Mission</h4>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      To simplify immigration and HR processes through innovative technology and expert guidance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Our Vision</h4>
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      To be the leading legal-tech platform transforming business immigration globally.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:gap-3" style={{ background: "var(--color-primary)", color: "white", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 border-2" style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}>
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Image Collage with Timeline */}
          <div className="space-y-6">
            {/* Main Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Team Collaboration"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Plane className="w-4 h-4 rotate-45" style={{ color: "var(--color-primary)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>Est. 2020</span>
                </div>
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <CheckCircle size={12} style={{ color: "#16A34A" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>IAA Regulated</span>
                </div>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: "var(--color-text-primary)" }}>
                <Clock size={16} style={{ color: "var(--color-primary)" }} />
                Our Journey
              </h3>
              <div className="space-y-3">
                {milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3 group cursor-pointer">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full mt-1" style={{ background: "var(--color-primary)" }} />
                      {idx !== milestones.length - 1 && (
                        <div className="absolute top-3 left-1 w-0.5 h-8 bg-gray-200 group-hover:bg-primary/50 transition-colors" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold" style={{ color: "var(--color-primary)" }}>{milestone.year}</span>
                        <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{milestone.title}</span>
                      </div>
                      <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-3 gap-3">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="text-center p-3 bg-white rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex justify-center mb-2">
                      <Icon size={18} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-text-primary)" }}>{value.title}</p>
                    <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: "#E2E8F0" }}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-center text-white">
            <p className="text-sm font-medium mb-2">We offer IAA regulated immigration services</p>
            <p className="text-xs opacity-90">Sponsorship Licence Applications • HR Compliance • Recruitment • Visa Processing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanySection;