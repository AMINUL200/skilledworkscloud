import React from "react";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Wallet,
  Briefcase,
  GraduationCap,
  Gift,
} from "lucide-react";

const TaxCalculatorForm = ({
  formData,
  handleInputChange,
  handleNumberChange,
  calculateTax,
  loading,
  salaryPeriods,
  countries,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-primary" />
        Salary Details
      </h2>

      {/* Section 1: Salary Information */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          Salary Information
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gross Salary (£)
          </label>
          <input
            type="number"
            name="grossSalary"
            value={formData.grossSalary}
            onChange={handleNumberChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary Period
            </label>
            <select
              name="salaryPeriod"
              value={formData.salaryPeriod}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              {salaryPeriods.map((period) => (
                <option key={period} value={period.toLowerCase()}>
                  {period}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Year
            </label>
            <select
              name="taxYear"
              value={formData.taxYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 2: Employment */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          Employment
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax Code
            </label>
            <input
              type="text"
              name="taxCode"
              value={formData.taxCode}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working Hours/Week
            </label>
            <input
              type="number"
              name="workingHours"
              value={formData.workingHours}
              onChange={handleNumberChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pension Contribution (%)
            </label>
            <input
              type="number"
              name="pensionContribution"
              value={formData.pensionContribution}
              onChange={handleNumberChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pension Type
            </label>
            <select
              name="pensionType"
              value={formData.pensionType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="auto-enrolment">Auto-Enrolment</option>
              <option value="salary-sacrifice">Salary Sacrifice</option>
              <option value="relief-at-source">Relief at Source</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Student Loan */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-primary" />
          Student Loan
        </h3>
        <div>
          <select
            name="studentLoan"
            value={formData.studentLoan}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="none">None</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan4">Plan 4</option>
            <option value="plan5">Plan 5</option>
            <option value="postgraduate">Postgraduate</option>
          </select>
        </div>
      </div>

      {/* Section 4: Additional Income */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Additional Income
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Bonus (£)
            </label>
            <input
              type="number"
              name="annualBonus"
              value={formData.annualBonus}
              onChange={handleNumberChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dividend Income (£)
            </label>
            <input
              type="number"
              name="dividendIncome"
              value={formData.dividendIncome}
              onChange={handleNumberChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Section 5: Benefits */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2">
          <Gift className="w-4 h-4 text-primary" />
          Benefits
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="companyCar"
              checked={formData.companyCar}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            Company Car
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="fuelBenefit"
              checked={formData.fuelBenefit}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            Fuel Benefit
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="marriageAllowance"
              checked={formData.marriageAllowance}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            Marriage Allowance
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="blindAllowance"
              checked={formData.blindAllowance}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary rounded focus:ring-primary"
            />
            Blind Allowance
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Salary Sacrifice (£)
          </label>
          <input
            type="number"
            name="salarySacrifice"
            value={formData.salarySacrifice}
            onChange={handleNumberChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateTax}
        disabled={loading}
        className="w-full btn btn-primary py-4 text-lg font-semibold rounded-xl flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            Calculate Now
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};

export default TaxCalculatorForm;
