import React, { useState, useEffect, useRef } from 'react';

const TaxBandsSection = ({ annualSalary = 30000 }) => {
  const [hoveredBand, setHoveredBand] = useState(null);

  // Tax bands for England 2024-2025
  const taxBands = [
    {
      name: 'Tax Free',
      lightColor: 'bg-green-100',
      borderColor: 'border-green-300',
      threshold: 12570,
      rate: 0,
      label: '0%',
      description: 'Personal Allowance',
    },
    {
      name: 'Basic Rate',
      lightColor: 'bg-blue-100',
      borderColor: 'border-blue-300',
      threshold: 50270,
      rate: 0.20,
      label: '20%',
      description: 'Basic rate',
    },
    {
      name: 'Higher Rate',
      lightColor: 'bg-red-100',
      borderColor: 'border-red-300',
      threshold: 125140,
      rate: 0.40,
      label: '40%',
      description: 'Higher rate',
    },
  ];

  // NI bands 2024-2025
  const niBands = [
    {
      name: 'NI Free',
      lightColor: 'bg-cyan-100',
      borderColor: 'border-cyan-300',
      threshold: 12570,
      rate: 0,
      label: '0%',
      description: 'Primary Threshold',
    },
    {
      name: '12% NI',
      lightColor: 'bg-orange-100',
      borderColor: 'border-orange-300',
      threshold: 50270,
      rate: 0.12,
      label: '12%',
      description: 'Main rate',
    },
    {
      name: '2% NI',
      lightColor: 'bg-yellow-100',
      borderColor: 'border-yellow-300',
      threshold: Infinity,
      rate: 0.02,
      label: '2%',
      description: 'Additional rate',
    },
  ];

  // Always walks every band, even once income is used up, so all 3 bands
  // (0% / 20% / 40%) are always present in the result — just with £0 in
  // whichever bands the salary hasn't reached yet.
  const calculateTaxBand = (salary, bands) => {
    let remaining = salary;
    let results = [];
    let totalTax = 0;
    let prevThreshold = 0;

    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];
      const isLast = i === bands.length - 1;
      const bandMax = isLast ? Infinity : band.threshold;
      const taxableAmount = Math.max(0, Math.min(remaining, bandMax - prevThreshold));
      const taxAmount = taxableAmount * band.rate;
      totalTax += taxAmount;

      results.push({
        ...band,
        taxableAmount,
        taxAmount,
        percentage: Math.max((taxableAmount / salary) * 100, 0),
        bandRange: `${prevThreshold.toLocaleString()} - ${bandMax === Infinity ? '∞' : bandMax.toLocaleString()}`,
      });

      remaining = Math.max(0, remaining - taxableAmount);
      prevThreshold = band.threshold;
      // no early break — every band always gets pushed to results
    }

    return { bands: results, totalTax };
  };

  const taxResults = calculateTaxBand(annualSalary, taxBands);
  const niResults = calculateTaxBand(annualSalary, niBands);

  const monthlyNet = (annualSalary - taxResults.totalTax - niResults.totalTax) / 12;
  const indicatorLeft = Math.min((annualSalary / 125140) * 100, 100);

  // Smoothly counts the displayed monthly-net figure toward its target
  // whenever annualSalary changes, instead of snapping instantly.
  const useAnimatedNumber = (target, duration = 500) => {
    const [value, setValue] = useState(target);
    const frameRef = useRef();
    const startRef = useRef();
    const fromRef = useRef(target);

    useEffect(() => {
      fromRef.current = value;
      startRef.current = null;

      const step = (timestamp) => {
        if (startRef.current === null) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const next = fromRef.current + (target - fromRef.current) * eased;
        setValue(next);
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        }
      };

      frameRef.current = requestAnimationFrame(step);
      return () => cancelAnimationFrame(frameRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, duration]);

    return value;
  };

  const animatedMonthlyNet = useAnimatedNumber(monthlyNet);

  const BandBar = ({ band, index, total, isTax = true, onHover }) => {
    const percentage = (band.taxableAmount / total) * 100;
    const isHovered = hoveredBand === `${isTax ? 'tax' : 'ni'}-${index}`;

    return (
      <div
        className={`relative group transition-all duration-300 ${isHovered ? 'scale-y-105 shadow-lg' : ''}`}
        style={{ width: `${Math.max(percentage, 5)}%` }}
        onMouseEnter={() => onHover(`${isTax ? 'tax' : 'ni'}-${index}`)}
        onMouseLeave={() => onHover(null)}
      >
        <div
          className={`h-full rounded-l-lg rounded-r-lg transition-all duration-300 ${band.lightColor} border ${band.borderColor}`}
          style={{
            minHeight: '48px',
            transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
            boxShadow: isHovered ? '0 8px 25px rgba(0,0,0,0.1)' : 'none',
          }}
        >
          <div className="px-3 py-2 h-full flex flex-col justify-center">
            <div className="text-xs font-semibold text-gray-700 truncate">
              {band.name}
            </div>
            <div className="text-xs text-gray-600">
              £{band.taxableAmount.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-gray-800">
              {band.label}
            </div>
          </div>
        </div>
        {isHovered && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-10">
            {band.name}: £{band.taxableAmount.toLocaleString()}
          </div>
        )}
      </div>
    );
  };

  const BandDetail = ({ band, isTax = true }) => {
    const isActive = band.taxableAmount > 0;
    const displayEarnings = isActive ? band.taxableAmount : 0;
    const displayTax = isActive ? band.taxAmount : 0;

    return (
      <div className={`flex flex-col space-y-1 p-3 rounded-lg transition-all duration-300 ${isActive ? 'bg-gray-50 border border-gray-200' : 'opacity-60'}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700">{band.name}</span>
          <span className="text-xs font-semibold text-gray-900">{band.label}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Earnings in this tax band:</span>
          <span className="font-medium text-gray-900">£{displayEarnings.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Tax in this band:</span>
          <span className={`font-bold ${isTax ? 'text-red-600' : 'text-orange-600'}`}>
            £{displayTax.toLocaleString()}
          </span>
        </div>
        {isActive && band.rate > 0 && (
          <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200">
            <span className="text-gray-500">Rate applied:</span>
            <span className="font-semibold text-gray-900">{band.label}</span>
          </div>
        )}
      </div>
    );
  };

  // Vertical marker that slides to its new position whenever annualSalary
  // changes, trailing a soft blurred glow on its left/behind side.
  const IndicatorLine = () => (
    <div
      className="absolute top-0 bottom-0 z-10 transition-[left] duration-700 ease-out"
      style={{ left: `${indicatorLeft}%` }}
    >
      {/* trailing blur — sits behind/left of the line, fading toward it */}
      <div
        className="absolute top-0 bottom-0 right-0 w-10 pointer-events-none"
        style={{
          transform: 'translateX(0)',
          background: 'linear-gradient(to right, transparent, rgba(31,41,55,0.25))',
          filter: 'blur(6px)',
        }}
      />
      <div className="absolute top-0 bottom-0 w-0.5 bg-gray-800" />
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-800 whitespace-nowrap transition-all duration-300">
        £{Math.round(animatedMonthlyNet).toLocaleString()}
      </div>
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 whitespace-nowrap">
        Monthly Net
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Tax bands for £{annualSalary.toLocaleString()}</h2>
        <div className="mt-2 text-3xl font-black text-primary">£{annualSalary.toLocaleString()}</div>
        <div className="text-sm text-gray-500">Yearly Gross</div>
      </div>

      {/* Income Tax Bands Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          INCOME TAX BANDS
        </h3>

        {/* Stacked Bar — always renders all 3 bands: 0%, 20%, 40% */}
        <div className="relative flex h-12 rounded-lg overflow-hidden mb-4">
          {taxResults.bands.map((band, index) => (
            <BandBar
              key={index}
              band={band}
              index={index}
              total={annualSalary}
              isTax={true}
              onHover={setHoveredBand}
            />
          ))}
          <IndicatorLine />
        </div>

        {/* Tax Band Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {taxResults.bands.map((band, index) => (
            <BandDetail key={index} band={band} isTax={true} />
          ))}
        </div>
      </div>

      {/* National Insurance Bands Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
          NATIONAL INSURANCE BANDS
        </h3>

        {/* Stacked Bar */}
        <div className="relative flex h-12 rounded-lg overflow-hidden mb-4">
          {niResults.bands.map((band, index) => (
            <BandBar
              key={index}
              band={band}
              index={index}
              total={annualSalary}
              isTax={false}
              onHover={setHoveredBand}
            />
          ))}
          <IndicatorLine />
        </div>

        {/* NI Band Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {niResults.bands.map((band, index) => (
            <BandDetail key={index} band={band} isTax={false} />
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xs text-gray-500">Gross Salary</div>
          <div className="text-lg font-bold text-gray-900">£{annualSalary.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Income Tax</div>
          <div className="text-lg font-bold text-red-600">£{Math.round(taxResults.totalTax).toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">National Insurance</div>
          <div className="text-lg font-bold text-orange-600">£{Math.round(niResults.totalTax).toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500">Monthly Net</div>
          <div className="text-lg font-bold text-green-600 transition-all duration-300">
            £{Math.round(animatedMonthlyNet).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxBandsSection;