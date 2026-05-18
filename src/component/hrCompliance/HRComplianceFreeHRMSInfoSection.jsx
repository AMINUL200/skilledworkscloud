import React from "react";
import {
  Phone, Mail, MapPin,
  Facebook, Instagram, Linkedin, Youtube,
  ArrowRight, CalendarDays,
} from "lucide-react";

const latestNews = [
  "Sponsor Licence Compliance Changes 2026",
  "New Skilled Worker Salary Threshold",
  "Right To Work Check Digital Update",
  "UK Immigration Policy Changes",
];

const cardClass =
  "bg-white rounded-2xl sm:rounded-[28px] border border-border shadow-[0_6px_30px_rgba(15,23,42,0.05)]";

const HRComplianceHRMSInfoSection = () => (
  <section className="py-12 sm:py-16 lg:py-20 bg-[#EEF5FD] w-full">
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 lg:gap-10 xl:gap-12 items-start">

        {/* ── LEFT — MAIN ARTICLE ── */}
        <div className={`${cardClass} p-5 sm:p-8 lg:p-10`}>
          <p className="text-primary text-[11px] sm:text-xs font-bold uppercase tracking-[4px]">
            Compliant HR Software
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-text">
            How Does an HRMS Work?
          </h2>

          {/* BODY CONTENT */}
          <div className="mt-6 sm:mt-8 space-y-5 text-text-light text-sm sm:text-base leading-6 sm:leading-7">
            <p>
              Cloud HR software consists of a centralised database that stores employee records.
              Authorised personnel can access this database through web browsers or mobile phones.
              The system also includes various tools to help manage employee records like performance
              review templates, contract management tools and absence tracking.
            </p>

            <h3 className="text-lg sm:text-xl font-black text-text pt-1">
              Who uses it? / Why do you need an HR Management System?
            </h3>

            <p>
              Human Resource Management Systems offer several advantages for organisations. Perhaps
              the most significant benefit is that they can help save time and money by automating HR
              processes. They can help improve compliance with UKVI sponsorship rules and provide a
              centralised location for all employee records.
            </p>

            <p>
              As a UK employer, if you are sponsoring migrant workers from overseas, it is a
              requirement from the Home Office that you must have a robust HR system in place to
              monitor your employees. As a licensed sponsor, you need to carry out sponsor duties,
              which require record-keeping and reporting.
            </p>

            <p>
              A robust HR system will help you to comply with your duties in order to maintain your
              sponsor licence. Failing to comply with your sponsor duties may result in your
              sponsorship licence being suspended, revoked or withdrawn.
            </p>

            <h3 className="text-lg sm:text-xl font-black text-text pt-1">
              Manage your Sponsorship Licence with WpcHr Software
            </h3>

            <p>
              With our Cloud-based HR software, employers can manage their employees database and
              monitor and create all kinds of reports related to settled or non-settled workers.
            </p>

            <p>
              For example, right-to-work checks, record changes of circumstances, proof of ID, next
              of kin details, duty roster, holiday, sick leave, absence, role management and alert
              management.
            </p>

            <p>
              Strong adherence to these HR processes helps organisations to follow Home Office
              guidance of sponsorship compliance. All these functionalities can be accessed by
              end-users through a web browser or mobile phone.
            </p>

            <p>
              Our specialist team supports employers to harness the full benefits of the specialised
              software and its functionalities.
            </p>

            <h3 className="text-lg sm:text-xl font-black text-text pt-1">
              Choosing an HRMS for Your Business
            </h3>

            <p>
              When choosing a cloud HR software for your business, it is crucial to consider your
              specific needs.
            </p>

            <p>
              WorkPermitCloud's software meets the requirements of companies of all sizes. Reach out
              to our team to discuss your particular requirements and find out more about our services.
            </p>
          </div>

          {/* VIDEO */}
          <div className="mt-10 sm:mt-12">
            <h3 className="text-lg sm:text-xl font-black text-text">
              A Quick Demonstration of WPC HRMS Software
            </h3>

            <div className="mt-4 sm:mt-5 overflow-hidden rounded-2xl sm:rounded-[24px] shadow-[0_8px_30px_rgba(15,23,42,0.08)] aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/eXPRp0b9QvI?si=6lo8ykG90ZXeOkxH"
                title="YouTube video player"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="space-y-4 sm:space-y-5 w-full min-w-0">

          {/* CONTACT CARD */}
          <div className={`${cardClass} overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop"
              alt="Adviser"
              className="w-full h-[180px] sm:h-[220px] object-cover"
            />

            <div className="p-5 sm:p-6">
              <p className="text-primary text-[11px] sm:text-xs font-bold uppercase tracking-[4px]">
                Contact an Adviser
              </p>

              <h3 className="mt-2.5 text-lg sm:text-xl font-black text-text leading-tight">
                Speak With Our Immigration Experts
              </h3>

              <p className="mt-2 text-sm text-text-light leading-6">
                Get professional support regarding sponsor licence compliance and HRMS software solutions.
              </p>

              {/* CONTACT INFO */}
              <div className="mt-5 space-y-3">
                {[
                  { icon: <Phone className="w-4 h-4 text-primary shrink-0" />, text: "+44 0208 087 2343" },
                  { icon: <Mail className="w-4 h-4 text-primary shrink-0" />, text: "info@workpermitcloud.com" },
                  { icon: <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: "London, United Kingdom" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.icon}
                    <p className="text-sm font-medium text-text">{item.text}</p>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary mt-6 w-full py-3 rounded-xl sm:rounded-2xl text-sm font-semibold flex items-center justify-center gap-2">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className={`${cardClass} p-5 sm:p-6`}>
            <h3 className="text-base sm:text-lg font-black text-text">Follow Us</h3>
            <div className="mt-4 flex items-center gap-3">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* LATEST NEWS */}
          <div className={`${cardClass} p-5 sm:p-6`}>
            <h3 className="text-base sm:text-lg font-black text-text">Latest News</h3>

            <div className="mt-4 space-y-4">
              {latestNews.map((news, i) => (
                <div
                  key={i}
                  className="pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                    <p className="text-xs text-text-light">12 May 2026</p>
                  </div>
                  <h4 className="mt-1.5 text-sm font-bold leading-5 text-text hover:text-primary cursor-pointer transition-colors">
                    {news}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
);

export default HRComplianceHRMSInfoSection;