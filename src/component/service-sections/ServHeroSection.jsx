import React from "react";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Briefcase,
} from "lucide-react";

const ServHeroSection = ({ data }) => {
  console.log("ServHeroSection data:", data);
  const storage_url = import.meta.env.VITE_STORAGE_URL;

  // Extract data with fallbacks
  const {
    batch = "Professional Digital Services",
    title = "Transform Your Business With",
    highlighted_title = "Modern Solutions",
    description = "We help businesses grow through cutting-edge web development, mobile applications, UI/UX design, cloud solutions, and digital transformation services.",
    button1_name = "Get Started",
    button1_url = "/contact",
    button2_name = "View Portfolio",
    button2_url = "/portfolio",
    feature = ["Free Consultation", "24/7 Support", "Expert Team", "Fast Delivery"],
    web_image = null,
    mobile_image = null,
    image_alt = "Service Illustration",
    f_card = { title: "Projects Delivered", number: "250+" },
    s_card = { title: "Client Satisfaction", number: "98%" },
    t_card = { title: "Years Experience", number: "12+" },
  } = data || {};

  // Determine which image to use (web_image priority, then fallback)
  const heroImage = web_image 
    ? (web_image.startsWith("http") ? web_image : `${storage_url}${web_image}`)
    : "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200";

  return (
    <section className="relative overflow-hidden bg-background pt-40 pb-24">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px]" />

      {/* Grid Pattern */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            {batch && (
              <div
                className="
                  inline-flex items-center gap-2
                  px-5 py-2 mb-8
                  rounded-full
                  bg-primary-light
                  border border-primary/10
                "
              >
                <Star className="w-4 h-4 text-white fill-primary" />
                <span className="text-white font-semibold text-sm">
                  {batch}
                </span>
              </div>
            )}

            {/* Heading */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                lg:text-7xl
                font-black
                leading-tight
                text-text
              "
            >
              {title}
              {highlighted_title && (
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-primary
                    via-primary-dark
                    to-primary
                    bg-clip-text
                    text-transparent
                  "
                >
                  {highlighted_title}
                </span>
              )}
            </h1>

            {/* Description */}
            {description && (
              <p
                className="
                  mt-8
                  text-lg
                  lg:text-xl
                  text-text-light
                  max-w-2xl
                  leading-relaxed
                "
              >
                {description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              {button1_name && button1_url && (
                <a href={button1_url} className="btn btn-primary btn-icon">
                  {button1_name}
                  <ArrowRight />
                </a>
              )}

              {button2_name && button2_url && (
                <a href={button2_url} className="btn btn-outline">
                  {button2_name}
                </a>
              )}
            </div>

            {/* Trust Items - Features */}
            {feature && feature.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 mt-12">
                {feature.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex items-center gap-3
                      bg-white
                      px-4 py-3
                      rounded-2xl
                      shadow-card
                      border border-border
                    "
                  >
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="font-medium text-text">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="relative flex justify-center">
            {/* Main Image */}
            <div
              className="
                relative
                bg-white
                p-3
                rounded-[32px]
                shadow-card
                border border-border
              "
            >
              <img
                src={heroImage}
                alt={image_alt || "Service"}
                className="
                  rounded-[24px]
                  w-full
                  max-w-[620px]
                  h-[500px]
                  object-cover
                "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200";
                }}
              />
            </div>

            {/* Floating Card 1 - f_card */}
            {f_card && f_card.number && f_card.title && (
              <div
                className="
                  absolute
                  top-10
                  -left-5
                  bg-white
                  rounded-3xl
                  p-5
                  shadow-card
                  border border-border
                "
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-10 h-10 text-primary" />
                  <div>
                    <h4 className="text-2xl font-bold text-text">
                      {f_card.number}
                    </h4>
                    <p className="text-sm text-text-light">
                      {f_card.title}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Card 2 - s_card */}
            {s_card && s_card.number && s_card.title && (
              <div
                className="
                  absolute
                  bottom-24
                  -left-8
                  bg-white
                  rounded-3xl
                  p-5
                  shadow-card
                  border border-border
                "
              >
                <div className="flex items-center gap-3">
                  <Users className="w-10 h-10 text-primary" />
                  <div>
                    <h4 className="text-2xl font-bold text-text">
                      {s_card.number}
                    </h4>
                    <p className="text-sm text-text-light">
                      {s_card.title}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Floating Card 3 - t_card */}
            {t_card && t_card.number && t_card.title && (
              <div
                className="
                  absolute
                  -bottom-6
                  right-10
                  bg-white
                  rounded-3xl
                  p-5
                  shadow-card
                  border border-border
                "
              >
                <div className="text-center">
                  <h4 className="text-3xl font-black text-primary">
                    {t_card.number}
                  </h4>
                  <p className="text-sm text-text-light">
                    {t_card.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServHeroSection;