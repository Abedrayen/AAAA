import { useTranslation } from "react-i18next";

const TeamStats = ({ stats }: { stats: any }) => {
    const { t } = useTranslation();

    return (
        <>
            {stats && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                        {t("teamStatistics_ts")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {/* League Info */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("leagueInfo_ts")}
                            </h4>
                            <p className="text-sm text-gray-600">{stats.league.name}</p>
                            <p className="text-sm text-gray-600">
                                {t("season_ts", { season: stats.league.season })}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("form_ts")}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {stats.form.split("").map((result: string, idx: number) => {
                                    const bgColor =
                                        result === "W"
                                            ? "bg-green-500"
                                            : result === "D"
                                            ? "bg-yellow-400"
                                            : "bg-red-500";
                                    return (
                                        <span
                                            key={idx}
                                            className={`${bgColor} text-white text-xs font-bold px-2 py-1 rounded-full`}
                                            title={
                                                result === "W"
                                                    ? t("win_ts")
                                                    : result === "D"
                                                    ? t("draw_ts")
                                                    : t("loss_ts")
                                            }
                                        >
                                            {result}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Fixtures */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("fixtures_ts")}
                            </h4>
                            <p className="text-sm text-gray-600">
                                {t("played_ts", { played: stats.fixtures.played.total })}
                            </p>
                            <p className="text-sm text-gray-600 text-green-600">
                                {t("wins_ts", { wins: stats.fixtures.wins.total })}
                            </p>
                            <p className="text-sm text-gray-600 text-yellow-500">
                                {t("draws_ts", { draws: stats.fixtures.draws.total })}
                            </p>
                            <p className="text-sm text-gray-600 text-red-600">
                                {t("losses_ts", { losses: stats.fixtures.loses.total })}
                            </p>
                        </div>

                        {/* Goals */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("goals_ts")}
                            </h4>
                            <p className="text-sm text-gray-600 text-green-600">
                                {t("goalsFor_ts", { for: stats.goals.for.total.total })}
                            </p>
                            <p className="text-sm text-gray-600 text-red-600">
                                {t("goalsAgainst_ts", { against: stats.goals.against.total.total })}
                            </p>
                        </div>

                        {/* Clean Sheets */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("cleanSheets_ts")}
                            </h4>
                            <p className="text-sm text-gray-600 text-green-600">
                                {t("cleanSheetsCount_ts", { total: stats.clean_sheet.total })}
                            </p>
                        </div>

                        {/* Failed to Score */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("failedToScore_ts")}
                            </h4>
                            <p className="text-sm text-gray-600 text-red-600">
                                {t("failedToScoreCount_ts", { total: stats.failed_to_score.total })}
                            </p>
                        </div>

                        {/* Penalty */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h4 className="text-sm font-bold text-gray-700">
                                {t("penalty_ts")}
                            </h4>
                            <p className="text-sm text-gray-600 text-green-600">
                                {t("penaltyScored_ts", {
                                    scored: stats.penalty.scored.total,
                                    percentage: stats.penalty.scored.percentage,
                                })}
                            </p>
                            <p className="text-sm text-gray-600 text-red-600">
                                {t("penaltyMissed_ts", {
                                    missed: stats.penalty.missed.total,
                                    percentage: stats.penalty.missed.percentage,
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamStats;
