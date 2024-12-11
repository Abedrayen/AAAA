import { useState } from "react";
import palmier from "../assets/palmier.svg";
import ads from "../assets/ads.svg";
import player from "../assets/player.svg";
import StandingsTable from "../components/Standings";
import NewsList from "../components/NewsList";
import tape from "../assets/tape.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GeneralInfos from "../components/HomeComponents/GeneralInfos";



function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleNavigateToPrediction = () => {
    navigate("/prediction");
  };

  return (
    <section className="w-full flex justify-center items-center p-4 relative">
      <img
        src={palmier}
        alt="palmier"
        className="absolute top-4 left-0 h-screen w-auto"
      />
      <div className="flex w-full items-center gap-y-24 flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex lg:flex-row gap-y-24 flex-col justify-center items-center w-full px-16 pt-32 pb-4">
          <div className="relative p-16 lg:p-2 w-1/2 sm:w-full lg:w-1/2 h-full">
            <h1 className="text-2xl text-[#1F5059] sm:text-6xl md:text-[96px] w-2/3 sm:w-full lg:w-[65%] pl-4 leading-7 sm:leading-[80px] font-bold uppercase">
              {t("topScorer")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#1F5059] to-[#7ebfac]">
                {t("finalMatch")}
              </span>
            </h1>
            <img
              src={player}
              alt="player"
              className="absolute w-44 sm:w-80 md:w-[400px] h-auto right-10 sm:right-0 top-0"
            />
            <img
              src={tape}
              alt="tape"
              className="absolute w-44 sm:w-80 md:w-[400px] h-auto right-10 bottom-0 sm:right-0"
            />
          </div>
          <div className="flex w-[250px] sm:w-[350px] justify-center gap-y-2 items-center flex-col">
            <p className="dm-sans text-xl">{t("welcomeMessage")}</p>
            <button
              className="p-3 rounded-lg text-xl bg-[#056A4C] text-white w-full"
              onClick={handleOpenPopup}
            >
              {t("predictionPage")}
            </button>
          </div>
        </div>

  {/* General Info Section */}
  <GeneralInfos />
  
        {/* News and Standings */}
        <div className="px-16 pt-20 w-full flex gap-x-4 lg:flex-row flex-col justify-center items-center lg:items-start">
          <div className="flex flex-col w-full lg:w-1/2 justify-center gap-y-6 sm:px-0 px-36 py-4 items-center sm:items-start">

            <h1 className="text-4xl font-bold text-gray-800">{t("recentNews")}</h1>
            <NewsList />
          </div>
          <div className="flex flex-col w-full lg:w-1/2 justify-center gap-y-6 py-4 sm:px-0 px-36 items-center sm:items-start">
            <h1 className="text-4xl font-bold text-gray-800">{t("clubsRanking")}</h1>
            <StandingsTable />
          </div>
        </div>

      
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex sm:px-0 px-10 justify-center items-center">
          <div className="bg-white py-4 rounded-lg flex flex-col gap-y-8 px-10 justify-center items-center
             xl:w-[900px] xl:h-[500px]
             lg:w-[800px] lg:h-[500px]
               md:w-[600px] md:h-[500px]
                              sm:w-[500px] sm:h-[400px]

             ">
            <h2 className="text-base sm:text-2xl md:text-4xl mb-4">
              {t("studyConfirmation")}
            </h2>
            <div className="flex flex-col text-sm sm:text-xl md:text-3xl gap-y-4">
              <button
                className="rounded-lg bg-green-500 text-black py-2 px-4 w-full"
                onClick={handleNavigateToPrediction}
              >
                {t("donePlenty")}
              </button>
              <button
                className="rounded-lg bg-[#ffaf4d] text-black py-2 px-4 w-full"
                onClick={handleClosePopup}
              >
                {t("takeMeBack")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
