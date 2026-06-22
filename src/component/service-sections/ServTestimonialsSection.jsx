import React from "react";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const ServTestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Operations Director",
      company: "HealthCare Plus",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "The team exceeded our expectations. Their professionalism, communication, and technical expertise helped us launch a platform that significantly improved our operations.",
      rating: 5,
    },
    {
      name: "Michael Brown",
      position: "CEO",
      company: "GrowthTech",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "From planning to deployment, every stage was handled perfectly. The final product was fast, scalable, and beautifully designed.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      position: "Founder",
      company: "Bright Solutions",
      image:
        "https://randomuser.me/api/portraits/women/65.jpg",
      review:
        "Their ability to understand our requirements and deliver a custom solution was outstanding. We highly recommend them.",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
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
              text-primary
              font-semibold
              text-sm
              mb-6
            "
          >
            TESTIMONIALS
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Trusted By Businesses
            <span className="block text-primary">
              Worldwide
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
            We take pride in building long-term partnerships
            and delivering solutions that create measurable
            business impact.
          </p>

          {/* Rating */}
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
                className="
                  w-6
                  h-6
                  fill-yellow-400
                  text-yellow-400
                "
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
              4.9/5 Average Rating
            </span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((item, index) => (
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
                <Quote className="w-7 h-7 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(item.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="
                      w-5
                      h-5
                      fill-yellow-400
                      text-yellow-400
                    "
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
                "{item.review}"
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
                  src={item.image}
                  alt={item.name}
                  className="
                    w-14
                    h-14
                    rounded-full
                    object-cover
                  "
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

                  <p
                    className="
                      text-sm
                      text-text-light
                    "
                  >
                    {item.position}
                  </p>

                  <p
                    className="
                      text-sm
                      text-primary
                      font-medium
                    "
                  >
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        {/* <div className="grid md:grid-cols-4 gap-8 mt-20">
          {[
            {
              value: "150+",
              label: "Happy Clients",
            },
            {
              value: "250+",
              label: "Projects Delivered",
            },
            {
              value: "98%",
              label: "Client Satisfaction",
            },
            {
              value: "12+",
              label: "Years Experience",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="
                text-center
                bg-background
                border
                border-border
                rounded-[28px]
                p-8
                shadow-card
              "
            >
              <h3
                className="
                  text-5xl
                  font-black
                  text-primary
                "
              >
                {stat.value}
              </h3>

              <p
                className="
                  mt-3
                  text-text-light
                "
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div> */}

        {/* Navigation Arrows */}
        <div
          className="
            flex
            justify-center
            gap-4
            mt-12
          "
        >
          <button
            className="
              w-14
              h-14
              rounded-full
              bg-white
              border
              border-border
              flex
              items-center
              justify-center
              hover:border-primary
              transition-all
            "
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            className="
              w-14
              h-14
              rounded-full
              bg-primary
              text-white
              flex
              items-center
              justify-center
              shadow-button
            "
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

       
      </div>
    </section>
  );
};

export default ServTestimonialsSection;