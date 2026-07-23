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
  Star,
  Heart,
  Utensils,
  Wrench,
  Monitor,
  GraduationCap,
  ShoppingBag,
  Landmark,
  Folder,
} from "lucide-react";

const HrCAHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    sector: "",
    cosAssigned: "",
    rtwStorage: "",
    internalAudit: "",
    qualifications: "",
    reportingDuties: "",
    roleChanges: "",
    level1User: "",
    salaryThreshold: "",
    genuineVacancy: "",
    socCode: "",
    rtwChecks: "",
    eraReady: "",
    homeOfficeContact: "",
    confidence: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const sectors = [
    { icon: Heart, label: "Health & Social Care" },
    { icon: Utensils, label: "Hospitality & Catering" },
    { icon: Wrench, label: "Construction & Engineering" },
    { icon: Monitor, label: "Technology & IT" },
    { icon: GraduationCap, label: "Education" },
    { icon: ShoppingBag, label: "Retail & Logistics" },
    { icon: Landmark, label: "Finance & Professional" },
    { icon: Folder, label: "Other sector" },
  ];

  const questions = [
    {
      id: 1,
      title: "Industry sector",
      description: "Find hidden compliance risks in your HR process",
      field: "sector",
      type: "sector",
    },
    {
      id: 2,
      title: "Certificates of Sponsorship assigned in the last 12 months",
      description: "Find hidden compliance risks in your HR process",
      field: "cosAssigned",
      type: "options",
      options: ["0 Assigned", "1 - 5 Assigned", "6 - 20 Assigned", "20+ Assigned"],
    },
    {
      id: 3,
      title: "Where do you store sponsored workers' right-to-work evidence?",
      description: "Find hidden compliance risks in your HR process",
      field: "rtwStorage",
      type: "options",
      options: [
        "Digital HR system with audit trail",
        "Shared drive or email folders",
        "Paper files only",
        "Not sure / mixed storage",
      ],
    },
    {
      id: 4,
      title: "When did you last conduct an internal file audit of your sponsored workers?",
      description: "Find hidden compliance risks in your HR process",
      field: "internalAudit",
      type: "options",
      options: ["Within the last 6 months", "6-12 months ago", "Over 12 months ago / never"],
    },
    {
      id: 5,
      title: "Do you hold qualifications, references, and recruitment records for each sponsored worker?",
      description: "Find hidden compliance risks in your HR process",
      field: "qualifications",
      type: "options",
      options: ["Yes, all complete", "Some, not all", "No"],
    },
    {
      id: 6,
      title: "If a sponsored worker stopped attending work for 10+ days, how quickly would you report it on SMS?",
      description: "Find hidden compliance risks in your HR process",
      field: "reportingDuties",
      type: "options",
      options: ["Within 10 working days", "Within a month", "Not sure of the timeframe"],
    },
    {
      id: 7,
      title: "Have any sponsored workers changed role, salary, or location in the last 12 months?",
      description: "Find hidden compliance risks in your HR process",
      field: "roleChanges",
      type: "options",
      options: [
        "Yes and we reported within the required window",
        "Yes - but unsure if reported correctly",
        "No changes",
      ],
    },
    {
      id: 8,
      title: "Your named Level 1 User is",
      description: "Find hidden compliance risks in your HR process",
      field: "level1User",
      type: "options",
      options: [
        "Active and trained in SMS",
        "Active but never formally trained",
        "Has left the business / unsure",
      ],
    },
    {
      id: 9,
      title: "For your most recent CoS, did the salary meet both the going rate for the SOC code and the general threshold?",
      description: "Find hidden compliance risks in your HR process",
      field: "salaryThreshold",
      type: "options",
      options: [
        "Yes, confirmed against current 2026 thresholds",
        "Checked 12+ months ago",
        "Unsure",
      ],
    },
    {
      id: 10,
      title: "Do you have documented evidence that sponsored roles are genuine vacancies?",
      description: "Find hidden compliance risks in your HR process",
      field: "genuineVacancy",
      type: "options",
      options: ["Yes, complete for all roles", "Partial records", "No"],
    },
    {
      id: 11,
      title: "Are any sponsored workers performing duties outside the SOC code on their CoS?",
      description: "Find hidden compliance risks in your HR process",
      field: "socCode",
      type: "options",
      options: ["No - duties align precisely", "Minor overlap", "Yes / unsure"],
    },
    {
      id: 12,
      title: "When did you last run right-to-work checks on your sponsored workforce?",
      description: "Find hidden compliance risks in your HR process",
      field: "rtwChecks",
      type: "options",
      options: ["Within last 12 months for all", "Only at hiring", "Unsure"],
    },
    {
      id: 13,
      title: "Are you prepared for the April 2026 Employment Rights Act changes (day-one rights, SSP reform)?",
      description: "Find hidden compliance risks in your HR process",
      field: "eraReady",
      type: "options",
      options: [
        "Yes - policies updated",
        "Aware but not yet actioned",
        "Not familiar with the changes",
      ],
    },
    {
      id: 14,
      title: "Have you received any Home Office correspondence, compliance visits, or action notices in the last 24 months?",
      description: "Find hidden compliance risks in your HR process",
      field: "homeOfficeContact",
      type: "options",
      options: [
        "No contact",
        "Routine visit, no issues raised",
        "Action notice / downgrade / warning received",
      ],
    },
    {
      id: 15,
      title: "If the Home Office conducted an unannounced audit tomorrow, how confident are you? (1 = not at all, 10 = fully prepared)",
      description: "Find hidden compliance risks in your HR process",
      field: "confidence",
      type: "confidence",
    },
    {
      id: 16,
      title: "Get Free HR Compliance Audit",
      description: "Your score is based on your answers across 8 areas the Home Office examines during a sponsor compliance visit.",
      field: "contact",
      type: "contact",
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
    formData.companyName.trim() !== "" &&
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
      sector: "",
      cosAssigned: "",
      rtwStorage: "",
      internalAudit: "",
      qualifications: "",
      reportingDuties: "",
      roleChanges: "",
      level1User: "",
      salaryThreshold: "",
      genuineVacancy: "",
      socCode: "",
      rtwChecks: "",
      eraReady: "",
      homeOfficeContact: "",
      confidence: "",
      fullName: "",
      companyName: "",
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
            FREE 60-SECOND COMPLIANCE CHECK
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            Could your sponsor licence survive a Home Office audit tomorrow?
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Find hidden compliance risks in your HR process. Answer 16 questions. Get a Compliance 
            Score out of 100, a personalised findings report, and three specific actions for the gaps 
            that matter most. Under four minutes. Free.
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
            <h4 className="text-sm font-semibold text-text mb-2">What you will receive:</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-text">1. Your Compliance Score</span>
                  <p className="text-xs text-text-light">A 0-100 rating against the five pillars Home Office auditors examine.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-text">2. The Three Gaps That Matter</span>
                  <p className="text-xs text-text-light">Not a generic checklist. The three highest-risk findings specific to your answers.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-sm font-medium text-text">3. April 2026 Readiness Review</span>
                  <p className="text-xs text-text-light">Where your policies will fall short of the Employment Rights Act changes.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startAudit}
            className="w-full btn btn-primary h-14 text-base"
          >
            BEGIN AUDIT
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
            WORK PERMIT CLOUD · COMPLIANCE AUDIT
          </div>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Compliance Score
            </h3>
            <div className="text-5xl font-black text-primary mb-2">98/100</div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 mb-4">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">Risk Band: Green - Strong</span>
            </div>
            <p className="text-text-light text-sm leading-relaxed mb-4">
              Strong compliance posture. Focus on forward-looking risks and succession planning.
              Some answers indicate risk. Others don't. Your full report shows exactly which, why each one
              matters, and what to fix first.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-warning/10 border border-warning/20 mb-6">
            <h4 className="text-sm font-semibold text-text mb-2">Why this matters now</h4>
            <p className="text-sm text-text-light leading-relaxed">
              Sponsor licence revocations are at a five-year high. Compliance visits are unannounced. 
              If revoked, every sponsored worker on your books loses their right to work within 60 days.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-3">Get your full audit report</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-light">Which areas the Home Office would flag</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-light">The specific rule each concern maps to</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-light">A prioritised action plan — what to fix first, this week, this month</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-text-light">Free 15-minute review call</span>
              </li>
            </ul>
            <p className="text-xs text-text-muted mt-3">Confidential — your answers aren't shared with the Home Office or any third party</p>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Your name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Company name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="IDTCltd"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="idtcltd@yopmail.com"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+447467364711"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
            <p className="text-xs text-text-muted">
              By submitting, you agree to be contacted by Work Permit Cloud about your audit and compliance services. 
              We will not share your details.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleDownload}
              className="btn btn-primary flex-1 h-14 text-base"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>

          {showDownloadSuccess && (
            <div className="mt-3 p-3 rounded-xl bg-success/10 border border-success/20 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-sm font-medium text-success">PDF downloaded successfully!</span>
            </div>
          )}

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Start a new audit
          </button>
        </div>
      );
    }

    // Step form
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return null;

    const selectedValue = formData[currentQuestion.field];
    const progressPercent = ((currentStep + 1) / questions.length) * 100;

    const getStepContent = () => {
      if (currentQuestion.type === "sector") {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect("sector", sector.label)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedValue === sector.label
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-text text-sm">{sector.label}</span>
                    {selectedValue === sector.label && (
                      <CheckCircle className="w-4 h-4 text-primary ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );
      }

      if (currentQuestion.type === "confidence") {
        return (
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-text-light">Not at all prepared</span>
              <span className="text-xs text-text-light">Fully prepared</span>
            </div>
            <div className="grid grid-cols-10 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => handleOptionSelect("confidence", num.toString())}
                  className={`p-2 rounded-lg border-2 transition-all duration-200 text-center ${
                    selectedValue === num.toString()
                      ? "border-primary bg-primary/5 text-primary font-bold"
                      : "border-border hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  <span className="text-xs">{num}</span>
                </button>
              ))}
            </div>
            {selectedValue && (
              <div className="text-center text-sm font-medium text-primary">
                {selectedValue}/10
              </div>
            )}
          </div>
        );
      }

      if (currentQuestion.type === "contact") {
        return (
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">98/100</div>
                <div className="text-xs text-text-light">Compliance Score</div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-success/10 border border-success/20 mt-1">
                  <ShieldCheck className="w-3 h-3 text-success" />
                  <span className="text-xs font-medium text-success">Risk Band: Green - Strong</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Your name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Doe"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Company name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                placeholder="IDTCltd"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="idtcltd@yopmail.com"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+447467364711"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <p className="text-xs text-text-muted">
              By submitting, you agree to be contacted by Work Permit Cloud about your audit and compliance services. 
              We will not share your details.
            </p>
          </div>
        );
      }

      // Default options
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
    };

    const isStepValid = () => {
      if (currentQuestion.type === "sector") return !!formData.sector;
      if (currentQuestion.type === "confidence") return !!formData.confidence;
      if (currentQuestion.type === "contact") return isContactStepValid;
      return !!formData[currentQuestion.field];
    };

    const getStepTitle = () => {
      if (currentQuestion.id === 6 || currentQuestion.id === 7 || currentQuestion.id === 8) {
        return "REPORTING DUTIES";
      }
      if (currentQuestion.id === 9 || currentQuestion.id === 10 || currentQuestion.id === 11) {
        return "GENUINE VACANCY & SALARY";
      }
      if (currentQuestion.id === 12 || currentQuestion.id === 13 || currentQuestion.id === 14 || currentQuestion.id === 15) {
        return "RIGHT-TO-WORK & HORIZON";
      }
      return null;
    };

    const stepLabel = getStepTitle();

    return (
      <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
          {stepLabel || "WORK PERMIT CLOUD · COMPLIANCE AUDIT"}
        </div>

        {currentQuestion.type !== "contact" && (
          <>
            <h3 className="text-xl font-bold text-text mb-2">
              {currentQuestion.title}
            </h3>
            <p className="text-sm text-text-light leading-relaxed mb-6">
              {currentQuestion.description}
            </p>
          </>
        )}

        {currentQuestion.type === "contact" && (
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
              Free HR Compliance Audit
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              Could Your Sponsor Licence <br />
              <span className="text-primary">Survive a Home Office Audit Tomorrow?</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              The Home Office conducts unannounced compliance visits - and many UK sponsors only discover the
              gaps in their HR processes when it is too late. Our free 60-second compliance check asks you 16
              questions across the five pillars that Home Office auditors examine and gives you an instant
              Compliance Score out of 100, your three highest-risk findings, and a personalised April 2026
              Employment Rights Act readiness review.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">IAA Regulated</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">Winner: Immigration Lawyer of the Year 2024</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <Clock className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">Under 4 minutes</span>
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

export default HrCAHeroSection;