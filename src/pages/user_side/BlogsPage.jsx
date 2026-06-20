import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Share2,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../component/common/PageLoader";
import { Helmet } from "react-helmet-async";
import { api } from "../../utils/app";
import { getImageUrl } from "../../utils/getImageUrl";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState({
    hero: null,
    blogs: [],
    latestBlogs: []
  });

  const blogsPerPage = 6;

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        if (response.data.status && response.data.data) {
          setBlogData({
            hero: response.data.data.blog_first_section,
            blogs: response.data.data.blogs || [],
            latestBlogs: response.data.data.latest_blogs || []
          });
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = useMemo(() => {
    const cats = new Set();
    blogData.blogs.forEach(blog => {
      if (blog.category) {
        cats.add(blog.category);
      }
    });
    return ['All', ...Array.from(cats)];
  }, [blogData.blogs]);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogData.blogs.filter((blog) => {
      const matchCategory = category === "All" || blog.category === category;
      const matchSearch = blog.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [search, category, blogData.blogs]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

 

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

  if (loading) {
    return <PageLoader />;
  }

  const { hero } = blogData;
  console.log(blogData)

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{hero?.title_meta || "Blogs & Insights"}</title>
        <meta name="description" content={hero?.desc_meta || "Explore the latest news, sponsor licence updates, HR compliance tips, and visa guidance from our experts."} />
        {hero?.image_alt && <meta name="image" content={getImageUrl(hero?.web_image)} />}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={hero?.title_meta || "Blogs & Insights"} />
        <meta property="og:description" content={hero?.desc_meta || "Explore the latest news, sponsor licence updates, HR compliance tips, and visa guidance from our experts."} />
        {hero?.web_image && <meta property="og:image" content={getImageUrl(hero.web_image)} />}
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={hero?.title_meta || "Blogs & Insights"} />
        <meta name="twitter:description" content={hero?.desc_meta || "Explore the latest news, sponsor licence updates, HR compliance tips, and visa guidance from our experts."} />
        {hero?.web_image && <meta name="twitter:image" content={getImageUrl(hero.web_image)} />}
      </Helmet>

      <div className="bg-[#EEF5FD]">
        {/* ================= HERO SECTION ================= */}
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
          {/* BACKGROUND IMAGE - Responsive image handling */}
          <picture>
            {/* Mobile image */}
            <source
              media="(max-width: 768px)"
              srcSet={getImageUrl(hero?.mobile_image) || getImageUrl(hero?.web_image)}
            />
            {/* Desktop image */}
            <source
              media="(min-width: 769px)"
              srcSet={getImageUrl(hero?.web_image)}
            />
            <img
              src={getImageUrl(hero?.web_image) || "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop"}
              alt={hero?.image_alt || "Blogs Hero"}
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
              "
            />
          </picture>

          {/* OVERLAY */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#0F172A]/90
              via-[#0F172A]/70
              to-[#2563EB]/40
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              max-w-[1200px]
              px-5
              text-center
            "
          >
            <p
              className="
                uppercase
                tracking-[6px]
                text-blue-200
                text-sm
                font-semibold
              "
            >
              {hero?.batch || "BLOGS & INSIGHTS"}
            </p>

            <h1
              className="
                mt-6
                text-5xl
                md:text-6xl
                xl:text-7xl
                font-black
                leading-tight
                text-white
              "
            >
              {hero?.title || "Skilled Works Cloud Updates"}{" "}
              {hero?.highlighted_title && (
                <span className="text-blue-400">
                  {hero.highlighted_title}
                </span>
              )}
            </h1>

            <p
              className="
                mt-8
                text-lg
                md:text-xl
                leading-9
                text-slate-200
                max-w-4xl
                mx-auto
              "
            >
              {hero?.description || "Explore the latest Skilled Works Cloud news, sponsor licence updates, HR compliance tips, and visa guidance from WorkPermitCloud experts."}
            </p>
          </div>
        </section>

        {/* ================= BLOG SECTION ================= */}
        <section className="py-24 lg:py-28">
          <div className="max-w-[1450px] mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-[8fr_4fr] gap-10">
              {/* ================= LEFT SIDE ================= */}
              <div>
                {/* FILTERS */}
                <div
                  className="
                    bg-white
                    rounded-[28px]
                    border border-border
                    p-6
                    shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                    flex
                    flex-col
                    lg:flex-row
                    gap-5
                    justify-between
                  "
                >
                  {/* CATEGORY - Dynamic from API */}
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                      h-14
                      rounded-2xl
                      border border-border
                      bg-slate-50
                      px-5
                      text-text
                      outline-none
                      focus:border-primary
                      min-w-[200px]
                    "
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All Categories' : cat}
                      </option>
                    ))}
                  </select>

                  {/* SEARCH */}
                  <div
                    className="
                      relative
                      w-full
                      lg:max-w-[380px]
                    "
                  >
                    <Search
                      className="
                        absolute
                        left-5
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        text-text-light
                      "
                    />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="
                        w-full
                        h-14
                        rounded-2xl
                        border border-border
                        bg-slate-50
                        pl-14
                        pr-5
                        outline-none
                        focus:border-primary
                      "
                    />
                  </div>
                </div>

                {/* BLOG GRID */}
                {currentBlogs.length > 0 ? (
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
                        className="
                          group
                          bg-white
                          rounded-[28px]
                          overflow-hidden
                          border border-border
                          shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                          hover:-translate-y-2
                          hover:shadow-[0_20px_60px_rgba(15,23,42,0.10)]
                          transition-all
                          duration-500
                          cursor-pointer
                        "
                      >
                        {/* IMAGE */}
                        <div className="relative h-[260px] overflow-hidden">
                          <img
                            src={getImageUrl(blog.web_image) || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop"}
                            alt={blog.image_alt || blog.title}
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-105
                              transition-all
                              duration-700
                            "
                            loading="lazy"
                          />
                          {blog.category && (
                            <div
                              className="
                                absolute
                                top-5
                                left-5
                                bg-primary
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-semibold
                              "
                            >
                              {blog.category}
                            </div>
                          )}
                          {blog.popular === 1 && (
                            <div
                              className="
                                absolute
                                top-5
                                right-5
                                bg-yellow-500
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-semibold
                              "
                            >
                              Popular
                            </div>
                          )}
                        </div>

                        {/* CONTENT */}
                        <div className="p-6">
                          {/* DATE */}
                          <div className="flex items-center gap-3 text-text-light text-sm">
                            <CalendarDays className="w-4 h-4" />
                            {formatDate(blog.date)}
                          </div>

                          {/* TITLE */}
                          <h3 className="mt-5 text-[26px] font-bold leading-9 text-text line-clamp-2">
                            {blog.title}
                          </h3>

                          {/* FOOTER */}
                          <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
                            <button className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                              Read More
                              <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Share functionality
                                if (navigator.share) {
                                  navigator.share({
                                    title: blog.title,
                                    text: blog.title,
                                    url: window.location.origin + `/blog/${blog.id}`
                                  });
                                }
                              }}
                              className="
                                w-11
                                h-11
                                rounded-xl
                                bg-slate-100
                                flex
                                items-center
                                justify-center
                                hover:bg-primary
                                hover:text-white
                                transition-all
                                duration-300
                              "
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 text-center py-12 bg-white rounded-[28px]">
                    <p className="text-text-light text-lg">No blogs found matching your criteria.</p>
                  </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center items-center gap-3">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-white
                        border border-border
                        flex
                        items-center
                        justify-center
                        disabled:opacity-50
                        hover:bg-primary
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`
                          w-12
                          h-12
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300
                          ${
                            currentPage === index + 1
                              ? "bg-primary text-white"
                              : "bg-white border border-border hover:bg-primary hover:text-white"
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-white
                        border border-border
                        flex
                        items-center
                        justify-center
                        disabled:opacity-50
                        hover:bg-primary
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* ================= RIGHT SIDEBAR ================= */}
              <div className="space-y-8">
                {/* LATEST BLOGS */}
                <div
                  className="
                    bg-white
                    rounded-[30px]
                    border border-border
                    p-8
                    shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                  "
                >
                  <h3 className="text-3xl font-black text-text">
                    Check Latest Blogs
                  </h3>

                  <div className="mt-8 space-y-6">
                    {blogData.latestBlogs.slice(0, 5).map((blog) => (
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

                        <div className="flex-1 min-w-0">
                          {blog.category && (
                            <p className="text-sm text-primary font-semibold">
                              {blog.category}
                            </p>
                          )}
                          <h4 className="mt-2 text-[16px] font-semibold leading-7 text-text line-clamp-2 group-hover:text-primary transition-colors">
                            {blog.title}
                          </h4>
                          <p className="mt-3 text-sm text-text-light">
                            {formatDate(blog.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsPage;