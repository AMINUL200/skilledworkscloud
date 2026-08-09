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
  Sparkles,
} from "lucide-react";

/**
 * Collapse
 * Reusable animated wrapper that expands/collapses to the natural
 * height of its children using the CSS grid "0fr -> 1fr" technique.
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

/* Colour tokens per section */
const sectionTheme = {
  salary: { 
    icon: "text-blue-600", 
    chip: "bg-blue-50", 
    ring: "ring-blue-100",
    focus: "focus:ring-blue-500/40 focus:border-blue-500",
    gradient: "from-blue-50 to-blue-100/50",
    border: "border-blue-200",
    label: "text-blue-700",
  },
  employment: {
    icon: "text-indigo-600",
    chip: "bg-indigo-50",
    ring: "ring-indigo-100",
    focus: "focus:ring-indigo-500/40 focus:border-indigo-500",
    gradient: "from-indigo-50 to-indigo-100/50",
    border: "border-indigo-200",
    label: "text-indigo-700",
  },
  studentLoan: {
    icon: "text-sky-600",
    chip: "bg-sky-50",
    ring: "ring-sky-100",
    focus: "focus:ring-sky-500/40 focus:border-sky-500",
    gradient: "from-sky-50 to-sky-100/50",
    border: "border-sky-200",
    label: "text-sky-700",
  },
  additionalIncome: {
    icon: "text-cyan-600",
    chip: "bg-cyan-50",
    ring: "ring-cyan-100",
    focus: "focus:ring-cyan-500/40 focus:border-cyan-500",
    gradient: "from-cyan-50 to-cyan-100/50",
    border: "border-cyan-200",
    label: "text-cyan-700",
  },
  benefits: {
    icon: "text-blue-700",
    chip: "bg-blue-50",
    ring: "ring-blue-100",
    focus: "focus:ring-blue-500/40 focus:border-blue-500",
    gradient: "from-blue-50 to-blue-100/50",
    border: "border-blue-200",
    label: "text-blue-700",
  },
};

const SectionHeader = ({ title, icon: Icon, isVisible, onToggle, section }) => {
  const theme = sectionTheme[section] || sectionTheme.salary;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between group py-1"
      aria-expanded={isVisible}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg ${theme.chip} ring-1 ${theme.ring}`}
        >
          <Icon className={`w-4 h-4 ${theme.icon}`} />
        </span>
        <h3 className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="text-gray-400 group-hover:text-primary transition-colors">
        {isVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>
    </button>
  );
};

/* Premium input field styling */
const inputClass = (theme = 'salary') => {
  const t = sectionTheme[theme] || sectionTheme.salary;
  return `w-full px-4 py-3 rounded-xl border-2 
    bg-white/80 text-slate-900 placeholder:text-slate-400 
    ${t.focus} outline-none transition-all duration-200 
    border-slate-200 hover:border-slate-300 
    shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]
    hover:shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]
    focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.02),0_0_0_3px_rgba(37,99,235,0.08)]
    text-[15px] font-medium`;
};

const labelClass = "block text-xs font-semibold text-slate-600 mb-1.5 tracking-wide uppercase";

/* Premium select styling */
const selectClass = (theme = 'salary') => {
  const t = sectionTheme[theme] || sectionTheme.salary;
  return `w-full px-4 py-3 rounded-xl border-2 
    bg-white/80 text-slate-900 
    ${t.focus} outline-none transition-all duration-200 
    border-slate-200 hover:border-slate-300
    shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]
    hover:shadow-[inset_0_1px_3px_rgba(0,0,0,0.04)]
    focus:shadow-[inset_0_1px_3px_rgba(0,0,0,0.02),0_0_0_3px_rgba(37,99,235,0.08)]
    text-[15px] font-medium appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12`;
};

/* Premium checkbox styling */
const checkboxClass = "w-4 h-4 rounded-md border-2 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-0 transition-all duration-200 cursor-pointer";

const TaxCalculatorForm = ({
  formData,
  handleInputChange,
  handleNumberChange,
  calculateTax,
  loading,
  salaryPeriods,
  regions,
  taxCodes,
  niCategories,
  studentLoanPlans,
  pensionOptions,
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
      className="relative bg-white p-6 lg:p-8 rounded-[28px] h-fit self-start overflow-hidden
                 border border-blue-100
                 shadow-[0_2px_6px_rgba(15,23,42,0.04),0_16px_40px_-8px_rgba(37,99,235,0.14)]
                 hover:shadow-[0_2px_8px_rgba(15,23,42,0.06),0_24px_56px_-8px_rgba(37,99,235,0.20)]
                 transition-shadow duration-300 ease-out"
    >
      {/* ambient corner glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-100/0 blur-2xl" />

      <div className="relative flex items-center justify-between mb-7">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25">
            <Calculator className="w-5 h-5 text-white" />
          </span>
          Salary Details
        </h2>
        <span className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full ring-1 ring-blue-100">
          <Sparkles className="w-3 h-3" />
          Live results
        </span>
      </div>

      {/* Section 1: Salary Information - always rendered, header togglable */}
      <div className="space-y-4">
        <SectionHeader
          title="Salary Information"
          icon={Wallet}
          isVisible={visibleSections.salary}
          onToggle={() => toggleSection("salary")}
          section="salary"
        />

        <Collapse isOpen={visibleSections.salary}>
          <div className="space-y-4 pt-3 pb-2 pl-11">
            <div>
              <label className={labelClass}>Gross Salary (£)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">
                  £
                </span>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleNumberChange}
                  className={`${inputClass('salary')} pl-8 text-lg font-semibold`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Region</label>
              <select
                name="region_id"
                value={formData.region_id}
                onChange={handleInputChange}
                className={selectClass('salary')}
              >
                <option value="">Select Region</option>
                {regions?.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Tax Code</label>
              <select
                name="tax_code_id"
                value={formData.tax_code_id}
                onChange={handleInputChange}
                className={selectClass('salary')}
              >
                <option value="">Select Tax Code</option>
                {taxCodes?.map((taxCode) => (
                  <option key={taxCode.id} value={taxCode.id}>
                    {taxCode.code} - {taxCode.description} (£{parseFloat(taxCode.personal_allowance).toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Salary Period</label>
                <select
                  name="salaryPeriod"
                  value={formData.salaryPeriod}
                  onChange={handleInputChange}
                  className={selectClass('salary')}
                >
                  {salaryPeriods?.map((period) => (
                    <option key={period} value={period.toLowerCase()}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Working Hours/Week</label>
                <input
                  type="number"
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleNumberChange}
                  className={inputClass('salary')}
                />
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Show More / Show Less Button */}
      <button
        type="button"
        onClick={toggleAllSections}
        className="w-full my-6 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 border-t border-slate-100 pt-5"
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            showAllSections ? "rotate-180" : "rotate-0"
          }`}
        />
        {showAllSections ? "Show Less Options" : "Show More Options"}
      </button>

      {/* Sections 2-5: always mounted, height/opacity animated by Collapse */}
      <div className="space-y-6">
        {/* Section 2: Employment */}
        <Collapse isOpen={visibleSections.employment}>
          <div className="space-y-4">
            <SectionHeader
              title="Employment"
              icon={Briefcase}
              isVisible={visibleSections.employment}
              onToggle={() => toggleSection("employment")}
              section="employment"
            />
            <div className="space-y-4 pt-3 pl-11">
              <div>
                <label className={labelClass}>NI Category</label>
                <select
                  name="ni_category_id"
                  value={formData.ni_category_id}
                  onChange={handleInputChange}
                  className={selectClass('employment')}
                >
                  <option value="">Select NI Category</option>
                  {niCategories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.code} - {category.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Pension Contribution (%)</label>
                  <input
                    type="number"
                    name="pensionContribution"
                    value={formData.pensionContribution}
                    onChange={handleNumberChange}
                    className={inputClass('employment')}
                  />
                </div>
                <div>
                  <label className={labelClass}>Pension Type</label>
                  <select
                    name="pension_option_id"
                    value={formData.pension_option_id}
                    onChange={handleInputChange}
                    className={selectClass('employment')}
                  >
                    <option value="">Select Pension Type</option>
                    {pensionOptions?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name} ({option.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Collapse>

        {/* Section 3: Student Loan */}
        <Collapse isOpen={visibleSections.studentLoan}>
          <div className="space-y-4">
            <SectionHeader
              title="Student Loan"
              icon={GraduationCap}
              isVisible={visibleSections.studentLoan}
              onToggle={() => toggleSection("studentLoan")}
              section="studentLoan"
            />
            <div className="pt-3 pl-11">
              <select
                name="student_loan_plan_id"
                value={formData.student_loan_plan_id}
                onChange={handleInputChange}
                className={selectClass('studentLoan')}
              >
                <option value="">None</option>
                {studentLoanPlans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - Threshold: £{parseFloat(plan.threshold).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Collapse>

        {/* Section 4: Additional Income */}
        <Collapse isOpen={visibleSections.additionalIncome}>
          <div className="space-y-4">
            <SectionHeader
              title="Additional Income"
              icon={TrendingUp}
              isVisible={visibleSections.additionalIncome}
              onToggle={() => toggleSection("additionalIncome")}
              section="additionalIncome"
            />
            <div className="grid grid-cols-2 gap-4 pt-3 pl-11">
              <div>
                <label className={labelClass}>Annual Bonus (£)</label>
                <input
                  type="number"
                  name="annualBonus"
                  value={formData.annualBonus}
                  onChange={handleNumberChange}
                  className={inputClass('additionalIncome')}
                />
              </div>
              <div>
                <label className={labelClass}>Dividend Income (£)</label>
                <input
                  type="number"
                  name="dividendIncome"
                  value={formData.dividendIncome}
                  onChange={handleNumberChange}
                  className={inputClass('additionalIncome')}
                />
              </div>
            </div>
          </div>
        </Collapse>

        {/* Section 5: Benefits */}
        <Collapse isOpen={visibleSections.benefits}>
          <div className="space-y-4">
            <SectionHeader
              title="Benefits"
              icon={Gift}
              isVisible={visibleSections.benefits}
              onToggle={() => toggleSection("benefits")}
              section="benefits"
            />
            <div className="pt-3 pl-11">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "companyCar", label: "Company Car" },
                  { name: "fuelBenefit", label: "Fuel Benefit" },
                  { name: "marriageAllowance", label: "Marriage Allowance" },
                  { name: "blindAllowance", label: "Blind Allowance" },
                ].map((item) => (
                  <label
                    key={item.name}
                    className="flex items-center gap-2.5 text-sm text-slate-600 bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 cursor-pointer hover:border-blue-300 hover:bg-blue-50/40 transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={formData[item.name]}
                      onChange={handleInputChange}
                      className={checkboxClass}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className={labelClass}>Salary Sacrifice (£)</label>
                <input
                  type="number"
                  name="salarySacrifice"
                  value={formData.salarySacrifice}
                  onChange={handleNumberChange}
                  className={inputClass('benefits')}
                />
              </div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Calculate Button */}
      <div className="mt-7 pt-6 border-t border-slate-100">
        <button
          onClick={calculateTax}
          disabled={loading}
          className="w-full py-4 text-base font-semibold rounded-2xl flex items-center justify-center gap-2
                     bg-gradient-to-r from-blue-600 to-indigo-600 text-white
                     shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40
                     hover:-translate-y-0.5 active:translate-y-0
                     disabled:opacity-70 disabled:hover:translate-y-0
                     transition-all duration-200"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
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