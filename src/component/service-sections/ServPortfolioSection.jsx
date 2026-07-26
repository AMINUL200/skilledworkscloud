import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  Smartphone,
  LayoutDashboard,
} from "lucide-react";

const ServPortfolioSection = () => {
  const featuredProject = {
    title: "Healthcare Appointment Platform",
    category: "Web Application",
    description:
      "A complete healthcare management platform with appointment booking, patient records, online consultation, and payment integration.",

    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600",

    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
    ],
  };

  const projects = [
    {
      icon: Globe,
      title: "Corporate Website",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000",
      category: "Web Development",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1000",
      category: "App Development",
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000",
      category: "Dashboard",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="
              inline-flex
              items-center
              px-5 py-2
              rounded-full
              bg-primary-light
              text-white
              font-semibold
              text-sm
              mb-6
            "
          >
            PORTFOLIO
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Our Recent
            <span className="block text-primary">
              Success Stories
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-text-light
              leading-relaxed
            "
          >
            Explore some of the projects we've delivered
            for startups, growing businesses, and enterprises.
          </p>
        </div>

        {/* Featured Project */}
        <div
          className="
            mt-20
            bg-background
            border
            border-border
            rounded-[40px]
            overflow-hidden
            shadow-card
          "
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="
                  w-full
                  h-full
                  object-cover
                  min-h-[400px]
                  hover:scale-105
                  transition-all
                  duration-700
                "
              />
            </div>

            {/* Content */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <span
                className="
                  inline-flex
                  w-fit
                  px-4
                  py-2
                  rounded-full
                  bg-primary-light
                  text-primary
                  font-semibold
                  text-sm
                "
              >
                {featuredProject.category}
              </span>

              <h3
                className="
                  mt-6
                  text-3xl
                  lg:text-4xl
                  font-black
                  text-text
                "
              >
                {featuredProject.title}
              </h3>

              <p
                className="
                  mt-6
                  text-text-light
                  leading-relaxed
                  text-lg
                "
              >
                {featuredProject.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-3 mt-8">
                {featuredProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-white
                      border
                      border-border
                      text-text
                      font-medium
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Button */}
              <button className="btn btn-primary mt-10 w-fit">
                View Case Study

                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Projects */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => {
            const Icon = project.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-background
                  rounded-[32px]
                  overflow-hidden
                  border
                  border-border
                  shadow-card
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="
                      w-full
                      h-60
                      object-cover
                      group-hover:scale-110
                      transition-all
                      duration-700
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                      mb-5
                    "
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <span className="text-primary font-semibold text-sm">
                    {project.category}
                  </span>

                  <h3
                    className="
                      mt-2
                      text-2xl
                      font-bold
                      text-text
                    "
                  >
                    {project.title}
                  </h3>

                  <button
                    className="
                      mt-6
                      flex
                      items-center
                      gap-2
                      text-primary
                      font-semibold
                    "
                  >
                    View Project

                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="
            mt-20
            rounded-[36px]
            bg-gradient-to-r
            from-primary
            via-primary-dark
            to-primary
            p-10
            lg:p-14
            text-center
            text-white
            shadow-button
          "
        >
          <h3
            className="
              text-3xl
              lg:text-4xl
              font-black
            "
          >
            Have A Project In Mind?
          </h3>

          <p
            className="
              mt-4
              text-lg
              text-white/80
              max-w-3xl
              mx-auto
            "
          >
            Let's create something exceptional together and
            turn your vision into reality.
          </p>

          <button className="btn btn-glass mt-8">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServPortfolioSection;