import React, { use, useMemo, useState } from "react";

import {
  CalendarDays,
  Share2,
  Search,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  /* ================= BLOG DATA ================= */

  const blogs = [
    {
      id: 1,
      title: "How UK Sponsor Licence Rules Are Changing in 2026",

      category: "Compliance",

      date: "14 May, 2026",

      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Skilled Worker Visa Salary Threshold Explained",

      category: "Visa",

      date: "11 May, 2026",

      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "HR Compliance Checklist for UK Employers",

      category: "HR",

      date: "08 May, 2026",

      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,
      title: "Common Sponsor Licence Mistakes Businesses Make",

      category: "Sponsor Licence",

      date: "05 May, 2026",

      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 5,
      title: "How To Prepare For A Compliance Visit",

      category: "Compliance",

      date: "03 May, 2026",

      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 6,
      title: "UK Immigration Updates Every Employer Must Know",

      category: "Immigration",

      date: "30 April, 2026",

      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 7,
      title: "Best HR Systems For Sponsor Compliance",

      category: "HR",

      date: "28 April, 2026",

      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 8,
      title: "Self Sponsorship Visa Complete Guide",

      category: "Visa",

      date: "22 April, 2026",

      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  /* ================= FILTER ================= */

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCategory = category === "All" || blog.category === category;

      const matchSearch = blog.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [search, category]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const startIndex = (currentPage - 1) * blogsPerPage;

  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + blogsPerPage,
  );

  return (
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
        {/* BACKGROUND IMAGE */}

        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1800&auto=format&fit=crop"
          alt="Blogs Hero"
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
            BLOGS & INSIGHTS
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
            Skilled Works Cloud Updates & Industry Insights
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
            Explore the latest Skilled Works Cloud news, sponsor licence updates, HR
            compliance tips, and visa guidance from WorkPermitCloud experts.
          </p>
        </div>
      </section>

      {/* ================= BLOG SECTION ================= */}

      <section
        className="
          py-24
          lg:py-28
        "
      >
        <div
          className="
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

              gap-10
            "
          >
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
                {/* CATEGORY */}

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
                  "
                >
                  <option value="All">All Categories</option>

                  <option value="Compliance">Compliance</option>

                  <option value="Visa">Visa</option>

                  <option value="HR">HR</option>

                  <option value="Immigration">Immigration</option>

                  <option value="Sponsor Licence">Sponsor Licence</option>
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

              <div
                className="
                  mt-10

                  grid
                  grid-cols-1
                  md:grid-cols-2

                  gap-8
                "
              >
                {currentBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={()=> navigate(`/blog/${blog.id}`)}
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

                    <div
                      className="
                          relative

                          h-[260px]

                          overflow-hidden
                        "
                    >
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="
                            w-full
                            h-full

                            object-cover

                            group-hover:scale-105

                            transition-all
                            duration-700
                          "
                      />

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
                    </div>

                    {/* CONTENT */}

                    <div className="p-6">
                      {/* DATE */}

                      <div
                        className="
                            flex
                            items-center

                            gap-3

                            text-text-light

                            text-sm
                          "
                      >
                        <CalendarDays className="w-4 h-4" />

                        {blog.date}
                      </div>

                      {/* TITLE */}

                      <h3
                        className="
                            mt-5

                            text-[26px]

                            font-bold

                            leading-9

                            text-text
                          "
                      >
                        {blog.title}
                      </h3>

                      {/* FOOTER */}

                      <div
                        className="
                            mt-8

                            pt-5

                            border-t border-border

                            flex
                            items-center
                            justify-between
                          "
                      >
                        <button
                          className="
                              text-primary

                              font-semibold

                              flex
                              items-center

                              gap-2
                            "
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
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

              {/* PAGINATION */}

              <div
                className="
                  mt-16

                  flex
                  justify-center
                  items-center

                  gap-3
                "
              >
                {/* PREV */}

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

                {/* PAGE NUMBERS */}

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

                {/* NEXT */}

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
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}

            <div className="space-y-8">
              {/* FOLLOW US */}

              <div
                className="
                  bg-white

                  rounded-[30px]

                  border border-border

                  p-8

                  shadow-[0_10px_40px_rgba(15,23,42,0.05)]
                "
              >
                <h3
                  className="
                    text-3xl

                    font-black

                    text-text
                  "
                >
                  Follow Us
                </h3>

                <p
                  className="
                    mt-4

                    text-text-light

                    leading-8
                  "
                >
                  Stay connected with the latest immigration updates and
                  business insights.
                </p>

                {/* ICONS */}

                <div
                  className="
                    mt-8

                    grid
                    grid-cols-2

                    gap-4
                  "
                >
                  {[
                    {
                      icon: Facebook,
                      name: "Facebook",
                    },

                    {
                      icon: Instagram,
                      name: "Instagram",
                    },

                    {
                      icon: Linkedin,
                      name: "LinkedIn",
                    },

                    {
                      icon: Youtube,
                      name: "Youtube",
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="
                        h-16

                        rounded-2xl

                        bg-slate-50

                        border border-border

                        flex
                        items-center
                        justify-center

                        gap-3

                        text-text

                        hover:bg-primary
                        hover:text-white

                        transition-all
                        duration-300
                      "
                    >
                      <item.icon className="w-5 h-5" />

                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

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
                <h3
                  className="
                    text-3xl

                    font-black

                    text-text
                  "
                >
                  Check Latest Blogs
                </h3>

                {/* BLOG LIST */}

                <div className="mt-8 space-y-6">
                  {blogs.slice(0, 5).map((blog) => (
                    <div
                      key={blog.id}
                      className="
                          flex

                          gap-4

                          pb-6

                          border-b border-border
                            cursor-pointer
                        "
                    >
                      {/* IMAGE */}

                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="
                            w-[110px]
                            h-[90px]

                            rounded-2xl

                            object-cover
                          "
                      />

                      {/* CONTENT */}

                      <div>
                        <p
                          className="
                              text-sm

                              text-primary

                              font-semibold
                            "
                        >
                          {blog.category}
                        </p>

                        <h4
                          className="
                              mt-2

                              text-[16px]

                              font-semibold

                              leading-7

                              text-text
                            "
                        >
                          {blog.title}
                        </h4>

                        <p
                          className="
                              mt-3

                              text-sm

                              text-text-light
                            "
                        >
                          {blog.date}
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
  );
};

export default BlogsPage;
