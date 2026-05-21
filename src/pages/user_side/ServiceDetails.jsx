import React, { useState, useRef, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock3,
  FileCheck2,
  Users,
  BadgeCheck,
  CircleHelp,
  ChevronDown,
  Star,
  Phone,
} from "lucide-react";

/* ─── tiny hook: animate number on mount ─── */
const useCountUp = (target, duration = 1400) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          setVal(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
};

/* ─── Stat counter card ─── */
const StatCard = ({ value, suffix, label }) => {
  const { val, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black text-white tabular-nums">
        {val}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-blue-200 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
};

/* ─── Accordion FAQ item ─── */
const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`
        rounded-3xl border transition-all duration-300 overflow-hidden
        ${open ? "border-primary bg-primary/[0.03]" : "border-border bg-white"}
      `}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-5 px-8 py-7 text-left"
      >
        <span
          className={`
            min-w-[32px] h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300
            ${open ? "bg-primary text-white" : "bg-primary/10 text-primary"}
          `}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[17px] font-semibold text-text">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`
          px-8 transition-all duration-300 overflow-hidden
          ${open ? "max-h-40 pb-7 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <p className="text-text-light leading-8 pl-[52px]">{faq.answer}</p>
      </div>
    </div>
  );
};

const ServiceDetails = () => {
  const benefits = [
    "Expert UKVI compliance guidance",
    "Fast and hassle-free processing",
    "Document review & preparation",
    "Dedicated caseworker support",
    "Business compliance assistance",
    "High approval success rate",
  ];

  const processSteps = [
    {
      icon: Phone,
      title: "Initial Consultation",
      description: "We review your existing sponsor licence and identify renewal requirements.",
    },
    {
      icon: FileCheck2,
      title: "Document Preparation",
      description: "Our team prepares and checks all required compliance documents.",
    },
    {
      icon: ShieldCheck,
      title: "Application Submission",
      description: "We submit your sponsor licence renewal application correctly and efficiently.",
    },
    {
      icon: BadgeCheck,
      title: "Compliance Support",
      description: "Ongoing support to ensure your business remains UKVI compliant.",
    },
  ];

  const faqs = [
    {
      question: "When should I renew my sponsor licence?",
      answer: "You should renew your sponsor licence before its expiry date to avoid losing sponsorship rights.",
    },
    {
      question: "How long does sponsor licence renewal take?",
      answer: "The process duration depends on the complexity of your compliance records and documentation.",
    },
    {
      question: "Can you help with compliance checks?",
      answer: "Yes, our specialists help businesses prepare for Home Office compliance requirements.",
    },
  ];

  const features = [
    { icon: FileCheck2, title: "Document Preparation", desc: "Full review and preparation of all required compliance documents." },
    { icon: Clock3, title: "Fast Application Support", desc: "Expedited handling to meet your renewal deadlines." },
    { icon: Users, title: "Dedicated Caseworker", desc: "A named expert assigned to your case from start to finish." },
    { icon: BadgeCheck, title: "Compliance Guidance", desc: "Ongoing advice to keep your licence in good standing." },
  ];

  return (
    <div className="bg-background overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&family=Playfair+Display:wght@700;900&display=swap');

        .playfair { font-family: 'Playfair Display', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-1 { animation: fadeUp .7s ease both; }
        .anim-2 { animation: fadeUp .7s .15s ease both; }
        .anim-3 { animation: fadeUp .7s .3s ease both; }
        .anim-4 { animation: fadeUp .7s .45s ease both; }
        .anim-5 { animation: fadeUp .7s .6s ease both; }

        .line-accent::after {
          content: '';
          display: block;
          width: 52px;
          height: 4px;
          border-radius: 2px;
          background: currentColor;
          margin-top: 14px;
        }

        .step-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(37,99,235,0.07) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .35s;
        }
        .step-card:hover::before { opacity: 1; }
      `}</style>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* BG */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/97 via-[#0F172A]/90 to-[#2563EB]/55" />

        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-[1450px] mx-auto px-6 lg:px-16 w-full py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-20 items-center">

            {/* LEFT */}
            <div>
              <div className="anim-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/8 backdrop-blur-md text-white/80 text-xs font-semibold tracking-widest uppercase mb-8">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                UK Immigration Services
              </div>

              <h1 className="anim-2 playfair text-5xl md:text-7xl font-black leading-[1.08] text-white">
                Sponsor Licence<br />
                <em className="not-italic text-blue-400">Renewal</em>
                <span className="text-white"> Service</span>
              </h1>

              <p className="anim-3 mt-8 text-lg leading-[1.9] text-blue-100/80 max-w-[580px]">
                Renew your sponsor licence with confidence. Our experienced immigration
                specialists help businesses maintain compliance and continue sponsoring
                skilled workers without disruption.
              </p>

              {/* trust badges */}
              <div className="anim-4 mt-8 flex flex-wrap gap-4">
                {["OISC Regulated", "99% Success Rate", "Same-day Response"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-white/70 border border-white/10 rounded-full px-4 py-1.5 bg-white/5">
                    <Star className="w-3 h-3 text-blue-400 fill-blue-400" /> {t}
                  </span>
                ))}
              </div>

              <div className="anim-5 mt-10 flex flex-wrap gap-4">
                <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-semibold shadow-[0_12px_40px_rgba(37,99,235,0.4)] hover:shadow-[0_16px_50px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 transition-all duration-300">
                  Book Consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md text-white font-semibold hover:bg-white hover:text-primary transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="flex justify-end">
              <div className="w-full bg-white/8 border border-white/12 backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">

                {/* glow */}
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-blue-500/25 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-6 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <p className="text-xs font-semibold tracking-widest uppercase text-blue-300 mb-3">Why Choose Us</p>
                  <h3 className="playfair text-3xl font-black text-white leading-tight mb-8">
                    Your trusted<br />immigration partner
                  </h3>

                  <div className="space-y-4">
                    {benefits.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-blue-300" />
                        </div>
                        <p className="text-white/85 text-[15px] leading-6">{item}</p>
                      </div>
                    ))}
                  </div>

                  <button className="mt-8 w-full py-4 rounded-2xl bg-white text-primary font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#172554] to-[#2563EB] py-14">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 divide-x divide-white/10">
            {[
              { value: 98, suffix: "%", label: "Approval Rate" },
              { value: 12, suffix: "+", label: "Years Experience" },
              { value: 3000, suffix: "+", label: "Cases Handled" },
              { value: 24, suffix: "h", label: "Response Time" },
            ].map((s, i) => (
              <div key={i} className={i > 0 ? "pl-10" : ""}>
                <StatCard {...s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICE OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1450px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE with floating badge */}
            <div className="relative">
              <div className="rounded-[44px] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.10)]">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop"
                  alt="Sponsor Licence"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              {/* floating card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl px-7 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-light font-medium">OISC Regulated</p>
                  <p className="text-base font-bold text-text">Fully Authorised</p>
                </div>
              </div>
              {/* decorative blob */}
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/6 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* CONTENT */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-5">Service Overview</p>
              <h2 className="playfair text-5xl lg:text-[56px] font-black leading-[1.1] text-text line-accent text-primary">
                Helping Businesses<br />Stay Fully<br />UKVI Compliant
              </h2>

              <p className="mt-10 text-[17px] leading-[1.9] text-text-light">
                Sponsor licence renewal is an essential process for UK employers hiring overseas
                skilled workers. Our immigration experts ensure your application is completed
                accurately and submitted on time while helping your business meet compliance requirements.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="group flex gap-4 p-5 rounded-[22px] border border-border hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-text text-[15px]">{item.title}</p>
                        <p className="text-xs text-text-light mt-1 leading-5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESS
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-[#F8FBFF] relative overflow-hidden">
        {/* decorative circle */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border-[60px] border-primary/5 pointer-events-none" />

        <div className="max-w-[1450px] mx-auto px-6 lg:px-16 relative z-10">

          <div className="flex flex-col items-center text-center mb-20">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">Simple Process</p>
            <h2 className="playfair text-5xl font-black text-text leading-tight">
              Four Steps to Success
            </h2>
            <p className="mt-5 text-text-light max-w-xl leading-8">
              We make the renewal process straightforward, transparent, and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="step-card relative bg-white rounded-[34px] p-8 border border-border shadow-[0_4px_24px_rgba(15,23,42,0.05)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)] hover:border-primary/20 transition-all duration-400 overflow-hidden"
                >
                  {/* big number watermark */}
                  <span className="absolute top-4 right-6 text-7xl font-black text-primary/6 leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-7">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* connector line (not on last) */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden xl:block absolute top-[52px] left-full w-6 h-[2px] bg-primary/20 z-20" style={{ transform: "translateX(-8px)" }} />
                    )}

                    <h3 className="text-[19px] font-bold text-text">{step.title}</h3>
                    <p className="mt-4 text-[15px] leading-7 text-text-light">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">FAQ</p>
            <h2 className="playfair text-5xl font-black text-text">
              Frequently Asked<br />Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} />
            ))}
          </div>

          <p className="text-center text-text-light mt-10 text-sm">
            Have more questions?{" "}
            <button className="text-primary font-semibold hover:underline">
              Contact our team →
            </button>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#2563EB] relative overflow-hidden">
        {/* texture */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-bold tracking-widest uppercase text-blue-300 mb-6">Get In Touch</p>
          <h2 className="playfair text-5xl lg:text-[64px] font-black leading-[1.08] text-white">
            Need Help With Your<br />
            <span className="text-blue-300">Sponsor Licence Renewal?</span>
          </h2>

          <p className="mt-8 text-lg leading-[1.9] text-blue-100/80 max-w-[600px] mx-auto">
            Speak with our immigration specialists today and ensure your business
            stays compliant and protected.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <button className="group flex items-center gap-3 px-9 py-4 rounded-2xl bg-white text-primary font-bold shadow-[0_12px_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(255,255,255,0.22)] transition-all duration-300">
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-9 py-4 rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md text-white font-semibold hover:bg-white hover:text-primary transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;