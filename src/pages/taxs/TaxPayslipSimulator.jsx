import React, { useEffect, useState } from "react";
import {
  FileText,
  Wallet,
  Receipt,
  Landmark,
  PiggyBank,
  Calendar,
  Building2,
  MapPin,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const TaxPayslipSimulator = ({ formatCurrency }) => {
  const annualSalary = 30000;
  const monthlyGross = annualSalary / 12;
  const incomeTax = 250; // Simplified for demo
  const nationalInsurance = 180; // Simplified for demo
  const pension = (annualSalary * 0.05) / 12;
  const totalDeductions = incomeTax + nationalInsurance + pension;
  const netMonthly = monthlyGross - totalDeductions;

  // Share of gross pay each component represents — drives the breakdown bar
  const pct = (value) => (value / monthlyGross) * 100;
  const netPct = pct(netMonthly);
  const taxPct = pct(incomeTax);
  const niPct = pct(nationalInsurance);
  const pensionPct = pct(pension);
  const effectiveDeductionRate = pct(totalDeductions);

  // Animate the breakdown bar in from zero on mount (respects reduced motion via CSS)
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const breakdown = [
    {
      key: "net",
      label: "Take-home",
      amount: netMonthly,
      percent: netPct,
      barClass: "bg-primary",
      dotClass: "bg-primary",
      textClass: "text-primary",
    },
    {
      key: "tax",
      label: "PAYE Tax",
      amount: incomeTax,
      percent: taxPct,
      barClass: "bg-rose-400",
      dotClass: "bg-rose-400",
      textClass: "text-rose-600",
    },
    {
      key: "ni",
      label: "National Insurance",
      amount: nationalInsurance,
      percent: niPct,
      barClass: "bg-amber-400",
      dotClass: "bg-amber-400",
      textClass: "text-amber-600",
    },
    {
      key: "pension",
      label: "Pension",
      amount: pension,
      percent: pensionPct,
      barClass: "bg-violet-400",
      dotClass: "bg-violet-400",
      textClass: "text-violet-600",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary-light/10 to-white px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                Payslip Simulator
              </h3>
              <p className="text-sm text-gray-500 leading-tight mt-0.5">
                See where a £30,000 salary goes each month
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/70 border border-gray-200 text-[11px] font-medium text-gray-500 shrink-0">
            <Sparkles className="w-3 h-3 text-primary" />
            Illustrative example
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Signature element: gross-to-net breakdown bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Where your gross pay goes
            </span>
            <span className="text-xs font-medium text-gray-400 tabular-nums">
              {formatCurrency(monthlyGross)} / month
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden flex">
            {breakdown.map((item) => (
              <div
                key={item.key}
                className={`h-full ${item.barClass} motion-reduce:transition-none transition-all duration-700 ease-out first:rounded-l-full last:rounded-r-full`}
                style={{ width: animated ? `${item.percent}%` : "0%" }}
                title={`${item.label}: ${formatCurrency(item.amount)}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {breakdown.map((item) => (
              <div key={item.key} className="flex items-start gap-2">
                <span
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.dotClass}`}
                />
                <div>
                  <div className="text-[11px] text-gray-500 leading-tight">
                    {item.label}
                  </div>
                  <div
                    className={`text-sm font-semibold tabular-nums leading-tight ${item.textClass}`}
                  >
                    {formatCurrency(item.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee & employer quick facts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { icon: Building2, label: "Employee No", value: "EMP-2024-001" },
            { icon: FileText, label: "Employee Name", value: "John Doe" },
            { icon: Calendar, label: "Process Date", value: "31 July 2026" },
            { icon: Landmark, label: "NI Number", value: "AB 12 34 56 C" },
          ].map((fact, index) => {
            const Icon = fact.icon;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-gray-50/60 p-3"
              >
                <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-medium">
                    {fact.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  {fact.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Payments & Deductions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-2.5 border-b border-gray-100">
              <Wallet className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-gray-900 text-sm">
                Payments
              </h4>
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Salary</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  {formatCurrency(monthlyGross)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-100 pt-2.5">
                <span className="text-gray-500">Units</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  160.00
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rate</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  £187.50
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2.5 font-semibold">
                <span className="text-gray-900">Amount</span>
                <span className="text-gray-900 tabular-nums">
                  {formatCurrency(monthlyGross)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 bg-rose-50 px-4 py-2.5 border-b border-gray-100">
              <Receipt className="w-4 h-4 text-rose-500" />
              <h4 className="font-semibold text-gray-900 text-sm">
                Deductions
              </h4>
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">PAYE Tax</span>
                <span className="font-medium text-rose-600 tabular-nums">
                  {formatCurrency(incomeTax)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">National Insurance</span>
                <span className="font-medium text-amber-600 tabular-nums">
                  {formatCurrency(nationalInsurance)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pension</span>
                <span className="font-medium text-violet-600 tabular-nums">
                  {formatCurrency(pension)}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2.5 font-semibold">
                <span className="text-gray-900">Total Deductions</span>
                <span className="text-gray-900 tabular-nums">
                  {formatCurrency(totalDeductions)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* This Period + Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <h4 className="font-semibold text-gray-900 text-sm">
                This Period
              </h4>
            </div>
            <div className="p-4 space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Gross Pay</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  {formatCurrency(monthlyGross)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gross for Tax</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  {formatCurrency(monthlyGross)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Earnings for NI</span>
                <span className="font-medium text-gray-900 tabular-nums">
                  {formatCurrency(monthlyGross)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
              <MapPin className="w-4 h-4 text-gray-400" />
              <h4 className="font-semibold text-gray-900 text-sm">
                Employee Address
              </h4>
            </div>
            <div className="p-4 text-sm text-gray-600 leading-relaxed">
              <p>123 High Street</p>
              <p>London</p>
              <p>EC1A 1BB</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Employer Details Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm border-t border-gray-100 pt-4">
          <div>
            <span className="text-gray-400 text-xs">Employer</span>
            <p className="font-medium text-gray-900">ABC Ltd</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Tax Code</span>
            <p className="font-medium text-gray-900">1257L</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Tax Period</span>
            <p className="font-medium text-gray-900">Month 4</p>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Payment Method</span>
            <p className="font-medium text-gray-900">BACS</p>
          </div>
        </div>

        {/* Year To Date */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 border-b border-gray-100">
            <PiggyBank className="w-4 h-4 text-gray-400" />
            <h4 className="font-semibold text-gray-900 text-sm">
              Year To Date
            </h4>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between md:flex-col md:gap-1">
              <span className="text-gray-500">Gross Pay TD</span>
              <span className="font-medium text-gray-900 tabular-nums">
                {formatCurrency(monthlyGross * 4)}
              </span>
            </div>
            <div className="flex justify-between md:flex-col md:gap-1">
              <span className="text-gray-500">Gross for Tax TD</span>
              <span className="font-medium text-gray-900 tabular-nums">
                {formatCurrency(monthlyGross * 4)}
              </span>
            </div>
            <div className="flex justify-between md:flex-col md:gap-1">
              <span className="text-gray-500">Tax Paid TD</span>
              <span className="font-medium text-rose-600 tabular-nums">
                {formatCurrency(incomeTax * 4)}
              </span>
            </div>
          </div>
        </div>

        {/* NET PAY */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary-bright p-px">
          <div className="rounded-2xl bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-5">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Net Pay
              </span>
              <p className="text-xs text-gray-400 mt-0.5">
                After tax, NI and pension — {effectiveDeductionRate.toFixed(1)}%
                of gross deducted
              </p>
            </div>
            <div className="text-4xl font-black text-primary tabular-nums">
              {formatCurrency(netMonthly)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxPayslipSimulator;