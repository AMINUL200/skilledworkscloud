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
  CalendarDays,
} from "lucide-react";

const ILREHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    visaStartDate: "",
    fullName: "",
    email: "",
    phone: "",
  });

  // Calculate ILR date (5 years from visa start date)
  const calculateILRDate = (startDate) => {
    if (!startDate) return null;
    const date = new Date(startDate);
    date.setFullYear(date.getFullYear() + 5);
    return date;
  };

  const getEarliestApplicationDate = (ilrDate) => {
    if (!ilrDate) return null;
    const date = new Date(ilrDate);
    date.setDate(date.getDate() - 28); // 28 days before
    return date;
  };

  const ilrDate = calculateILRDate(formData.visaStartDate);
  const earliestDate = getEarliestApplicationDate(ilrDate);

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const steps = [
    {
      id: 1,
      title: "When did your visa start?",
      description: "We'll calculate your exact eligibility date instantly",
      field: "visaStartDate",
      type: "date",
    },
    {
      id: 2,
      title: "You'll be eligible for ILR approximately on",
      description: "Based on your Skilled Worker visa starting",
      field: "contact",
      type: "contact",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isContactStepValid =
    formData.fullName.trim() !== "" &&
    isValidEmail(formData.email) &&
    formData.phone.trim() !== "";

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
      visaStartDate: "",
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

  const renderRightContent = () => {
    // Default view
    if (!isStepFormActive) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            ILR ELIGIBILITY CALCULATOR
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            When did your visa start?
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            We'll calculate your exact eligibility date instantly
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-2">
              Enter your skilled worker visa issue date
            </label>
            <input
              type="date"
              value={formData.visaStartDate}
              onChange={(e) => {
                setFormData({ ...formData, visaStartDate: e.target.value });
              }}
              className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
            />
          </div>

          <button
            onClick={startAudit}
            disabled={!formData.visaStartDate}
            className={`w-full btn btn-primary h-14 text-base ${
              !formData.visaStartDate ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
              Your ILR roadmap is on its way
            </h3>
            <p className="text-text-light text-sm leading-relaxed mb-6">
              Full roadmap and 4-point risk check sent to{" "}
              <span className="font-medium text-text">{formData.email}</span>.
              It usually arrives within 2 minutes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-border/50">
                <span className="text-sm text-text-light">Qualifying date:</span>
                <span className="text-sm font-bold text-primary">
                  {formatDate(ilrDate)}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/50">
                <span className="text-sm text-text-light">Earliest application date:</span>
                <span className="text-sm font-bold text-primary">
                  {formatDate(earliestDate)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-light">Adviser call:</span>
                <span className="text-sm font-medium text-text">Within 24 hours</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-6">
            <p className="text-sm text-text-light text-center">
              An adviser will call you within 24 hours to review your visa history 
              and answer your questions. Free, no obligation.
            </p>
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

          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-xs text-text-light">3,000+ approved</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1">
              <span className="text-xs text-yellow-400">★</span>
              <span className="text-xs text-text-light">4.9 Google</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs text-text-light">IAA Regulated</span>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Start a new calculation
          </button>
        </div>
      );
    }

    // Step form
    const currentStepData = steps[currentStep];
    if (!currentStepData) return null;

    const getStepContent = () => {
      if (currentStepData.type === "date") {
        return (
          <div className="mb-6">
            <label className="block text-sm font-medium text-text mb-2">
              Enter your skilled worker visa issue date
            </label>
            <input
              type="date"
              value={formData.visaStartDate}
              onChange={(e) => handleInputChange("visaStartDate", e.target.value)}
              className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
            />
          </div>
        );
      }

      if (currentStepData.type === "contact") {
        return (
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
              <div className="text-center">
                <div className="text-3xl font-black text-primary">
                  {formatDate(ilrDate)}
                </div>
                <p className="text-xs text-text-light mt-1">
                  Based on your Skilled Worker visa starting {formatDate(new Date(formData.visaStartDate))}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-border/50">
                <h4 className="text-sm font-semibold text-text mb-2">
                  Get your personalised ILR roadmap
                </h4>
                <p className="text-xs text-text-light mb-2">
                  The full picture matters more.
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2 text-xs text-text-light">
                    <CheckCircle className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    Your exact qualifying date
                  </li>
                  <li className="flex items-start gap-2 text-xs text-text-light">
                    <CheckCircle className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    Earliest application window
                  </li>
                  <li className="flex items-start gap-2 text-xs text-text-light">
                    <CheckCircle className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    The 4 things that derail Skilled Worker ILR applications
                  </li>
                  <li className="flex items-start gap-2 text-xs text-text-light">
                    <CheckCircle className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    A free 15-minute adviser call within 24 hours
                  </li>
                </ul>
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
                placeholder="Aminul Islam"
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
                placeholder="aminulislamai7666669@yopmail.com"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+447576118432"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors"
              />
            </div>

            <p className="text-xs text-text-muted">
              By submitting, you agree to be contacted by Work Permit Cloud about your ILR enquiry by phone and email.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs text-text-light">IAA Regulated · F202100311 · Cyber Essentials Certified</span>
            </div>
          </div>
        );
      }

      return null;
    };

    const isStepValid = () => {
      if (currentStepData.type === "date") {
        return !!formData.visaStartDate;
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
          ILR ELIGIBILITY CALCULATOR
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
              {currentStepData.description} {formData.visaStartDate ? formatDate(new Date(formData.visaStartDate)) : ""}
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
            {currentStepData.type === "contact" ? "Get Expert ILR Help" : "Continue"}
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
              Free ILR Eligibility Check
            </span>

            <h1 className="mt-6 text-2xl md:text-3xl lg:text-4xl font-black leading-tight text-text">
              ILR Eligibility Calculator: <br />
              <span className="text-primary">Find Out Exactly When You Can Apply for UK Settlement</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Enter your Skilled Worker visa start date and get your exact ILR eligibility date in seconds. 
              Free, instant, and built on the current 5-year qualifying period rules - including the 180-day 
              absence limit, the £3,226 application fee, and the upcoming B2 English change in March 2027.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <Clock className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">Takes less than 60 seconds</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">Free, no signup</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <Users className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">3,000+ ILR approvals</span>
              </div>
            </div>

            <button 
              onClick={startAudit}
              className="mt-8 btn btn-primary px-8 py-3.5 text-base"
            >
              Find out my date
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

export default ILREHeroSection;