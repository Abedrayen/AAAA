import React, { useEffect, useState } from "react";
import standingsData from "../data/data.json"; // Assume the JSON data is stored in a local file
import { useNavigate } from "react-router-dom";
import { getStandings } from "../API/API";
import LoadingSpinner from "./LoadingSpinner"; // Import your loading spinner
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

const StandingsTableFull = () => {
  const { t } = useTranslation();
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const getStands = async () => {
      setLoading(true); // Start loading
      const res = await getStandings();
      const standingsGot = res.response[0].league.standings[0];
      console.log('res stands', standingsGot);

      setStandings(standingsGot);
      setLoading(false); // End loading
    };
    getStands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  return (
    <div className=" mx-auto overflow-x-auto p-4 gap-y-4 flex-col w-1/2 xss:w-[60%] xs:w-[80%] sm:w-full flex">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#1F5059]">{t('table')}</h1>

      <table className="z-30 table-auto border-collapse overflow-x-auto text-left">
        <thead>
          <tr className="bg-white text-sm sm:text-base md:text-xl xl:text-2xl text-[#1F5059]">
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
          {standings.map((standing, index) => (
            <tr
              key={standing.rank}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-transparent"
              }`}
            >
              <td className="px-4 py-2  text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.rank}</td>
              <td className="px-4 py-2 flex text-[8px] sm:text-[8px] md:text-xl xl:text-2xl  items-center font-semibold whitespace-nowrap">
                <img
                  src={standing.team.logo}
                  alt={`${standing.team.name} logo`}
                  className="md:w-8 md:h-8 w-5 h-5 mr-2"
                />
                {standing.team.name}
              </td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.points}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.all.played}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base  md:text-xl xl:text-2xl">{standing.all.win}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.all.draw}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.all.lose}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.all.goals.for}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.all.goals.against}</td>
              <td className="px-4 py-2 text-[8px] sm:text-base md:text-xl xl:text-2xl">{standing.goalsDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTableFull;
