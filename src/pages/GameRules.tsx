import React from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineDownload } from "react-icons/ai";

const GamesRules = () => {
  const { t, i18n } = useTranslation();

  // Check if the current language is Arabic
  const isArabic = i18n.language == "Arabic";

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg mt-24 mb-8">
      <div
        className={`flex justify-between items-center mb-6 ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <h1
          className={`text-2xl md:text-4xl font-bold ${
            isArabic ? "text-right" : ""
          } text-[#14532D]`}
        >
          {t("gamesRules.title")}
        </h1>
        {/* Download Button */}
        <a
          href={!isArabic? "/Rules.pdf":"/Rules_arabic.pdf"}
          target="_blank"
          className={`flex items-center space-x-2 ${
            isArabic ? "space-x-reverse" : ""
          } text-[#15803D] hover:text-[#14532D] transition-colors`}
          download
        >
          <AiOutlineDownload className="text-2xl" />
          <span className="text-sm md:text-base font-medium">
            {t("gamesRules.download")}
          </span>
        </a>
      </div>

      <p
        className={`text-gray-700 text-sm md:text-base mb-4 ${
          isArabic ? "text-right" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: t("gamesRules.welcomeMessage") }}
      />
      <p
        className={`text-gray-700 text-sm md:text-base mb-4 ${
          isArabic ? "text-right" : ""
        }`}
      >
        {t("gamesRules.infoMessage1")}
      </p>
      <p
        className={`text-gray-700 text-sm md:text-base mb-4 ${
          isArabic ? "text-right" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: t("gamesRules.infoMessage2") }}
      />

      <h2
        className={`text-xl md:text-2xl font-semibold text-[#15803D] mt-8 mb-4 ${
          isArabic ? "text-right" : ""
        }`}
      >
        {t("gamesRules.whatIsChallenge")}
      </h2>
      <p
        className={`text-gray-700 text-sm md:text-base mb-4 ${
          isArabic ? "text-right" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: t("gamesRules.challengeDescription") }}
      />

      <h2
        className={`text-xl md:text-2xl font-semibold text-[#15803D] mt-8 mb-4 ${
          isArabic ? "text-right" : ""
        }`}
      >
        {t("gamesRules.howItWorks")}
      </h2>
      <ul
        className={`list-disc list-inside text-gray-700 text-sm md:text-base space-y-2 mb-4 ${
          isArabic ? "text-right" : ""
        }`}
      >
        <li
          dangerouslySetInnerHTML={{
            __html: t("gamesRules.howItWorksList.point1"),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t("gamesRules.howItWorksList.point2"),
          }}
        />
        <li
          dangerouslySetInnerHTML={{
            __html: t("gamesRules.howItWorksList.point3"),
          }}
        />
      </ul>

      <h2
        className={`text-xl md:text-2xl font-semibold text-[#15803D] mt-8 mb-4 ${
          isArabic ? "text-right" : ""
        }`}
      >
        {t("gamesRules.rewardPools")}
      </h2>
      <div className="overflow-x-auto">
        <table
          className={`table-auto w-full text-left border-collapse ${
            isArabic ? "text-right" : ""
          }`}
        >
          <thead>
            <tr className="bg-[#D1FAE5] text-gray-800">
              <th className="border px-4 py-2">
                {t("gamesRules.tableHeaders.pool")}
              </th>
              <th className="border px-4 py-2">
                {t("gamesRules.tableHeaders.requirement")}
              </th>
              <th className="border px-4 py-2">
                {t("gamesRules.tableHeaders.reward")}
              </th>
            </tr>
          </thead>
          <tbody>
            {["pool1", "pool2", "pool3"].map((poolKey, index) => (
              <tr
                key={poolKey}
                className={index % 2 === 0 ? "" : "bg-[#F0FDF4]"}
              >
                <td className="border px-4 py-2">
                  {t(`gamesRules.tableContent.${poolKey}.name`)}
                </td>
                <td className="border px-4 py-2">
                  {t(`gamesRules.tableContent.${poolKey}.requirement`)}
                </td>
                <td className="border px-4 py-2">
                  {t(`gamesRules.tableContent.${poolKey}.reward`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p
        className={`text-gray-700 text-sm md:text-base mt-6 ${
          isArabic ? "text-right" : ""
        }`}
      >
        {t("gamesRules.jackpot")}
      </p>
    </div>
  );
};

export default GamesRules;
