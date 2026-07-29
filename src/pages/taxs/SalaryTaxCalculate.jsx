import React, { useState, useEffect } from "react";

import TaxHeroSection from "./TaxHeroSection";
import TaxCalculatorForm from "./TaxCalculatorForm";
import TaxResultsSection from "./TaxResultsSection";
import TaxPayslipSimulator from "./TaxPayslipSimulator";
import TaxHowToUseSection from "./TaxHowToUseSection";

const SalaryTaxCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [showPayslip, setShowPayslip] = useState(false);
  const [formData, setFormData] = useState({
    grossSalary: 50000,
    salaryPeriod: "annually",
    taxYear: "2024-2025",
    country: "England",
    taxCode: "1257L",
    workingHours: 37.5,
    pensionContribution: 5,
    pensionType: "auto-enrolment",
    studentLoan: "none",
    annualBonus: 0,
    overtimeHours: 0,
    overtimeRate: 1.5,
    dividendIncome: 0,
    pensionIncome: 0,
    companyCar: false,
    fuelBenefit: false,
    marriageAllowance: false,
    blindAllowance: false,
    salarySacrifice: 0,
  });

  const [results, setResults] = useState({
    grossSalary: 0,
    incomeTax: 0,
    nationalInsurance: 0,
    studentLoan: 0,
    pension: 0,
    employerNI: 0,
    employerCost: 0,
    netSalary: 0,
    monthlyNet: 0,
    weeklyNet: 0,
    dailyNet: 0,
    hourlyNet: 0,
  });

  // Tax bands for England 2024-2025
  const taxBands = {
    England: {
      personalAllowance: 12570,
      basicRate: 0.2,
      basicThreshold: 37700,
      higherRate: 0.4,
      higherThreshold: 125140,
      additionalRate: 0.45,
    },
    Scotland: {
      personalAllowance: 12570,
      starterRate: 0.19,
      starterThreshold: 2322,
      basicRate: 0.2,
      basicThreshold: 13922,
      intermediateRate: 0.21,
      intermediateThreshold: 23262,
      higherRate: 0.42,
      higherThreshold: 43662,
      topRate: 0.48,
      topThreshold: 125140,
    },
    Wales: {
      personalAllowance: 12570,
      basicRate: 0.2,
      basicThreshold: 37700,
      higherRate: 0.4,
      higherThreshold: 125140,
      additionalRate: 0.45,
    },
    "Northern Ireland": {
      personalAllowance: 12570,
      basicRate: 0.2,
      basicThreshold: 37700,
      higherRate: 0.4,
      higherThreshold: 125140,
      additionalRate: 0.45,
    },
  };

  // NI bands 2024-2025
  const niBands = {
    primaryThreshold: 12570,
    upperEarningsLimit: 50270,
    mainRate: 0.08,
    additionalRate: 0.02,
    employerMainRate: 0.138,
    employerAdditionalRate: 0.138,
  };

  // Student loan plans
  const studentLoanPlans = {
    none: { threshold: Infinity, rate: 0 },
    plan1: { threshold: 22315, rate: 0.09 },
    plan2: { threshold: 27295, rate: 0.09 },
    plan4: { threshold: 27660, rate: 0.09 },
    plan5: { threshold: 25000, rate: 0.09 },
    postgraduate: { threshold: 21000, rate: 0.06 },
  };

  const salaryPeriods = ["Hourly", "Daily", "Weekly", "Monthly", "Annually"];
  const countries = ["England", "Scotland", "Wales", "Northern Ireland"];

  useEffect(() => {
    calculateTax();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateTax = () => {
    setLoading(true);

    setTimeout(() => {
      const annualSalary = formData.grossSalary;
      const taxBandsData = taxBands[formData.country] || taxBands.England;
      const loanPlan =
        studentLoanPlans[formData.studentLoan] || studentLoanPlans.none;

      // Calculate Income Tax
      let incomeTax = 0;
      let taxableIncome = annualSalary - taxBandsData.personalAllowance;

      if (taxableIncome > 0) {
        if (formData.country === "Scotland") {
          // Scottish tax calculation
          if (taxableIncome > taxBandsData.topThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.topThreshold) *
              taxBandsData.topRate;
            taxableIncome = taxBandsData.topThreshold;
          }
          if (taxableIncome > taxBandsData.higherThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.higherThreshold) *
              taxBandsData.higherRate;
            taxableIncome = taxBandsData.higherThreshold;
          }
          if (taxableIncome > taxBandsData.intermediateThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.intermediateThreshold) *
              taxBandsData.intermediateRate;
            taxableIncome = taxBandsData.intermediateThreshold;
          }
          if (taxableIncome > taxBandsData.basicThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.basicThreshold) *
              taxBandsData.basicRate;
            taxableIncome = taxBandsData.basicThreshold;
          }
          if (taxableIncome > taxBandsData.starterThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.starterThreshold) *
              taxBandsData.starterRate;
          }
        } else {
          // England/Wales/NI tax calculation
          if (taxableIncome > taxBandsData.higherThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.higherThreshold) *
              taxBandsData.additionalRate;
            taxableIncome = taxBandsData.higherThreshold;
          }
          if (taxableIncome > taxBandsData.basicThreshold) {
            incomeTax +=
              (taxableIncome - taxBandsData.basicThreshold) *
              taxBandsData.higherRate;
            taxableIncome = taxBandsData.basicThreshold;
          }
          incomeTax += taxableIncome * taxBandsData.basicRate;
        }
      }

      // Calculate National Insurance
      let nationalInsurance = 0;
      const niThreshold = niBands.primaryThreshold;
      const niUpperLimit = niBands.upperEarningsLimit;

      if (annualSalary > niThreshold) {
        const niBase = Math.min(annualSalary, niUpperLimit) - niThreshold;
        nationalInsurance += niBase * niBands.mainRate;
        if (annualSalary > niUpperLimit) {
          nationalInsurance +=
            (annualSalary - niUpperLimit) * niBands.additionalRate;
        }
      }

      // Calculate Student Loan
      let studentLoan = 0;
      if (formData.studentLoan !== "none") {
        const loanableIncome = annualSalary - loanPlan.threshold;
        if (loanableIncome > 0) {
          studentLoan = loanableIncome * loanPlan.rate;
        }
      }

      // Calculate Pension
      let pension = 0;
      if (formData.pensionContribution > 0) {
        const pensionableSalary =
          annualSalary * (formData.pensionContribution / 100);
        pension = pensionableSalary;
      }

      // Calculate Employer NI
      let employerNI = 0;
      const employerThreshold = 9100;
      if (annualSalary > employerThreshold) {
        employerNI =
          (annualSalary - employerThreshold) * niBands.employerMainRate;
      }

      // Calculate Net Salary
      const totalDeductions =
        incomeTax + nationalInsurance + studentLoan + pension;
      const netSalary = annualSalary - totalDeductions;

      // Calculate Employer Cost
      const employerCost = annualSalary + employerNI;

      // Calculate periodic breakdowns
      const monthlyNet = netSalary / 12;
      const weeklyNet = netSalary / 52;
      const dailyNet = netSalary / 260;
      const hourlyNet = netSalary / (formData.workingHours * 52);

      setResults({
        grossSalary: annualSalary,
        incomeTax: incomeTax,
        nationalInsurance: nationalInsurance,
        studentLoan: studentLoan,
        pension: pension,
        employerNI: employerNI,
        employerCost: employerCost,
        netSalary: netSalary,
        monthlyNet: monthlyNet,
        weeklyNet: weeklyNet,
        dailyNet: dailyNet,
        hourlyNet: hourlyNet,
      });

      setLoading(false);
    }, 500);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white">
      <TaxHeroSection />

      {/* Main Calculator - White Background */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TaxCalculatorForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleNumberChange={handleNumberChange}
              calculateTax={calculateTax}
              loading={loading}
              salaryPeriods={salaryPeriods}
              countries={countries}
            />

            <TaxResultsSection
              results={results}
              showPayslip={showPayslip}
              setShowPayslip={setShowPayslip}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </section>

      {/* Payslip Simulator Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxPayslipSimulator formatCurrency={formatCurrency} />
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxHowToUseSection />
        </div>
      </section>
    </div>
  );
};

export default SalaryTaxCalculator;