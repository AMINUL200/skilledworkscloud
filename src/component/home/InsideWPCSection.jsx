import React, { useState } from "react";
import { ArrowRight, Play, Camera, Users, Building2, Coffee, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InsideWPCSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryImages = [
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
      category: "team",
      title: "Leadership Meeting",
      description: "Strategic planning session",
    },
    {
      image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1200&auto=format&fit=crop",
      category: "office",
      title: "Modern Workspace",
      description: "Collaborative environment",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
      category: "team",
      title: "Team Collaboration",
      description: "Brainstorming session",
    },
    {
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      category: "events",
      title: "Company Event",
      description: "Annual celebration",
    },
    {
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
      category: "office",
      title: "Office Vibes",
      description: "Creative space",
    },
    {
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
      category: "events",
      title: "Team Building",
      description: "Fun activities",
    },
  ];

  const stats = [
    { icon: Users, value: "50+", label: "Team Members" },
    { icon: Building2, value: "3", label: "Global Offices" },
    { icon: Coffee, value: "1000+", label: "Coffee Cups" },
    { icon: Heart, value: "98%", label: "Satisfaction" },
  ];

  const categories = [
    { id: "all", label: "All Moments" },
    { id: "team", label: "Team" },
    { id: "office", label: "Office" },
    { id: "events", label: "Events" },
  ];

  const filteredImages = selectedCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-[#EEF5FD]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/3 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-4">
            <Camera size={14} style={{ color: "var(--color-primary)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              Our World
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            Inside WorkPermitCloud
          </h2>
          
          <p className="text-base sm:text-lg" style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Discover our offices, team, and other moments & stories behind WPC
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-lg" style={{ background: "#EFF6FF" }}>
                    <Icon size={20} style={{ color: "var(--color-primary)" }} />
                  </div>
                </div>
                <p className="text-2xl font-black mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: selectedCategory === cat.id ? "var(--color-primary)" : "white",
                color: selectedCategory === cat.id ? "white" : "var(--color-text-secondary)",
                boxShadow: selectedCategory === cat.id ? "0 4px 12px rgba(37,99,235,0.3)" : "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Hero Image Slider */}
        <div className="relative mb-8 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative aspect-[16/9] lg:aspect-[21/9]">
            <img
              src={filteredImages[activeIndex].image}
              alt={filteredImages[activeIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{filteredImages[activeIndex].title}</h3>
              <p className="text-white/80">{filteredImages[activeIndex].description}</p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeIndex === idx ? "24px" : "8px",
                    height: "8px",
                    background: activeIndex === idx ? "white" : "white/50",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredImages.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => setActiveIndex(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={16} style={{ color: "var(--color-primary)" }} />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-medium truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button 
          onClick={() => navigate("/gallery")}
          className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden" style={{ background: "var(--color-primary)", color: "white", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
            <span className="relative z-10">Explore Full Gallery</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Bottom Quote */}
        <div className="mt-12 text-center">
          <div className="inline-block p-4 rounded-xl bg-white/50 backdrop-blur-sm">
            <p className="text-sm italic" style={{ color: "var(--color-text-secondary)" }}>
              "Building the future of immigration services, together"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsideWPCSection;