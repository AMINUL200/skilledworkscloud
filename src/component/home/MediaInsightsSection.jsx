import React, { useState } from "react";
import { Play, Share2, Facebook, Instagram, Linkedin, Youtube, TrendingUp, Eye, Calendar, ChevronRight, Heart, MessageCircle } from "lucide-react";

const MediaInsightsSection = () => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("videos");

  const videos = [
    {
      title: "Impact on Business When Work Permit Licence is Suspended or Revoked",
      category: "Right-to-work",
      date: "29 April 2024",
      duration: "02:48",
      views: "2.5K views",
      image: "https://images.unsplash.com/photo-1573497491765-55d7f8e0e3b8?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "How to Prepare for a Self-Sponsorship Licence: Timeline & Tips",
      category: "Self-sponsorship",
      date: "5 April 2024",
      duration: "02:46",
      views: "1.8K views",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Sponsor Licence Suspended? Here's What to Do!",
      category: "Self-sponsorship",
      date: "19 March 2024",
      duration: "02:44",
      views: "3.2K views",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "BRP Card Update 2024: Can You Travel After Expiry?",
      category: "Licence",
      date: "2 February 2024",
      duration: "02:49",
      views: "4.1K views",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const socialStats = [
    { icon: <Facebook className="w-6 h-6" />, value: "200K+", label: "Facebook Followers", trend: "+12%" },
    { icon: <Youtube className="w-6 h-6" />, value: "140K+", label: "YouTube Subscribers", trend: "+8%" },
    { icon: <Instagram className="w-6 h-6" />, value: "38K", label: "Instagram Followers", trend: "+15%" },
    { icon: <Linkedin className="w-6 h-6" />, value: "600K+", label: "LinkedIn Reach", trend: "+23%" },
  ];

  const recentPosts = [
    { title: "New sponsor guidance published", time: "2 hours ago", likes: 234 },
    { title: "Visa fee changes announced", time: "Yesterday", likes: 567 },
    { title: "Compliance webinar recording", time: "2 days ago", likes: 890 },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#EEF5FD]">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm mb-4">
            <TrendingUp size={14} style={{ color: "var(--color-primary)" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
              Latest Insights
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4" style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            Immigration Updates & Insights
          </h2>
          
          <p className="text-base sm:text-lg" style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Watch our experts break down key immigration updates, compliance rules, and visa strategies
            for individuals and sponsors in the UK.
          </p>
        </div>

        {/* Main content area - Videos on LEFT, Social Info on RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE - Video Grid */}
          <div className="lg:col-span-8">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b pb-3" style={{ borderColor: "#E2E8F0" }}>
              {["Latest Videos", "Popular", "Webinars"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: activeTab === tab.toLowerCase().replace(" ", "") ? "var(--color-primary)" : "transparent",
                    color: activeTab === tab.toLowerCase().replace(" ", "") ? "white" : "var(--color-text-secondary)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden transition-all duration-400 hover:shadow-xl"
                  onMouseEnter={() => setHoveredVideo(index)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-xs font-semibold bg-black/70 text-white">
                      {video.duration}
                    </div>
                    
                    {/* Play button */}
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                      <Play className="w-6 h-6 ml-0.5" style={{ color: "var(--color-primary)", fill: "var(--color-primary)" }} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category and views */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-xs font-semibold px-2 py-1 rounded"
                        style={{ background: "#FEE2E2", color: "#DC2626" }}
                      >
                        {video.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Eye size={12} style={{ color: "var(--color-text-secondary)" }} />
                        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{video.views}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-semibold mb-3 line-clamp-2"
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--color-text-primary)",
                        lineHeight: 1.4,
                      }}
                    >
                      {video.title}
                    </h3>

                    {/* Date and actions */}
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#E2E8F0" }}>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} style={{ color: "var(--color-text-secondary)" }} />
                        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{video.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:gap-2" style={{ color: "var(--color-primary)" }}>
                          <Share2 size={12} />
                          Share
                        </button>
                        <button className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300" style={{ color: "var(--color-text-secondary)" }}>
                          <Heart size={12} />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-8">
              <button className="group flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:gap-3" style={{ color: "var(--color-primary)" }}>
                <span>Browse All Videos</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Social Stats & Engagement */}
          <div className="lg:col-span-4 space-y-6">
            {/* Social Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {socialStats.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg" style={{ background: "#EFF6FF" }}>
                      <div style={{ color: "var(--color-primary)" }}>{item.icon}</div>
                    </div>
                    <span className="text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: "#DCFCE7", color: "#16A34A" }}>
                      {item.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-black mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                    {item.value}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={16} style={{ color: "var(--color-primary)" }} />
                <h3 className="font-bold text-sm" style={{ color: "var(--color-text-primary)" }}>
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-3">
                {recentPosts.map((post, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-1 h-8 rounded-full" style={{ background: "var(--color-primary)" }} />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                        {post.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{post.time}</span>
                        <div className="flex items-center gap-1">
                          <Heart size={10} style={{ color: "var(--color-primary)" }} />
                          <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-[#1E63E9] to-[#2976FF] rounded-xl p-5 text-center">
              <h3 className="text-white font-bold mb-2">Get Weekly Updates</h3>
              <p className="text-blue-100 text-xs mb-4">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg text-sm bg-white/20 text-white placeholder:text-blue-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="px-3 py-2 bg-white rounded-lg text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
                  Subscribe
                </button>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="bg-white rounded-xl p-5 text-center">
              <h3 className="font-bold mb-3" style={{ color: "var(--color-text-primary)" }}>Follow Us</h3>
              <div className="flex items-center justify-center gap-3">
                {[Facebook, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ background: "#EFF6FF", color: "var(--color-primary)" }}
                  >
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaInsightsSection;