import React from "react";
import { Share2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      category: "Compliance",
      title: "Skilled Worker Visa Caseworker Guidance Updated May 2026: What UK Sponsors Need to Know",
      date: "14 May, 2026",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      category: "Compliance",
      title: "Home Office Salary Checks for Sponsor Licences: What Every UK Employer Must Know in 2026",
      date: "12 May, 2026",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      category: "Compliance",
      title: "FLR(HRO) Fee Waiver Pending? Why Switching to a Skilled Worker Visa Could Cost You More",
      date: "06 May, 2026",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      category: "ILR",
      title: "Completed 5 Years on a Skilled Worker Visa for ILR — But Your Partner Joined Later. Here's What You Need to Know",
      date: "18 April, 2026",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-14 sm:py-18 lg:py-24 bg-[#EEF5FD] w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-primary leading-tight">
            Skilled Works Cloud | Visa & Compliance Updates
          </h2>

          <div className="mt-4 w-24 sm:w-32 h-[3px] bg-text mx-auto rounded-full" />

          <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-text-light">
            Stay updated with expert insights on UK immigration, visa compliance, and client success
            stories. Explore news, tips, and legal updates from trusted specialists at Skilled Works Cloud.
          </p>
        </div>

        {/* ── BLOG GRID ── */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {blogs.map((blog, index) => (
            <div
              key={blog.id || index}
              onClick={() => navigate(`/blog/${blog.id}`)} // Navigate to blog detail page
              className="group bg-white rounded-2xl sm:rounded-[24px] lg:rounded-[28px] border border-border overflow-hidden shadow-[0_6px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.10)] transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* IMAGE — aspect-ratio keeps proportions at every width */}
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <span className="self-start bg-primary text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold">
                  {blog.category}
                </span>

                <h3 className="mt-3 text-[15px] sm:text-base lg:text-[17px] font-semibold leading-6 sm:leading-7 text-text line-clamp-3 flex-1">
                  {blog.title}
                </h3>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-text-light">{blog.date}</p>

                  <button className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-text hover:bg-primary hover:text-white transition-all duration-300 shrink-0">
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <div className="mt-10 sm:mt-14 flex justify-center">
          <button 
            className="bg-white border border-border text-primary px-7 sm:px-10 py-3 sm:py-4 rounded-[18px] sm:rounded-[22px] text-sm sm:text-base font-semibold flex items-center gap-2 shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => navigate("/blogs")}
          >
            View All Blogs
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;