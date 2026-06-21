import React, { useState } from "react";
import { Plane, Award, Users, CheckCircle, Shield, Clock, ArrowRight, Quote, Star, Briefcase, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const AboutCompanySection = ({ data }) => {
  console.log("About Company Section Data:", data);
  const [activeTab, setActiveTab] = useState("story");

  // If no data, return null
  if (!data) {
    return null;
  }



  // Parse journey points
  const journeyPoints = data.our_journey ? data.our_journey.split('\n').filter(point => point.trim()) : [];

  // Parse journey points into milestone objects
  const milestones = journeyPoints.map(point => {
    const parts = point.split(' ');
    const year = parts[0];
    const title = parts.slice(1).join(' ');
    return { year, title };
  });

  // Core values from API
  const values = [
    { icon: Briefcase, title: data.card1_h || "Innovation", description: data.card1_d || "Cutting-edge legal technology" },
    { icon: Shield, title: data.card2_h || "Compliance", description: data.card2_d || "Home Office guided systems" },
    { icon: Globe, title: data.card3_h || "Global Reach", description: data.card3_d || "UK & international expertise" },
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
              {data.batch || "Who We Are"}
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            {data.title || "About WorkPermitCloud"}
          </h2>
          
          <div className="w-20 h-1 rounded-full mx-auto" style={{ background: "var(--color-primary)" }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* LEFT SIDE - Modern Stats & Features */}
          <div className="space-y-8">
            {/* Stats Grid - Dynamic from API */}
            <div className="grid grid-cols-2 gap-4">
              {/* Button 1 as stat card */}
              {data.button1_name && (
                <div className="bg-white rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 rounded-xl" style={{ background: "#EFF6FF" }}>
                      <Briefcase size={20} style={{ color: "var(--color-primary)" }} />
                    </div>
                  </div>
                  {/* <p className="text-base font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
                    {data.button1_name}
                  </p> */}
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {data.button1_details}
                  </p>
                </div>
              )}

              {/* Button 2 as stat card */}
              {data.button2_name && (
                <div className="bg-white rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 rounded-xl" style={{ background: "#EFF6FF" }}>
                      <Shield size={20} style={{ color: "var(--color-primary)" }} />
                    </div>
                  </div>
                  {/* <p className="text-base font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>
                    {data.button2_name}
                  </p> */}
                  <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {data.button2_details}
                  </p>
                </div>
              )}
            </div>

            {/* Tab Navigation - Using button names from API */}
            <div className="bg-white rounded-xl p-1 border border-gray-100">
              <div className="flex gap-1">
                {data.button1_name && (
                  <button
                    onClick={() => setActiveTab("story")}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: activeTab === "story" ? "var(--color-primary)" : "transparent",
                      color: activeTab === "story" ? "white" : "var(--color-text-secondary)",
                    }}
                  >
                    {data.button1_name}
                  </button>
                )}
                {data.button2_name && (
                  <button
                    onClick={() => setActiveTab("mission")}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      background: activeTab === "mission" ? "var(--color-primary)" : "transparent",
                      color: activeTab === "mission" ? "white" : "var(--color-text-secondary)",
                    }}
                  >
                    {data.button2_name}
                  </button>
                )}
              </div>
            </div>

            {/* Tab Content - Dynamic from API */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              {activeTab === "story" ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Quote size={24} style={{ color: "var(--color-primary)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                      {data.button1_details || "We started with a mission to transform legal and immigration services."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    {/* <h4 className="font-bold mb-1" style={{ color: "var(--color-text-primary)" }}>Our Mission</h4> */}
                    <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                      {data.button2_details || "Empowering businesses through innovative immigration solutions."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons - Dynamic from API */}
            <div className="flex flex-wrap gap-3">
              {data.button3_name && (
                <Link
                  to={data.button3_url || "#"}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:gap-3"
                  style={{ background: "var(--color-primary)", color: "white", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}
                >
                  {data.button3_name}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {data.button4_name && (
                <Link
                  to={data.button4_url || "#"}
                  className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 border-2"
                  style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
                >
                  {data.button4_name}
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Image Collage with Timeline */}
          <div className="space-y-6">
            {/* Main Image Card - Dynamic from API */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={getImageUrl(data.mobile_image) || getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"}
                />
                <source
                  media="(min-width: 769px)"
                  srcSet={getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"}
                />
                <img
                  src={getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"}
                  alt={data.image_alt || "About Image"}
                  className="w-full h-64 object-cover"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <Plane className="w-4 h-4 rotate-45" style={{ color: "var(--color-primary)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>
                    {milestones.length > 0 ? milestones[0].year : "Est. 2020"}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                  <CheckCircle size={12} style={{ color: "#16A34A" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-primary)" }}>IAA Regulated</span>
                </div>
              </div>
            </div>

            {/* Milestone Timeline - Dynamic from API */}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values - Dynamic from API */}
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

        
      </div>
    </section>
  );
};

export default AboutCompanySection;