import React from 'react';
import TeamFirstSection from './TeamFirstSection';
import TeamSecondSection from './TeamSecondSection';
import TeamThirdSection from './TeamThirdSection';

const ManageTeam = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Team</h1>
        <p className="text-gray-600 mt-2">Manage different sections of your team page independently</p>
      </div>

      <div className="space-y-8">
        {/* First Section - Team Header */}
        <TeamFirstSection />

        {/* Second Section - Team Members */}
        <TeamSecondSection />

        {/* Third Section - Team Values */}
        <TeamThirdSection />
      </div>
    </div>
  );
};

export default ManageTeam;