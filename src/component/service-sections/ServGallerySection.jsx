import React from "react";
import {
  Camera,
  ArrowUpRight,
} from "lucide-react";

const ServGallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      title: "Team Collaboration",
      category: "Work Culture",
      height: "h-[500px]",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
      title: "Client Meeting",
      category: "Consultation",
      height: "h-[240px]",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      title: "Project Analytics",
      category: "Strategy",
      height: "h-[240px]",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
      title: "Modern Workspace",
      category: "Environment",
      height: "h-[500px]",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200",
      title: "Development Team",
      category: "Engineering",
      height: "h-[240px]",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
      title: "Project Delivery",
      category: "Success",
      height: "h-[240px]",
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-2
              rounded-full
              bg-primary-light
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            <Camera className="w-4 h-4" />
            GALLERY
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Inside Our Work &
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
            Explore our journey, team culture, client
            collaborations, and successful project
            deliveries that drive business growth.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mt-20">
          {/* Column 1 */}
          <div className="space-y-6">
            {galleryItems
              .filter((_, i) => i % 4 === 0)
              .map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            {galleryItems
              .filter((_, i) => i % 4 === 1)
              .map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            {galleryItems
              .filter((_, i) => i % 4 === 2)
              .map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
          </div>

          {/* Column 4 */}
          <div className="space-y-6">
            {galleryItems
              .filter((_, i) => i % 4 === 3)
              .map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
          </div>
        </div>

        {/* Bottom Banner */}
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
            Every Project Has A Story
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
            From planning and design to development and
            deployment, we document the journey of creating
            impactful solutions for our clients.
          </p>

          <button className="btn btn-glass mt-8">
            View More Projects
          </button>
        </div>
      </div>
    </section>
  );
};

const GalleryCard = ({ item }) => {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        shadow-card
        ${item.height}
      `}
    >
      <img
        src={item.image}
        alt={item.title}
        className="
          w-full
          h-full
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          p-6
        "
      >
        <span
          className="
            inline-flex
            px-3
            py-1
            rounded-full
            bg-white/20
            backdrop-blur-lg
            text-white
            text-xs
            font-semibold
          "
        >
          {item.category}
        </span>

        <div
          className="
            flex
            items-center
            justify-between
            mt-4
          "
        >
          <h3
            className="
              text-white
              text-xl
              font-bold
            "
          >
            {item.title}
          </h3>

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-white/20
              backdrop-blur-lg
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition-all
            "
          >
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServGallerySection;