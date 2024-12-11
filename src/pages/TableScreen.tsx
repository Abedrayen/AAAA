

import React, { useState } from 'react'
import StandingsTable from '../components/Standings'
import StandingsTableFull from '../components/standingsFull'
import tape from "../assets/tape.svg"
import PredictionPopup from '../components/predictionPopup'
import { useTranslation } from 'react-i18next'

function TableScreen() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <section className=" w-full  relative justify-center items-center p-4 "  >
      <img src={tape} alt="tape"  className='hidden sm:absolute z-10 right-0 md:-right-10 top-10'/>       

     <div className="flex flex-col justify-center gap-y-6 py-4 px-6 items-center s ">
     <button
              className="p-3 px-6 rounded-lg text-sm sm:text-base md:text-xl bg-[#056A4C] text-white "
              onClick={()=>setIsPopupOpen(true)}
            >
              {t('predictionPage')}
            </button>
         <StandingsTableFull/>
       

            </div>
            {isPopupOpen&&<PredictionPopup handleClosePopup={()=>setIsPopupOpen(false)} /> }
    </section>
  )
}

export default TableScreen  