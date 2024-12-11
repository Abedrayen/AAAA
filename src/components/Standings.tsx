import React, { useEffect, useState } from "react";
import standingsData from "../data/data.json"; // Assume the JSON data is stored in a local file
import { useNavigate } from "react-router-dom";
import { getStandings } from "../API/API";
import { useTranslation } from "react-i18next";

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  all: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals: {
      for: number;
      against: number;
    };
  };
}

const StandingsTable = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { t } = useTranslation();

  const [visibleRows, setVisibleRows] = useState(5); // Initial visible rows
  // const standings: Standing[] = standingsData.standings;
  const [standings,setStandings]=useState<any[]>([])
  const showMore = () => {
    navigate("/table");
  };

  useEffect(()=>{
    const getStands=async()=>{
      const res= await getStandings()
  
      const standingsGot=res.response[0].league.standings[0]
      console.log('res stands',standingsGot)

      setStandings(standingsGot)
   }
   getStands()
  },[])

  return (
    <div className="overflow-x-auto container py-5  flex flex-col w-7/12 sm:w-full">
      <table className=" table-auto border-collapse  text-left">
        <thead>
          <tr className="bg-white text-xs        text-[#1F5059]">
                <th className="px-2 py-2">{t('rank')}</th>
                <th className="px-4 py-2">{t('team')}</th>
                <th className="px-4 py-2">{t('points')}</th>
                <th className="px-4 py-2">{t('gamesPlayed')}</th>
                <th className="px-4 py-2">{t('wins')}</th>
                <th className="px-4 py-2">{t('draws')}</th>
                <th className="px-4 py-2">{t('losses')}</th>
                <th className="px-4 py-2">{t('goalsFor')}</th>
                <th className="px-4 py-2">{t('goalsAgainst')}</th>
                <th className="px-4 py-2">{t('goalDifference')}</th>
          </tr>
        </thead>
        <tbody>
          {standings.slice(0, visibleRows).map((standing, index) => (
            <tr
              key={standing.rank}
              className={`border-b text-xs ${
                index % 2 === 0 ? "bg-white" : "bg-transparent"
              }`} // Alternate between white and gray
            >
              <td className="px-2 py-2">{standing.rank}</td>
              <td className="text-[9px] pr-5 pl-1 py-2 flex items-center whitespace-nowrap font-semibold">
                <img
                  src={standing.team.logo}
                  alt={`${standing.team.name} logo`}
                  className="w-5 h-5 mr-2 "
                />
                {standing.team.name}
              </td>
              <td className="px-2 py-2">{standing.points}</td>
              <td className="px-2 py-2">{standing.all.played}</td>
              <td className="px-2 py-2">{standing.all.win}</td>
              <td className="px-2 py-2">{standing.all.draw}</td>
              <td className="px-2 py-2">{standing.all.lose}</td>
              <td className="px-2 py-2">{standing.all.goals.for}</td>
              <td className="px-2 py-2">{standing.all.goals.against}</td>
              <td className="px-2 py-2">{standing.goalsDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleRows < standings.length && (
        <div className="flex justify-center items-center">
<button
          onClick={showMore}
          className="mt-2 px-4 py-2 bg-[#4c9a82] text-white rounded-lg"
          >
          {t('showMore')}
        </button>
        </div>
        
      )}
    </div>
  );
};

export default StandingsTable;