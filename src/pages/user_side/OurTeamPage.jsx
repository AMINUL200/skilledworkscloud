import React, { useEffect, useState } from 'react'
import TeamBanner from '../../component/team/TeamBanner'
import TeamSection from '../../component/team/TeamSection'
import PageLoader from '../../component/common/PageLoader';

const OurTeamPage = () => {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  } , []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <div className="bg-[#EEF5FD] overflow-hidden">
        {/* Team Banner */}
        <TeamBanner />
        {/* Team Section */}
        <TeamSection />
      
    </div>
  )
}

export default OurTeamPage
