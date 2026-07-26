import React from "react";
import {
  FileText,
//   Passport,
  Briefcase,
  GraduationCap,
  Landmark,
  Home,
  Languages,
  AlertCircle,
  IdCardLanyard,
} from "lucide-react";

const documents = [
  {
    icon: IdCardLanyard,
    title: "Valid Passport",
    description:
      "A valid passport with sufficient validity and blank pages for visa processing.",
  },
  {
    icon: Landmark,
    title: "Proof of Funds",
    description:
      "Bank statements or financial evidence demonstrating required maintenance funds.",
  },
  {
    icon: Briefcase,
    title: "Employment Documents",
    description:
      "Job offer letter, sponsorship documents, or employment contracts where applicable.",
  },
  {
    icon: GraduationCap,
    title: "Educational Certificates",
    description:
      "Academic qualifications, transcripts, and supporting educational records.",
  },
  {
    icon: Languages,
    title: "English Language Proof",
    description:
      "Approved English language test results or equivalent qualification evidence.",
  },
  {
    icon: Home,
    title: "Accommodation Evidence",
    description:
      "Proof of accommodation arrangements and residential address information.",
  },
];

const ServRequiredDocumentsSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-[420px_1fr] gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-28">
            <div
              className="
                inline-flex
                items-center
                px-5
                py-2
                rounded-full
                bg-primary-light
                text-white
                font-semibold
                text-sm
                mb-6
              "
            >
              REQUIRED DOCUMENTS
            </div>

            <h2
              className="
                text-4xl
                lg:text-5xl
                font-black
                text-text
                leading-tight
              "
            >
              Prepare Your
              <span className="block text-primary">
                Application Documents
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
              Having the correct documentation is essential
              for a successful immigration application.
              Our experts will review, verify, and organize
              every document before submission.
            </p>

            <div
              className="
                mt-8
                p-6
                rounded-3xl
                bg-primary-light
                border
                border-primary/10
              "
            >
              <div className="flex gap-4">
                <AlertCircle className="w-6 h-6 text-white flex-shrink-0" />

                <p className="text-sm text-white leading-relaxed">
                  Required documents may vary depending on
                  your visa route, nationality, and personal
                  circumstances.
                </p>
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {documents.map((doc, index) => {
              const Icon = doc.icon;

              return (
                <div
                  key={index}
                  className="
                    group
                    bg-background
                    border
                    border-border
                    rounded-3xl
                    p-7
                    hover:border-primary/30
                    hover:-translate-y-1
                    transition-all
                    duration-300
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
                      mb-5
                    "
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-text
                      mb-3
                    "
                  >
                    {doc.title}
                  </h3>

                  <p
                    className="
                      text-text-light
                      leading-relaxed
                    "
                  >
                    {doc.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Notice */}
        <div
          className="
            mt-16
            bg-gradient-to-r
            from-primary
            to-primary-dark
            rounded-[32px]
            p-8
            lg:p-10
            text-white
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-center
              justify-between
              gap-6
            "
          >
            <div>
              <h3 className="text-3xl font-black">
                Not Sure Which Documents You Need?
              </h3>

              <p className="mt-3 text-white/80 max-w-2xl">
                Our immigration specialists can review your
                case and provide a personalized document
                checklist based on your application type.
              </p>
            </div>

            <button
              className="
                px-8
                py-4
                rounded-2xl
                bg-white
                text-primary
                font-semibold
                hover:scale-105
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Get Document Checklist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServRequiredDocumentsSection;