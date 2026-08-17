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
  Search,
  AlertCircle,
  Building,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Calculator,
  DollarSign,
} from "lucide-react";

const IHSVisaFeeCalculatorHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    applicationType: "",
    leadApplicant: 1,
    adultDependants: 0,
    minorDependants: 0,
    visaType: "",
    duration: "",
    companySize: "",
    iscLiability: "",
    servicePackage: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNumberChange = (field, value) => {
    setFormData({ ...formData, [field]: parseInt(value) || 0 });
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
    setFormData({
      applicationType: "",
      leadApplicant: 1,
      adultDependants: 0,
      minorDependants: 0,
      visaType: "",
      duration: "",
      companySize: "",
      iscLiability: "",
      servicePackage: "",
      fullName: "",
      email: "",
      phone: "",
    });
  };

  const resetForm = () => {
    setIsStepFormActive(false);
    setCurrentStep(0);
    setShowResults(false);
  };

  const questions = [
    {
      id: 1,
      title: "Application Type",
      description: "I need to know what a Skilled Worker hire will actually cost",
      field: "applicationType",
      type: "applicationType",
      options: ["Outside UK", "Inside UK"],
    },
    {
      id: 2,
      title: "Dependants Details",
      description: "How much your application is costing you?",
      field: "dependants",
      type: "dependants",
    },
    {
      id: 3,
      title: "Visa Type",
      description: "How much your application is costing you?",
      field: "visaType",
      type: "visaType",
      options: [
        "Job listed in Immigration Salary List",
        "Job is not listed in Immigration Salary List",
        "Health and Care Visa",
      ],
    },
    {
      id: 4,
      title: "Duration of Visa",
      description: "How much your application is costing you?",
      field: "duration",
      type: "duration",
      options: ["2 Years", "3 Years", "4 Years", "5 Years"],
    },
    {
      id: 5,
      title: "Tell us about your company",
      description: "How much your application is costing you?",
      field: "companySize",
      type: "companySize",
      options: [
        { label: "Small", sub: "ISC: £480 / year if liable", value: "small" },
        { label: "Large", sub: "ISC: £1,320 / year if liable", value: "large" },
      ],
    },
    {
      id: 6,
      title: "Immigration Skills Charge",
      description: "How much your application is costing you?",
      field: "iscLiability",
      type: "iscLiability",
      options: [
        "Worker in shortage occupation - ISC exempt",
        "Worker under 26 - ISC reduced",
        "Standard ISC payable",
        "Not sure - need advice",
      ],
    },
    {
      id: 7,
      title: "Pick your WPC service",
      description: "How much your application is costing you?",
      field: "servicePackage",
      type: "servicePackage",
      options: [
        { label: "Full Package", sub: "Recruitment + CoS + Visa support", value: "full" },
        { label: "Visa & COS", sub: "CoS + Visa support only", value: "visa-cos" },
        { label: "Visa Only", sub: "Visa application support only", value: "visa-only" },
      ],
    },
    {
      id: 8,
      title: "Fill the info to download the report",
      description: "We will email you a detailed breakdown",
      field: "contact",
      isContactStep: true,
    },
  ];

  const renderRightContent = () => {
    // Default view - Step 0
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            IHS & VISA APPLICATION FEE CALCULATOR
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            I need to know what a Skilled Worker hire will actually cost
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Calculate the true cost of sponsoring a worker - IHS, visa fees, ISF, CoS, dependants, the lot. 
            Get an itemised PDF breakdown emailed to you.
          </p>

          <div className="space-y-3 mb-6">
            {questions[0].options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  handleOptionSelect("applicationType", option);
                  startAudit();
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-muted transition-all duration-200"
              >
                <span className="text-text text-sm">{option}</span>
              </button>
            ))}
          </div>

          <button
            onClick={startAudit}
            className="w-full btn btn-primary h-14 text-base"
          >
            Calculate Hiring Cost
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      );
    }

    // Results view
    if (showResults) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <button
            onClick={resetForm}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← Back
          </button>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-10 h-10 text-success" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">✨</span>
              <h3 className="text-2xl font-bold text-text">Your quote is ready</h3>
            </div>
            <p className="text-text-light text-sm leading-relaxed mb-4">
              Save this breakdown & get a free 15-min review
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
            <p className="text-sm text-text-light text-center mb-2">Your estimated total</p>
            <div className="text-4xl font-black text-primary text-center">£32,318</div>
            <p className="text-xs text-text-muted text-center mt-2">
              Most employers reduce their total by £2,000 – £6,000 after we review their role, 
              company size and visa route. Get the itemised PDF and we'll call you within 24 hours.
            </p>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="btn btn-primary flex-1 h-12 text-sm">
              <Phone className="w-4 h-4" />
              Call us now: 020 8087 2343
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-text-light">
              <ShieldCheck className="w-4 h-4 text-primary" />
              IAA Reg. F202100311
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-light">
              <Star className="w-4 h-4 text-yellow-500" />
              4.9 · 817 Google reviews
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-light">
              <CheckCircle className="w-4 h-4 text-success" />
              7,000+ visas approved
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-light">
              <Lock className="w-4 h-4 text-primary" />
              GDPR-compliant · No spam
            </div>
          </div>

          <p className="text-[10px] text-text-muted text-center mb-4">
            Home Office statutory fees shown are not subject to VAT. WPC's professional service fee, 
            agreed separately, is subject to 20% UK VAT.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={resetForm}
              className="btn btn-outline flex-1 h-12 text-sm"
            >
              Run audit again
            </button>
            <button className="btn btn-primary flex-1 h-12 text-sm">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      );
    }

    // Step form
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return null;

    const selectedValue = formData[currentQuestion.field];
    const progressPercent = ((currentStep + 1) / questions.length) * 100;

    const renderStepContent = () => {
      if (currentQuestion.type === "applicationType") {
        return (
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
        );
      }

      if (currentQuestion.type === "dependants") {
        return (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-border">
              <span className="text-text text-sm">Lead Applicant</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNumberChange("leadApplicant", Math.max(1, formData.leadApplicant - 1))}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="text-lg font-semibold text-text w-8 text-center">{formData.leadApplicant}</span>
                <button
                  onClick={() => handleNumberChange("leadApplicant", formData.leadApplicant + 1)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-border">
              <span className="text-text text-sm">Adult Dependants</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNumberChange("adultDependants", Math.max(0, formData.adultDependants - 1))}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="text-lg font-semibold text-text w-8 text-center">{formData.adultDependants}</span>
                <button
                  onClick={() => handleNumberChange("adultDependants", formData.adultDependants + 1)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border-2 border-border">
              <span className="text-text text-sm">Minor Dependants</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNumberChange("minorDependants", Math.max(0, formData.minorDependants - 1))}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">-</span>
                </button>
                <span className="text-lg font-semibold text-text w-8 text-center">{formData.minorDependants}</span>
                <button
                  onClick={() => handleNumberChange("minorDependants", formData.minorDependants + 1)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center"
                >
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>
        );
      }

      if (currentQuestion.type === "visaType") {
        return (
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
        );
      }

      if (currentQuestion.type === "duration") {
        return (
          <div className="space-y-2 mb-6">
            <label className="block text-sm font-medium text-text mb-2">Duration of Visa</label>
            <select
              value={selectedValue || ""}
              onChange={(e) => handleOptionSelect(currentQuestion.field, e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
            >
              <option value="">Select duration</option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      }

      if (currentQuestion.type === "companySize") {
        return (
          <div className="space-y-2 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-text text-sm font-medium">{option.label}</span>
                    <p className="text-xs text-text-light mt-0.5">{option.sub}</p>
                  </div>
                  {selectedValue === option.value && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );
      }

      if (currentQuestion.type === "iscLiability") {
        return (
          <div className="space-y-2 mb-6">
            <p className="text-xs text-text-muted mb-2">
              Pick the option that best describes the worker's situation. Drives whether the Immigration Skills Charge applies.
              <span className="text-primary font-medium block mt-1">What's ISC?</span>
            </p>
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
        );
      }

      if (currentQuestion.type === "servicePackage") {
        return (
          <div className="space-y-2 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(currentQuestion.field, option.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-text text-sm font-medium">{option.label}</span>
                    <p className="text-xs text-text-light mt-0.5">{option.sub}</p>
                  </div>
                  {selectedValue === option.value && (
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        );
      }

      if (currentQuestion.isContactStep) {
        return (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Your Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
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
                placeholder="+44 7123 456789"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
          </div>
        );
      }

      return null;
    };

    const isStepValid = () => {
      if (currentQuestion.type === "applicationType") return !!formData.applicationType;
      if (currentQuestion.type === "dependants") return true;
      if (currentQuestion.type === "visaType") return !!formData.visaType;
      if (currentQuestion.type === "duration") return !!formData.duration;
      if (currentQuestion.type === "companySize") return !!formData.companySize;
      if (currentQuestion.type === "iscLiability") return !!formData.iscLiability;
      if (currentQuestion.type === "servicePackage") return !!formData.servicePackage;
      if (currentQuestion.isContactStep) return isContactStepValid;
      return false;
    };

    const getStepLabel = () => {
      const labels = {
        1: "APPLICATION TYPE",
        2: "DEPENDANTS",
        3: "VISA TYPE",
        4: "DURATION",
        5: "COMPANY SIZE",
        6: "ISC LIABILITY",
        7: "SERVICE PACKAGE",
        8: "CONTACT INFO",
      };
      return labels[currentQuestion.id] || "QUESTION";
    };

    return (
      <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← Back
          </button>
        )}

        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {getStepLabel()}
        </div>

        {!currentQuestion.isContactStep && (
          <>
            <h3 className="text-xl font-bold text-text mb-2">
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
            Step {currentStep + 1} of {questions.length}
          </div>
          <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {renderStepContent()}

        <div className="flex gap-3">
          {currentQuestion.isContactStep ? (
            <button
              onClick={handleContinue}
              disabled={!isContactStepValid}
              className={`btn btn-primary flex-1 h-12 ${
                !isContactStepValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Download my PDF Report
              <Download className="w-4 h-4" />
            </button>
          ) : (
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
          )}
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
              Free Visa Fee Calculator
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              UK Visa Fee & IHS Calculator 2026: <br />
              <span className="text-primary">What Will Your Application Really Cost?</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Enter your details to get an instant, itemised breakdown of your UK Skilled Worker visa costs - 
              including the Immigration Health Surcharge (IHS), Immigration Skills Charge (ISC), Certificate 
              of Sponsorship and professional fees. Most employers save £2,000–£6,000 after a WorkPermitCloud 
              route review.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">IAA Regulated</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">7,000+ approvals</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <Zap className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">Save £2k–£6k</span>
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

export default IHSVisaFeeCalculatorHeroSection;