import React from "react";
import HRComplianceFirstSection from "./HRComplianceFirstSection";
import HRComplianceSecondSection from "./HRComplianceSecondSection";
import HRComplianceThirdSection from "./HRComplianceThirdSection";

const ManageHRCompliance = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage HR Compliance
        </h1>
        <p className="text-gray-600 mt-2">
          Manage different sections of your HR compliance page
          independently
        </p>
      </div>

      <div className="space-y-8">
        <HRComplianceFirstSection />
        <HRComplianceSecondSection/>
        <HRComplianceThirdSection/>
      </div>
    </div>
  );
};

export default ManageHRCompliance;
