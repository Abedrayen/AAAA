import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const ThisWeekExtra = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [visibleRows, setVisibleRows] = useState(5); // Initial visible rows
//   const standings: Standing[] = standingsData.standings;

  const showMore = () => {
    navigate("/table");
  };

  return (
    <div className="overflow-x-auto container py-5  flex flex-col w-7/12 sm:w-full">
      <table className=" table-auto border-collapse  text-left">
        <thead>
          <tr className="bg-white text-xl font-semibold        text-[#1F5059]">
            <th className="px-32 py-2">This weeks extra </th>
            <th className="px-32 py-2">This weeks extra </th>
            <th className="px-32 py-2">This weeks extra </th>
          
          </tr>
        </thead>
        <tbody>
        <tr
             
              className={`border-b text-xs bg-white`} // Alternate between white and gray
            >
              <td className="px-32 py-2">{`(Sponsor)`}</td>
              <td className="px-32 py-2">{`(Sponsor)`}</td>
              <td className="px-32 py-2">{`(Sponsor)`}</td>

            
            </tr>
        </tbody>
      </table>
       
     
    </div>
  );
};

export default ThisWeekExtra;