import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  ThumbsUp,
  Award,
  Users,
  Clock,
} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    date: "15/03/2025",
    initial: "S",
    color: "#2563EB",
    review:
      "WorkPermitCloud made our sponsor licence application seamless. Their team was incredibly knowledgeable and guided us through every step. We received our licence within 8 weeks!",
    service: "Sponsor Licence",
    rating: 5,
  },
  {
    name: "Michael Chen",
    date: "10/02/2025",
    initial: "M",
    color: "#10B981",
    review:
      "The team helped me with my Skilled Worker Visa application. They were professional, responsive, and ensured all documents were perfect. Highly recommend their services!",
    service: "Skilled Worker Visa",
    rating: 5,
  },
  {
    name: "Priya Patel",
    date: "05/01/2025",
    initial: "P",
    color: "#8B5CF6",
    review:
      "Outstanding service from start to finish. They handled my spouse visa application with great care and attention to detail. The process was smooth and stress-free.",
    service: "Spouse Visa",
    rating: 5,
  },
  {
    name: "David O'Brien",
    date: "20/12/2024",
    initial: "D",
    color: "#F59E0B",
    review:
      "Their HR compliance team saved us from a potential civil penalty. They conducted a thorough audit and fixed all issues before the Home Office visit. Absolutely life-saving!",
    service: "HR Compliance",
    rating: 5,
  },
  {
    name: "Emma Watson",
    date: "18/11/2024",
    initial: "E",
    color: "#EC4899",
    review:
      "The self-sponsorship guidance was exceptional. They helped me set up my business and navigate the complex visa requirements. I couldn't have done it without them.",
    service: "Self-Sponsorship",
    rating: 5,
  },
  {
    name: "James Wilson",
    date: "25/10/2024",
    initial: "J",
    color: "#06B6D4",
    review:
      "Excellent service for our company's global mobility needs. The team processed multiple visas efficiently and kept us updated throughout. Very professional organization.",
    service: "Global Business Mobility",
    rating: 5,
  },
];

const TestimonialCard = ({ t }) => (
  <div
    className="flex flex-col gap-3 p-5 rounded-2xl transition-all duration-300 cursor-default shrink-0 hover:scale-105"
    style={{
      width: "320px",
      background: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid #E2E8F0",
    }}
  >
    {/* Quote icon */}
    <Quote className="w-8 h-8 text-primary/20" />

    {/* Review text */}
    <p
      className="text-gray-700 text-sm leading-relaxed"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      "{t.review}"
    </p>

    {/* Rating stars */}
    <div className="flex gap-0.5">
      {[...Array(t.rating)].map((_, i) => (
        <Star key={i} size={14} fill="#FCD34D" style={{ color: "#FCD34D" }} />
      ))}
    </div>

    {/* Divider */}
    <div className="h-px bg-gray-100" />

    {/* Avatar + name row */}
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-full text-white font-bold text-sm shrink-0"
        style={{
          width: "40px",
          height: "40px",
          background: t.color,
        }}
      >
        {t.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-bold text-gray-900 text-sm truncate">
            {t.name}
          </span>
          <span className="text-gray-400 text-xs shrink-0">{t.date}</span>
        </div>
        <span className="text-xs text-primary font-medium">{t.service}</span>
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, direction = "left", speed = 0.55 }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  const tripled = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const CARD_W = 320;
    const GAP = 16;
    const setW = (CARD_W + GAP) * items.length;

    if (direction === "right") posRef.current = setW;

    const step = () => {
      if (!pausedRef.current) {
        if (direction === "left") {
          posRef.current += speed;
          if (posRef.current >= setW) posRef.current -= setW;
        } else {
          posRef.current -= speed;
          if (posRef.current <= 0) posRef.current += setW;
        }
        track.style.transform = `translateX(${-posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [direction, speed, items.length]);

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: "16px", willChange: "transform" }}
      >
        {tripled.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </div>
  );
};

const MobileSlider = () => {
  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  const maxIndex = testimonials.length - 1;

  const goTo = useCallback(
    (idx) => {
      const next = Math.max(0, Math.min(idx, maxIndex));
      setCurrent(next);
      containerRef.current?.scrollTo({
        left: next * containerRef.current.clientWidth,
        behavior: "smooth",
      });
    },
    [maxIndex],
  );

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = c >= maxIndex ? 0 : c + 1;
        containerRef.current?.scrollTo({
          left: next * containerRef.current.clientWidth,
          behavior: "smooth",
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(autoRef.current);
  }, [maxIndex]);

  return (
    <div className="relative px-4">
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {testimonials.map((t, i) => (
          <div key={i} style={{ minWidth: "100%", scrollSnapAlign: "start" }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => {
            clearInterval(autoRef.current);
            goTo(current - 1);
          }}
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 w-10 h-10"
        >
          <ChevronLeft size={18} className="text-white" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearInterval(autoRef.current);
                goTo(i);
              }}
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                borderRadius: "99px",
                background: i === current ? "white" : "rgba(255,255,255,0.4)",
                transition: "width 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => {
            clearInterval(autoRef.current);
            goTo(current + 1);
          }}
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200 w-10 h-10"
        >
          <ChevronRight size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

const ServCustomerReview = () => {
  const row2 = [...testimonials].reverse();
  const stats = [
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: ThumbsUp, value: "98%", label: "Success Rate" },
    { icon: Award, value: "50+", label: "Expert Team" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(135deg, #0B4EA2 0%, #1C75FF 50%, #0F5CC0 100%)",
      }}
    >
      {/* Decorative elements - adjusted for new gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - updated colors for dark gradient background */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-5">
            <Star className="w-4 h-4 text-white" fill="currentColor" />
            <span className="text-white text-sm font-semibold tracking-wide">
              Client Testimonials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 text-white">
            What Our Clients Say
          </h2>

          <p className="text-blue-100 text-base max-w-2xl mx-auto">
            Real success stories from businesses and individuals who trusted us
            with their immigration journey
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-10 xl:gap-14 items-start">
          {/* Left Side - Stats & Ratings - updated with glass morphism */}
          <div className="space-y-8">
            {/* Rating Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div className="text-5xl font-black text-white mb-2">4.9</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={20}
                    fill="#FCD34D"
                    style={{ color: "#FCD34D" }}
                  />
                ))}
              </div>
              <p className="text-blue-100 text-sm">Based on 1,200+ reviews</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center shadow-md border border-white/20"
                  >
                    <Icon className="w-6 h-6 text-white mx-auto mb-2" />
                    <div className="text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-blue-100">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            
           
          </div>

          {/* Right Side - Testimonial Cards */}
          <div>
            {/* Desktop Marquee */}
            <div className="hidden xl:flex flex-col gap-5">
              <MarqueeRow items={testimonials} direction="left" speed={0.55} />
              <MarqueeRow items={row2} direction="right" speed={0.45} />
            </div>

            {/* Mobile Slider */}
            <div className="xl:hidden">
              <MobileSlider />
            </div>
          </div>
        </div>

       
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
};

export default ServCustomerReview;