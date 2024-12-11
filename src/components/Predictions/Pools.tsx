import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PoolsPrediction = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { t } = useTranslation();

  const [visibleRows, setVisibleRows] = useState(5); // Initial visible rows

  const showMore = () => {
    navigate("/table");
  };

  return (
    <div className="gap-y-4 flex flex-col w-full">
      <div className="border-[#4a917c] border rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-[#97cfaacd]  text-xl text-[#358168]">
              <th className="px-16 py-4 text-center">POOL 1</th>
              <th className="px-16 py-4 text-center">POOL 2</th>
              <th className="px-16 py-4 text-center">POOL 3</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-base font-semibold bg-[#97cfaacd]">
              <td className="px-16 py-4 text-center">7 games right</td>
              <td className="px-16 py-4 text-center w-1/3">
                7 games right + 1 exact score
              </td>
              <td className="px-16 py-4 text-center w-1/3">
                7 games + 2 exact scores
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="items-center" style={{ textAlign: "center" }}>
        <h1 className="text-xl font-bold text-[#1f5059e2]">{t('jackpot')}</h1>

      </div>
    </div>
  );
};

export default PoolsPrediction;