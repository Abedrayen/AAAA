import React, { useState } from "react";
import Card from "../components/Card";
import ListItem from "../components/ListItem"; // Import the new ListItem component
import gossipData from "../data/gossipData"; // Import the data
import NewsListGossip from "../components/NewsListGossip";
import PredictionPopup from "../components/predictionPopup";
import { useTranslation } from "react-i18next";

function Gossip() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="w-full  flex justify-center items-center p-4">
      <div className="flex w-full items-center gap-4 flex-col min-h-screen pt-8">
      <button
              className="p-3 rounded-lg text-xl bg-[#056A4C] text-white w-full"
              onClick={()=>setIsPopupOpen(true)}
            >
              {t('predictionPage')}
            </button>
        <h1 className="text-4xl font-bold text-[#1f5059c9] mb-10">{t("gossip") }</h1>
        <div className="flex lg:flex-row gap-y-10 flex-col justify-center items-center lg:items-start gap-x-20 w-full ">
          <div>
            <Card
              imageSrc="https://assets.goal.com/images/v3/blt415a2a7aed3f808c/Has%20the%20Saudi%20bubble%20burst.jpg?auto=webp&format=pjpg&width=3840&quality=60"
              title="Sample Card"
              description="This is a sample description for the card component."
            />
          </div>
          <div className="flex flex-col gap-y-8 items-center justify-center ">
            <div className="flex w-full justify-center gap-x-6">
              <div className="flex border-b-2 mb-2 w-full border-white"></div>
              <span className="whitespace-nowrap text-white font-bold text-xl md:text-2xl lg:text-4xl">
              {t('mostViews')}
              </span>
              <div className="flex border-b-2 mb-2 w-full border-white"></div>
            </div>

            {/* Mapping over the data to create ListItems */}
            <div className="flex flex-col text-base md:text-xl lg:text-2xl text-white gap-y-6 items-center justify-center ">
              {gossipData.map((item) => (
                <ListItem key={item.id} title={item.title} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row gap-y-10 gap-x-3 flex-col justify-between items-center lg:items-end  w-full ">
          <div className="max-w-md  w-full   flex justify-center items-center gap-x-4">
            <Card
              imageSrc="https://static.independent.co.uk/2023/08/14/12/GettyImages-1608058193.jpg"
              title="Sample Card"
              description="This is a sample description for the card component."
            />
             <Card
              imageSrc="https://static.independent.co.uk/2023/08/14/12/GettyImages-1608058193.jpg"
              title="Sample Card"
              description="This is a sample description for the card component."
            />
          </div>
          <div className="flex w-full  flex-col gap-y-8 items-center justify-center ">
            <div className="flex w-full justify-center gap-x-6">
              <div className="flex border-b-2 mb-2 w-full border-white"></div>
              <span className="whitespace-nowrap text-white font-bold text-xl md:text-2xl lg:text-4xl">
              {t('recentNews')}
              </span>
              <div className="flex border-b-2 mb-2 w-full border-white"></div>
            </div>
            <NewsListGossip />
          </div>
        </div>
      </div>
      {isPopupOpen&&<PredictionPopup handleClosePopup={()=>setIsPopupOpen(false)} /> }

    </section>
  );
}

export default Gossip;