import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";
import { Helmet } from "react-helmet-async";
import { getImageUrl } from "../../utils/getImageUrl";
import { api } from "../../utils/app";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);



  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate read time (approx 200 words per minute)
  const calculateReadTime = (content) => {
    if (!content) return '5 min read';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blog/${slug}`);
        
        if (response.data.status && response.data.data) {
          setBlogData(response.data.data.blog);
          setLatestBlogs(response.data.data.latest_blogs || []);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogData?.title || 'Blog Post',
        text: blogData?.title || 'Check out this blog post',
        url: window.location.href,
      });
    }
  };

  // Handle social media click
  const handleSocialClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEF5FD]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text">Blog not found</h2>
          <button 
            onClick={() => navigate('/blogs')}
            className="mt-4 text-primary hover:underline"
          >
            Go back to blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blogData?.desc_meta || blogData?.title || 'Blog Detail'}</title>
        <meta name="description" content={blogData?.desc_meta || blogData?.title || ''} />
        {blogData?.image_alt && <meta name="image" content={getImageUrl(blogData?.web_image)} />}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={blogData?.desc_meta || blogData?.title || 'Blog Detail'} />
        <meta property="og:description" content={blogData?.desc_meta || blogData?.title || ''} />
        {blogData?.web_image && <meta property="og:image" content={getImageUrl(blogData.web_image)} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogData?.desc_meta || blogData?.title || 'Blog Detail'} />
        <meta name="twitter:description" content={blogData?.desc_meta || blogData?.title || ''} />
        {blogData?.web_image && <meta name="twitter:image" content={getImageUrl(blogData.web_image)} />}
      </Helmet>

      <div className="bg-[#EEF5FD]">
        {/* ================= HERO SECTION ================= */}
        <section
          className="
            relative
            h-[55vh]
            min-h-[500px]
            overflow-hidden
            flex
            items-center
          "
        >
          {/* STATIC BACKGROUND IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop"
            alt="Blog Banner"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#0F172A]/95
              via-[#0F172A]/80
              to-[#2563EB]/50
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              max-w-[1450px]
              mx-auto
              px-5
              lg:px-8
            "
          >
            {/* CATEGORY */}
            {blogData.category && (
              <div
                className="
                  inline-flex
                  bg-primary/20
                  backdrop-blur-xl
                  border border-white/10
                  px-5
                  py-3
                  rounded-full
                  text-white
                  text-sm
                  font-semibold
                "
              >
                {blogData.category}
              </div>
            )}

            {/* TITLE */}
            <h1
              className="
                mt-8
                max-w-5xl
                text-5xl
                md:text-6xl
                xl:text-7xl
                font-black
                leading-tight
                text-white
              "
            >
              {blogData.title}
            </h1>

            {/* META */}
            <div
              className="
                mt-10
                flex
                flex-wrap
                items-center
                gap-8
                text-slate-200
              "
            >
              {/* DATE */}
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5" />
                <span className="text-lg">
                  {formatDate(blogData.date)}
                </span>
              </div>

              {/* READ */}
              <div className="flex items-center gap-3">
                <Clock3 className="w-5 h-5" />
                <span className="text-lg">
                  {calculateReadTime(blogData.long_desc)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BLOG CONTENT ================= */}
        <section
          className="
            relative
            py-24
            lg:py-28
          "
        >
          {/* GLOW */}
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[700px]
              h-[700px]
              bg-blue-100/20
              rounded-full
              blur-3xl
            "
          />

          {/* CONTAINER */}
          <div
            className="
              relative
              max-w-[1450px]
              mx-auto
              px-5
              lg:px-8
            "
          >
            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-[8fr_4fr]
                gap-12
              "
            >
              {/* ================= LEFT SIDE ================= */}
              <div>
                {/* FEATURE IMAGE - Responsive with picture element */}
                <div
                  className="
                    overflow-hidden
                    rounded-[36px]
                    shadow-[0_20px_60px_rgba(15,23,42,0.10)]
                  "
                >
                  <picture>
                    {/* Mobile image */}
                    <source
                      media="(max-width: 768px)"
                      srcSet={getImageUrl(blogData.mobile_image) || getImageUrl(blogData.web_image) || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop"}
                    />
                    {/* Desktop image */}
                    <source
                      media="(min-width: 769px)"
                      srcSet={getImageUrl(blogData.web_image) || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop"}
                    />
                    <img
                      src={getImageUrl(blogData.web_image) || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop"}
                      alt={blogData.image_alt || blogData.title}
                      className="
                        w-full
                        h-[550px]
                        object-cover
                      "
                    />
                  </picture>
                </div>

                {/* CONTENT CARD */}
                <div
                  className="
                    mt-10
                    bg-white
                    rounded-[36px]
                    border border-border
                    p-8
                    md:p-12
                    shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                  "
                >
                  {/* Render HTML content safely */}
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: blogData.long_desc || '' }}
                  />

                  {/* SHARE */}
                  <div
                    className="
                      mt-16
                      pt-8
                      border-t border-border
                      flex
                      flex-wrap
                      items-center
                      justify-between
                      gap-6
                    "
                  >
                    {/* SHARE BUTTON */}
                    <button
                      onClick={handleShare}
                      className="
                        btn
                        btn-primary
                        px-7
                        py-4
                        rounded-[18px]
                        text-sm
                        font-semibold
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <Share2 className="w-5 h-5" />
                      Share Article
                    </button>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT SIDEBAR ================= */}
              <div className="space-y-8">
                <div
                  className="
                    sticky
                    top-24
                    space-y-8
                  "
                >
                  {/* FOLLOW US */}
                  <div
                    className="
                      bg-white
                      rounded-[32px]
                      border border-border
                      p-8
                      shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                    "
                  >
                    {/* TITLE */}
                    <h3
                      className="
                        text-3xl
                        font-black
                        text-text
                      "
                    >
                      {blogData.social_title || "Follow Us"}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-text-light
                        leading-8
                      "
                    >
                      {blogData.social_desc || "Stay connected with immigration updates and expert business insights."}
                    </p>

                    {/* SOCIAL ICONS */}
                    <div
                      className="
                        mt-8
                        grid
                        grid-cols-2
                        gap-4
                      "
                    >
                      {blogData.facebook && (
                        <button
                          onClick={() => handleSocialClick(blogData.facebook)}
                          className="
                            h-16
                            rounded-2xl
                            bg-slate-50
                            border border-border
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:bg-[#1877F2]
                            hover:text-white
                            transition-all
                            duration-300
                          "
                        >
                          <Facebook className="w-5 h-5" />
                          Facebook
                        </button>
                      )}
                      
                      {blogData.instagram && (
                        <button
                          onClick={() => handleSocialClick(blogData.instagram)}
                          className="
                            h-16
                            rounded-2xl
                            bg-slate-50
                            border border-border
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]
                            hover:text-white
                            transition-all
                            duration-300
                          "
                        >
                          <Instagram className="w-5 h-5" />
                          Instagram
                        </button>
                      )}
                      
                      {blogData.linkedin && (
                        <button
                          onClick={() => handleSocialClick(blogData.linkedin)}
                          className="
                            h-16
                            rounded-2xl
                            bg-slate-50
                            border border-border
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:bg-[#0A66C2]
                            hover:text-white
                            transition-all
                            duration-300
                          "
                        >
                          <Linkedin className="w-5 h-5" />
                          LinkedIn
                        </button>
                      )}
                      
                      {blogData.twitter && (
                        <button
                          onClick={() => handleSocialClick(blogData.twitter)}
                          className="
                            h-16
                            rounded-2xl
                            bg-slate-50
                            border border-border
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:bg-[#000000]
                            hover:text-white
                            transition-all
                            duration-300
                          "
                        >
                          <Youtube className="w-5 h-5" />
                          YouTube
                        </button>
                      )}
                    </div>
                  </div>

                  {/* LATEST NEWS */}
                  {latestBlogs.length > 0 && (
                    <div
                      className="
                        bg-white
                        rounded-[32px]
                        border border-border
                        p-8
                        shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                      "
                    >
                      {/* TITLE */}
                      <h3
                        className="
                          text-3xl
                          font-black
                          text-text
                        "
                      >
                        Check Latest News
                      </h3>

                      {/* NEWS LIST */}
                      <div className="mt-8 space-y-6">
                        {latestBlogs.slice(0, 4).map((blog) => (
                          <div
                            key={blog.id}
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            className="
                              flex
                              gap-4
                              pb-6
                              border-b border-border
                              cursor-pointer
                              hover:opacity-80
                              transition-opacity
                              group
                            "
                          >
                            {/* IMAGE */}
                            <img
                              src={getImageUrl(blog.web_image) || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"}
                              alt={blog.image_alt || blog.title}
                              className="
                                w-[110px]
                                h-[90px]
                                rounded-2xl
                                object-cover
                                flex-shrink-0
                              "
                              loading="lazy"
                            />

                            {/* CONTENT */}
                            <div className="flex-1 min-w-0">
                              <p
                                className="
                                  text-sm
                                  text-primary
                                  font-semibold
                                "
                              >
                                {formatDate(blog.date)}
                              </p>
                              <h4
                                className="
                                  mt-2
                                  text-[16px]
                                  font-semibold
                                  leading-7
                                  text-text
                                  line-clamp-2
                                  group-hover:text-primary
                                  transition-colors
                                "
                              >
                                {blog.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* BUTTON */}
                      <button
                        onClick={() => navigate('/blogs')}
                        className="
                          mt-8
                          w-full
                          btn
                          btn-primary
                          py-5
                          rounded-[20px]
                          text-base
                          font-semibold
                          flex
                          items-center
                          justify-center
                          gap-3
                        "
                      >
                        View All Blogs
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetail;