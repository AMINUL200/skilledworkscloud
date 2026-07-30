import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle,
  Wallet,
  MapPin,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Calculator,
  ChevronDown,
  ChevronUp,
  User,
  DollarSign,
  FileText,
  Users,
  Gift,
  Clock,
  BookOpen,
  Lightbulb,
} from "lucide-react";

const TaxHowToUseSection = () => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    studentLoans: false,
    pension: false,
    bonus: false,
    taxCodes: false,
    niExemptions: false,
    dividend: false,
    otherOptions: false,
    overtime: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const SectionHeader = ({ title, icon: Icon, sectionKey, isVisible }) => (
    <button
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between group p-4 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-400 group-hover:text-primary transition-colors">
        {isVisible ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </button>
  );

  const Collapse = ({ isOpen, children }) => (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className={`px-4 pb-4 ${isOpen ? "opacity-100" : "opacity-0"}`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">
          How to Use Our Tax Calculator
        </h2>
      </div>

      {/* Overview Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Overview"
          icon={BookOpen}
          sectionKey="overview"
          isVisible={expandedSections.overview}
        />
        <Collapse isOpen={expandedSections.overview}>
          <p className="text-gray-600 leading-relaxed">
            To calculate your salary, simply enter your gross income in the box below the 
            <span className="font-semibold text-gray-800"> "GROSS INCOME"</span> heading, 
            select your income period (default is set to yearly), and press the 
            <span className="font-semibold text-gray-800"> "Calculate"</span> button.
          </p>
        </Collapse>
      </div>

      {/* Student Loans Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Student Loans"
          icon={GraduationCap}
          sectionKey="studentLoans"
          isVisible={expandedSections.studentLoans}
        />
        <Collapse isOpen={expandedSections.studentLoans}>
          <div className="space-y-2 text-gray-600 leading-relaxed">
            <p>
              If you have a student loan, select the right student loan plan from the 
              <span className="font-semibold text-gray-800"> "Calculator options"</span> 
              section, and it will be included in our calculations.
            </p>
            <p>
              You can select one or multiple student loan plans at once, and you can even add 
              the postgraduate loan to be considered in our calculations.
            </p>
          </div>
        </Collapse>
      </div>

      {/* Pension Contributions Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Pension Contributions"
          icon={Clock}
          sectionKey="pension"
          isVisible={expandedSections.pension}
        />
        <Collapse isOpen={expandedSections.pension}>
          <p className="text-gray-600 leading-relaxed">
            Our calculator allows you to add your pension contributions. The types supported 
            by our calculator are 
            <span className="font-semibold text-gray-800"> Auto-enrollment, Personal, Salary Sacrifice,</span> 
            and <span className="font-semibold text-gray-800">Employer</span>.
          </p>
        </Collapse>
      </div>

      {/* Bonus Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Bonus"
          icon={TrendingUp}
          sectionKey="bonus"
          isVisible={expandedSections.bonus}
        />
        <Collapse isOpen={expandedSections.bonus}>
          <div className="space-y-2 text-gray-600 leading-relaxed">
            <p>
              If you have a yearly bonus payment, you can also add that to your annual salary, 
              and we'll include it in the calculations.
            </p>
            <p>
              If you are receiving monthly bonuses, simply add them together to come up with 
              the yearly figure.
            </p>
          </div>
        </Collapse>
      </div>

      {/* Tax Codes Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Tax Codes"
          icon={FileText}
          sectionKey="taxCodes"
          isVisible={expandedSections.taxCodes}
        />
        <Collapse isOpen={expandedSections.taxCodes}>
          <div className="space-y-2 text-gray-600 leading-relaxed">
            <p>
              Our system supports all widely used tax codes, such as 
              <span className="font-semibold text-gray-800"> L codes, BR codes, M codes,</span> and 
              <span className="font-semibold text-gray-800"> D0, D1, NT, 0T, K, N, and S codes</span>.
            </p>
            <p>
              As a default, the tax code for the latest financial year (2024/2025) is 
              <span className="font-semibold text-gray-800"> L1257</span>.
            </p>
            <p>
              If you know your tax code simply add it in our options, and we'll adjust your 
              personal allowance accordingly.
            </p>
          </div>
        </Collapse>
      </div>

      {/* National Insurance Exemptions Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="National Insurance Exemptions"
          icon={Users}
          sectionKey="niExemptions"
          isVisible={expandedSections.niExemptions}
        />
        <Collapse isOpen={expandedSections.niExemptions}>
          <p className="text-gray-600 leading-relaxed">
            If you are exempt from paying National Insurance, please tick the box in our 
            calculator options, and we'll generate the results based on no National Insurance 
            deductions from your gross pay.
          </p>
        </Collapse>
      </div>

      {/* Dividend Income Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Dividend Income"
          icon={DollarSign}
          sectionKey="dividend"
          isVisible={expandedSections.dividend}
        />
        <Collapse isOpen={expandedSections.dividend}>
          <p className="text-gray-600 leading-relaxed">
            If you are a company director and would like to calculate the tax you would need 
            to pay on your dividends, alongside your salary, please add your yearly dividend 
            income in the 
            <span className="font-semibold text-gray-800"> "Dividend income"</span> field, 
            and our tax calculator will accurately estimate your net take home, for both 
            dividends, and your salary. We also have a dedicated dividends calculator page 
            where you can have more detailed explanations and insights on your dividends.
          </p>
        </Collapse>
      </div>

      {/* Other Options Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Other Options"
          icon={Gift}
          sectionKey="otherOptions"
          isVisible={expandedSections.otherOptions}
        />
        <Collapse isOpen={expandedSections.otherOptions}>
          <div className="space-y-3 text-gray-600 leading-relaxed">
            <p>
              Please add your taxable benefits in the options section if you have taxable 
              benefits from your employer, such as company car, travelling expenses from your 
              home to work, childcare expenses paid by your employer, fuel, or other job 
              related benefits.
            </p>
            <p>
              You can also let us know if you are eligible for the 
              <span className="font-semibold text-gray-800"> Blind Person's Allowance</span>, 
              and we'll calculate your income accordingly.
            </p>
            <p>
              We also have an option to include the 
              <span className="font-semibold text-gray-800"> Married Couple's Allowance</span> – 
              if you are married, and one of you have been born before the 6th of April 1935, 
              you can tick the option and we'll adjust our tax calculations accordingly.
            </p>
            <p>
              Our calculator also allows options such as 
              <span className="font-semibold text-gray-800"> salary sacrifice</span>, pre and 
              post-tax deductions, country selection, and different tax years selection for 
              your salary.
            </p>
          </div>
        </Collapse>
      </div>

      {/* Overtime Section */}
      <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
        <SectionHeader
          title="Overtime"
          icon={Clock}
          sectionKey="overtime"
          isVisible={expandedSections.overtime}
        />
        <Collapse isOpen={expandedSections.overtime}>
          <p className="text-gray-600 leading-relaxed">
            If you are doing overtime, you can also add that into our calculator. You'll need 
            to make sure that your overtime is not stated in your yearly gross income, as we'll 
            calculate your bonus as extra revenue on top of your gross income.
          </p>
        </Collapse>
      </div>

      {/* Pro Tip */}
      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
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