import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  CheckCircle,
  Building2,
  Award,
  Globe,
  Lock,
  TrendingUp,
  Zap,
  BarChart,
  Download,
  Phone,
  Calendar,
  Users,
  Briefcase,
  Mail,
  User,
  Briefcase as BriefcaseIcon,
  FileCheck,
  Star,
  Heart,
} from "lucide-react";

const SPJHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    status: "",
    socCode: "",
    salary: "",
    english: "",
    experience: "",
    cvUpdated: "",
    documents: "",
    confidence: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const questions = [
    {
      id: 1,
      title: "What is your current UK status?",
      description: "This is the single biggest factor employers look at first.",
      field: "status",
      options: [
        "I'm already on a skilled worker visa",
        "I'm on a Graduate / PSW / Dependant visa in the UK",
        "I'm on a Student visa in the UK",
        "I'm overseas with no UK visa",
        "I'd rather not say yet",
      ],
    },
    {
      id: 2,
      title: "Do you know the SOC code for the role you are targeting?",
      description: "No SOC code = no Certificate of Sponsorship. You cannot start without it.",
      field: "socCode",
      options: [
        "Yes - I know the exact SOC code",
        "I know the job title but not the SOC",
        "I know the field only",
        "No idea",
      ],
    },
    {
      id: 3,
      title: "What annual salary are you targeting (GBP)?",
      description: "Most Skilled Worker roles now require £41,700+ or the going rate.",
      field: "salary",
      options: [
        "£50,000 or more",
        "£41,000 - £49,999",
        "£38,700 - £40,999",
        "£30,000 - £38,699",
        "Below £30,000",
      ],
    },
    {
      id: 4,
      title: "Do you meet the English language requirement?",
      description: "Required at B2 (CEFR) for Skilled Worker from 8 January 2026 - IELTS, degree taught in English, or majority-English country.",
      field: "english",
      options: [
        "Yes - IELTS / SELT certificate in hand",
        "Yes - UK degree or degree taught in English",
        "I'm a national of a majority-English-speaking country",
        "Not yet - I need to take a test",
        "I'm not sure if I qualify",
      ],
    },
    {
      id: 5,
      title: "How many years of relevant experience do you have in your target role?",
      description: "Check if you are eligible for Sponsored Jobs",
      field: "experience",
      options: [
        "5+ years",
        "3 - 5 years",
        "1 - 3 years",
        "Less than 1 year",
        "I'm a recent graduate / career changer",
      ],
    },
    {
      id: 6,
      title: "How recently have you updated your CV for the UK market?",
      description: "UK CVs are formatted very differently from most international styles.",
      field: "cvUpdated",
      options: [
        "It's UK-formatted and updated this month",
        "Updated in the last 6 months",
        "It's my international CV - not UK-tailored",
        "I don't have a current CV",
      ],
    },
    {
      id: 7,
      title: "Which supporting documents do you have ready?",
      description: "Choose the closest match - employers ask for these before issuing a CoS.",
      field: "documents",
      options: [
        "Passport, qualifications, references, and proof of address",
        "Passport and qualifications only",
        "Passport only",
        "Nothing ready yet",
      ],
    },
    {
      id: 8,
      title: "How confident are you in UK-style competency interviews?",
      description: "Check if you are eligible for Sponsored Jobs",
      field: "confidence",
      options: [
        "Very confident - I've done several recently",
        "Reasonably confident - could use practice",
        "Not confident - I haven't interviewed in the UK",
        "I've never had a formal interview",
      ],
    },
    {
      id: 9,
      title: "Fill the info to download the report",
      description: "We will email you a detailed breakdown along with a complimentary profile creation on WPC Jobs to connect with employers ready to sponsor.",
      field: "contact",
      isContactStep: true,
    },
  ];

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isContactStepValid =
    formData.fullName.trim() !== "" &&
    isValidEmail(formData.email);

  const handleContinue = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAudit = () => {
    setIsStepFormActive(true);
    setCurrentStep(0);
    setShowResults(false);
    setShowDownloadSuccess(false);
    setFormData({
      status: "",
      socCode: "",
      salary: "",
      english: "",
      experience: "",
      cvUpdated: "",
      documents: "",
      confidence: "",
      fullName: "",
      email: "",
      phone: "",
    });
  };

  const resetForm = () => {
    setIsStepFormActive(false);
    setCurrentStep(0);
    setShowResults(false);
    setShowDownloadSuccess(false);
  };

  const handleDownload = () => {
    setShowDownloadSuccess(true);
    setTimeout(() => {
      setShowDownloadSuccess(false);
    }, 3000);
  };

  const renderRightContent = () => {
    // Default view
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            FREE OCCUPATION ASSESSMENT · 2 MINUTES
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            Are you ready to be hired by a UK sponsor?
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Check if you are eligible for Sponsored Jobs. Eight questions. An honest score. 
            A specific list of what to fix before you apply - so you don't waste months on 
            roles that were never going to work.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-text">IAA Regulated</div>
              <div className="text-[10px] text-text-light">F202100311</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <Award className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-text">Winner 2024</div>
              <div className="text-[10px] text-text-light">Immigration Lawyer of the Year</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <Users className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <div className="text-xs font-semibold text-text">3000+</div>
              <div className="text-[10px] text-text-light">UK Sponsors Served</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-4">
            <h4 className="text-sm font-semibold text-text mb-3">What you will receive</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-primary">01</span>
                <span className="text-sm text-text-light">Benchmarked against current Skilled Worker rules</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-primary">02</span>
                <span className="text-sm text-text-light">Tailored next steps based on your answers</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-primary">03</span>
                <span className="text-sm text-text-light">No spam - your score appears instantly</span>
              </div>
            </div>
          </div>

          <button
            onClick={startAudit}
            className="w-full btn btn-primary h-14 text-base"
          >
            Start the Check
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-text-muted text-center mt-3">
            Built by WPC Jobs · Backed by IAA-regulated immigration expert
          </p>
        </div>
      );
    }

    // Results view
    if (showResults) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Work Permit Cloud · Occupation Assessment
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Assessment Score
            </h3>
            <div className="text-5xl font-black text-primary mb-2">91/100</div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 mb-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">✅ Sponsor-Ready</span>
            </div>
            <p className="text-text-light text-sm leading-relaxed">
              You're in a strong position. Licensed UK employers are likely to shortlist you. 
              Your next move is visibility - get in front of the right sponsors before someone else does.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-2">Recommended next step</h4>
            <p className="text-sm text-text-light">
              Book a 15-minute findings walkthrough for candidates who want expert support 
              preparing for competitive roles. These services improve readiness, not access to employers.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary flex-1 h-14 text-base">
              <Calendar className="w-5 h-5" />
              Book Consultation
            </button>
            <button className="btn btn-outline flex-1 h-14 text-base">
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Run audit again
          </button>
        </div>
      );
    }

    // Step form
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return null;

    const selectedValue = formData[currentQuestion.field];
    const progressPercent = ((currentStep + 1) / questions.length) * 100;

    const getStepLabel = () => {
      const labels = {
        1: "YOUR STATUS",
        2: "YOUR ROLE",
        3: "YOUR ROLE",
        4: "YOUR DOCUMENTS",
        5: "YOUR EXPERIENCE",
        6: "YOUR DOCUMENTS",
        7: "YOUR DOCUMENTS",
        8: "YOUR READINESS",
        9: "CONTACT INFO",
      };
      return labels[currentQuestion.id] || "QUESTION";
    };

    return (
      <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {getStepLabel()}
        </div>

        {!currentQuestion.isContactStep && (
          <>
            <h3 className="text-xl font-bold text-text mb-3">
              {currentQuestion.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              {currentQuestion.description}
            </p>
          </>
        )}

        {currentQuestion.isContactStep && (
          <>
            <h3 className="text-xl font-bold text-text mb-2">
              {currentQuestion.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              {currentQuestion.description}
            </p>
          </>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-text-muted">
            Question {currentQuestion.id} of {questions.length}
          </div>
          <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {currentQuestion.isContactStep ? (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Your Name"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
              {formData.fullName === "" && (
                <p className="text-xs text-red-500 mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Your Email"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your Phone number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Your Phone Number"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.field, option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-text text-sm">{option}</span>
                  {selectedValue === option && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="btn btn-outline flex-1 h-12"
            >
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            disabled={
              currentQuestion.isContactStep
                ? !isContactStepValid
                : !selectedValue
            }
            className={`btn btn-primary flex-1 h-12 ${
              (
                currentQuestion.isContactStep
                  ? !isContactStepValid
                  : !selectedValue
              )
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-surface to-primary-light/30">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              Free Occupation Assessment
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              Are You Ready to Be Hired by a UK Sponsor? <br />
              <span className="text-primary">Take the Free Occupation Assessment</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Eight questions. An honest score out of 100. A specific breakdown of what to fix 
              before you apply - so you don't spend months pursuing roles that were never going 
              to work. Benchmarked against current UK Skilled Worker rules, including the £41,700 
              salary threshold and B2 English requirement effective January 2026.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">IAA regulated</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">7,000+ approvals</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <Building2 className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">3,000+ sponsors served</span>
              </div>
            </div>

            <button className="mt-8 btn btn-primary px-8 py-3.5 text-base">
              Talk to an expert
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Content - Dynamic */}
          <div>{renderRightContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default SPJHeroSection;