import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquareWarning,
  Headset,
  Globe,
  Building2,
  Navigation,
} from "lucide-react";
import PageLoader from "../../component/common/PageLoader";

// ── Shared field styles ──────────────────────────────────────
const fieldBase =
  "w-full rounded-xl border border-border bg-slate-50 px-4 text-sm text-text outline-none focus:border-primary focus:bg-white transition-all duration-300";
const inputClass = `${fieldBase} h-11 sm:h-12`;
const selectClass = `${fieldBase} h-11 sm:h-12`;
const textareaClass = `${fieldBase} p-4 resize-none`;
const labelClass = "block text-xs sm:text-sm font-semibold text-text mb-1.5";

const Field = ({ label, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

// ── Contact form ─────────────────────────────────────────────
const ContactForm = () => (
  <div className="xl:sticky xl:top-24 bg-white rounded-2xl sm:rounded-[28px] border border-border p-5 sm:p-6 lg:p-8 shadow-[0_15px_60px_rgba(15,23,42,0.08)]">
    <h2 className="text-xl sm:text-2xl font-black leading-tight text-text">
      Request a Callback
    </h2>
    <p className="mt-2 text-sm text-text-light leading-6">
      Speak with our immigration specialists regarding visas, sponsor licence,
      compliance and legal support.
    </p>

    <form className="mt-6 space-y-4">
      <input type="text" placeholder="Full Name" className={inputClass} />
      <input type="email" placeholder="Email Address" className={inputClass} />
      <input type="text" placeholder="Phone Number" className={inputClass} />
      <select className={selectClass}>
        <option>Select Service</option>
        <option>Sponsor Licence</option>
        <option>Skilled Worker Visa</option>
        <option>HR Compliance</option>
      </select>
      <textarea
        rows={4}
        placeholder="Write your message..."
        className={textareaClass}
      />
      <button className="btn btn-primary w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold">
        Submit Request
      </button>
    </form>
  </div>
);

// ── Complaint form ───────────────────────────────────────────
const ComplaintForm = () => (
  <div className="mt-10 sm:mt-14 max-w-[900px] mx-auto">
    {/* Info banner */}
    <div className="bg-blue-50 border border-blue-100 rounded-2xl sm:rounded-[24px] p-5 sm:p-6 text-center">
      <h3 className="text-lg sm:text-xl font-black text-text">
        Complaint & Feedback Form
      </h3>
      <p className="mt-2 text-sm sm:text-base leading-6 sm:leading-7 text-text-light">
        Your feedback is important to us. Please use this form to report any
        issue or delay you have experienced. This helps us resolve your concern
        quickly and improve our service.
      </p>
    </div>

    {/* Form card */}
    <div className="mt-5 sm:mt-6 bg-white rounded-2xl sm:rounded-[28px] border border-border p-5 sm:p-8 shadow-[0_15px_60px_rgba(15,23,42,0.08)]">
      <h2 className="text-xl sm:text-2xl font-black text-center text-text">
        Complaint Form
      </h2>

      <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Organisation Name">
            <input
              type="text"
              placeholder="e.g. ABC Ltd."
              className={inputClass}
            />
          </Field>
          <Field label="Name *">
            <input
              type="text"
              placeholder="Your full name"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email *">
            <input
              type="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
          <Field label="Phone Number (Optional)">
            <input
              type="text"
              placeholder="+44 7234 567890"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Pohori Group Name (Optional)">
            <input
              type="text"
              placeholder="Group name"
              className={inputClass}
            />
          </Field>
          <Field label="Complaint Type *">
            <select className={selectClass}>
              <option>Select Type</option>
              <option>Service Delay</option>
              <option>Communication Issue</option>
              <option>HR Compliance</option>
              <option>Legal Concern</option>
            </select>
          </Field>
        </div>

        <Field label="Description *">
          <textarea
            rows={5}
            placeholder="Write your complaint details..."
            className={textareaClass}
          />
        </Field>

        <Field label="File Attachment (Optional)">
          <input
            type="file"
            className="mt-1 block text-xs sm:text-sm text-text-light"
          />
        </Field>

        <div className="h-16 sm:h-20 rounded-xl border border-border bg-slate-50 flex items-center justify-center text-text-light text-sm">
          reCAPTCHA Placeholder
        </div>

        <button className="btn btn-primary w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold">
          Submit Complaint
        </button>
      </form>
    </div>
  </div>
);

// ── Map Component ────────────────────────────────────────────
const LocationMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_15px_60px_rgba(15,23,42,0.08)] border border-border">
      {/* Embedded Google Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.523079412905!2d0.025334!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location Map"
        className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-300" />
            <div className="h-4 w-32 bg-gray-300 rounded" />
          </div>
        </div>
      )}

      {/* Map Overlay Info */}
      <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto md:bottom-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-lg border border-white/20 max-w-[320px]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Navigation size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-bold text-text text-sm">Visit Our Office</h4>
            <p className="text-xs text-text-light leading-5 mt-0.5">
              Suite 602, 6th Floor, 252-262 Romford Road, London, E7 9HZ
            </p>
            <button className="mt-2 text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              Get Directions
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main component ───────────────────────────────────────────
const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <section className="relative overflow-hidden bg-[#EEF5FD] py-14 sm:py-20 lg:py-24 w-full">
      {/* BG GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADER ── */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-[4px] sm:tracking-[5px] text-primary text-xs sm:text-sm font-semibold">
            CONTACT & SUPPORT
          </p>
          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tight text-text leading-tight">
            Contact Our Immigration Team
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-text-light leading-6 sm:leading-8">
            Need help with Sponsor Licence, Skilled Worker Visa, HR Compliance
            or Immigration Advice? Speak with our experts or submit a complaint
            and feedback request.
          </p>
        </div>

        {/* ── TAB SWITCH ── */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="bg-white/70 backdrop-blur-xl border border-border rounded-2xl p-1.5 flex gap-1.5 shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
            {[
              {
                id: "contact",
                icon: <Headset className="w-4 h-4" />,
                label: "Contact Query",
              },
              {
                id: "complaint",
                icon: <MessageSquareWarning className="w-4 h-4" />,
                label: "Complaint Query",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold
                  transition-all duration-300 flex items-center gap-2
                  ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-text-light hover:bg-slate-100"}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTACT TAB ── */}
        {activeTab === "contact" && (
          <div className="mt-10 sm:mt-14 grid grid-cols-1 xl:grid-cols-[1fr_440px] 2xl:grid-cols-[1fr_480px] gap-8 lg:gap-12 items-start">
            {/* LEFT - UPDATED CONTACT INFO */}
            <div className="w-full min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-text">
                Get in Touch
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-6 sm:leading-7 text-text-light max-w-2xl">
                Reach out to our skilled workers immigration team for any
                queries or support.
              </p>

              {/* Main Contact Card */}
              <div className="mt-6 sm:mt-8 bg-white rounded-2xl sm:rounded-[24px] border border-border p-5 sm:p-6 shadow-[0_6px_30px_rgba(15,23,42,0.05)]">
                {/* Office Address */}
                <div className="flex items-start gap-3 pb-4 border-b border-border">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-text">Our Office</h3>
                    <p className="text-sm sm:text-[15px] leading-6 text-text-light">
                      Suite 602, 6th Floor, 252-262 Romford Road, London, E7 9HZ
                      United Kingdom
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
                        <a href="mailto:info@skilledworkerscloud.com">
                          info@skilledworkerscloud.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pl-8">
                    <div className="w-5 h-5 shrink-0" />{" "}
                    {/* Spacer for alignment */}
                    <div>
                      <p className="text-sm font-medium text-text">
                        After Sales / Technical Support
                      </p>
                      <p className="text-sm text-primary hover:underline">
                        <a href="mailto:support@skilledworkerscloud.co.uk">
                          support@skilledworkerscloud.co.uk
                        </a>
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
                      <p className="text-sm text-text">
                        Landline:{" "}
                        <span className="font-medium">+44 0208 129 1655</span>
                      </p>
                      <p className="text-sm text-text">
                        Mobile & WhatsApp:{" "}
                        <span className="font-medium">+44 074 6728 4718</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Working Hours Hint */}
                <div className="mt-5 pt-3 flex items-center gap-2 text-xs text-text-light border-t border-border">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Mon - Fri : 9am - 6pm</span>
                </div>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <ContactForm />
          </div>
        )}

        {/* ── COMPLAINT TAB ── */}
        {activeTab === "complaint" && <ComplaintForm />}

        {/* ── MAP SECTION ── */}
        <div className="mt-16 sm:mt-20 lg:mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Globe size={16} className="text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                Find Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text">
              Visit Our <span className="text-primary">Office</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-text-light max-w-2xl mx-auto">
              We're conveniently located in London. Come visit us or get in touch
              through any of the channels above.
            </p>
          </div>

          <LocationMap />

          {/* Quick Info Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold text-text text-sm">Address</h5>
                  <p className="text-xs text-text-light">London, E7 9HZ</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold text-text text-sm">Phone</h5>
                  <p className="text-xs text-text-light">+44 0208 129 1655</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-semibold text-text text-sm">Hours</h5>
                  <p className="text-xs text-text-light">Mon-Fri: 9am - 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;