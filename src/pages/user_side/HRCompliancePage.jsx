import React from "react";

import {
  ShieldCheck,
  FileCheck2,
  Users,
  BadgeCheck,
} from "lucide-react";
import HRComplianceBanner from "../../component/hrCompliance/HRComplianceBanner";
import HRComplianceFreeAuditSection from "../../component/hrCompliance/HRComplianceFreeAuditSection";
import HRComplianceHRMSInfoSection from "../../component/hrCompliance/HRComplianceFreeHRMSInfoSection";
import HRPricingSection from "../../component/hrCompliance/HRPricingSection";


const HRCompliancePage = () => {
  const services = [
    {
      icon: ShieldCheck,
      title: "Sponsor Licence Compliance",
      description:
        "Complete sponsor licence management and compliance support for UK employers.",
    },

    {
      icon: FileCheck2,
      title: "Right To Work Checks",
      description:
        "Digital employee verification and documentation management systems.",
    },

    {
      icon: Users,
      title: "HR Monitoring",
      description:
        "Track employee visa expiry, records and Home Office compliance obligations.",
    },

    {
      icon: BadgeCheck,
      title: "Compliance Audit",
      description:
        "Professional compliance audits and risk assessments for businesses.",
    },
  ];

  return (
    <div className="bg-[#EEF5FD] overflow-hidden">
      {/* BANNER */}

      <HRComplianceBanner />

      <HRComplianceFreeAuditSection />

      <HRComplianceHRMSInfoSection />

      <HRPricingSection />

     
    </div>
  );
};

export default HRCompliancePage;