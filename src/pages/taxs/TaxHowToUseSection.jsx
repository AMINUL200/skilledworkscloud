import React from "react";
import {
  HelpCircle,
  CheckCircle,
  Wallet,
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Calculator,
} from "lucide-react";

const TaxHowToUseSection = () => {
  const steps = [
    {
      step: "1",
      title: "Enter Your Salary",
      description:
        "Input your gross annual salary and select your payment frequency.",
      icon: Wallet,
    },
    {
      step: "2",
      title: "Choose Your Location",
      description:
        "Select your country (England, Scotland, Wales, or Northern Ireland) for accurate tax calculations.",
      icon: MapPin,
    },
    {
      step: "3",
      title: "Add Employment Details",
      description:
        "Enter your tax code, working hours, and pension contribution percentage.",
      icon: Briefcase,
    },
    {
      step: "4",
      title: "Select Student Loan Plan",
      description:
        "Choose your student loan plan if applicable (Plan 1, 2, 4, 5, or Postgraduate).",
      icon: GraduationCap,
    },
    {
      step: "5",
      title: "Add Additional Income",
      description:
        "Include bonuses, dividend income, or other additional earnings.",
      icon: TrendingUp,
    },
    {
      step: "6",
      title: "View Your Results",
      description:
        "Get instant breakdown of your income tax, NI, pension, and take-home pay.",
      icon: Calculator,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">
          How to Use Our Tax Calculator
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.step}
              className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Pro Tip:</span> All calculations
              are based on the current UK tax year (2024-2025) and are updated
              automatically when tax rates change. Your results are for
              reference only and should not be used for official tax filing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxHowToUseSection;
