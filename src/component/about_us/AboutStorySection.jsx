import React from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/getImageUrl";

const AboutStorySection = ({ data }) => {
  // If no data, return null
  if (!data) {
    return null;
  }


  // Extract stats from API data
  const stats = [
    { number: data.card1_tit || "1000+", label: data.card1_det || "Happy Clients" },
    { number: data.card2_tit || "20+", label: data.card2_det || "Years Experience" },
    { number: data.card3_tit || "95%", label: data.card3_det || "Success Rate" },
  ];

  // Extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(data.youtube_url);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background w-full">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT ── */}
          <div className="w-full min-w-0">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-white text-xs sm:text-sm font-semibold mb-4">
              {data.batch || "Our Story"}
            </div>

            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.15] text-text mb-4 sm:mb-5">
              {data.title || "Life is like a game, choose the right"}
              {data.highlighted_title && (
                <span className="text-primary"> {data.highlighted_title}</span>
              )}
            </h2>

            {/* BODY - Render HTML content safely */}
            <div 
              className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-6 sm:leading-7 text-text-light prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: data.description || '' }}
            />

            {/* BUTTONS */}
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-3 sm:gap-4">
              {data.button1_name && (
                <Link
                  to={data.button1_url || "#"}
                  className="btn btn-primary px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-[0_10px_30px_rgba(37,99,235,0.30)] hover:scale-105 transition-all duration-300"
                >
                  {data.button1_name}
                </Link>
              )}
              {data.button2_name && (
                <Link
                  to={data.button2_url || "#"}
                  className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-primary/20 bg-white text-primary text-sm sm:text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  {data.button2_name}
                </Link>
              )}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="space-y-4 sm:space-y-5 w-full min-w-0">

            {/* VIDEO - Dynamic from API */}
            {videoId && (
              <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden shadow-[0_16px_50px_rgba(15,23,42,0.10)] group">
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="WorkPermitCloud Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            )}

            {/* IMAGE CARD - Dynamic from API */}
            <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden shadow-[0_16px_50px_rgba(15,23,42,0.10)] group">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={getImageUrl(data.mobile_image) || getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                />
                <source
                  media="(min-width: 769px)"
                  srcSet={getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                />
                <img
                  src={getImageUrl(data.web_image) || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"}
                  alt={data.image_alt || "WorkPermitCloud Team"}
                  className="w-full h-[220px] sm:h-[280px] lg:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">Meet Our Team</h3>
                    <p className="mt-1 text-blue-100 text-xs sm:text-sm leading-5">
                      Dedicated immigration & compliance experts helping businesses succeed.
                    </p>
                  </div>
                  {videoId && (
                    <button 
                      className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300"
                      onClick={() => {
                        // Scroll to video or open in modal
                        const videoElement = document.querySelector('.aspect-video iframe');
                        if (videoElement) {
                          videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                    >
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* STATS - Dynamic from API */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
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
};

export default AboutStorySection;