import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import ContactPage from "./pages/user_side/ContactPage";
import BlogsPage from "./pages/user_side/BlogsPage";
import BlogDetail from "./pages/user_side/BlogDetail";
import HRCompliancePage from "./pages/user_side/HRCompliancePage";
import SelfSponsorshipPage from "./pages/user_side/SelfSponsorshipPage";
import AboutUsPage from "./pages/user_side/AboutUsPage";
import OurTeamPage from "./pages/user_side/OurTeamPage";
import TeamDetailsPage from "./pages/user_side/TeamDetailsPage";
import CorporateSocialResponsibilityPage from "./pages/user_side/CorporateSocialResponsibilityPage";
import ServiceDetails from "./pages/user_side/ServiceDetails";
import AuthPage from "./pages/auth/AuthPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import SMTPSettingsPage from "./pages/admin/settings/SMTPSettingsPage";
import SEOSettingsPage from "./pages/admin/settings/SEOSettingsPage";
import ServiceDetailsPage from "./pages/user_side/ServiceDetailsPage";
import ServicePage from "./pages/user_side/ServicePage";
import GalleryPage from "./pages/user_side/GalleryPage";
import ToolDetailsPage from "./pages/user_side/ToolDetailsPage";
import ManageBanner from "./pages/admin/banner/MangeBanner";
import ManageTeam from "./pages/admin/team/MangeTeam";
import ManageBlogs from "./pages/admin/blog/ManageBlog";

import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import ManageAbout from "./pages/admin/about/ManageAbout";
import ManageSocialResponsibilities from "./pages/admin/social_responsibilits/ManageSocialResponsibilities";
import MangeServiceCategory from "./pages/admin/service_page/MangeServiceCategory";
import ServiceDetailsFirstSection from "./pages/admin/service_details/ServiceDetailsFirstSection";
import ServiceDetailsSecondSection from "./pages/admin/service_details/ServiceDetailsSecondSection";
import ServiceDetailsThirdSection from "./pages/admin/service_details/ServiceDetailsThirdSection";
import ServiceDetailsFourthSection from "./pages/admin/service_details/ServiceDetailsFourthSection";
import ServiceDetailsFifthSection from "./pages/admin/service_details/ServiceDetailsFifthSection";
import ServiceDetailsSixthSection from "./pages/admin/service_details/ServiceDetailsSixthSection";
import MangeFAQ from "./pages/admin/faq/MangeFAQ";
import ServiceDetailsSevenSection from "./pages/admin/service_details/ServiceDetailsSevenSection";
import ServiceDetailsEightsSection from "./pages/admin/service_details/ServiceDetailsEightsSection";
import ServiceDetailsNinthSection from "./pages/admin/service_details/ServiceDetailsNinthSection";
import ServiceDetailsTenthSection from "./pages/admin/service_details/ServiceDetailsTenthSection";
import ServiceDetailsEleventhSection from "./pages/admin/service_details/ServiceDetailsEleventhSection";
import ServiceDetailsTwelvethSection from "./pages/admin/service_details/ServiceDetailsTwelvethSection";
import ServiceDetailsTestimonial from "./pages/admin/service_details/ServiceDetailsTestimonial";
import MangeServiceHeroSection from "./pages/admin/service_page/MangeServiceHeroSection";
import ManageHRCompliance from "./pages/admin/hr_compliance/ManageHRCompliance";
import RightToWorkPage from "./pages/tools/RightToWorkPage";
import SponSorLicensePage from "./pages/tools/SponSorLicensePage";
import HRComplianceAuditPage from "./pages/tools/HRComplianceAuditPage";
import ManageRTWFirstSection from "./pages/admin/manage_tools/rtw_mange/ManageRTWFirstSection";
import ManageToolsType from "./pages/admin/manage_tools/tool_master/ManageToolsType";
import ManageToolsQuestionAnswer from "./pages/admin/manage_tools/tool_master/ManageToolsQuestionAnswer";
import ILREligibilityPage from "./pages/tools/ILREligibilityPage";
import SponsoredJobPage from "./pages/tools/SponsoredJobPage";
import ScrollToTop from "./component/common/ScrollToTop";
import SalaryTaxCalculate from "./pages/taxs/SalaryTaxCalculate";
import PercentageCalculator from "./pages/taxs/PercentageCalculator";
import Managecountry from "./pages/admin/salary_calculator/Managecountry";
import ManageTaxYear from "./pages/admin/salary_calculator/ManageTaxYear";
import ManageNationalInsuranceCategory from "./pages/admin/salary_calculator/ManageNationalInsuranceCategory";
import ManageStudentLoanPlan from "./pages/admin/salary_calculator/ManageStudentLoanPlan";
import ManagePensionOption from "./pages/admin/salary_calculator/ManagePensionOption";
import SponsorLicenceStatusCheckPage from "./pages/tools/SponsorLicenceStatusCheckPage";
import IHSVisaFeeCalculatorPage from "./pages/tools/IHSVisaFeeCalculatorPage";
import CanITakeAdditionalWorkPage from "./pages/tools/CanITakeAdditionalWorkPage";

const App = () => {
  const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer zIndex={9999} />
      <Routes>
        {/* <Route path="/auth" element={<AuthPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* User-facing routes */}

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />{" "}
          {/* Blog detail route */}
          <Route path="/hr-compliance" element={<HRCompliancePage />} />{" "}
          {/* HR Compliance page route */}
          <Route
            path="/self-sponsorship"
            element={<SelfSponsorshipPage />}
          />{" "}
          {/* Self Sponsorship page route */}
          <Route path="/about-us" element={<AboutUsPage />} />{" "}
          {/* About Us page route */}
          <Route path="/team" element={<OurTeamPage />} />{" "}
          {/* Our Team page route */}
          <Route path="/team/:slug" element={<TeamDetailsPage />} />{" "}
          {/* Team member detail route */}
          <Route
            path="/corporate-social-responsibility"
            element={<CorporateSocialResponsibilityPage />}
          />{" "}
          {/* Corporate Social Responsibility page route */}
          {/* <Route path="/services/:id" element={<ServiceDetails />} /> */}
          <Route path="/services" element={<ServicePage />} />{" "}
          {/* Services page route */}
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />{" "}
          {/* Service details route */}



          <Route path="/tools/:slug" element={<ToolDetailsPage />} />{" "}


          {/* Tool details route */}
          <Route path="/tool/right-to-work" element={<RightToWorkPage />} />
          <Route
            path="/tool/sponsor-license-eligibility"
            element={<SponSorLicensePage />}
          />
          <Route
            path="/tool/free-hr-compliance-audit"
            element={<HRComplianceAuditPage />}
          />
          <Route
            path="/tool/ilr-eligibility-calculator"
            element={<ILREligibilityPage />}
          />
          <Route
            path="/tool/sponsored-job-eligibility"
            element={<SponsoredJobPage />}
          />
          
          <Route
            path="/tool/sponsored-licence-status-check"
            element={<SponsorLicenceStatusCheckPage />}
          />
          <Route
            path="/tool/ish-visa-fee-calculator"
            element={<IHSVisaFeeCalculatorPage />}
          />
          <Route
            path="/tool/can-i-take-additional-work"
            element={<CanITakeAdditionalWorkPage />}
          />





          <Route path="/salary-calculator" element={<SalaryTaxCalculate />} />
          <Route
            path="/percentage-calculator"
            element={<PercentageCalculator />}
          />
        </Route>

        {/* Admin Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            {/* Additional admin routes can be added here */}
            <Route path="profile" element={<AdminProfile />} />
            <Route path="site-settings" element={<SiteSettings />} />
            <Route path="seo-settings" element={<SEOSettingsPage />} />
            <Route path="smtp-settings" element={<SMTPSettingsPage />} />

            <Route path="manage-banners" element={<ManageBanner />} />
            <Route path="manage-teams" element={<ManageTeam />} />
            <Route path="manage-blogs" element={<ManageBlogs />} />
            <Route path="manage-about" element={<ManageAbout />} />
            <Route path="manage-faq" element={<MangeFAQ />} />
            <Route
              path="manage-social-responsibilities"
              element={<ManageSocialResponsibilities />}
            />
            <Route
              path="manage-hr-compliance"
              element={<ManageHRCompliance />}
            />

            <Route
              path="service-categories"
              element={<MangeServiceCategory />}
            />
            <Route path="service-hero" element={<MangeServiceHeroSection />} />

            <Route
              path="service-details-first"
              element={<ServiceDetailsFirstSection />}
            />
            <Route
              path="service-details-second"
              element={<ServiceDetailsSecondSection />}
            />
            <Route
              path="service-details-third"
              element={<ServiceDetailsThirdSection />}
            />
            <Route
              path="service-details-fourth"
              element={<ServiceDetailsFourthSection />}
            />
            <Route
              path="service-details-fifth"
              element={<ServiceDetailsFifthSection />}
            />
            <Route
              path="service-details-sixth"
              element={<ServiceDetailsSixthSection />}
            />
            <Route
              path="service-details-seventh"
              element={<ServiceDetailsSevenSection />}
            />
            <Route
              path="service-details-eighth"
              element={<ServiceDetailsEightsSection />}
            />
            <Route
              path="service-details-ninth"
              element={<ServiceDetailsNinthSection />}
            />
            <Route
              path="service-details-tenth"
              element={<ServiceDetailsTenthSection />}
            />
            <Route
              path="service-details-eleventh"
              element={<ServiceDetailsEleventhSection />}
            />
            <Route
              path="service-details-twelveth"
              element={<ServiceDetailsTwelvethSection />}
            />
            <Route
              path="service-details-testimonial"
              element={<ServiceDetailsTestimonial />}
            />

            <Route path="tools/master-type" element={<ManageToolsType />} />
            <Route
              path="tools/question-and-options"
              element={<ManageToolsQuestionAnswer />}
            />
            <Route
              path="tools/rtw/first-section"
              element={<ManageRTWFirstSection />}
            />

            {/* salary calculator routes */}
            <Route
              path="salary-calculator/countries"
              element={<Managecountry />}
            />
            <Route
              path="salary-calculator/tax-years"
              element={<ManageTaxYear />}
            />
            <Route
              path="salary-calculator/national-insurance"
              element={<ManageNationalInsuranceCategory />}
            />
            <Route
              path="salary-calculator/student-loan-plans"
              element={<ManageStudentLoanPlan />}
            />
            <Route
              path="salary-calculator/pension-options"
              element={<ManagePensionOption />} />
            
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
