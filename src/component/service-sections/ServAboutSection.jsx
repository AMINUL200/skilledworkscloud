import React from "react";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
  Rocket,
  Users,
  Lightbulb,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const ServAboutSection = ({ data }) => {
  console.log("ServAboutSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "ABOUT OUR SERVICES",
    title = "We Build Modern Solutions",
    highlighted_title = "For Growing Businesses",
    description = "Our mission is to help businesses accelerate growth through innovative digital solutions, expert consulting, and long-term strategic partnerships. We focus on delivering measurable results while maintaining the highest standards of quality and customer satisfaction.",
    card1_title = "Experienced Team",
    card2_title = "Innovative Solutions",
    card3_title = "Trusted Support",
    card4_title = "Proven Results",
    title2 = "Ready to Transform Your Business?",
    short_desc = "Let our experts help you build scalable, innovative, and future-ready solutions.",
    button_name = "Talk To Our Experts",
    button_url = "/contact-us",
    web_image = null,
    mobile_image = null,
    image_alt = null,
  } = data || {};

  // Get storage URL from env
  const storageUrl = import.meta.env.VITE_STORAGE_BASE_URL || '';

  // Determine which image to use (web_image priority, then fallback)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/storage')) return `${storageUrl}${imagePath}`;
    return `${storageUrl}${imagePath}`;
  };

  const heroImage = getImageUrl(web_image) || 
                   getImageUrl(mobile_image) || 
                   "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200";

  const fallbackImage = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200";

  // Feature cards data with icons
  const features = [
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: card1_title,
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: card2_title,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      title: card3_title,
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
      title: card4_title,
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                bg-white
                border border-border
                shadow-card
                p-3
              "
            >
              <img
                src={heroImage}
                alt={image_alt || data?.title || "About Service"}
                className="
                  w-full
                  h-[550px]
                  object-cover
                  rounded-[24px]
                "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </div>

            {/* Mobile Image Badge - Show if mobile image exists */}
            {mobile_image && (
              <div
                className="
                  absolute
                  -bottom-8
                  right-8
                  bg-white
                  p-4
                  rounded-3xl
                  shadow-card
                  border border-border
                  flex
                  items-center
                  gap-3
                "
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200">
                  <img
                    src={getImageUrl(mobile_image)}
                    alt="Mobile Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    Mobile
                  </h4>
                  <p className="text-xs text-text-light">
                    Optimized View
                  </p>
                </div>
              </div>
            )}

            {/* If no mobile image, show static card */}
            {!mobile_image && (
              <div
                className="
                  absolute
                  -bottom-8
                  right-8
                  bg-white
                  p-6
                  rounded-3xl
                  shadow-card
                  border border-border
                "
              >
                <h4 className="text-3xl font-black text-primary">
                  10+
                </h4>
                <p className="text-text-light font-medium">
                  Years Industry Experience
                </p>
              </div>
            )}
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Small Label */}
            {batch && (
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
                {batch}
              </div>
            )}

            {/* Heading */}
            <h2
              className="
                text-4xl
                lg:text-5xl
                font-black
                text-text
                leading-tight
              "
            >
              {title}
              {highlighted_title && (
                <span className="block text-primary">
                  {highlighted_title}
                </span>
              )}
            </h2>

            {/* Description */}
            {description && (
              <>
                <p
                  className="
                    mt-8
                    text-lg
                    leading-relaxed
                    text-text-light
                  "
                >
                  {description}
                </p>

                {/* Second paragraph - if description is long, it might be split */}
                {description.length > 100 && (
                  <p
                    className="
                      mt-5
                      text-lg
                      leading-relaxed
                      text-text-light
                    "
                  >
                    From startups to enterprise organizations,
                    we provide scalable services tailored to your
                    unique business requirements and future goals.
                  </p>
                )}
              </>
            )}

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex items-center gap-4
                    p-5
                    bg-background
                    rounded-3xl
                    border border-border
                    hover:border-primary/30
                    transition-all duration-300
                  "
                >
                  <div
                    className="
                      w-12 h-12
                      rounded-2xl
                      bg-primary-light
                      text-white
                      flex items-center justify-center
                    "
                  >
                    {item.icon}
                  </div>

                  <h3
                    className="
                      font-semibold
                      text-text
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            {(title2 || short_desc || button_name) && (
              <div
                className="
                  mt-10
                  p-6
                  rounded-3xl
                  bg-gradient-to-r
                  from-primary-light
                  to-primary
                  border border-primary/10
                "
              >
                {title2 && (
                  <h4 className="text-xl font-bold text-white">
                    {title2}
                  </h4>
                )}

                {short_desc && (
                  <p className="mt-2 text-white">
                    {short_desc}
                  </p>
                )}

                {button_name && button_url && (
                  <a
                    href={button_url}
                    className="inline-block btn btn-primary mt-5"
                  >
                    {button_name}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServAboutSection;