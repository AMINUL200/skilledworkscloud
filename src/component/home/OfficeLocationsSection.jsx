import React from "react";
import { Phone, MapPin, ArrowRight } from "lucide-react";

const OfficeLocationsSection = () => {
  const offices = [
    {
      title: "Corporate Office",
      address: "The Gherkin Level 28, 30 St. Mary Axe, London, EC3A 8BF",
      phone: "+44020 8087 2343",
    },
    {
      title: "Branch Office",
      address: "1st & 2nd Floor, 112-116 Whitechapel Road, London, E1 1JE",
      phone: "+44020 8087 2343",
    },
    {
      title: "WPC Lawyers (Birmingham)",
      address: "1st floor, 531 Coventry Rd, Birmingham, B10 0LL",
      phone: "+44 020 3633 0909",
    },
    {
      title: "WPC Global (Dubai)",
      address: "2nd Floor, Goldcrest Executive, Office 207, Cluster C, Jumeirah Lake Towers, Dubai",
      phone: "+971 4 554 7344",
    },
  ];

  const inputClass = `
    mt-2 w-full h-12 sm:h-14 rounded-xl sm:rounded-2xl
    border border-border bg-slate-50 px-4 sm:px-5
    text-sm sm:text-base text-text outline-none
    focus:border-primary focus:bg-white transition-all duration-300
  `;

  const labelClass = "text-xs sm:text-sm font-semibold text-text";

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 bg-[#EEF5FD] w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] 2xl:grid-cols-[1fr_500px] gap-10 lg:gap-12 xl:gap-16 items-start">

          {/* ── LEFT SIDE ── */}
          <div className="w-full min-w-0">

            {/* HEADING */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-text leading-tight">
              Our Office Locations
            </h2>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-text-light max-w-2xl">
              Work Permit Cloud has 3 offices in the UK and 1 in UAE
            </p>

            {/* WORKING HOURS */}
            <div className="mt-5 sm:mt-6 space-y-1.5 sm:space-y-2 text-text-light text-sm sm:text-base leading-6 sm:leading-7">
              <p>Mon - Fri : 10am - 7pm</p>
              <p>Saturday & Sunday : Closed</p>
              <p>Call us on +44020 8087 2343 for immediate help & assistance with your situation.</p>
              <p>We're here to help you in person, via the phone or online.</p>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <button className="btn btn-primary px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-[16px] sm:rounded-[20px] text-sm sm:text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call Now
              </button>
              <button className="bg-white border border-primary text-primary px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-[16px] sm:rounded-[20px] text-sm sm:text-base font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Book Appointment
              </button>
            </div>

            {/* OFFICE LIST */}
            <div className="mt-10 sm:mt-14 lg:mt-16">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-text">
                List of our offices
              </h3>

              <div className="mt-6 sm:mt-8">
                {offices.map((office, i) => (
                  <div key={i} className="py-5 sm:py-6 lg:py-7 border-b border-border">
                    <h4 className="text-base sm:text-lg lg:text-[22px] font-bold text-primary">
                      {office.title}
                    </h4>

                    <div className="mt-3 sm:mt-4 flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-sm sm:text-base lg:text-[17px] leading-6 sm:leading-7 text-text-light">
                        {office.address}
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        <p className="text-sm sm:text-base lg:text-[17px] font-semibold text-text">
                          {office.phone}
                        </p>
                      </div>

                      <button className="border border-primary text-primary px-4 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-1.5 shrink-0">
                        Find out more
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE — FORM ── */}
          <div className="w-full min-w-0 xl:sticky xl:top-24 bg-white rounded-2xl sm:rounded-[28px] lg:rounded-[32px] border border-border p-5 sm:p-6 lg:p-8 shadow-[0_15px_60px_rgba(15,23,42,0.08)]">

            {/* LOGO */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary-light flex items-center justify-center text-primary font-black text-sm shadow-sm">
              WPC
            </div>

            {/* TITLE */}
            <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight text-text">
              Request a Callback with Our Immigration Experts
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
                  className="mt-2 w-full rounded-xl sm:rounded-2xl border border-border bg-slate-50 p-4 text-sm sm:text-base text-text outline-none resize-none focus:border-primary focus:bg-white transition-all duration-300"
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
              <div className="h-16 sm:h-20 rounded-xl sm:rounded-2xl border border-border bg-slate-50 flex items-center justify-center text-text-light text-sm">
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