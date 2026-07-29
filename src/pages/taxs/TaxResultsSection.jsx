import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Briefcase,
  Users,
  GraduationCap,
  Clock,
  Download,
  Printer,
  Share2,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";

const TaxResultsSection = ({
  results,
  showPayslip,
  setShowPayslip,
  formatCurrency,
}) => {
  const ResultCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="text-2xl font-bold text-gray-900">
        {formatCurrency(value)}
      </div>
      {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
          <span>Results</span>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Download className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Printer className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Share2 className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </h2>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <ResultCard
            title="Gross Salary"
            value={results.grossSalary}
            icon={Wallet}
            color="text-blue-600"
          />
          <ResultCard
            title="Income Tax"
            value={results.incomeTax}
            icon={TrendingDown}
            color="text-red-600"
          />
          <ResultCard
            title="National Insurance"
            value={results.nationalInsurance}
            icon={Users}
            color="text-orange-600"
          />
          <ResultCard
            title="Student Loan"
            value={results.studentLoan}
            icon={GraduationCap}
            color="text-purple-600"
          />
          <ResultCard
            title="Pension"
            value={results.pension}
            icon={Clock}
            color="text-teal-600"
          />
          <ResultCard
            title="Net Salary"
            value={results.netSalary}
            icon={TrendingUp}
            color="text-green-600"
          />
          <ResultCard
            title="Employer NI"
            value={results.employerNI}
            icon={Users}
            color="text-rose-600"
          />
          <ResultCard
            title="Employer Cost"
            value={results.employerCost}
            icon={Briefcase}
            color="text-indigo-600"
          />
        </div>

        {/* Payslip Toggle */}
        <button
          onClick={() => setShowPayslip(!showPayslip)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            View Interactive Payslip
          </span>
          {showPayslip ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {showPayslip && (
          <div className="mt-4 p-6 rounded-xl bg-gray-50 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">
              Interactive Payslip
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Gross Pay</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(results.grossSalary)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Income Tax</span>
                <span className="font-medium text-red-600">
                  -{formatCurrency(results.incomeTax)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">National Insurance</span>
                <span className="font-medium text-orange-600">
                  -{formatCurrency(results.nationalInsurance)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Student Loan</span>
                <span className="font-medium text-purple-600">
                  -{formatCurrency(results.studentLoan)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pension</span>
                <span className="font-medium text-teal-600">
                  -{formatCurrency(results.pension)}
                </span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-900">Net Pay</span>
                  <span className="text-green-600">
                    {formatCurrency(results.netSalary)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Salary Breakdown Table */}
        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Salary Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Yearly</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(results.netSalary)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Monthly</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(results.monthlyNet)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Weekly</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(results.weeklyNet)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Daily</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(results.dailyNet)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Hourly</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(results.hourlyNet)}
              </span>
            </div>
          </div>
        </div>

        {/* Print/Share Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 btn btn-outline py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" />
            Print Payslip
          </button>
          <button className="flex-1 btn btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxResultsSection;
