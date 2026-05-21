import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> {/* Blog detail route */}
          <Route path="/hr-compliance" element={<HRCompliancePage />} /> {/* HR Compliance page route */}
          <Route path="/self-sponsorship" element={<SelfSponsorshipPage />} /> {/* Self Sponsorship page route */}
          <Route path="/about-us" element={<AboutUsPage />} /> {/* About Us page route */}
          <Route path="/team" element={<OurTeamPage />} /> {/* Our Team page route */}
          <Route path="/team/:id" element={<TeamDetailsPage />} /> {/* Team member detail route */}
          <Route path="/corporate-social-responsibility" element={<CorporateSocialResponsibilityPage />} /> {/* Corporate Social Responsibility page route */}
          <Route path="/services/:id" element={<ServiceDetails />} /> {/* Service details route */  }
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
