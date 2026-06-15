import React, { useEffect, useState } from "react";

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

const BlogDetail = () => {
  /* ================= RELATED BLOGS ================= */

  const latestBlogs = [
    {
      id: 1,

      title:
        "How UK Sponsor Licence Rules Are Changing in 2026",

      date: "14 May, 2026",

      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 2,

      title:
        "Skilled Worker Visa Salary Threshold Explained",

      date: "11 May, 2026",

      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 3,

      title:
        "Best HR Systems For Sponsor Compliance",

      date: "08 May, 2026",

      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: 4,

      title:
        "Common Sponsor Licence Mistakes Businesses Make",

      date: "04 May, 2026",

      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  } , []);

  if (loading) {
    return <PageLoader />;
  }

  return (
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
        {/* BACKGROUND IMAGE */}

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
            Sponsor Licence
          </div>

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
            How UK Sponsor Licence Rules
            Are Changing in 2026
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

            <div
              className="
                flex
                items-center

                gap-3
              "
            >
              <CalendarDays className="w-5 h-5" />

              <span className="text-lg">
                14 May, 2026
              </span>
            </div>

            {/* READ */}

            <div
              className="
                flex
                items-center

                gap-3
              "
            >
              <Clock3 className="w-5 h-5" />

              <span className="text-lg">
                8 min read
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
              {/* FEATURE IMAGE */}

              <div
                className="
                  overflow-hidden

                  rounded-[36px]

                  shadow-[0_20px_60px_rgba(15,23,42,0.10)]
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1800&auto=format&fit=crop"
                  alt="Blog Cover"
                  className="
                    w-full
                    h-[550px]

                    object-cover
                  "
                />
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
                {/* INTRO */}

                <p
                  className="
                    text-[20px]

                    leading-10

                    text-text-light
                  "
                >
                  The UK Government has
                  introduced several major
                  changes to Sponsor Licence
                  compliance and Skilled
                  Worker visa requirements in
                  2026. These updates affect
                  employers, HR departments,
                  and migrant workers across
                  the United Kingdom.
                </p>

                {/* HEADING */}

                <h2
                  className="
                    mt-14

                    text-4xl

                    font-black

                    leading-tight

                    text-text
                  "
                >
                  Key Changes Employers Need
                  To Understand
                </h2>

                {/* PARAGRAPH */}

                <p
                  className="
                    mt-8

                    text-[19px]

                    leading-10

                    text-text-light
                  "
                >
                  Sponsor Licence holders
                  must now follow stricter HR
                  compliance procedures,
                  maintain digital audit
                  records, and complete
                  enhanced Right To Work
                  checks for overseas
                  employees. Businesses that
                  fail to comply may face
                  licence suspension,
                  revocation, or financial
                  penalties.
                </p>

                {/* LIST */}

                <div className="mt-12 space-y-6">
                  {[
                    "New salary threshold updates for Skilled Worker Visa",
                    "Enhanced compliance audits for UK sponsors",
                    "Updated Right To Work documentation requirements",
                    "Digital HR reporting obligations introduced",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-start

                        gap-4
                      "
                    >
                      <CheckCircle2
                        className="
                          w-6
                          h-6

                          text-primary

                          mt-1
                        "
                      />

                      <p
                        className="
                          text-[18px]

                          leading-8

                          text-text-light
                        "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* SECOND HEADING */}

                <h2
                  className="
                    mt-16

                    text-4xl

                    font-black

                    leading-tight

                    text-text
                  "
                >
                  Why HR Compliance Matters
                  More Than Ever
                </h2>

                {/* PARAGRAPH */}

                <p
                  className="
                    mt-8

                    text-[19px]

                    leading-10

                    text-text-light
                  "
                >
                  Employers are expected to
                  implement stronger HR
                  systems to manage employee
                  records, monitor visa
                  expiry dates, and prepare
                  for Home Office compliance
                  visits. Modern HR systems
                  and sponsor management
                  platforms can help reduce
                  compliance risks and
                  improve operational
                  efficiency.
                </p>

                {/* QUOTE */}

                <div
                  className="
                    mt-16

                    bg-primary/5

                    border-l-[6px]
                    border-primary

                    rounded-[24px]

                    p-8
                  "
                >
                  <p
                    className="
                      text-[24px]

                      italic

                      leading-10

                      text-text
                    "
                  >
                    “Businesses that prepare
                    early for compliance
                    changes will reduce legal
                    risks and protect their
                    Sponsor Licence status.”
                  </p>
                </div>

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
                  {/* TAGS */}

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Sponsor Licence",
                      "HR Compliance",
                      "Visa",
                    ].map((tag, index) => (
                      <div
                        key={index}
                        className="
                          bg-slate-100

                          px-5
                          py-3

                          rounded-full

                          text-sm
                          font-semibold

                          text-text
                        "
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* SHARE */}

                  <button
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
              {/* FOLLOW US */}

              <div
                className="
                  sticky
                  top-24

                  space-y-8
                "
              >
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
                    Follow Us
                  </h3>

                  <p
                    className="
                      mt-4

                      text-text-light

                      leading-8
                    "
                  >
                    Stay connected with
                    immigration updates and
                    expert business insights.
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
                    ].map(
                      (item, index) => (
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

                            hover:bg-primary
                            hover:text-white

                            transition-all
                            duration-300
                          "
                        >
                          <item.icon className="w-5 h-5" />

                          {item.name}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* LATEST NEWS */}

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
                    {latestBlogs.map(
                      (blog) => (
                        <div
                          key={blog.id}
                          className="
                            flex

                            gap-4

                            pb-6

                            border-b border-border
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
                              {blog.date}
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
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* BUTTON */}

                  <button
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;