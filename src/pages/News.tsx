import { useState } from "react";
import palmier from "../assets/palmier.svg";
import NewsListFull from "../components/NewsListFull";
import { useNavigate } from "react-router-dom";
import PredictionPopup from "../components/predictionPopup";
import { useTranslation } from "react-i18next";

function News() {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { t } = useTranslation();

    const handleOpenPopup = () => {
      
        setIsPopupOpen(true);
      };
    return (
        <section className="relative w-full flex justify-center items-center p-4 bg-gray-50 mt-24">
            <img
                src={palmier}
                alt="palmier"
                className="absolute top-0 left-0 h-screen w-auto opacity-20 pt-24" />
            <div className="flex  max-w-6xl mx-auto flex-col items-center gap-y-8 min-h-screen w-full  ">
                <h1 className="text-3xl font-bold text-[#1F5059]">{t('recentNews')}</h1>
                <button
              className="p-3 rounded-lg text-xl bg-[#056A4C] text-white w-full"
              onClick={handleOpenPopup}
            >
              {t('predictionPage')}
            </button>
        
            <NewsListFull />
 
            </div>
            {isPopupOpen&&<PredictionPopup handleClosePopup={()=>setIsPopupOpen(false)} /> }
        </section>
    );
}

export default News;
