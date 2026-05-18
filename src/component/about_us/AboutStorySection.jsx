import React from "react";
import { Play } from "lucide-react";

const stats = [
  { number: "1000+", label: "Happy Clients" },
  { number: "20+", label: "Years Experience" },
  { number: "95%", label: "Success Rate" },
  { number: "24/7", label: "Support" },
];

const AboutStorySection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-background w-full">
    <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

        {/* ── LEFT ── */}
        <div className="w-full min-w-0">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary text-xs sm:text-sm font-semibold mb-4">
            Our Story
          </div>

          {/* HEADING */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.15] text-text mb-4 sm:mb-5">
            Life is like a game, choose the right
            <span className="text-primary"> team to win!</span>
          </h2>

          {/* BODY */}
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-6 sm:leading-7 text-text-light">
            <p>
              WorkPermitCloud - British Business Immigration Champion in bringing skilled workers
              into the UK. We're honored to have Shakib Al Hasan - No.1 all rounder cricket player
              as the Brand Ambassador of WorkPermitCloud.
            </p>
            <p>
              Initially, our software acts as a supporting tool to maximise the probability of
              success to secure a sponsorship licence. An employer can manage all the jobs related
              to HR recruitment functions i.e. job advertisement placement, job applications,
              candidates shortlists, conduct interviews, hire candidates, job offers, contracts,
              policies and guidances.
            </p>
            <p>
              Installation, configuration, hardware upgrades as well as software and mobile
              application updates are supplied for a nominal subscription.
            </p>
            <p>
              In addition to the sponsorship application and recruitment function, employers can
              manage their employee database, monitor and create all kinds of reports related to
              settled or non-settled workers.
            </p>
            <p>
              All these functionalities can be accessed by end-users through a web browser or
              mobile phone. Our specialist team supports employers to harness full benefits of
              the specialised software and its functionalities.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 sm:mt-7 flex flex-wrap gap-3 sm:gap-4">
            <button className="btn btn-primary px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.30)] hover:scale-105 transition-all duration-300">
              Learn More
            </button>
            <button className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-primary/20 bg-white text-primary text-sm sm:text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="space-y-4 sm:space-y-5 w-full min-w-0">

          {/* VIDEO */}
          <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden shadow-[0_16px_50px_rgba(15,23,42,0.10)] group">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Tn6-PIqc4UM"
                title="WorkPermitCloud Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          {/* IMAGE CARD */}
          <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden shadow-[0_16px_50px_rgba(15,23,42,0.10)] group">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              alt="WorkPermitCloud Team"
              className="w-full h-[220px] sm:h-[280px] lg:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Meet Our Team</h3>
                  <p className="mt-1 text-blue-100 text-xs sm:text-sm leading-5">
                    Dedicated immigration & compliance experts helping businesses succeed.
                  </p>
                </div>
                <button className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center border border-border shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
              >
                <h3 className="text-xl sm:text-2xl font-black text-primary">{item.number}</h3>
                <p className="mt-1 text-[11px] sm:text-xs font-medium text-text-light">{item.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default AboutStorySection;