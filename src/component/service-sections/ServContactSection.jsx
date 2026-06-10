import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const ServContactSection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />

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
            CONTACT US
          </div>

          <h2
            className="
              text-4xl
              lg:text-5xl
              font-black
              text-text
            "
          >
            Let's Build Something
            <span className="block text-primary">
              Amazing Together
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
            Have a project in mind? Our experts are ready to
            discuss your requirements and help you find the
            perfect solution.
          </p>
        </div>

        {/* Main Section */}
        <div className="grid lg:grid-cols-5 gap-10 mt-20">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div
              className="
                bg-white
                border
                border-border
                rounded-[36px]
                p-8
                shadow-card
                h-full
              "
            >
              <h3
                className="
                  text-3xl
                  font-black
                  text-text
                "
              >
                Contact Information
              </h3>

              <p
                className="
                  mt-4
                  text-text-light
                  leading-relaxed
                "
              >
                Reach out to us through any of the channels
                below. We're always ready to help.
              </p>

              {/* Contact Items */}
              <div className="space-y-6 mt-10">
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Phone className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-bold text-text">
                      Phone
                    </h4>

                    <p className="text-text-light mt-1">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Mail className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-bold text-text">
                      Email
                    </h4>

                    <p className="text-text-light mt-1">
                      hello@yourcompany.com
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-bold text-text">
                      Address
                    </h4>

                    <p className="text-text-light mt-1">
                      London, United Kingdom
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-primary-light
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Clock className="w-6 h-6 text-primary" />
                  </div>

                  <div>
                    <h4 className="font-bold text-text">
                      Working Hours
                    </h4>

                    <p className="text-text-light mt-1">
                      Mon - Fri : 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card */}
              <div
                className="
                  mt-10
                  p-6
                  rounded-3xl
                  bg-primary-light
                "
              >
                <h4
                  className="
                    text-xl
                    font-bold
                    text-text
                  "
                >
                  Free Consultation
                </h4>

                <p
                  className="
                    mt-2
                    text-text-light
                  "
                >
                  Schedule a free consultation and get
                  expert guidance for your project.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div
              className="
                bg-white
                border
                border-border
                rounded-[36px]
                p-8
                shadow-card
              "
            >
              <h3
                className="
                  text-3xl
                  font-black
                  text-text
                "
              >
                Send Us A Message
              </h3>

              <p
                className="
                  mt-3
                  text-text-light
                "
              >
                Fill out the form and our team will contact
                you shortly.
              </p>

              <form className="mt-10">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 font-medium text-text">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="John Doe"
                      className="
                        w-full
                        h-14
                        px-5
                        rounded-2xl
                        border
                        border-border
                        outline-none
                        focus:border-primary
                        transition-all
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-text">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="
                        w-full
                        h-14
                        px-5
                        rounded-2xl
                        border
                        border-border
                        outline-none
                        focus:border-primary
                        transition-all
                      "
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className="block mb-2 font-medium text-text">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      placeholder="+1 234 567 890"
                      className="
                        w-full
                        h-14
                        px-5
                        rounded-2xl
                        border
                        border-border
                        outline-none
                        focus:border-primary
                      "
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-text">
                      Service
                    </label>

                    <select
                      className="
                        w-full
                        h-14
                        px-5
                        rounded-2xl
                        border
                        border-border
                        outline-none
                        focus:border-primary
                      "
                    >
                      <option>Select Service</option>
                      <option>Web Development</option>
                      <option>App Development</option>
                      <option>UI/UX Design</option>
                      <option>Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block mb-2 font-medium text-text">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Tell us about your project..."
                    className="
                      w-full
                      p-5
                      rounded-2xl
                      border
                      border-border
                      outline-none
                      resize-none
                      focus:border-primary
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    btn
                    btn-primary
                    mt-8
                  "
                >
                  Send Message

                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              value: "< 24h",
              label: "Response Time",
            },
            {
              value: "250+",
              label: "Projects Delivered",
            },
            {
              value: "98%",
              label: "Client Satisfaction",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                border
                border-border
                rounded-[28px]
                p-6
                text-center
                shadow-card
              "
            >
              <h3
                className="
                  text-4xl
                  font-black
                  text-primary
                "
              >
                {item.value}
              </h3>

              <p
                className="
                  mt-2
                  text-text-light
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServContactSection;