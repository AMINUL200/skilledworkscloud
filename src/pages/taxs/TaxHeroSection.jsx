import { Calculator } from "lucide-react";
import React from "react";

const TaxHeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-light">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
          <Calculator className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-semibold tracking-wide">
            Free Tax Calculator
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          UK Salary Tax Calculator
        </h1>

        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Calculate your Income Tax, National Insurance, Pension, Student Loan
          and Take Home Pay instantly.
        </p>
      </div>
    </section>
  );
};

export default TaxHeroSection;
