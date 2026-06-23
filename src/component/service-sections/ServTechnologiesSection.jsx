import React from "react";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  CheckCircle2,
} from "lucide-react";

const ServTechnologiesSection = () => {
  const technologyGroups = [
    {
      icon: Monitor,
      title: "Frontend",
      technologies: [
        "React.js",
        "Next.js",
        "Vue.js",
        "Tailwind CSS",
        "TypeScript",
      ],
    },
    {
      icon: Server,
      title: "Backend",
      technologies: [
        "Node.js",
        "Express.js",
        "NestJS",
        "REST API",
        "GraphQL",
      ],
    },
    {
      icon: Database,
      title: "Database",
      technologies: [
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Firebase",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      technologies: [
        "AWS",
        "Docker",
        "GitHub Actions",
        "Vercel",
        "Azure",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px]" />

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
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            TECHNOLOGIES
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
              leading-tight
            "
          >
            Built Using Modern
            <span className="block text-primary">
              Technologies & Tools
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
            We leverage cutting-edge technologies and proven
            development practices to build secure, scalable,
            and high-performance digital solutions.
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mt-16">
          {technologyGroups.map((group, index) => {
            const Icon = group.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-background
                  border
                  border-border
                  rounded-[32px]
                  p-8
                  hover:border-primary/20
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  shadow-card
                "
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div>
                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-text
                      "
                    >
                      {group.title}
                    </h3>

                    <p className="text-text-light">
                      Professional tools & frameworks
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="
                        flex
                        items-center
                        gap-3
                        bg-white
                        rounded-2xl
                        px-4
                        py-4
                        border
                        border-border
                      "
                    >
                      <CheckCircle2
                        className="
                          w-5
                          h-5
                          text-primary
                        "
                      />

                      <span
                        className="
                          font-medium
                          text-text
                        "
                      >
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        
      </div>
    </section>
  );
};

export default ServTechnologiesSection;