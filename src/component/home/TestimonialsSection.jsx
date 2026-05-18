import React, { useRef, useEffect, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Nazmun Nahar",
    date: "13/11/2025",
    initial: "N",
    color: "#2563EB",
    review:
      "I had an excellent experience with the Doctor Appointment platform. A special thanks to Dr. Sunny, who was incredibly helpful, knowledgeable, and supportive throughout the entire process. Their professionalism made everything smooth and stress-free.",
  },
  {
    name: "Farhad Ahmed Shiplu",
    date: "13/04/2025",
    initial: "F",
    color: "#06B6D4",
    review:
      "My wife's treatment process was handled with utmost care. They were truly professional and extremely supportive throughout every step. We are especially grateful to Dr. Rahman for his guidance and continuous support.",
  },
  {
    name: "Sarah Williams",
    date: "21/03/2025",
    initial: "S",
    color: "#22C55E",
    review:
      "Outstanding service from beginning to end. The medical team helped us navigate the entire process. Communication was excellent and everything was handled professionally. Highly recommended!",
  },
  {
    name: "Mohammed Rahman",
    date: "02/01/2025",
    initial: "M",
    color: "#F59E0B",
    review:
      "The appointment booking process was much easier than expected. The doctors were always available, responsive and very experienced. I highly recommend this platform to anyone needing quality medical care.",
  },
  {
    name: "Emma Thompson",
    date: "28/02/2025",
    initial: "E",
    color: "#EF4444",
    review:
      "The team went above and beyond to help us. Their attention to detail and proactive approach saved us months of delays. The online consultation feature is a game-changer. Couldn't recommend them enough!",
  },
  {
    name: "James Wilson",
    date: "15/01/2025",
    initial: "J",
    color: "#7C3AED",
    review:
      "Excellent service from start to finish. The specialist they connected me with identified issues I wasn't aware of. Their solutions were practical and effective. Five stars — will definitely use again!",
  },
];

/* ─────────────────────────────────────────
   Single Card
───────────────────────────────────────── */
const TestimonialCard = ({ t }) => (
  <div
    className="flex flex-col gap-3 p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default shrink-0"
    style={{
      width: "290px",
      background: "rgba(255,255,255,0.09)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    }}
  >
    {/* Avatar + name row */}
    <div className="flex items-center gap-3">
      <div
        className="flex items-center justify-center rounded-full text-white font-bold text-base shrink-0"
        style={{
          width: "42px",
          height: "42px",
          background: t.color,
          boxShadow: `0 4px 12px ${t.color}55`,
        }}
      >
        {t.initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-bold text-white text-sm truncate">{t.name}</span>
          <span className="text-white/40 text-xs ml-2 shrink-0">{t.date}</span>
        </div>
        <div className="flex gap-0.5 mt-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={11} fill="#FCD34D" style={{ color: "#FCD34D" }} />
          ))}
        </div>
      </div>
    </div>

    {/* Review */}
    <p
      className="text-white/70 text-xs leading-relaxed"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      "{t.review}"
    </p>
  </div>
);

/* ─────────────────────────────────────────
   Horizontal Marquee Row  (RAF-based)
───────────────────────────────────────── */
const MarqueeRow = ({ items, direction = "left", speed = 0.55 }) => {
  const trackRef = useRef(null);
  const animRef  = useRef(null);
  const posRef   = useRef(0);
  const pausedRef = useRef(false);

  // Triple the items so the reset is never visible
  const tripled = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const CARD_W = 290;
    const GAP    = 16;
    const setW   = (CARD_W + GAP) * items.length; // width of one original set

    // For rightward scroll start at -setW so cards flow in from left
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
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
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

/* ─────────────────────────────────────────
   Mobile snap slider
───────────────────────────────────────── */
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
    [maxIndex]
  );

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = c >= maxIndex ? 0 : c + 1;
        containerRef.current?.scrollTo({
          left: next * (containerRef.current.clientWidth),
          behavior: "smooth",
        });
        return next;
      });
    }, 3500);
    return () => clearInterval(autoRef.current);
  }, [maxIndex]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {testimonials.map((t, i) => (
          <div key={i} style={{ minWidth: "100%", scrollSnapAlign: "start" }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={() => { clearInterval(autoRef.current); goTo(current - 1); }}
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/15 hover:bg-white/30 transition-all duration-200"
          style={{ width: "34px", height: "34px" }}
        >
          <ChevronLeft size={15} color="white" />
        </button>

        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { clearInterval(autoRef.current); goTo(i); }}
              style={{
                width: i === current ? "22px" : "6px",
                height: "6px",
                borderRadius: "99px",
                background: i === current ? "white" : "rgba(255,255,255,0.35)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => { clearInterval(autoRef.current); goTo(current + 1); }}
          className="flex items-center justify-center rounded-full border border-white/30 bg-white/15 hover:bg-white/30 transition-all duration-200"
          style={{ width: "34px", height: "34px" }}
        >
          <ChevronRight size={15} color="white" />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
const TestimonialsSection = () => {
  const row2 = [...testimonials].reverse();

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background: "linear-gradient(135deg, #1E40AF 0%, #2563EB 50%, #0891B2 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: "500px", height: "500px", top: "-120px", left: "-120px", background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: "400px", height: "400px", bottom: "-80px", right: "-80px", background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full" style={{ animation: "blink 2s ease-in-out infinite" }} />
            <span className="text-white/90 text-sm font-semibold tracking-wide">Patient Testimonials</span>
          </div>
          <h2
            className="font-black text-white leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", fontFamily: "'DM Sans', sans-serif" }}
          >
            What Our Patients Say
          </h2>
          <p className="mt-3 text-blue-100 text-base max-w-xl mx-auto">
            Real stories from thousands of patients who found the right care.
          </p>
        </div>

        {/* Grid: left stats | right marquee */}
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-10 xl:gap-14 items-center">

          {/* ── LEFT: Rating stats ── */}
          <div className="text-center xl:text-left space-y-7">

            {/* Big rating */}
            <div>
              <div className="font-black text-white leading-none" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontFamily: "'DM Sans', sans-serif" }}>
                4.9
              </div>
              <div className="flex items-center justify-center xl:justify-start gap-1 mt-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={22} fill="#FCD34D" style={{ color: "#FCD34D" }} />)}
              </div>
              <p className="text-blue-100 text-sm mt-1.5">Based on 1,200+ reviews</p>
            </div>

            <div className="h-px bg-white/20" />

            {/* Trustpilot */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="px-3 py-1 rounded-lg text-white font-black text-sm" style={{ background: "#00B67A" }}>★ Trustpilot</div>
              </div>
              <div className="flex items-center justify-center xl:justify-start gap-1 mb-1">
                {[1,2,3,4,5].map(s => (
                  <div key={s} className="flex items-center justify-center rounded text-white text-sm font-bold" style={{ width: "26px", height: "26px", background: "#00B67A" }}>★</div>
                ))}
              </div>
              <p className="text-white font-semibold text-sm">4.9 · 189 reviews</p>
            </div>

            {/* Google */}
            <div className="flex items-center justify-center xl:justify-start gap-3">
              <div className="flex items-center justify-center rounded-xl font-black text-2xl shadow-lg" style={{ width: "46px", height: "46px", background: "white", color: "#4285F4" }}>G</div>
              <div>
                <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={15} fill="white" style={{ color: "white" }} />)}</div>
                <p className="text-white font-semibold text-sm mt-0.5">4.9 · 733 reviews</p>
              </div>
            </div>

            <div className="h-px bg-white/20" />

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row xl:flex-col gap-3">
              <button
                className="px-6 py-3 rounded-xl border-2 border-white text-white text-sm font-semibold transition-all duration-200 w-full hover:scale-105"
                onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#2563EB"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
              >
                View All Reviews
              </button>
              <button
                className="px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 w-full hover:scale-105"
                style={{ background: "white", color: "#2563EB", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* ── RIGHT Desktop: two horizontal marquee rows ── */}
          <div className="hidden xl:flex flex-col gap-5">
            <MarqueeRow items={testimonials} direction="left"  speed={0.55} />
            <MarqueeRow items={row2}         direction="right" speed={0.45} />
          </div>

          {/* ── RIGHT Mobile: snap slider ── */}
          <div className="xl:hidden">
            <MobileSlider />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;