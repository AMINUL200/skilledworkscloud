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
  X,
  AlertTriangle,
} from "lucide-react";

const CITAWHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    visaType: "",
    cosDate: "",
    continuousLeave: "",
    stillWorking: "",
    mainJobHours: "",
    mainJobSchedule: "",
    jobTitle: "",
    weeklyHours: "",
    socCode: "",
    sameSocCode: "",
    skillLevel: "",
    onSalaryList: "",
    hoursOverlap: "",
    employerName: "",
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
      visaType: "",
      cosDate: "",
      continuousLeave: "",
      stillWorking: "",
      mainJobHours: "",
      mainJobSchedule: "",
      jobTitle: "",
      weeklyHours: "",
      socCode: "",
      sameSocCode: "",
      skillLevel: "",
      onSalaryList: "",
      hoursOverlap: "",
      employerName: "",
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
      title: "Visa Type",
      description: "A screening tool for Skilled Worker visa holders considering a second job, reflecting the Immigration Rules as amended on 22 July 2025.",
      field: "visaType",
      type: "visaType",
      options: ["Skilled Worker", "Other"],
    },
    {
      id: 2,
      title: "Your Skilled Worker Details",
      description: "Check if supplementary employment is allowed",
      field: "skilledWorker",
      type: "skilledWorker",
    },
    {
      id: 3,
      title: "Proposed Supplementary Job",
      description: "Check if supplementary employment is allowed",
      field: "supplementaryJob",
      type: "supplementaryJob",
    },
    {
      id: 4,
      title: "Fill the info to download the report",
      description: "We will email you a detailed breakdown along with a complimentary profile creation on WPC Jobs to connect with employees.",
      field: "contact",
      isContactStep: true,
    },
  ];

  const renderRightContent = () => {
    // Default view
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            WPC - SUPPLEMENTARY WORK ELIGIBILITY CHECKER
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            I'm a Skilled Worker considering a second job
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            A screening tool for Skilled Worker visa holders considering a second job, 
            reflecting the Immigration Rules as amended on 22 July 2025.
          </p>

          <div className="space-y-3 mb-6">
            <label className="block text-sm font-medium text-text mb-2">Visa Type</label>
            {questions[0].options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  handleOptionSelect("visaType", option);
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
          <button
            onClick={resetForm}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← Back
          </button>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <X className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">
              Does not meet supplementary employment rules
            </h3>
            <p className="text-text-light text-sm leading-relaxed">
              Screening complete · Based on Immigration Rules amended 22 July 2025
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-4">Your Assessment Findings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border">
                <div>
                  <p className="text-xs text-text-muted">Reason</p>
                  <p className="text-sm font-medium text-text">Hours Overlap With Main Job</p>
                </div>
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border">
                <div>
                  <p className="text-xs text-text-muted">Weekly Hours</p>
                  <p className="text-sm font-medium text-text">10 hrs/wk</p>
                </div>
                <span className="text-xs font-semibold text-success">Within 20-hr cap</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border">
                <div>
                  <p className="text-xs text-text-muted">Role Level</p>
                  <p className="text-sm font-medium text-text">Below RQF 3</p>
                </div>
                <span className="text-xs font-semibold text-warning">Same level</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-border">
                <div>
                  <p className="text-xs text-text-muted">Combined Hours</p>
                  <p className="text-sm font-medium text-text">41 hrs/wk</p>
                </div>
                <span className="text-xs font-semibold text-success">Within 48-hr limit</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
            <h4 className="text-sm font-semibold text-text mb-2">Suggested Action:</h4>
            <button className="btn btn-primary w-full h-12 text-sm">
              Book a Full Compliance Review
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-warning/10 border border-warning/20 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-text">This screening isn't a legal clearance.</p>
                <p className="text-xs text-text-light leading-relaxed mt-1">
                  Starting supplementary work without a formal check risks sponsor licence action - 
                  even if the role appears to qualify
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-xs text-red-600 flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                Working without this check puts you at serious risk
              </p>
              <ul className="text-xs text-text-light space-y-1 pl-5 list-disc">
                <li>Visa curtailment before expiry date</li>
                <li>Civil penalty up to £20,000</li>
                <li>Impact on future visa & settlement</li>
              </ul>
              <p className="text-xs text-text-muted mt-2">
                Indicative screening only - not legal advice. Obtain written advice before starting the role.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-6">
            <h4 className="text-sm font-semibold text-text mb-3">Recommended Next Step</h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">Expert Contract Drafting</p>
                    <p className="text-xs text-text-light">A compliant supplementary employment contract covering hours, SOC references, and immigration conditions.</p>
                  </div>
                  <span className="text-xs font-bold text-primary">Included</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">NOC Drafting & Documentation</p>
                    <p className="text-xs text-text-light">Expert-drafted NOC/declaration your main employer must sign - required evidence during UKVI audits.</p>
                  </div>
                  <span className="text-xs font-bold text-primary">Included</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">Complete Right-to-Work Check</p>
                    <p className="text-xs text-text-light">Employer receives your permission to take the second job, including share code and document review.</p>
                  </div>
                  <span className="text-xs font-bold text-primary">Included</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-text">Expert Eligibility Consultation</p>
                    <p className="text-xs text-text-light">A qualified immigration specialist reviews your full situation - visa conditions, SOC code, hours, and employer.</p>
                  </div>
                  <span className="text-xs font-bold text-primary">£100</span>
                </div>
                <p className="text-xs text-text-muted mt-1">one-off · no hidden fees</p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm font-semibold text-text">Full compliance package · 4 deliverables</p>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="btn btn-outline flex-1 h-12 text-sm">
              Speak to an expert first
            </button>
            <button className="btn btn-primary flex-1 h-12 text-sm">
              Proceed to Next Steps
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

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

          <p className="text-[10px] text-text-muted text-center mt-4">
            This checker provides an indicative screening only and does not constitute legal advice. 
            Supplementary employment compliance is fact-sensitive; obtain written advice before the worker begins the role
          </p>
        </div>
      );
    }

    // Step form
    const currentQuestion = questions[currentStep];
    if (!currentQuestion) return null;

    const selectedValue = formData[currentQuestion.field];
    const progressPercent = ((currentStep + 1) / questions.length) * 100;

    const renderStepContent = () => {
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

      if (currentQuestion.type === "skilledWorker") {
        return (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Date of First Skilled Worker CoS
              </label>
              <input
                type="date"
                value={formData.cosDate}
                onChange={(e) => handleInputChange("cosDate", e.target.value)}
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Continuous Skilled Worker leave since that date?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No, there was Gap"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("continuousLeave", option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.continuousLeave === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-text text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Still working in your sponsored role?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("stillWorking", option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.stillWorking === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-text text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Main job hours / week
              </label>
              <input
                type="number"
                value={formData.mainJobHours}
                onChange={(e) => handleInputChange("mainJobHours", e.target.value)}
                placeholder="31"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Main job schedule
              </label>
              <input
                type="text"
                value={formData.mainJobSchedule}
                onChange={(e) => handleInputChange("mainJobSchedule", e.target.value)}
                placeholder="mon to friday"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
          </div>
        );
      }

      if (currentQuestion.type === "supplementaryJob") {
        return (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Job Title
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                placeholder="e.g. Care Assistant"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Weekly hours of second job
              </label>
              <input
                type="number"
                value={formData.weeklyHours}
                onChange={(e) => handleInputChange("weeklyHours", e.target.value)}
                placeholder="Max 20"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                SOC 2020 occupation code
              </label>
              <input
                type="text"
                value={formData.socCode}
                onChange={(e) => handleInputChange("socCode", e.target.value)}
                placeholder="e.g. 6135"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Same SOC code as main job?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("sameSocCode", option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.sameSocCode === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-text text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Visa: Skill Level
              </label>
              <div className="space-y-2">
                {["RQF 6 - Graduate level", "RQF 3-5 - Medium skilled", "Below RQF 3 - Elementary"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("skillLevel", option)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.skillLevel === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-text text-sm">{option}</span>
                      {formData.skillLevel === option && (
                        <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                On Immigration Salary List?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No / not sure"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("onSalaryList", option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.onSalaryList === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-text text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Overlap with main job hours?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect("hoursOverlap", option)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      formData.hoursOverlap === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted"
                    }`}
                  >
                    <span className="text-text text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Employer Name
              </label>
              <input
                type="text"
                value={formData.employerName}
                onChange={(e) => handleInputChange("employerName", e.target.value)}
                placeholder="e.g. ABC Care Ltd."
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>
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
      if (currentQuestion.type === "visaType") return !!formData.visaType;
      if (currentQuestion.type === "skilledWorker") {
        return formData.cosDate && formData.continuousLeave && formData.stillWorking && 
               formData.mainJobHours && formData.mainJobSchedule;
      }
      if (currentQuestion.type === "supplementaryJob") {
        return formData.jobTitle && formData.weeklyHours && formData.socCode && 
               formData.sameSocCode && formData.skillLevel && formData.onSalaryList && 
               formData.hoursOverlap && formData.employerName;
      }
      if (currentQuestion.isContactStep) return isContactStepValid;
      return false;
    };

    const getStepLabel = () => {
      const labels = {
        1: "VISA TYPE",
        2: "SKILLED WORKER DETAILS",
        3: "SUPPLEMENTARY JOB",
        4: "CONTACT INFO",
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
          ) : currentQuestion.type === "supplementaryJob" ? (
            <button
              onClick={handleContinue}
              disabled={!isStepValid()}
              className={`btn btn-primary flex-1 h-12 ${
                !isStepValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Check Eligibility
              <ArrowRight className="w-4 h-4" />
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
              Free Supplementary Work Check
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              Can I Take a Second Job? <br />
              <span className="text-primary">Supplementary Work Eligibility Checker for Skilled Workers</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Find out in 3 steps whether your proposed second job is permitted under UK Immigration 
              Rules amended 22 July 2025 - covering the 20-hour cap, skill level rules, SOC code 
              requirements, and Working Time Regulations. Instant result. Trusted by 7,000+ visa approvals.
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
                <Clock className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">Rules updated 22 July 2025</span>
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

export default CITAWHeroSection;