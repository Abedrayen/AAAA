import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface PredictionPopupProps {
  handleClosePopup: () => void;
}

const PredictionPopup: React.FC<PredictionPopupProps> = ({ handleClosePopup }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToPrediction = () => {
    navigate("/prediction");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex sm:px-0 px-10 justify-center items-center z-50">
      <div className="bg-white py-4 rounded-lg flex flex-col gap-y-8 px-10 justify-center items-center
          xl:w-[900px] xl:h-[500px]
          lg:w-[800px] lg:h-[500px]
          md:w-[600px] md:h-[500px]
          sm:w-[500px] sm:h-[400px]">
        <h2 className="text-base sm:text-2xl md:text-4xl mb-4">
        {t('studyConfirmation')}
        </h2>
        <div className="flex flex-col text-sm sm:text-xl md:text-3xl gap-y-4">
          <button
            className="rounded-lg bg-green-500 text-black py-2 px-4 w-full"
            onClick={handleNavigateToPrediction}
          >
   {t('donePlenty')}
   </button>
          <button
            className="rounded-lg bg-[#ffaf4d] text-black py-2 px-4 w-full"
            onClick={handleClosePopup}
          >
            {t('takeMeBack')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionPopup;
