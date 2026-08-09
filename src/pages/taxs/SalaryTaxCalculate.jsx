import React, { useState, useEffect } from "react";
import TaxHeroSection from "./TaxHeroSection";
import TaxCalculatorForm from "./TaxCalculatorForm";
import TaxResultsSection from "./TaxResultsSection";
import TaxPayslipSimulator from "./TaxPayslipSimulator";
import TaxHowToUseSection from "./TaxHowToUseSection";
import TaxBandsSection from "./TaxBandsSection";
import PageLoader from "../../component/common/PageLoader";
import { api } from "../../utils/app";

const SalaryTaxCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [showPayslip, setShowPayslip] = useState(false);
  const [regions, setRegions] = useState([]);
  const [taxCodes, setTaxCodes] = useState([]);
  const [niCategories, setNiCategories] = useState([]);
  const [studentLoanPlans, setStudentLoanPlans] = useState([]);
  const [pensionOptions, setPensionOptions] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [apiResults, setApiResults] = useState(null);
  const [formData, setFormData] = useState({
    grossSalary: 0,
    salaryPeriod: "annually",
    taxYear: "2024-2025",
    country: "England",
    region_id: '',
    taxCode: "1257L",
    tax_code_id: '',
    workingHours: 37.5,
    pensionContribution: 5,
    pensionType: "auto-enrolment",
    pension_option_id: '',
    studentLoan: "none",
    student_loan_plan_id: '',
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
    ni_category_id: '',
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

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setFetching(true);
      
      // Fetch regions
      const regionsRes = await api.get('/calculator/region/list');
      if (regionsRes.data.status && regionsRes.data.data) {
        setRegions(regionsRes.data.data);
        const england = regionsRes.data.data.find(r => r.name === 'England');
        if (england) {
          setFormData(prev => ({ ...prev, region_id: england.id }));
        }
      }

      // Fetch tax codes
      const taxCodesRes = await api.get('/calculator/tax-code/list');
      if (taxCodesRes.data.status && taxCodesRes.data.data) {
        setTaxCodes(taxCodesRes.data.data);
        const defaultTaxCode = taxCodesRes.data.data.find(t => t.code === '1257L');
        if (defaultTaxCode) {
          setFormData(prev => ({ ...prev, tax_code_id: defaultTaxCode.id }));
        }
      }

      // Fetch NI categories
      const niRes = await api.get('/calculator/ni-category/list');
      if (niRes.data.status && niRes.data.data) {
        setNiCategories(niRes.data.data);
        const defaultNi = niRes.data.data.find(n => n.code === 'A');
        if (defaultNi) {
          setFormData(prev => ({ ...prev, ni_category_id: defaultNi.id }));
        }
      }

      // Fetch student loan plans
      const studentLoanRes = await api.get('/calculator/student-loan-plan/list');
      if (studentLoanRes.data.status && studentLoanRes.data.data) {
        setStudentLoanPlans(studentLoanRes.data.data);
        const defaultPlan = studentLoanRes.data.data.find(p => p.name === 'Plan 2');
        if (defaultPlan) {
          setFormData(prev => ({ ...prev, student_loan_plan_id: defaultPlan.id }));
        }
      }

      // Fetch pension options
      const pensionRes = await api.get('/calculator/pension-option/list');
      if (pensionRes.data.status && pensionRes.data.data) {
        setPensionOptions(pensionRes.data.data);
        const defaultPension = pensionRes.data.data.find(p => p.name === 'Auto Enrolment');
        if (defaultPension) {
          setFormData(prev => ({ ...prev, pension_option_id: defaultPension.id }));
        }
      }

      // Initial calculation after data is loaded
      setTimeout(() => {
        calculateTax();
      }, 300);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetching(false);
    }
  };

  const salaryPeriods = ["Hourly", "Daily", "Weekly", "Monthly", "Annually"];

  useEffect(() => {
    // Only calculate if we have the required IDs
    if (formData.region_id && formData.tax_code_id && formData.ni_category_id) {
      calculateTax();
    }
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

  const calculateTax = async () => {
    setLoading(true);

    try {
      // Prepare request body
      const requestBody = {
        salary: formData.grossSalary,
        salary_type: formData.salaryPeriod === 'monthly' ? 'monthly' : 'yearly',
        region_id: parseInt(formData.region_id),
        tax_code_id: parseInt(formData.tax_code_id),
        ni_category_id: parseInt(formData.ni_category_id),
      };

      // Add optional fields if they have values
      if (formData.student_loan_plan_id) {
        requestBody.student_loan_plan_id = parseInt(formData.student_loan_plan_id);
      }
      if (formData.pension_option_id) {
        requestBody.pension_option_id = parseInt(formData.pension_option_id);
      }

      const response = await api.post('/calculator/calculate', requestBody);

      if (response.data.status && response.data.data) {
        const data = response.data.data;
        
        // Map API response to results state
        setResults({
          grossSalary: data.salary?.yearly || 0,
          incomeTax: data.income_tax || 0,
          nationalInsurance: data.employee_ni || 0,
          studentLoan: data.student_loan_deduction || 0,
          pension: data.employee_pension || 0,
          employerNI: data.employer_ni || 0,
          employerCost: data.employer_ni + data.salary?.yearly || 0,
          netSalary: data.net_salary || 0,
          monthlyNet: data.salary?.monthly || 0,
          weeklyNet: data.salary?.weekly || 0,
          dailyNet: data.salary?.daily || 0,
          hourlyNet: data.salary?.hourly || 0,
        });

        // Store full API response for detailed display
        setApiResults(data);
      }
    } catch (error) {
      console.error('Error calculating tax:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (fetching) {
    return <PageLoader />;
  }

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
              regions={regions}
              taxCodes={taxCodes}
              niCategories={niCategories}
              studentLoanPlans={studentLoanPlans}
              pensionOptions={pensionOptions}
            />

            <TaxResultsSection
              results={results}
              showPayslip={showPayslip}
              setShowPayslip={setShowPayslip}
              formatCurrency={formatCurrency}
              apiData={apiResults}
            />
          </div>
        </div>
      </section>

      {/* Tax Bands Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxBandsSection 
            formatCurrency={formatCurrency} 
            annualSalary={formData.grossSalary}
            apiData={apiResults}
          />
        </div>
      </section>

      {/* Payslip Simulator Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxPayslipSimulator 
            formatCurrency={formatCurrency}
            apiData={apiResults}
          />
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