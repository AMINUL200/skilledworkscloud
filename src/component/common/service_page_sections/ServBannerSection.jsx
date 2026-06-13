import React from 'react'
import { ArrowRight, Shield, FileText, Users, Globe } from 'lucide-react'

const ServBannerSection = () => {
  return (
    <section
      className="
        relative
        h-[55vh]
        min-h-[500px]
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      {/* BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop"
        alt="Services Hero"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
        style={{
          animation: 'slowZoom 20s ease-in-out infinite'
        }}
      />

      {/* OVERLAY WITH GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#0B4EA2]/95
          via-[#0F5CC0]/85
          to-[#1C75FF]/70
        "
      />

      {/* PATTERN OVERLAY - Simplified */}
      <div
        className="
          absolute
          inset-0
          opacity-5
          bg-white
        "
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* FLOATING ELEMENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10" style={{ animation: 'float 6s ease-in-out infinite' }}>
          <Shield className="w-12 h-12 text-white/20" />
        </div>
        <div className="absolute bottom-20 right-10" style={{ animation: 'floatDelayed 8s ease-in-out infinite' }}>
          <Users className="w-16 h-16 text-white/20" />
        </div>
        <div className="absolute top-1/2 right-20" style={{ animation: 'floatSlow 10s ease-in-out infinite' }}>
          <FileText className="w-10 h-10 text-white/20" />
        </div>
        <div className="absolute bottom-1/3 left-20" style={{ animation: 'float 7s ease-in-out infinite' }}>
          <Globe className="w-14 h-14 text-white/20" />
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          relative
          max-w-[1200px]
          px-5
          text-center
          z-10
        "
      >
        {/* BADGE */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/10
            backdrop-blur-sm
            border
            border-white/20
            mb-6
          "
          style={{ animation: 'fadeInUp 0.8s ease-out forwards', opacity: 0 }}
        >
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
            Comprehensive Immigration Solutions
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1
          className="
            mt-4
            text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-black
            leading-tight
            text-white
            tracking-tight
          "
          style={{ animation: 'fadeInUp 0.8s ease-out 0.1s forwards', opacity: 0 }}
        >
          Expert Immigration &
          <span className="block mt-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Business Services
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            mt-6
            text-base
            md:text-lg
            lg:text-xl
            leading-relaxed
            text-blue-100
            max-w-3xl
            mx-auto
          "
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards', opacity: 0 }}
        >
          From sponsor licence applications to visa processing and HR compliance,
          we provide end-to-end immigration solutions for businesses and individuals
          in the UK.
        </p>

        {/* CTA BUTTONS */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
          "
          style={{ animation: 'fadeInUp 0.8s ease-out 0.3s forwards', opacity: 0 }}
        >
          <button
            className="
              group
              relative
              overflow-hidden
              px-8
              py-3.5
              rounded-full
              bg-white
              text-primary
              font-semibold
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
              hover:scale-105
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            className="
              px-8
              py-3.5
              rounded-full
              bg-transparent
              border-2
              border-white/30
              text-white
              font-semibold
              hover:bg-white/10
              hover:border-white/50
              transition-all
              duration-300
              backdrop-blur-sm
            "
          >
            Free Consultation
          </button>
        </div>

      
      </div>

      {/* SCROLL INDICATOR */}
      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          cursor-pointer
          z-10
        "
        style={{ animation: 'bounce 2s ease-in-out infinite' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

export default ServBannerSection