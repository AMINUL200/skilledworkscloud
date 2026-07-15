import React from "react";
import { Phone, MapPin, ArrowRight, Mail, Clock } from "lucide-react";

const OfficeLocationsSection = () => {
  // Updated to single office as per your requirements
  const offices = [
    {
      title: "Our Office",
      address: "Suite 602, 6th Floor, 252-262 Romford Road, London, E7 9HZ United Kingdom",
      phone: "+44 0208 129 1655",
      mobileWhatsApp: "+44 074 6728 4718",
      email: "info@skilledworkerscloud.com",
      supportEmail: "support@skilledworkerscloud.co.uk",
    },
  ];

  const inputClass = `
    mt-2 w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl
    border border-border bg-muted px-4 sm:px-5
    text-sm sm:text-base text-text outline-none
    focus:border-primary focus:bg-surface transition-all duration-300
  `;

  const labelClass = "text-xs sm:text-sm font-semibold text-text";

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-muted w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] 2xl:grid-cols-[1fr_500px] gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* ── LEFT SIDE ── */}
          <div className="w-full min-w-0">

            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-text leading-tight">
              Get in Touch With Us
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-text-light max-w-2xl">
              Reach out to our skilled workers Cloud team for any queries or support.
            </p>

            {/* CONTACT INFO CARD */}
            <div className="mt-6 sm:mt-8 bg-surface rounded-2xl sm:rounded-[24px] border border-border p-5 sm:p-6 shadow-card">
              
              {/* Office Address */}
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-text">Our Office</h3>
                  <p className="text-sm sm:text-[15px] leading-6 text-text-light">
                    Suite 602, 6th Floor, 252-262 Romford Road, London, E7 9HZ United Kingdom
                  </p>
                </div>
              </div>

              {/* Emails */}
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-text">Email Us</p>
                    <p className="text-sm text-primary hover:underline">
                      <a href="mailto:info@skilledworkerscloud.com">info@skilledworkerscloud.com</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pl-8">
                  <div className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text">After Sales / Technical Support</p>
                    <p className="text-sm text-primary hover:underline">
                      <a href="mailto:support@skilledworkerscloud.co.uk">support@skilledworkerscloud.co.uk</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="mt-4 flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-text">Call Us</p>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-sm text-text">Landline: <span className="font-medium">+44 0208 129 1655</span></p>
                    <p className="text-sm text-text">Mobile & WhatsApp: <span className="font-medium">+44 074 6728 4718</span></p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="mt-5 pt-3 flex items-center gap-2 text-xs text-text-light border-t border-border">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Mon - Fri : 9am - 6pm</span>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a 
                href="tel:+4402081291655" 
                className="btn btn-primary px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-[16px] sm:rounded-[20px] text-sm sm:text-base font-semibold flex items-center gap-2"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Now
              </a>
              <button className="btn btn-outline px-5 sm:px-7 py-2.5 sm:py-3.5 text-sm sm:text-base font-semibold">
                Book Appointment
              </button>
            </div>

          </div>

          {/* ── RIGHT SIDE — FORM ── */}
          <div className="w-full min-w-0 xl:sticky xl:top-24 bg-surface rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border border-border p-5 sm:p-6 lg:p-8 shadow-card">

            {/* LOGO */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center text-primary font-black text-sm shadow-sm">
              SWC
            </div>

            {/* TITLE */}
            <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-text">
              Request a Callback with Our Skilled Works Cloud Experts
            </h3>

            {/* FORM */}
            <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

              <div>
                <label className={labelClass}>Full name *</label>
                <input type="text" placeholder="Enter your name" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input type="email" placeholder="Enter your email" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Mobile Number</label>
                <input type="text" placeholder="Enter mobile number" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>What Service are you looking for?</label>
                <select className={inputClass}>
                  <option>Select Service</option>
                  <option>Sponsor Licence</option>
                  <option>Skilled Worker Visa</option>
                  <option>HR Compliance</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Your message</label>
                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  className="mt-2 w-full rounded-xl sm:rounded-2xl border border-border bg-muted p-4 text-sm sm:text-base text-text outline-none resize-none focus:border-primary focus:bg-surface transition-all duration-300"
                />
              </div>

              <div>
                <label className={labelClass}>Which Category do you fall under?</label>
                <select className={inputClass}>
                  <option>Select Category</option>
                  <option>Employer</option>
                  <option>Employee</option>
                  <option>Business Owner</option>
                </select>
              </div>

              {/* CAPTCHA */}
              <div className="h-16 sm:h-20 rounded-xl sm:rounded-2xl border border-border bg-muted flex items-center justify-center text-text-light text-sm">
                reCAPTCHA Placeholder
              </div>

              <button className="btn btn-primary w-full py-3.5 sm:py-4 rounded-[18px] sm:rounded-[22px] text-sm sm:text-base font-semibold">
                Submit Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OfficeLocationsSection;