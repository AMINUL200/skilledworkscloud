import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
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


import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

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
          <Route path="/blog/:id" element={<BlogDetail />} />{" "}
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
          <Route path="/team/:id" element={<TeamDetailsPage />} />{" "}
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





          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
