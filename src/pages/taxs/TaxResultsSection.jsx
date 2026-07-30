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
  const grossSalary = results.grossSalary || 1;
  const takeHomePct = Math.max(
    0,
    Math.min(100, Math.round((results.netSalary / grossSalary) * 100))
  );

  const ResultCard = ({ title, value, icon: Icon, accent, subtext }) => (
    <div className="group relative p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      <div
        className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.bar}`}
      />
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 tracking-wide">
          {title}
        </span>
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg ${accent.chip}`}
        >
          <Icon className={`w-4 h-4 ${accent.icon}`} />
        </span>
      </div>
      <div className="text-xl font-bold text-slate-900 tracking-tight">
        {formatCurrency(value)}
      </div>
      {subtext && <div className="text-xs text-slate-400 mt-1">{subtext}</div>}
    </div>
  );

  const accents = {
    gross: { bar: "from-blue-400 to-blue-600", chip: "bg-blue-50", icon: "text-blue-600" },
    tax: { bar: "from-rose-400 to-rose-600", chip: "bg-rose-50", icon: "text-rose-600" },
    ni: { bar: "from-amber-400 to-amber-600", chip: "bg-amber-50", icon: "text-amber-600" },
    loan: { bar: "from-violet-400 to-violet-600", chip: "bg-violet-50", icon: "text-violet-600" },
    pension: { bar: "from-teal-400 to-teal-600", chip: "bg-teal-50", icon: "text-teal-600" },
    net: { bar: "from-emerald-400 to-emerald-600", chip: "bg-emerald-50", icon: "text-emerald-600" },
    employerNI: { bar: "from-fuchsia-400 to-fuchsia-600", chip: "bg-fuchsia-50", icon: "text-fuchsia-600" },
    employerCost: { bar: "from-indigo-400 to-indigo-600", chip: "bg-indigo-50", icon: "text-indigo-600" },
  };

  return (
    <div className="space-y-6">
      <div
        className="relative bg-white p-6 lg:p-8 rounded-[28px] h-fit self-start overflow-hidden
                 border border-blue-100
                 shadow-[0_2px_6px_rgba(15,23,42,0.04),0_16px_40px_-8px_rgba(37,99,235,0.14)]
                 hover:shadow-[0_2px_8px_rgba(15,23,42,0.06),0_24px_56px_-8px_rgba(37,99,235,0.20)]
                 transition-shadow duration-300 ease-out"
      >
        <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-100/0 blur-2xl" />

        <div className="relative flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Results</h2>
          <div className="flex gap-1.5">
            {[Download, Printer, Share2].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Hero: take-home pay */}
        <div className="relative mb-6 p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white overflow-hidden shadow-lg shadow-blue-500/25">
          <div className="pointer-events-none absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-8 w-24 h-24 rounded-full bg-white/10" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-100 uppercase tracking-wider mb-1">
                Annual Take-Home Pay
              </p>
              <p className="text-4xl font-bold tracking-tight">
                {formatCurrency(results.netSalary)}
              </p>
              <p className="text-sm text-blue-100 mt-1">
                {formatCurrency(results.monthlyNet)} / month &middot;{" "}
                {takeHomePct}% of gross
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* take-home progress bar */}
          <div className="relative mt-4 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-700 ease-out"
              style={{ width: `${takeHomePct}%` }}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <ResultCard
            title="Gross Salary"
            value={results.grossSalary}
            icon={Wallet}
            accent={accents.gross}
          />
          <ResultCard
            title="Income Tax"
            value={results.incomeTax}
            icon={TrendingDown}
            accent={accents.tax}
          />
          <ResultCard
            title="National Insurance"
            value={results.nationalInsurance}
            icon={Users}
            accent={accents.ni}
          />
          <ResultCard
            title="Student Loan"
            value={results.studentLoan}
            icon={GraduationCap}
            accent={accents.loan}
          />
          <ResultCard
            title="Pension"
            value={results.pension}
            icon={Clock}
            accent={accents.pension}
          />
          <ResultCard
            title="Net Salary"
            value={results.netSalary}
            icon={TrendingUp}
            accent={accents.net}
          />
          <ResultCard
            title="Employer NI"
            value={results.employerNI}
            icon={Users}
            accent={accents.employerNI}
          />
          <ResultCard
            title="Employer Cost"
            value={results.employerCost}
            icon={Briefcase}
            accent={accents.employerCost}
          />
        </div>

        {/* Payslip Toggle */}
        <button
          onClick={() => setShowPayslip(!showPayslip)}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-blue-50/70 hover:bg-blue-50 border border-blue-100 transition-colors"
        >
          <span className="font-semibold text-slate-700 flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 shadow-sm shadow-blue-500/30">
              <FileText className="w-4 h-4 text-white" />
            </span>
            View Interactive Payslip
          </span>
          {showPayslip ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-400 ease-in-out"
          style={{ gridTemplateRows: showPayslip ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-blue-600" />
                Interactive Payslip
              </h3>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Gross Pay</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(results.grossSalary)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Income Tax</span>
                  <span className="font-semibold text-rose-600">
                    -{formatCurrency(results.incomeTax)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">National Insurance</span>
                  <span className="font-semibold text-amber-600">
                    -{formatCurrency(results.nationalInsurance)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Student Loan</span>
                  <span className="font-semibold text-violet-600">
                    -{formatCurrency(results.studentLoan)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Pension</span>
                  <span className="font-semibold text-teal-600">
                    -{formatCurrency(results.pension)}
                  </span>
                </div>
                <div className="border-t border-slate-300 pt-3 mt-1">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-900">Net Pay</span>
                    <span className="text-emerald-600">
                      {formatCurrency(results.netSalary)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Breakdown Table */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-5 rounded-full bg-indigo-600" />
            Salary Breakdown
          </h3>
          <div className="divide-y divide-slate-200">
            {[
              { label: "Yearly", value: results.netSalary },
              { label: "Monthly", value: results.monthlyNet },
              { label: "Weekly", value: results.weeklyNet },
              { label: "Daily", value: results.dailyNet },
              { label: "Hourly", value: results.hourlyNet },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm py-2">
                <span className="text-slate-500">{row.label}</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(row.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Print/Share Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">
            <Printer className="w-4 h-4" />
            Print Payslip
          </button>
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxResultsSection;