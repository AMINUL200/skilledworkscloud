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
} from "lucide-react";

const SLSCHeroSection = () => {
  const [isStepFormActive, setIsStepFormActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
  });
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSearch = () => {
    if (formData.companyName.trim()) {
      setIsStepFormActive(true);
      setCurrentStep(1);
      // Simulate search result - Not Found
      setSearchResult({
        found: false,
        company: formData.companyName,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const startAudit = () => {
    setIsStepFormActive(true);
    setCurrentStep(0);
    setShowResults(false);
    setSearchResult(null);
    setFormData({
      companyName: "",
    });
  };

  const resetForm = () => {
    setIsStepFormActive(false);
    setCurrentStep(0);
    setShowResults(false);
    setSearchResult(null);
    setFormData({
      companyName: "",
    });
  };

  const handleNewSearch = () => {
    setCurrentStep(0);
    setSearchResult(null);
    setFormData({
      companyName: "",
    });
  };

  const renderRightContent = () => {
    // Default view - Step 0: Search
    if (!isStepFormActive || currentStep === 0) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
            Check Sponsor Licence Status
          </div>

          <h3 className="text-xl font-bold text-text mb-3">
            I need to check if a company holds a sponsor licence
          </h3>

          <p className="text-sm text-text-light leading-relaxed mb-6">
            Instantly verify any UK employer against the live UKVI Register of Licensed Sponsors. 
            See licence status, understand what it means, and get your next steps.
          </p>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
              <Building className="w-4 h-4" />
              <span>Work Permit Cloud</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search Company Here"
                className="w-full p-4 rounded-xl border-2 border-border focus:border-primary focus:outline-none text-sm text-text bg-surface transition-colors pr-24"
              />
              <button
                onClick={handleSearch}
                disabled={!formData.companyName.trim()}
                className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1 ${
                  formData.companyName.trim()
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                } transition-colors`}
              >
                <Search className="w-4 h-4" />
                Check
              </button>
            </div>
            <p className="text-xs text-text-muted mt-2 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-green-500" />
              Searches the UKVI Register of Licensed Sponsors · Updated by Home Office
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-success/10 border border-success/20">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="text-xs font-medium text-text">IAA Regulated</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/20">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-text">Live Register Data</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary-bright/10 border border-primary-bright/20">
              <Zap className="w-4 h-4 text-primary-bright" />
              <span className="text-xs font-medium text-text">Instant Results</span>
            </div>
          </div>
        </div>
      );
    }

    // Results view - Not Found
    if (currentStep === 1 && searchResult && !searchResult.found) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <button
            onClick={handleNewSearch}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← New search
          </button>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Not Found in Register
            </h3>
            <p className="text-text-light text-sm leading-relaxed mb-2">
              <span className="font-medium text-text">{searchResult.company}</span>
            </p>
            <p className="text-text-light text-sm leading-relaxed">
              This company does not appear on the UKVI Register of Licensed Sponsors. 
              They may not hold a sponsor licence, or the company name may differ from 
              their official registered name at Companies House.
            </p>
          </div>

          <button
            onClick={handleNewSearch}
            className="w-full btn btn-outline h-12 text-base"
          >
            Try a different name
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-6 p-4 rounded-2xl bg-muted border border-border">
            <h4 className="text-sm font-semibold text-text mb-4">
              Need a Sponsor Licence?
            </h4>
            
            {/* Two Cards Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-border">
                <div className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                  <Building2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Step 1: WPC Accountants Ltd</span>
                </div>
                <p className="text-xs text-text-light leading-relaxed mb-2">
                  UKVI rejects licence applications that lack proper financial evidence. 
                  WPC Accountants prepares the exact documents the Home Office needs to 
                  trust your business.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">✓ Accounts Preparation</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">📄 Payroll & Corporation Tax</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">🛡 VAT Registration & Returns</span>
                </div>
                <button className="mt-2 btn btn-primary w-full h-10 text-xs sm:text-sm whitespace-normal break-words leading-tight py-2 px-3">
                  <span>Get Licence-Ready With WPC Accountants</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white border border-border">
                <div className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>Step 2: Apply for a Sponsor Licence</span>
                </div>
                <p className="text-xs text-text-light leading-relaxed mb-2">
                  Once your financials are in order, WPC's IAA-regulated immigration team 
                  handles the Full Home Office application – so you don't miss a thing.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">✓ Eligibility Assessment</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">📄 Document Preparation & Submission</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">🛡 SMS Setup & Compliance Onboarding</span>
                </div>
                <button className="mt-2 btn btn-primary w-full h-10 text-xs sm:text-sm whitespace-normal break-words leading-tight py-2 px-3">
                  <span>Apply For A Sponsor Licence With WPC</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-light">IAA Regulated · F202100311</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-xs text-text-light">Cyber Essentials Certified</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Results view - Found
    if (currentStep === 1 && searchResult && searchResult.found) {
      return (
        <div className="bg-surface rounded-[32px] p-8 shadow-card border border-border">
          <button
            onClick={handleNewSearch}
            className="text-sm text-text-muted hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← New search
          </button>

          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-2">
              Sponsor Licence Found
            </h3>
            <p className="text-text-light text-sm leading-relaxed mb-2">
              <span className="font-medium text-text">{searchResult.company}</span>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 border border-success/20 mb-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-semibold text-success">✅ Active Sponsor</span>
            </div>
            <p className="text-text-light text-sm leading-relaxed">
              This company holds a valid UK Sponsor Licence and is registered with the Home Office.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-muted border border-border mb-4">
            <h4 className="text-sm font-semibold text-text mb-2">Licence Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-light">Licence Status:</span>
                <span className="font-medium text-success">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Licence Type:</span>
                <span className="font-medium text-text">Worker & Temporary Worker</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Last Updated:</span>
                <span className="font-medium text-text">15 August 2026</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="btn btn-primary flex-1 h-12 text-base">
              <ExternalLink className="w-4 h-4" />
              View Full Details
            </button>
            <button className="btn btn-outline flex-1 h-12 text-base">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>

          <button
            onClick={resetForm}
            className="w-full mt-3 text-center text-sm text-text-muted hover:text-primary transition-colors"
          >
            ← Start a new search
          </button>
        </div>
      );
    }

    return null;
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
              Check Any UK Employer's <br />
              <span className="text-primary">Sponsor Licence Status — Instant Results</span>
            </h1>

            <p className="mt-6 text-base text-text-light leading-relaxed max-w-2xl">
              Need to know if a UK employer is a licensed sponsor? Our free tool searches the 
              live UKVI Register of Licensed Sponsors in real time. Whether you hold a sponsor 
              licence yourself and want to check your status, you are a worker verifying a 
              prospective employer, or you are a business that has just been suspended - you 
              will have your answer in seconds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-text">IAA-regulated</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-text">Live Register Data</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-bright/10 border border-primary-bright/20">
                <Zap className="w-4 h-4 text-primary-bright" />
                <span className="text-sm font-medium text-text">Instant Results</span>
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

export default SLSCHeroSection;