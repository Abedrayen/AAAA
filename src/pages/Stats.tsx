import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PredictionPopup from '../components/predictionPopup';
import TopScoreres from '../components/StatsComponents/TopScorers';
import TeamsScrollable from '../components/StatsComponents/TeamsScrollable';
import TopAssists from '../components/StatsComponents/TopAssists';
import TopRedCards from '../components/StatsComponents/TopRedCards';
import TopYellowCards from '../components/StatsComponents/TopYellowCards';

function Stats() {
  const { t } = useTranslation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('scorers'); // Default tab
  const [isLoading, setIsLoading] = useState(false);

  const renderTabs = () => {
    return (
      <div className="w-full flex border-b-2">
        {/* Tab: Top Scorers */}
        <button
          onClick={() => setSelectedTab('scorers')}
          className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
            selectedTab === 'scorers' ? 'bg-white shadow-md' : 'bg-gray-200'
          }`}
        >
          {t('topScorers')}
        </button>

        {/* Tab: Top Assists */}
        <button
          onClick={() => setSelectedTab('assists')}
          className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
            selectedTab === 'assists' ? 'bg-white shadow-md' : 'bg-gray-200'
          }`}
        >
          {t('topAssissts')}
        </button>

        {/* Tab: Top Red Cards */}
        <button
          onClick={() => setSelectedTab('redCards')}
          className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
            selectedTab === 'redCards' ? 'bg-white shadow-md' : 'bg-gray-200'
          }`}
        >
          {t('topredcards')}
        </button>

        {/* Tab: Top Yellow Cards */}
        <button
          onClick={() => setSelectedTab('yellowCards')}
          className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
            selectedTab === 'yellowCards' ? 'bg-white shadow-md' : 'bg-gray-200'
          }`}
        >
          {t('topyellowcards')}
        </button>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'scorers':
        return <TopScoreres />;
      case 'assists':
        return <TopAssists />;
      case 'redCards':
        return <TopRedCards />;
      case 'yellowCards':
        return <TopYellowCards />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto flex flex-col justify-center gap-y-6 py-4 px-6 items-center pt-20">
      {/* Prediction Button */}
      <button
        className="p-3 px-6 rounded-lg text-sm sm:text-base md:text-xl bg-[#056A4C] text-white"
        onClick={() => setIsPopupOpen(true)}
      >
        {t('predictionPage')}
      </button>

      {/* Teams Scrollable Component */}
      <TeamsScrollable />

      <div className="w-full mt-4 min-h-[48rem]" >
            {/* Tabs Navigation */}
            {renderTabs()}

        {/* Render Content Based on Active Tab */}
        <div className="w-full mt-4 min-h-[24rem]">{renderTabContent()}</div>
      </div>
     

      {/* Prediction Popup */}
      {isPopupOpen && <PredictionPopup handleClosePopup={() => setIsPopupOpen(false)} />}
    </div>
  );
}

export default Stats;
