import React from "react";
import AboutFirstSection from "./AboutFirstSection";
import AboutSecondSection from "./AboutSecondSection";
import AboutThirdSection from "./AboutThirdSection";
import AboutFourthSection from "./AboutFourthSection";

const ManageAbout = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage About</h1>
        <p className="text-gray-600 mt-2">
          Manage different sections of your about page independently
        </p>
      </div>

      <div className="space-y-8">
        <AboutFirstSection />
        <AboutSecondSection />
        <AboutThirdSection />
        <AboutFourthSection />
      </div>
    </div>
  );
};

export default ManageAbout;
