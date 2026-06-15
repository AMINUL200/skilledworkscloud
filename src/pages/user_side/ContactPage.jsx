import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquareWarning,
  Headset,
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

// ── Main component ───────────────────────────────────────────
const ContactPage = () => {
  const [activeTab, setActiveTab] = useState("contact");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
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
      </div>
    </section>
  );
};

export default ContactPage;
