import React from "react";
import {
  Construction,
  Calendar,
  Clock,
  Mail,
  Bell,
  ArrowRight,
  Rocket,
  Coffee,
  AlertCircle,
} from "lucide-react";

const ServCommingSoon = ({ sectionName }) => {
  // Format section name for display
  const formatSectionName = (name) => {
    if (!name) return "Section";
    
    // Handle different naming conventions
    const formatted = name
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/([A-Z])/g, " $1")
      .trim();
    
    // Capitalize first letter of each word
    return formatted
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const displayName = formatSectionName(sectionName);

  return (
    <section className="relative py-32 bg-gradient-to-b from-background to-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      {/* Grid Pattern */}
      <div
        className="
          absolute inset-0 opacity-[0.03]
          [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(to_right,#000_1px,transparent_1px)]
          [background-size:60px_60px]
        "
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div
            className="
              relative
              inline-flex
              items-center
              justify-center
              w-24
              h-24
              rounded-full
              bg-primary-light
              shadow-button
              mb-8
            "
          >
            <Construction className="w-12 h-12 text-white" />
          </div>

          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-5 py-2
              rounded-full
              bg-primary-light/10
              border border-primary/10
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            <Coffee className="w-4 h-4" />
            We're Cooking Something Amazing
          </div>

          {/* Heading */}
          <h1
            className="
              text-5xl
              lg:text-7xl
              font-black
              text-text
              leading-tight
            "
          >
            {sectionName ? (
              <>
                <span className="block text-primary">
                  {displayName}
                </span>
                <span className="block text-2xl lg:text-3xl font-semibold text-text-light mt-2">
                  Coming Soon
                </span>
              </>
            ) : (
              <>
                Coming
                <span className="block text-primary">
                  Soon
                </span>
              </>
            )}
          </h1>

          {/* Section-specific message */}
          {sectionName && (
            <div
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                bg-amber-50
                border
                border-amber-200
                rounded-full
                text-amber-700
                text-sm
                font-medium
              "
            >
              <AlertCircle className="w-4 h-4" />
              {displayName} section is currently under development
            </div>
          )}

          {/* Description */}
          <p
            className="
              mt-6
              text-xl
              text-text-light
              leading-relaxed
              max-w-2xl
              mx-auto
            "
          >
            {sectionName 
              ? `We're working hard to bring you an exceptional ${displayName} experience. Stay tuned for updates and be the first to know when this section launches.`
              : "We're working hard to bring you something extraordinary. Stay tuned for updates and be the first to know when we launch."
            }
          </p>

          {/* Timer/Status */}
          <div
            className="
              mt-10
              flex
              items-center
              justify-center
              gap-8
              flex-wrap
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-primary-light/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-text-light">Status</p>
                <p className="font-bold text-text">In Development</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-primary-light/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-text-light">Expected Launch</p>
                <p className="font-bold text-text">Coming Soon</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-primary-light/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-text-light">Progress</p>
                <p className="font-bold text-text">75% Complete</p>
              </div>
            </div>
          </div>

         

          
        </div>
      </div>
    </section>
  );
};

export default ServCommingSoon;