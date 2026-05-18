import React from "react";

import {
  ArrowRight,
  Check,
  Heart,
  Users,
  GraduationCap,
  Leaf,
  Globe,
  Quote,
} from "lucide-react";

const CorporateSocialResponsibilityPage = () => {
  const initiatives = [
    {
      title: "Education Support",
      icon: GraduationCap,
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      description:
        "Providing educational resources and learning opportunities for underprivileged students.",
    },

    {
      title: "Community Welfare",
      icon: Users,
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
      description:
        "Supporting food drives, donations, and local community initiatives.",
    },

    {
      title: "Environmental Action",
      icon: Leaf,
      image:
        "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1200&auto=format&fit=crop",
      description:
        "Promoting sustainability through eco-friendly and green initiatives.",
    },
  ];

  const timeline = [
    {
      year: "2021",
      title: "Education Program Started",
    },

    {
      year: "2022",
      title: "Community Food Drive",
    },

    {
      year: "2023",
      title: "Youth Career Support",
    },

    {
      year: "2024",
      title: "Sustainability Initiative",
    },

    {
      year: "2025",
      title: "Global Community Partnerships",
    },
  ];

  return (
    <div className="bg-background overflow-hidden">
      {/* ================================= */}
      {/* HERO SECTION */}
      {/* ================================= */}

      <section
        className="
          relative

          min-h-[70vh]

          flex
          items-center
        pt-10 md:pt-20
          overflow-hidden
        "
      >
        {/* BACKGROUND IMAGE */}

        <div
          className="
            absolute
            inset-0

            bg-cover
            bg-center
          "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-[#0F172A]/95
            via-[#0F172A]/80
            to-[#2563EB]/60
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative
            z-10

            max-w-[1450px]
            mx-auto

            px-6
            lg:px-10

            w-full
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2

              gap-16

              items-center
            "
          >
            {/* LEFT */}

            <div>
              

              <h1
                className="
                  text-4xl
                  md:text-6xl

                  font-black

                  leading-tight

                  text-white
                "
              >
                Creating Positive
                <span className="block text-blue-400">
                  Impact Beyond Business
                </span>
              </h1>

              <p
                className="
                  mt-8

                  text-lg
                  md:text-xl

                  leading-9

                  text-blue-100

                  max-w-[700px]
                "
              >
                At Skilled Workers Cloud, we believe businesses should
                contribute to society, empower communities, and create
                opportunities for future generations.
              </p>

            </div>

            {/* RIGHT CARD */}

            <div className="flex justify-center lg:justify-end">
              <div
                className="
                  bg-white/10

                  backdrop-blur-xl

                  border
                  border-white/10

                  rounded-[36px]

                  p-10

                  max-w-[420px]

                  shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                "
              >
                <h3
                  className="
                    text-5xl
                    font-black

                    text-white
                  "
                >
                  5000+
                </h3>

                <p
                  className="
                    mt-3

                    text-xl

                    text-blue-100
                  "
                >
                  Lives Positively Impacted
                </p>

                <div className="mt-8 space-y-5">
                  {[
                    "Education Programs",
                    "Community Welfare",
                    "Youth Development",
                    "Environmental Support",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >
                      <div
                        className="
                          w-8
                          h-8

                          rounded-full

                          bg-blue-500/20

                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Check className="w-4 h-4 text-blue-300" />
                      </div>

                      <p className="text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* COMMITMENT SECTION */}
      {/* ================================= */}

      <section className="py-24 lg:py-32 bg-white">
        <div
          className="
            max-w-[1450px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2

              gap-20

              items-center
            "
          >
            {/* LEFT IMAGES */}

            <div className="relative h-[600px]">
              <div
                className="
                  absolute
                  top-0
                  left-0

                  w-[65%]
                  h-[260px]

                  rounded-[30px]

                  overflow-hidden
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop"
                  alt="CSR"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="
                  absolute
                  top-[120px]
                  right-0

                  w-[42%]
                  h-[200px]

                  rounded-[30px]

                  overflow-hidden
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop"
                  alt="CSR"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="
                  absolute
                  bottom-0
                  left-[60px]

                  w-[72%]
                  h-[300px]

                  rounded-[36px]

                  overflow-hidden
                "
              >
                <img
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1200&auto=format&fit=crop"
                  alt="CSR"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT CONTENT */}

            <div>
              <div
                className="
                  inline-flex
                  items-center

                  px-5
                  py-2

                  rounded-full

                  bg-primary-light

                  text-primary
                  text-sm
                  font-semibold

                  mb-6
                "
              >
                Our Commitment
              </div>

              <h2
                className="
                  text-4xl
                  lg:text-5xl

                  font-black

                  leading-tight

                  text-text
                "
              >
                Committed To Building Better Communities
              </h2>

              <p
                className="
                  mt-8

                  text-lg

                  leading-9

                  text-text-light
                "
              >
                We actively support education, youth empowerment, immigration
                awareness, social welfare, and community development
                initiatives.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Education Support",
                  "Community Development",
                  "Social Awareness",
                  "Equal Opportunities",
                  "Environmental Responsibility",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <div
                      className="
                        w-10
                        h-10

                        rounded-full

                        bg-primary/10

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Check className="w-5 h-5 text-primary" />
                    </div>

                    <p
                      className="
                        text-lg
                        font-medium

                        text-text
                      "
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* STATS SECTION */}
      {/* ================================= */}

      <section
        className="
          py-20

          bg-gradient-to-r
          from-[#172554]
          to-[#2563EB]
        "
      >
        <div
          className="
            max-w-[1450px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4

              gap-8
            "
          >
            {[
              {
                number: "5000+",
                label: "Lives Impacted",
              },

              {
                number: "120+",
                label: "Community Events",
              },

              {
                number: "300+",
                label: "Students Supported",
              },

              {
                number: "25+",
                label: "Charity Campaigns",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="
                  text-center

                  bg-white/10

                  border
                  border-white/10

                  backdrop-blur-md

                  rounded-[30px]

                  p-8
                "
              >
                <h3
                  className="
                    text-4xl
                    lg:text-5xl

                    font-black

                    text-white
                  "
                >
                  {item.number}
                </h3>

                <p
                  className="
                    mt-4

                    text-blue-100
                    text-lg
                  "
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* INITIATIVES SECTION */}
      {/* ================================= */}

      <section className="py-24 lg:py-32 bg-[#F8FBFF]">
        <div
          className="
            max-w-[1450px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div className="text-center mb-16">
            <h2
              className="
                text-4xl
                lg:text-5xl

                font-black

                text-text
              "
            >
              Our CSR Initiatives
            </h2>

            <p
              className="
                mt-6

                text-lg

                text-text-light
              "
            >
              Driving meaningful impact through social and community programs.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-8
            "
          >
            {initiatives.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    group

                    bg-white

                    rounded-[34px]

                    overflow-hidden

                    shadow-[0_15px_50px_rgba(15,23,42,0.06)]

                    hover:-translate-y-3

                    transition-all
                    duration-500
                  "
                >
                  <div className="relative h-[260px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="
                        w-full
                        h-full

                        object-cover

                        group-hover:scale-110

                        transition-transform
                        duration-700
                      "
                    />
                  </div>

                  <div className="p-8">
                    <div
                      className="
                        w-16
                        h-16

                        rounded-2xl

                        bg-primary/10

                        flex
                        items-center
                        justify-center

                        text-primary
                      "
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    <h3
                      className="
                        mt-6

                        text-2xl
                        font-bold

                        text-text
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-5

                        text-text-light

                        leading-8
                      "
                    >
                      {item.description}
                    </p>

                    <button
                      className="
                        mt-8

                        flex
                        items-center
                        gap-2

                        text-primary
                        font-semibold
                      "
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* TIMELINE SECTION */}
      {/* ================================= */}

      <section className="py-24 lg:py-32 bg-white">
        <div
          className="
            max-w-[1200px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div className="text-center mb-20">
            <h2
              className="
                text-4xl
                lg:text-5xl

                font-black

                text-text
              "
            >
              Our CSR Journey
            </h2>
          </div>

          <div className="relative">
            <div
              className="
                absolute
                left-1/2
                top-0

                -translate-x-1/2

                w-[2px]
                h-full

                bg-primary/20
              "
            />

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`
                    relative

                    flex

                    ${index % 2 === 0 ? "justify-start" : "justify-end"}
                  `}
                >
                  <div
                    className="
                      absolute
                      left-1/2
                      top-8

                      -translate-x-1/2

                      w-5
                      h-5

                      rounded-full

                      bg-primary
                    "
                  />

                  <div
                    className="
                      w-full
                      md:w-[45%]

                      bg-[#F8FBFF]

                      rounded-[30px]

                      p-8

                      shadow-soft
                    "
                  >
                    <h3
                      className="
                        text-3xl
                        font-black

                        text-primary
                      "
                    >
                      {item.year}
                    </h3>

                    <p
                      className="
                        mt-4

                        text-xl
                        font-semibold

                        text-text
                      "
                    >
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* TESTIMONIAL SECTION */}
      {/* ================================= */}

      <section
        className="
          py-24
          lg:py-32

          bg-gradient-to-r
          from-[#0F172A]
          to-[#172554]
        "
      >
        <div
          className="
            max-w-[1450px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div className="text-center mb-16">
            <h2
              className="
                text-4xl
                lg:text-5xl

                font-black

                text-white
              "
            >
              Community Voices
            </h2>
          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-8
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  bg-white/10

                  border
                  border-white/10

                  backdrop-blur-xl

                  rounded-[34px]

                  p-8
                "
              >
                <Quote className="w-12 h-12 text-blue-300" />

                <p
                  className="
                    mt-6

                    text-lg

                    leading-9

                    text-blue-100
                  "
                >
                  Thanks to Skilled Workers Cloud, many students and families
                  received valuable support and opportunities.
                </p>

                <div className="mt-8">
                  <h4
                    className="
                      text-xl
                      font-bold

                      text-white
                    "
                  >
                    Community Partner
                  </h4>

                  <p className="text-blue-200 mt-1">
                    Social Development Program
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* CTA SECTION */}
      {/* ================================= */}

      <section className="py-24 lg:py-32 bg-[#F8FBFF]">
        <div
          className="
            max-w-[1200px]
            mx-auto

            px-6
            lg:px-10
          "
        >
          <div
            className="
              relative

              overflow-hidden

              rounded-[40px]

              bg-gradient-to-r
              from-[#2563EB]
              to-[#172554]

              px-8
              md:px-16

              py-20

              text-center
            "
          >
            <div
              className="
                absolute
                top-0
                right-0

                w-[300px]
                h-[300px]

                bg-white/10

                rounded-full

                blur-3xl
              "
            />

            <div className="relative z-10">
              <h2
                className="
                  text-4xl
                  lg:text-6xl

                  font-black

                  leading-tight

                  text-white
                "
              >
                Together We Can Build
                <span className="block text-blue-200">A Better Future</span>
              </h2>

              <p
                className="
                  mt-8

                  max-w-[800px]
                  mx-auto

                  text-lg
                  md:text-xl

                  leading-9

                  text-blue-100
                "
              >
                Join us in creating opportunities, empowering communities, and
                making a lasting social impact.
              </p>

              <div
                className="
                  mt-12

                  flex
                  flex-wrap
                  justify-center

                  gap-5
                "
              >
                <button
                  className="
                    px-8
                    py-4

                    rounded-2xl

                    bg-white

                    text-primary
                    font-semibold
                  "
                >
                  Contact Us
                </button>

                <button
                  className="
                    px-8
                    py-4

                    rounded-2xl

                    border
                    border-white/20

                    bg-white/10

                    backdrop-blur-md

                    text-white
                    font-semibold
                  "
                >
                  Become a Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CorporateSocialResponsibilityPage;
