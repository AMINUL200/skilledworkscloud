import React, { useState } from "react";
import { ArrowRight, FileText, ShieldCheck, Briefcase, Package, Heart, Globe } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Doctor Search",
    icon: FileText,
    items: ["Find by Specialty", "Filter by Location", "Search by Availability"],
    description: "Access 5,000+ verified doctors instantly with smart filtering by specialty and location.",
  },
  {
    id: "02",
    title: "Health Compliance",
    icon: ShieldCheck,
    items: ["Medical Record Access", "Insurance Verification", "Health Screening"],
    description: "100% HIPAA compliant platform for secure health data management and insurance verification.",
  },
  {
    id: "03",
    title: "Specialist Visas",
    icon: Briefcase,
    items: ["Cardiologist", "Neurologist", "Orthopedic Surgeon"],
    description: "Fast-track specialist appointments with minimal waiting time across top disciplines.",
  },
  {
    id: "04",
    title: "Teleconsultation",
    icon: Package,
    items: ["Video Consultation", "Chat with Doctor", "Follow-up Sessions"],
    description: "Connect with doctors remotely. Average wait time of just 5 minutes, any time of day.",
  },
  {
    id: "05",
    title: "Family & Child Care",
    icon: Heart,
    items: ["Pediatrics", "Maternity Care", "Family Health Plans"],
    description: "24/7 pediatric emergency support and comprehensive family health plans for every stage.",
  },
  {
    id: "06",
    title: "Global Health",
    icon: Globe,
    items: ["Medical Tourism", "International Insurance", "Cross-border Care"],
    description: "Comprehensive healthcare coverage in 150+ countries with international insurance support.",
  },
];

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER: two-col split ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 lg:mb-12">
          <div>
            <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight">
              Complete<br />
              <span className="text-blue-600">Healthcare Services</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed sm:max-w-xs lg:max-w-sm sm:pb-1">
            From specialist search to teleconsultation, we handle every aspect of your healthcare journey.
          </p>
        </div>

        {/* ── MOSAIC GRID ── */}
        {/*
          Shared 1px dividers via gap-px on a slate-200 background.
          Rounded outer container clips the corners cleanly.
          Mobile: 1 col → sm: 2 col → lg: 3 col
        */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-px
            bg-slate-200
            border border-slate-200
            rounded-2xl lg:rounded-3xl
            overflow-hidden
          "
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className="
                  group
                  relative
                  bg-white
                  hover:bg-blue-50/60
                  transition-colors duration-200
                  px-6 pt-6 pb-6
                  flex flex-col
                  cursor-pointer
                "
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top: icon + number */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="
                      w-11 h-11 rounded-xl
                      bg-blue-50 border border-blue-100
                      flex items-center justify-center
                      text-blue-600
                      group-hover:bg-blue-100
                      transition-colors duration-200
                    "
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 tracking-widest">
                    {service.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-black text-slate-900 leading-snug mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-slate-400 leading-relaxed flex-1 mb-5">
                  {service.description}
                </p>

                {/* Feature list — separated by top border */}
                <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                  {service.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div
                        className={`
                          w-[5px] h-[5px] rounded-full shrink-0
                          transition-colors duration-200
                          ${isHovered ? "bg-blue-500" : "bg-slate-300"}
                        `}
                      />
                      <span className="text-[12.5px] text-slate-600 font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-10">
          <button
            className="
              inline-flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              text-white text-sm font-bold
              px-7 py-3 rounded-xl
              transition-colors duration-200
              active:scale-95
            "
          >
            View All Services
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;