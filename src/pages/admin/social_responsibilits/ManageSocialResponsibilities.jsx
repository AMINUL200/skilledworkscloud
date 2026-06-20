import React from "react";
import SocialFirstSection from "./SocialFirstSection";
import SocialSecondSection from "./SocialSecondSection";
import SocialThirdSection from "./SocialThirdSection";
import SocialFourthSection from "./SocialFourthSection";
import SocialFifthSection from "./SocialFifthSection";
import SocialSixthSection from "./SocialSixthSection";
import SocialSeventhSection from "./SocialSeventhSection";

const ManageSocialResponsibilities = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Social Responsibilities</h1>
        <p className="text-gray-600 mt-2">
          Manage different sections of your social responsibility page independently
        </p>
      </div>

      <div className="space-y-8">
        <SocialFirstSection/>
        <SocialSecondSection/>
        <SocialThirdSection/>
        <SocialFourthSection/>
        <SocialFifthSection/>
        <SocialSixthSection/>
        <SocialSeventhSection/>
      </div>
    </div>
  );
};

export default ManageSocialResponsibilities;
