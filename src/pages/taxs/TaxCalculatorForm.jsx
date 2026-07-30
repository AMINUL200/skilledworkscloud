import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Wallet,
  Briefcase,
  GraduationCap,
  Gift,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Collapse
 * Reusable animated wrapper that expands/collapses to the natural
 * height of its children using the CSS grid "0fr -> 1fr" technique.
 * No JS height measurement, no fixed/min heights, no layout jumps.
 * Content stays mounted at all times so form state/validation is
 * never lost when a section is hidden.
 */
const Collapse = ({ isOpen, children, className = "" }) => (
  <div
    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${className}`}
    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    aria-hidden={!isOpen}
  >
    <div className="overflow-hidden">
      <div
        className={`min-h-0 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 delay-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, icon: Icon, isVisible, onToggle }) => (
  <button
    type="button"
    className="w-full flex items-center justify-between group"
    aria-expanded={isVisible}
  >
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {title}
      </h3>
    </div>
    
  </button>
);

const TaxCalculatorForm = ({
  formData,
  handleInputChange,
  handleNumberChange,
  calculateTax,
  loading,
  salaryPeriods,
  countries,
}) => {
  const [showAllSections, setShowAllSections] = useState(false);

  const [visibleSections, setVisibleSections] = useState({
    salary: true,
    employment: false,
    studentLoan: false,
    additionalIncome: false,
    benefits: false,
  });

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleAllSections = () => {
    const newState = !showAllSections;
    setShowAllSections(newState);
    setVisibleSections({
      salary: true,
      employment: newState,
      studentLoan: newState,
      additionalIncome: newState,
      benefits: newState,
    });
  };

  return (
    <div
      className="relative bg-white p-6 lg:p-8 rounded-3xl h-fit self-start
                 border-2 border-blue-200
                 shadow-[0_4px_8px_rgba(24,46,114,0.10),0_16px_32px_-4px_rgba(24,46,114,0.16),0_32px_64px_-12px_rgba(30,64,175,0.22)]
                 hover:shadow-[0_4px_8px_rgba(24,46,114,0.12),0_20px_40px_-4px_rgba(24,46,114,0.20),0_40px_80px_-12px_rgba(30,64,175,0.28)]
                 hover:-translate-y-0.5
                 hover:border-blue-300
                 transition-all duration-300 ease-out"
    >
      {/* subtle premium accent line along the top edge */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-primary" />
        Salary Details
      </h2>

      {/* Section 1: Salary Information - always rendered, header togglable */}
      <div className="space-y-4">
        <SectionHeader
          title="Salary Information"
          icon={Wallet}
          isVisible={visibleSections.salary}
          onToggle={() => toggleSection("salary")}
        />

        <Collapse isOpen={visibleSections.salary}>
          <div className="space-y-4 pt-2 pb-2">
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
        </Collapse>
      </div>

      {/* Show More / Show Less Button */}
      <button
        type="button"
        onClick={toggleAllSections}
        className="w-full my-6 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center justify-center gap-2 border-t border-gray-200 pt-4"
      >
        {showAllSections ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Show Less Options
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Show More Options
          </>
        )}
      </button>

      {/* Sections 2-5: always mounted, height/opacity animated by Collapse */}
      <div className="space-y-6">
        {/* Employment */}
        <Collapse isOpen={visibleSections.employment}>
          <div className="space-y-4">
            <SectionHeader
              title="Employment"
              icon={Briefcase}
              isVisible={visibleSections.employment}
              onToggle={() => toggleSection("employment")}
            />
            <div className="space-y-4 pt-2">
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
          </div>
        </Collapse>

        {/* Student Loan */}
        <Collapse isOpen={visibleSections.studentLoan}>
          <div className="space-y-4">
            <SectionHeader
              title="Student Loan"
              icon={GraduationCap}
              isVisible={visibleSections.studentLoan}
              onToggle={() => toggleSection("studentLoan")}
            />
            <div className="pt-2">
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
        </Collapse>

        {/* Additional Income */}
        <Collapse isOpen={visibleSections.additionalIncome}>
          <div className="space-y-4">
            <SectionHeader
              title="Additional Income"
              icon={TrendingUp}
              isVisible={visibleSections.additionalIncome}
              onToggle={() => toggleSection("additionalIncome")}
            />
            <div className="grid grid-cols-2 gap-4 pt-2">
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
        </Collapse>

        {/* Benefits */}
        <Collapse isOpen={visibleSections.benefits}>
          <div className="space-y-4">
            <SectionHeader
              title="Benefits"
              icon={Gift}
              isVisible={visibleSections.benefits}
              onToggle={() => toggleSection("benefits")}
            />
            <div className="pt-2">
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
              <div className="mt-4">
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
          </div>
        </Collapse>
      </div>

      {/* Calculate Button - Now at the bottom after all sections */}
      <div className="mt-6 pt-6 border-t border-gray-200">
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
              <Calculator className="w-5 h-5" />
              Calculate Now
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaxCalculatorForm;