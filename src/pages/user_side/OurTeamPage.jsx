import React, { useEffect, useState } from 'react';
import TeamBanner from '../../component/team/TeamBanner';
import TeamSection from '../../component/team/TeamSection';
import PageLoader from '../../component/common/PageLoader';
import { api } from '../../utils/app';

const OurTeamPage = () => {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState({
    firstSection: null,
    members: [],
    secondSection: null,
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/team');
        
        if (response.data.status && response.data.data) {
          setTeamData({
            firstSection: response.data.data.first_section || null,
            members: response.data.data.team_members || [],
            secondSection: response.data.data.second_section || null,
          });
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-[#EEF5FD] overflow-hidden">
      {/* Team Banner */}
      <TeamBanner data={teamData.firstSection} />
      
      {/* Team Section */}
      <TeamSection members={teamData.members} sectionInfo={teamData.secondSection} />
    </div>
  );
};

export default OurTeamPage;