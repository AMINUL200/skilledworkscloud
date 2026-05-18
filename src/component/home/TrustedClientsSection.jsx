import React from "react";

const TrustedClientsSection = () => {
const topClients = [
  {
    name: "Premier",
    logo:
      "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Premier_Foods_logo.svg/512px-Premier_Foods_logo.svg.png",
  },

  {
    name: "Climb Online",
    logo:
      "https://climbonline.co.uk/wp-content/themes/climb-online/assets/images/logo.svg",
  },

  {
    name: "Euro Foods",
    logo:
      "https://eurofoods.co.uk/wp-content/uploads/2022/02/euro-foods-logo.png",
  },

  {
    name: "Greener Life",
    logo:
      "https://cdn-icons-png.flaticon.com/512/628/628324.png",
  },

  {
    name: "Leamouth Excel",
    logo:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    name: "Tea For U",
    logo:
      "https://cdn-icons-png.flaticon.com/512/2935/2935415.png",
  },

  {
    name: "Luxury Motors",
    logo:
      "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
  },
];

const supportPartners = [
  {
    name: "British Curry Awards",
    logo:
      "https://britishcurryawards.co.uk/wp-content/uploads/2021/10/BCA-logo.png",
  },

  {
    name: "Currylife Awards",
    logo:
      "https://currylifeawards.com/wp-content/uploads/2020/08/logo.png",
  },

  {
    name: "Asian Curry Awards",
    logo:
      "https://asiancurryawards.com/wp-content/uploads/2021/06/logo.png",
  },

  {
    name: "Catering Circle",
    logo:
      "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
  },

  {
    name: "ARTA",
    logo:
      "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },

  {
    name: "Global Awards",
    logo:
      "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
  },

  {
    name: "Golden Award",
    logo:
      "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
  },
];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#EEF5FD] w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── SECTION 1 HEADER ── */}
        <div className="text-center">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-text-light text-xs sm:text-sm md:text-base font-medium">
            PARTNERS IN PROGRESS
          </p>

          <div className="mt-3 sm:mt-4 w-24 sm:w-32 h-[2px] bg-border mx-auto" />

          <h2 className="mt-5 sm:mt-6 lg:mt-8 text-2xl sm:text-2xl md:text-3xl xl:text-4xl font-black tracking-tight text-text max-w-4xl mx-auto leading-tight">
            Clients that trust our Immigration Consulting Services in the UK
          </h2>
        </div>

        {/* ── SCROLLER 1 — left ── */}
        <div className="mt-4 sm:mt-6 lg:mt-8 relative overflow-hidden">
          {/* fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-r from-[#EEF5FD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-l from-[#EEF5FD] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll-left w-max">
            {[...topClients, ...topClients].map((client, i) => (
              <div
                key={i}
                className="min-w-[160px] sm:min-w-[190px] lg:min-w-[220px] h-[90px] sm:h-[105px] lg:h-[120px] bg-white rounded-2xl lg:rounded-[24px] border border-border flex items-center justify-center p-4 sm:p-5 lg:p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-[50px] sm:max-h-[60px] lg:max-h-[70px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2 HEADER ── */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-text-light text-xs sm:text-sm md:text-base font-medium">
            SUPPORT TO SUCCESS
          </p>

          <div className="mt-3 sm:mt-4 w-24 sm:w-32 h-[2px] bg-border mx-auto" />

          <h2 className="mt-5 sm:mt-6 lg:mt-8 text-2xl sm:text-2xl md:text-3xl xl:text-4xl font-black tracking-tight text-text leading-tight">
            We Proudly Support
          </h2>
        </div>

        {/* ── SCROLLER 2 — right ── */}
        <div className="mt-8 sm:mt-12 lg:mt-16 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-r from-[#EEF5FD] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-l from-[#EEF5FD] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-6 lg:gap-8 animate-scroll-right w-max">
            {[...supportPartners, ...supportPartners].map((partner, i) => (
              <div
                key={i}
                className="min-w-[160px] sm:min-w-[190px] lg:min-w-[220px] h-[90px] sm:h-[105px] lg:h-[120px] bg-white rounded-2xl lg:rounded-[24px] border border-border flex items-center justify-center p-4 sm:p-5 lg:p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-[50px] sm:max-h-[60px] lg:max-h-[70px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left  { animation: scrollLeft  30s linear infinite; }
        .animate-scroll-right { animation: scrollRight 30s linear infinite; }
      `}</style>
    </section>
  );
};

export default TrustedClientsSection;