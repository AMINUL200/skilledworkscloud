import React, { useState, useEffect } from "react";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  FileText,
  Briefcase,
  GraduationCap,
  Languages,
  Home,
  Banknote,
  BookText,
} from "lucide-react";

const ServTestimonialsSection = ({ data }) => {
  console.log("ServTestimonialsSection data:", data);

  // Extract data with fallbacks
  const {
    batch = "TESTIMONIALS",
    title = "Trusted By Businesses",
    highlighted_title = "Worldwide",
    description = "We take pride in building long-term partnerships and delivering solutions that create measurable business impact.",
    testimonials = [],
    cards = [],
    note = "",
    rating = 4.9,
  } = data || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Map icon names to components for document cards
  const iconMap = {
    passport: BookText,
    booktext: BookText,
    bank: Banknote,
    banknote: Banknote,
    briefcase: Briefcase,
    graduation: GraduationCap,
    graduationcap: GraduationCap,
    language: Languages,
    languages: Languages,
    home: Home,
    filetext: FileText,
    file: FileText,
  };

  const getIcon = (iconName) => {
    return iconMap[iconName?.toLowerCase()] || FileText;
  };

  // Determine if we have testimonials or document cards
  const hasTestimonials = testimonials && testimonials.length > 0;
  const hasCards = cards && cards.length > 0;

  // Use testimonials from API or fallback to cards data
  const displayItems = hasTestimonials ? testimonials : cards;

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerView));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(displayItems.length - itemsPerView, prev + itemsPerView));
  };

  // Get visible items
  const visibleItems = displayItems.slice(currentIndex, currentIndex + itemsPerView);

  // If no items, show empty state
  if (displayItems.length === 0) {
    return (
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="text-center py-20">
            <p className="text-text-light">No items available</p>
          </div>
        </div>
      </section>
    );
  }

  // Calculate average rating from testimonials if available
  let averageRating = rating;
  if (hasTestimonials) {
    const sum = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0);
    averageRating = sum / testimonials.length;
  }

  // Render Document Card
  const renderDocumentCard = (item, index) => {
    const Icon = getIcon(item.icon);
    return (
      <div
        key={index}
        className="
          relative
          bg-background
          border
          border-border
          rounded-[32px]
          p-8
          shadow-card
          hover:-translate-y-2
          hover:border-primary/20
          transition-all
          duration-500
        "
      >
        {/* Icon */}
        <div
          className="
            w-16
            h-16
            rounded-2xl
            bg-primary-light
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3
          className="
            text-xl
            font-bold
            text-text
            mb-3
          "
        >
          {item.title}
        </h3>

        {/* Description */}
        {item.description && (
          <p
            className="
              text-text-light
              leading-relaxed
              text-base
            "
          >
            {item.description}
          </p>
        )}
      </div>
    );
  };

  // Render Testimonial Card
  const renderTestimonialCard = (item, index) => {
    const imageUrl = item.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'User')}&background=2563EB&color=fff&size=56`;
    const ratingValue = item.rating || 5;

    return (
      <div
        key={index}
        className="
          relative
          bg-background
          border
          border-border
          rounded-[32px]
          p-8
          shadow-card
          hover:-translate-y-2
          hover:border-primary/20
          transition-all
          duration-500
        "
      >
        {/* Quote */}
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-primary-light
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <Quote className="w-7 h-7 text-white" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, idx) => (
            <Star
              key={idx}
              className={`
                w-5 h-5
                ${idx < ratingValue 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'fill-gray-200 text-gray-200'
                }
              `}
            />
          ))}
        </div>

        {/* Review */}
        <p
          className="
            text-text-light
            leading-relaxed
            text-lg
          "
        >
          "{item.review || item.testimonial || item.description}"
        </p>

        {/* User */}
        <div
          className="
            flex
            items-center
            gap-4
            mt-8
            pt-6
            border-t
            border-border
          "
        >
          <img
            src={imageUrl}
            alt={item.name}
            className="
              w-14
              h-14
              rounded-full
              object-cover
            "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'User')}&background=2563EB&color=fff&size=56`;
            }}
          />

          <div>
            <h4
              className="
                font-bold
                text-text
              "
            >
              {item.name}
            </h4>

            {item.position && (
              <p
                className="
                  text-sm
                  text-text-light
                "
              >
                {item.position}
              </p>
            )}

            {item.company && (
              <p
                className="
                  text-sm
                  text-primary
                  font-medium
                "
              >
                {item.company}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render items based on type
  const renderItem = (item, index) => {
    if (hasTestimonials) {
      return renderTestimonialCard(item, index);
    } else {
      return renderDocumentCard(item, index);
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
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

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            {title}
            {highlighted_title && (
              <span className="block text-primary">
                {highlighted_title}
              </span>
            )}
          </h2>

          {description && (
            <p
              className="
                mt-6
                text-lg
                text-text-light
                leading-relaxed
              "
            >
              {description}
            </p>
          )}

          {note && (
            <div
              className="
                mt-4
                p-4
                bg-amber-50
                border
                border-amber-200
                rounded-xl
                text-amber-700
                text-sm
              "
            >
              <strong>Note:</strong> {note}
            </div>
          )}

          {/* Rating - Only show for testimonials */}
          {hasTestimonials && (
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                mt-8
              "
            >
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`
                    w-6 h-6
                    ${index < Math.round(averageRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'fill-gray-200 text-gray-200'
                    }
                  `}
                />
              ))}

              <span
                className="
                  ml-2
                  font-bold
                  text-text
                  text-lg
                "
              >
                {averageRating.toFixed(1)}/5 Average Rating
              </span>
            </div>
          )}
        </div>

        {/* Items Grid */}
        <div className={`grid ${hasTestimonials ? 'lg:grid-cols-3 md:grid-cols-2' : 'lg:grid-cols-3 md:grid-cols-2'} gap-8 mt-16`}>
          {visibleItems.map((item, index) => renderItem(item, index))}
        </div>

        {/* Navigation Arrows - Only show if more items than visible */}
        {displayItems.length > itemsPerView && (
          <div
            className="
              flex
              justify-center
              gap-4
              mt-12
            "
          >
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`
                w-14
                h-14
                rounded-full
                border
                border-border
                flex
                items-center
                justify-center
                transition-all
                ${currentIndex === 0 
                  ? 'opacity-50 cursor-not-allowed bg-gray-100' 
                  : 'bg-white hover:border-primary hover:shadow-card'
                }
              `}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= displayItems.length - itemsPerView}
              className={`
                w-14
                h-14
                rounded-full
                flex
                items-center
                justify-center
                transition-all
                ${currentIndex >= displayItems.length - itemsPerView
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : 'bg-primary text-white shadow-button hover:scale-105'
                }
              `}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServTestimonialsSection;