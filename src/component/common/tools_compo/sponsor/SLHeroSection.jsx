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
} from "lucide-react";

const SLHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    sector: "",
    companySize: "",
    timeline: "",
    fullName: "",
    company: "",
    email: "",
    phone: "",
  });

  const sectors = [
    "Health & Social Care",
    "Hospitality & Catering",
    "Construction & Engineering",
    "Technology & IT",
    "Education",
    "Retail & Logistics",
    "Finance & Professional",
    "Other",
  ];

  const companySizes = [
    { label: "1-10 employees", sub: "Small business · Home Office fee: £611", value: "1-10" },
    { label: "11-50 employees", sub: "Growing team · Home Office fee: £1,682", value: "11-50" },
    { label: "51-250 employees", sub: "Mid-size · Home Office fee: £1,682", value: "51-250" },
    { label: "250+ employees", sub: "Large organisation · Home Office fee: £1,682+", value: "250+" },
  ];

  const timelines = [
    { label: "As soon as possible", sub: "I have an urgent hire", value: "urgent" },
    { label: "Within 3 months", sub: "Planning ahead", value: "3-months" },
    { label: "Within 6 months", sub: "Early-stage planning", value: "6-months" },
    { label: "Just exploring", sub: "No immediate need", value: "exploring" },
  ];

  const steps = [
    {
      id: 1,
      title: "What sector is your business in?",
      description: "Takes 2 minutes · No obligation · WPC handles everything.",
      field: "sector",
      type: "options",
      options: sectors,
      isFirstStep: true,
    },
    {
      id: 2,
      title: "Tell us about your business",
      description: "Helps us tailor your application and fee estimate",
      field: "companySize",
      type: "companySize",
      isFirstStep: false,
    },
    {
      id: 3,
      title: "When do you need this?",
      description: "Helps us tailor your application and fee estimate",
      field: "timeline",
      type: "timeline",
      isFirstStep: false,
    },
    {
      id: 4,
      title: "Almost there",
      description: "Your licence assessment is ready",
      field: "contact",
      type: "contact",
      isFirstStep: false,
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
    formData.company.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.phone.trim() !== "";

  const getSelectedSector = () => {
    return formData.sector || "Not selected";
  };

  const getSelectedCompanySize = () => {
    const size = companySizes.find(s => s.value === formData.companySize);
    return size ? size.label : "Not selected";
  };

  const getHomeOfficeFee = () => {
    const size = companySizes.find(s => s.value === formData.companySize);
    return size ? size.sub.split(": ")[1] : "£611";
  };

  const getTimeline = () => {
    const timeline = timelines.find(t => t.value === formData.timeline);
    return timeline ? timeline.label : "Not selected";
  };

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
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
    setFormData({
      sector: "",
      companySize: "",
      timeline: "",
      fullName: "",
      company: "",
      email: "",
      phone: "",
    });
  };

  const resetForm = () => {
    setIsStepFormActive(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  const renderRightContent = () => {
    // Default view
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            SPONSOR LICENCE - QUICK START
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            What sector is your business in?
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Takes 2 minutes · No obligation · WPC handles everything.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {sectors.map((sector, index) => (
              <button
                key={index}
                onClick={() => {
                  setFormData({ ...formData, sector: sector });
                  startAudit();
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-muted transition-all duration-200"
              >
                <span className="text-text text-sm">{index + 1}. {sector}</span>
              </button>
            ))}
          </div>

          <button
            onClick={startAudit}
            className="w-full btn btn-primary h-14 text-base"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      );
    }

    // Results view
    if (showResults) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Get Your Sponsor Licence Today
            </h3>
            <p className="text-text-light text-sm leading-relaxed mb-6">
              Check if your business is eligible
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
            <h4 className="text-sm font-semibold text-text mb-4 text-center">
              You're on your way:
            </h4>
            <p className="text-sm text-text-light text-center mb-4">
              Our Sponsor Licence team will call you within 2 business hours to start your application.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Adviser calls you today</p>
                  <p className="text-xs text-text-light">We'll review your business, confirm eligibility and explain what we need.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text">We prepare your entire application</p>
                  <p className="text-xs text-text-light">Documents, HR checklist, SMS guidance - we handle it all.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Licence granted - start hiring</p>
                  <p className="text-xs text-text-light">Sure. Certificate of Sponsorship sent and bring in your talent.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary flex-1 h-14 text-base">
              <Phone className="w-5 h-5" />
              Book a Call Now
            </button>
            <button className="btn btn-outline flex-1 h-14 text-base">
              More Info
            </button>
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Start a new assessment
          </button>
        </div>
      );
    }

    // Step form
    const currentStepData = steps[currentStep];
    if (!currentStepData) return null;

    const getStepContent = () => {
      if (currentStepData.type === "options") {
        const selectedValue = formData[currentStepData.field];
        const isFirstStep = currentStepData.isFirstStep;
        
        return (
          <div className={`grid ${isFirstStep ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 mb-6`}>
            {currentStepData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentStepData.field, option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <span className="text-text text-sm">{index + 1}. {option}</span>
                {selectedValue === option && (
                  <CheckCircle className="w-4 h-4 text-primary float-right mt-0.5" />
                )}
              </button>
            ))}
          </div>
        );
      }

      if (currentStepData.type === "companySize") {
        const selectedValue = formData.companySize;
        return (
          <div className="space-y-2 mb-6">
            {companySizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleOptionSelect("companySize", size.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === size.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-text text-sm font-medium">{size.label}</span>
                    <p className="text-xs text-text-light mt-0.5">{size.sub}</p>
                  </div>
                  {selectedValue === size.value && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );
      }

      if (currentStepData.type === "timeline") {
        const selectedValue = formData.timeline;
        return (
          <div className="space-y-2 mb-6">
            {timelines.map((timeline) => (
              <button
                key={timeline.value}
                onClick={() => handleOptionSelect("timeline", timeline.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === timeline.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-text text-sm font-medium">{timeline.label}</span>
                    <p className="text-xs text-text-light mt-0.5">{timeline.sub}</p>
                  </div>
                  {selectedValue === timeline.value && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );
      }

      if (currentStepData.type === "contact") {
        return (
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-muted border border-border mb-4">
              <h4 className="text-sm font-semibold text-text mb-3">YOUR LICENCE SNAPSHOT</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Sector</span>
                  <span className="font-medium text-text">{getSelectedSector()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Company size</span>
                  <span className="font-medium text-text">{getSelectedCompanySize()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Home Office fee</span>
                  <span className="font-medium text-text">{getHomeOfficeFee()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light">Typical timeline</span>
                  <span className="font-medium text-text">8 weeks from submission</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Rajib Kumar"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="SS Com Ltd"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="sscom@yopmail.com"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+44 7467 274717"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <p className="text-xs text-text-muted">
              By submitting, We'll email you your response. We never share your data.
            </p>
          </div>
        );
      }

      return null;
    };

    const isStepValid = () => {
      if (currentStepData.type === "options") {
        return !!formData[currentStepData.field];
      }
      if (currentStepData.type === "companySize") {
        return !!formData.companySize;
      }
      if (currentStepData.type === "timeline") {
        return !!formData.timeline;
      }
      if (currentStepData.type === "contact") {
        return isContactStepValid;
      }
      return false;
    };

    const getProgressValue = () => {
      const stepIndex = currentStep + 1;
      return (stepIndex / steps.length) * 100;
    };

    return (
      <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          SPONSOR LICENCE - QUICK START
        </div>

        {currentStepData.type !== "contact" && (
          <>
            <h3 className="text-xl font-bold text-text mb-3">
              {currentStepData.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              {currentStepData.description}
            </p>
          </>
        )}

        {currentStepData.type === "contact" && (
          <>
            <h3 className="text-xl font-bold text-text mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              {currentStepData.description}
            </p>
          </>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-text-muted">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${getProgressValue()}%` }}
            />
          </div>
        </div>

        {getStepContent()}

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
            disabled={!isStepValid()}
            className={`btn btn-primary flex-1 h-12 ${
              !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
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
              Free Sponsor Licence Check
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              Check If Your Business Is <br />
              <span className="text-primary">Eligible for a UK Sponsor Licence</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Thinking about hiring international talent? Before you can sponsor a skilled worker from outside the
              UK, your business must hold a valid UK Sponsor Licence issued by the Home Office. Our free 2-minute
              eligibility checker tells you exactly where you stand - including your Home Office fee, typical
              processing timeline, and the next steps to get your licence approved.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <Clock className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">2 minutes</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">No obligation</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <FileText className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">IAA-regulated advisers</span>
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

export default SLHeroSection;