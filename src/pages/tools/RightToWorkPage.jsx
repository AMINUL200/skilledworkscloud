import React, { useState, useEffect } from 'react';
import RTWHeroSection from '../../component/common/tools_compo/right_to_Work/RTWHeroSection';
import PageLoader from '../../component/common/PageLoader';
import { api } from '../../utils/app';

const RightToWorkPage = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRTWSection();
  }, []);

  const fetchRTWSection = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/rtw-first-section/details');

      if (response.data.status && response.data.data) {
        setSectionData(response.data.data);
      } else {
        setError('Failed to fetch section data');
      }
    } catch (err) {
      console.error('Error fetching RTW section:', err);
      setError(err.message || 'Failed to fetch section data');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return <PageLoader/>
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchRTWSection}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!sectionData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-2">No data available</div>
          <p className="text-gray-500">Please add RTW section data in admin panel</p>
        </div>
      </div>
    );
  }



  return (
    <div>
      <RTWHeroSection sectionInfo={sectionData} />
    </div>
  );
};

export default RightToWorkPage;