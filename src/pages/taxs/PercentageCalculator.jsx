import React, { useState, useRef } from 'react';
import {
  Calculator,
  Percent,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

  // Result Card Component for inside calculators
  const InlineResultCard = ({ result, steps, formula, type, title }) => {
    if (!result) return null;
    
    const isError = result === 'Please enter valid numbers';
    
    if (isError) {
      return (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 animate-fadeIn">
          <p className="text-sm text-red-600">{result}</p>
        </div>
      );
    }

    return (
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Result</h4>
            <div className="text-2xl font-bold text-primary mt-1">{result}</div>
            {type && (
              <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${type === 'Increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {type === 'Increase' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {type}
              </span>
            )}
          </div>
          <CheckCircle className="w-8 h-8 text-success opacity-50" />
        </div>
        {formula && (
          <div className="mt-2 text-sm">
            <span className="text-gray-500">Formula: </span>
            <span className="font-medium text-gray-700">{formula}</span>
          </div>
        )}
        {steps && (
          <div className="mt-1 text-sm">
            <span className="text-gray-500">Steps: </span>
            <span className="text-gray-700">{steps}</span>
          </div>
        )}
      </div>
    );
  };

  const CalculatorCard = ({ title, description, children, icon: Icon, id, active }) => (
    <div
      id={id}
      className={`bg-white rounded-3xl shadow-xl p-6 lg:p-8 border transition-all duration-300 ${
        active ? 'border-primary/40 ring-1 ring-primary/20' : 'border-gray-200'
      } hover:shadow-2xl`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );

  const SidebarResult = ({ label, icon: Icon, data, isFresh }) => {
    const hasResult = Boolean(data.result);
    const isError = data.result === 'Please enter valid numbers';

    return (
      <div
        className={`rounded-2xl border p-4 transition-all duration-300 ${
          isFresh && hasResult && !isError
            ? 'border-primary/30 bg-primary/5'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {label}
          </span>
        </div>

        {!hasResult && (
          <p className="text-sm text-gray-400">Enter values and calculate to see this result.</p>
        )}

        {hasResult && isError && (
          <p className="text-sm text-red-500">{data.result}</p>
        )}

        {hasResult && !isError && (
          <>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-primary">{data.result}</div>
              {data.type && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    data.type === 'Increase' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {data.type === 'Increase' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {data.type}
                </span>
              )}
            </div>
            {data.formula && (
              <p className="text-xs text-gray-500 mt-1">{data.formula}</p>
            )}
          </>
        )}
      </div>
    );
  };

const PercentageCalculator = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Refs to track which input is currently focused
  const inputRefs = {
    calc1: { percentage: useRef(null), number: useRef(null) },
    calc2: { firstNumber: useRef(null), secondNumber: useRef(null) },
    calc3: { original: useRef(null), newValue: useRef(null) },
  };

  // Calculator 1: What is X% of Y?
  const [calc1, setCalc1] = useState({
    percentage: '',
    number: '',
    result: null,
    steps: '',
    formula: '',
  });

  // Calculator 2: X is What Percent of Y?
  const [calc2, setCalc2] = useState({
    firstNumber: '',
    secondNumber: '',
    result: null,
    steps: '',
    formula: '',
  });

  // Calculator 3: Percentage Increase / Decrease
  const [calc3, setCalc3] = useState({
    original: '',
    newValue: '',
    result: null,
    steps: '',
    formula: '',
    type: '',
  });

  // Tracks which calculator most recently produced a result
  const [lastCalculated, setLastCalculated] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleCalc1 = () => {
    const p = parseFloat(calc1.percentage);
    const n = parseFloat(calc1.number);

    if (isNaN(p) || isNaN(n) || p < 0 || n < 0) {
      setCalc1({ ...calc1, result: 'Please enter valid numbers', steps: '', formula: '' });
      return;
    }

    const result = (p * n) / 100;
    setCalc1({
      ...calc1,
      result: `${result.toFixed(2)}`,
      steps: `(${p} × ${n}) ÷ 100 = ${result.toFixed(2)}`,
      formula: `${p}% of ${n} = ${result.toFixed(2)}`,
    });
    setLastCalculated('calc1');
  };

  const resetCalc1 = () => {
    setCalc1({ percentage: '', number: '', result: null, steps: '', formula: '' });
    setLastCalculated((prev) => (prev === 'calc1' ? null : prev));
    setTimeout(() => inputRefs.calc1.percentage.current?.focus(), 0);
  };

  const handleCalc2 = () => {
    const first = parseFloat(calc2.firstNumber);
    const second = parseFloat(calc2.secondNumber);

    if (isNaN(first) || isNaN(second) || first < 0 || second < 0 || second === 0) {
      setCalc2({ ...calc2, result: 'Please enter valid numbers', steps: '', formula: '' });
      return;
    }

    const result = (first / second) * 100;
    setCalc2({
      ...calc2,
      result: `${result.toFixed(2)}%`,
      steps: `(${first} ÷ ${second}) × 100 = ${result.toFixed(2)}%`,
      formula: `${first} is ${result.toFixed(2)}% of ${second}`,
    });
    setLastCalculated('calc2');
  };

  const resetCalc2 = () => {
    setCalc2({ firstNumber: '', secondNumber: '', result: null, steps: '', formula: '' });
    setLastCalculated((prev) => (prev === 'calc2' ? null : prev));
    setTimeout(() => inputRefs.calc2.firstNumber.current?.focus(), 0);
  };

  const handleCalc3 = () => {
    const original = parseFloat(calc3.original);
    const newValue = parseFloat(calc3.newValue);

    if (isNaN(original) || isNaN(newValue) || original < 0 || newValue < 0 || original === 0) {
      setCalc3({ ...calc3, result: 'Please enter valid numbers', steps: '', formula: '', type: '' });
      return;
    }

    const change = ((newValue - original) / original) * 100;
    const type = change >= 0 ? 'Increase' : 'Decrease';

    setCalc3({
      ...calc3,
      result: `${Math.abs(change).toFixed(2)}%`,
      steps: `((${newValue} - ${original}) ÷ ${original}) × 100 = ${change.toFixed(2)}%`,
      formula: `${original} → ${newValue} = ${change.toFixed(2)}% ${type}`,
      type,
    });
    setLastCalculated('calc3');
  };

  const resetCalc3 = () => {
    setCalc3({ original: '', newValue: '', result: null, steps: '', formula: '', type: '' });
    setLastCalculated((prev) => (prev === 'calc3' ? null : prev));
    setTimeout(() => inputRefs.calc3.original.current?.focus(), 0);
  };

  const handleKeyPress = (e, calculator) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (calculator === 'calc1') handleCalc1();
      else if (calculator === 'calc2') handleCalc2();
      else if (calculator === 'calc3') handleCalc3();
    }
  };



  const examples = [
    { title: '20% of 500 = 100', calc: 'What is X% of Y?' },
    { title: '50 is what percent of 200 = 25%', calc: 'X is what percent of Y?' },
    { title: '100 → 150 = 50% Increase', calc: 'Percentage Increase / Decrease' },
  ];

  const faqs = [
    {
      question: 'How do percentage calculations work?',
      answer: 'A percentage is a number expressed as a fraction of 100. For example, 20% means 20 out of 100. To calculate a percentage, you divide the part by the whole and multiply by 100.',
    },
    {
      question: 'How do I calculate percentage increase?',
      answer: 'To calculate percentage increase: (New Value - Original Value) ÷ Original Value × 100. For example, if a price goes from £50 to £60: (60-50) ÷ 50 × 100 = 20% increase.',
    },
    {
      question: 'How do I calculate percentage decrease?',
      answer: 'To calculate percentage decrease: (Original Value - New Value) ÷ Original Value × 100. For example, if a price goes from £60 to £50: (60-50) ÷ 60 × 100 = 16.67% decrease.',
    },
    {
      question: 'How do I find what percentage one number is of another?',
      answer: 'Divide the first number by the second number and multiply by 100. For example, to find what percentage 50 is of 200: 50 ÷ 200 × 100 = 25%.',
    },
    {
      question: 'What is the formula for percentage?',
      answer: 'The basic formula for percentage is: (Part ÷ Whole) × 100. For "X% of Y": (X × Y) ÷ 100. For percentage change: ((New - Original) ÷ Original) × 100.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 bg-gradient-to-r from-primary-dark via-primary to-primary-light">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
            <Percent className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold tracking-wide">Free Percentage Calculator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Percentage Calculator
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Calculate percentages, percentage increase, and percentage decrease instantly.
            Solve common percentage calculations with our easy-to-use calculators.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Left column — inputs */}
            <div className="space-y-8 min-w-0">
              <CalculatorCard
                title="What is X% of Y?"
                description="Calculate the percentage value of a number"
                icon={Percent}
                id="calc1"
                active={lastCalculated === 'calc1'}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (%)</label>
                      <input
                        ref={inputRefs.calc1.percentage}
                        type="number"
                        value={calc1.percentage}
                        onChange={(e) => setCalc1({ ...calc1, percentage: e.target.value })}
                        placeholder="e.g., 20"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc1')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                      <input
                        ref={inputRefs.calc1.number}
                        type="number"
                        value={calc1.number}
                        onChange={(e) => setCalc1({ ...calc1, number: e.target.value })}
                        placeholder="e.g., 500"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc1')}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    <span className="font-medium">Formula:</span> Result = (Percentage × Number) ÷ 100
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCalc1}
                      className="flex-1 btn btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      Calculate
                    </button>
                    <button
                      onClick={resetCalc1}
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  {/* Inline Result Card */}
                  <InlineResultCard
                    result={calc1.result}
                    steps={calc1.steps}
                    formula={calc1.formula}
                    title="What is X% of Y?"
                  />
                </div>
              </CalculatorCard>

              <CalculatorCard
                title="X is What Percent of Y?"
                description="Find what percentage one number is of another"
                icon={ArrowRight}
                id="calc2"
                active={lastCalculated === 'calc2'}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Number (X)</label>
                      <input
                        ref={inputRefs.calc2.firstNumber}
                        type="number"
                        value={calc2.firstNumber}
                        onChange={(e) => setCalc2({ ...calc2, firstNumber: e.target.value })}
                        placeholder="e.g., 50"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc2')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Second Number (Y)</label>
                      <input
                        ref={inputRefs.calc2.secondNumber}
                        type="number"
                        value={calc2.secondNumber}
                        onChange={(e) => setCalc2({ ...calc2, secondNumber: e.target.value })}
                        placeholder="e.g., 200"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc2')}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    <span className="font-medium">Formula:</span> Result = (First Number ÷ Second Number) × 100
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCalc2}
                      className="flex-1 btn btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      Calculate
                    </button>
                    <button
                      onClick={resetCalc2}
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  {/* Inline Result Card */}
                  <InlineResultCard
                    result={calc2.result}
                    steps={calc2.steps}
                    formula={calc2.formula}
                    title="X is What Percent of Y?"
                  />
                </div>
              </CalculatorCard>

              <CalculatorCard
                title="Percentage Increase / Decrease"
                description="Calculate percentage change between two values"
                icon={TrendingUp}
                id="calc3"
                active={lastCalculated === 'calc3'}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Value</label>
                      <input
                        ref={inputRefs.calc3.original}
                        type="number"
                        value={calc3.original}
                        onChange={(e) => setCalc3({ ...calc3, original: e.target.value })}
                        placeholder="e.g., 100"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc3')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Value</label>
                      <input
                        ref={inputRefs.calc3.newValue}
                        type="number"
                        value={calc3.newValue}
                        onChange={(e) => setCalc3({ ...calc3, newValue: e.target.value })}
                        placeholder="e.g., 150"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        onKeyPress={(e) => handleKeyPress(e, 'calc3')}
                      />
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl">
                    <span className="font-medium">Formula:</span> ((New - Original) ÷ Original) × 100
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleCalc3}
                      className="flex-1 btn btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      Calculate
                    </button>
                    <button
                      onClick={resetCalc3}
                      className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  {/* Inline Result Card */}
                  <InlineResultCard
                    result={calc3.result}
                    steps={calc3.steps}
                    formula={calc3.formula}
                    type={calc3.type}
                    title="Percentage Increase / Decrease"
                  />
                </div>
              </CalculatorCard>
            </div>

            {/* Right column — sticky results panel */}
            <aside className="lg:sticky lg:top-20 space-y-4 order-first lg:order-last">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your results</h3>
                    <p className="text-xs text-gray-500">Updates as you calculate</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <SidebarResult
                    label="X% of Y"
                    icon={Percent}
                    data={calc1}
                    isFresh={lastCalculated === 'calc1'}
                  />
                  <SidebarResult
                    label="X is what % of Y"
                    icon={ArrowRight}
                    data={calc2}
                    isFresh={lastCalculated === 'calc2'}
                  />
                  <SidebarResult
                    label="% increase / decrease"
                    icon={TrendingUp}
                    data={calc3}
                    isFresh={lastCalculated === 'calc3'}
                  />
                </div>

                {lastCalculated && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                    Last calculated: {
                      { calc1: 'What is X% of Y?', calc2: 'X is what percent of Y?', calc3: 'Percentage increase / decrease' }[lastCalculated]
                    }
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Supporting content */}
          <div className="space-y-8 mt-8">
            {/* Common Formula Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Common formulas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-1">What is X% of Y?</h4>
                  <p className="text-sm text-gray-500">(X × Y) ÷ 100</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-1">X is what percent of Y?</h4>
                  <p className="text-sm text-gray-500">(X ÷ Y) × 100</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-1">Percentage increase / decrease</h4>
                  <p className="text-sm text-gray-500">((New - Original) ÷ Original) × 100</p>
                </div>
              </div>
            </div>

            {/* Examples Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Examples</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examples.map((example, index) => (
                  <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20">
                    <div className="text-sm text-gray-500 mb-1">{example.calc}</div>
                    <div className="font-semibold text-gray-900">{example.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {activeFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 pt-0 text-gray-600 border-t border-gray-200">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PercentageCalculator;