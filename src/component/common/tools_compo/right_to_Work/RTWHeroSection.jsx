import React, { useState } from "react";
import {
  Search,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileText,
  CheckCircle,
  Building2,
  Users,
  FileCheck,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  BarChart,
  Download,
  HelpCircle,
  Briefcase,
  Globe,
  Lock,
  TrendingUp,
  Mail,
  Phone,
} from "lucide-react";

 const questions = [
    {
      id: 1,
      title: "How many employees does your business have?",
      description: "Full-time, part-time, and agency workers combined.",
      field: "employees",
      options: ["Under 10", "10 – 49", "50 – 249", "250+"],
    },
    {
      id: 2,
      title: "Roughly how many of those are non-UK/Irish nationals?",
      description:
        "Including EU workers, Skilled Worker visa holders, dependants with work rights, students.",
      field: "nonUkEmployees",
      options: ["None", "1 – 5", "6 – 20", "20+"],
    },
    {
      id: 3,
      title: "Who does your Right to Work checks?",
      description:
        "Think about the person who actually verifies documents and records the checks.",
      field: "rtwChecker",
      options: [
        "A certified IDSP / IDVT tool",
        "Internal HR team (manual checks)",
        "Line manager or admin staff",
        "The owner/director handles it informally",
        "We don't currently do RTW checks",
      ],
    },
    {
      id: 4,
      title:
        "Do you keep copies of RTW documents for 2 years after employment ends?",
      description:
        "This is a legal requirement — missing records is one of the top reasons for civil penalties.",
      field: "documentStorage",
      options: [
        "Yes - stored digitally with audit trail",
        "Yes - paper copies in a file",
        "I'm not sure",
        "No / inconsistently",
      ],
    },
    {
      id: 5,
      title:
        "Do you do follow-up checks on time-limited visa holders before they expire?",
      description:
        "If a worker's visa expires and you haven't re-checked, you lose your 'statutory excuse' instantly.",
      field: "followUpChecks",
      options: [
        "Yes - automated alerts track expiry dates",
        "Yes - we track it manually on a spreadsheet",
        "Sometimes / only when we remember",
        "No / we don't have time-limited workers",
      ],
    },
    {
      id: 6,
      title: "When was your last RTW compliance audit?",
      description:
        "A Home Office inspection can arrive with as little as 48 hours' notice.",
      field: "lastAudit",
      options: [
        "Within the last 12 months",
        "1-3 years ago",
        "Never / I don't know",
        "We had a Home Office visit and need to fix things",
      ],
    },
    {
      id: 7,
      title: "Fill the info to download the Free report",
      description: "Check if someone can legally work in the UK",
      field: "contact",
      isContactStep: true,
    },
  ];

const RTWHeroSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    employees: "",
    nonUkEmployees: "",
    rtwChecker: "",
    documentStorage: "",
    followUpChecks: "",
    lastAudit: "",
    companyName: "",
    email: "",
    phone: "",
  });
  const [showResults, setShowResults] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Simple, practical email validation (not exhaustive RFC matching)
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isContactStepValid =
    formData.companyName.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.phone.trim() !== "";

  const totalQuestions = questionsLength();

  // Kept as a function so it reads clearly at call sites below
  function questionsLength() {
    return questions.length;
  }

  const handleContinue = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step (contact form) submitted -> show results on the same card
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
      employees: "",
      nonUkEmployees: "",
      rtwChecker: "",
      documentStorage: "",
      followUpChecks: "",
      lastAudit: "",
      companyName: "",
      email: "",
      phone: "",
    });
  };

  const resetForm = () => {
    setIsStepFormActive(false);
    setCurrentStep(0);
    setShowResults(false);
  };

 

  // Human-readable labels for the audit summary on the results screen
  const summaryLabels = {
    employees: "Employees",
    nonUkEmployees: "Non-UK Workers",
    rtwChecker: "RTW Checker",
    documentStorage: "Document Storage",
    followUpChecks: "Follow-up Checks",
    lastAudit: "Last Audit",
  };

  const summaryFieldOrder = [
    "employees",
    "nonUkEmployees",
    "rtwChecker",
    "documentStorage",
    "followUpChecks",
    "lastAudit",
  ];

  const recommendedNextSteps = [
    "Move any manual RTW checks over to a certified IDSP/IDVT tool.",
    "Store all RTW documents digitally with a clear audit trail.",
    "Set automated alerts for upcoming visa expiry dates.",
    "Schedule a compliance audit at least once every 12 months.",
  ];

  const benefits = [
    {
      icon: Zap,
      title: "60-Second Audit",
      description: "Complete the compliance check in under 60 seconds.",
    },
    {
      icon: BarChart,
      title: "Instant Risk Score",
      description: "Get your RTW Compliance Risk Score immediately.",
    },
    {
      icon: FileCheck,
      title: "Full Report",
      description: "Download a detailed PDF report with action plan.",
    },
    {
      icon: ShieldCheck,
      title: "IAA Regulated",
      description: "Built by IAA regulated immigration experts.",
    },
    {
      icon: TrendingUp,
      title: "Penalty Exposure",
      description: "Understand your potential financial exposure.",
    },
    {
      icon: Lock,
      title: "Data Secure",
      description: "Your information is encrypted and protected.",
    },
  ];

  const renderRightContent = () => {
    // Default view - initial card
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          Skilled Works Cloud · COMPLIANCE TOOL
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            I need to check if my business is exposed to a Right to Work penalty
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Check if someone can legally work in the UK. Answer 6 questions and
            get your Compliance Risk Score, penalty exposure estimate, and a
            prioritised action plan. UK employers paid £8.1M in RTW penalties in
            Q1 2024 alone.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <Clock className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <h4 className="text-sm font-bold text-text">60 Seconds</h4>
              <p className="text-[10px] text-text-light leading-tight">
                Quick audit
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <BarChart className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <h4 className="text-sm font-bold text-text">Instant Score</h4>
              <p className="text-[10px] text-text-light leading-tight">
                Get risk score
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted border border-border">
              <FileText className="w-6 h-6 text-primary mx-auto mb-1.5" />
              <h4 className="text-sm font-bold text-text">Full Report</h4>
              <p className="text-[10px] text-text-light leading-tight">
                Download PDF
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-warning/10 border border-warning/20 mb-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-sm text-text-light leading-relaxed">
                <span className="font-semibold text-text">Did you know?</span> A
                single illegal worker can result in a civil penalty of up to{" "}
                <span className="font-bold text-warning">£60,000</span> per
                breach. Repeat breaches are capped at{" "}
                <span className="font-bold text-warning">£45,000</span> per
                worker. If your records are incomplete, you lose your "statutory
                excuse" instantly.
              </p>
            </div>
          </div>

          <button
            onClick={startAudit}
            className="w-full btn btn-primary h-14 text-base"
          >
            Run Free Compliance Audit (60 seconds)
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      );
    }

    // Results view
    if (showResults) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Skilled Works CLOUD · COMPLIANCE AUDIT
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-10 h-10 text-success" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <h3 className="text-2xl font-bold text-text">
                Audit Completed
              </h3>
            </div>
            <p className="text-text-light text-sm leading-relaxed mb-6">
              Your full report is attached as a PDF. A senior compliance
              specialist will call you within 24 business hours to walk through
              your report and answer your questions. Free, no obligation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
            <h4 className="text-sm font-semibold text-text mb-4 text-center">
              Your compliance result
            </h4>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-primary">83/100</div>
                <div className="text-xs text-text-light">
                  COMPLIANCE SCORE
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-left">
                <div className="flex items-center gap-1 text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Good</span>
                </div>
                <div className="text-xs text-text-light">Risk Level</div>
              </div>
            </div>
          </div>

          {/* Recommended Next Steps */}
          <div className="p-6 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-3">
              Recommended Next Steps
            </h4>
            <ul className="space-y-2">
              {recommendedNextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-text-light leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Information */}
          <div className="p-6 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-3">
              Company Information
            </h4>
            <div className="space-y-2">
              <div>
                <div className="text-xs text-text-muted">Company Name:</div>
                <div className="text-sm font-medium text-text">
                  {formData.companyName}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-muted">Business Email:</div>
                <div className="text-sm font-medium text-text">
                  {formData.email}
                </div>
              </div>
              <div>
                <div className="text-xs text-text-muted">Phone Number:</div>
                <div className="text-sm font-medium text-text">
                  {formData.phone}
                </div>
              </div>
            </div>
          </div>

          {/* Audit Summary */}
          <div className="p-6 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-3">
              Audit Summary
            </h4>
            <div className="space-y-2">
              {summaryFieldOrder.map((field) => (
                <div key={field}>
                  <div className="text-xs text-text-muted">
                    {summaryLabels[field]}:
                  </div>
                  <div className="text-sm font-medium text-text">
                    {formData[field] || "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-outline flex-1 h-14 text-base">
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button className="btn btn-primary flex-1 h-14 text-base">
              Book Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Start a new audit
          </button>
        </div>
      );
    }

    // Step form view
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return null;

    const selectedValue = formData[currentQuestion.field];
    const progressPercent = (currentQuestion.id / totalQuestions) * 100;

    return (
      <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          WORK PERMIT CLOUD · COMPLIANCE AUDIT
        </div>

        <h3 className="text-xl font-bold text-text mb-3">
          {currentQuestion.title}
        </h3>

        <p className="text-sm text-text-light leading-relaxed mb-6">
          {currentQuestion.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-text-muted">
            Question {currentQuestion.id} of {totalQuestions}
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
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                placeholder="e.g. ABC Construction Ltd"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Business Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="e.g. name@company.co.uk"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="e.g. +44 7123 456789"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleOptionSelect(currentQuestion.field, option)
                }
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedValue === option
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted"
                }`}
              >
                <span className="text-text text-sm">{option}</span>
                {selectedValue === option && (
                  <CheckCircle className="w-4 h-4 text-primary float-right mt-0.5" />
                )}
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
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-surface to-primary-light/30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content - Sticky */}
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Free RTW Compliance Check
              </span>

              <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
                Is Your Business Exposed to a <br />
                <span className="text-primary">Right to Work Penalty?</span>
              </h1>

              <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
                UK employers paid{" "}
                <span className="font-bold text-primary">£8.1 million</span> in
                Right to Work civil penalties in Q1 2024 alone. A single
                undetected illegal worker can cost your business up to
                <span className="font-bold text-primary"> £60,000</span> - and
                if your records are incomplete, you lose your statutory excuse
                instantly. Our free 60-second compliance check asks you 6
                questions and returns your RTW Compliance Score, your penalty
                exposure estimate, and a prioritised action plan.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-text">
                    IAA Regulated
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-text">
                    60 seconds
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                  <FileText className="w-4 h-4 text-primary-bright" />
                  <span className="text-sm font-medium text-text">
                    Free PDF report
                  </span>
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
    </>
  );
};

export default RTWHeroSection;