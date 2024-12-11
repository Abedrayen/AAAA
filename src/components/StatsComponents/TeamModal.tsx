import { useState } from "react";
import { useTranslation } from "react-i18next"; // Import i18n hook
import LoadingSpinner2 from "../LoadingSpinner2";
import TeamStats from "./StatsModalComponents/TeamStats";
import { getPlayerProfile, getTeamSquad } from "../../API/API";

const TeamModal = ({
    isOpen,
    onClose,
    team,
    stats,
    isLoading,
}: {
    isOpen: boolean;
    onClose: () => void;
    team: any;
    stats: any;
    isLoading: boolean;
}) => {
    const { t, i18n } = useTranslation(); // i18n hook for translations
    const [showSquad, setShowSquad] = useState(false);
    const [teamSquad, setTeamSquad] = useState<any[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null); // To display selected player info
    const [loadingPlayerInfos, setLoadingPlayerInfos] = useState(false);
    const [playerDetails, setPlayerDetails] = useState<any>(null);

    const isArabic = i18n.language === "Arabic"; // Check if the language is Arabic

    const getMyTeamSquad = async () => {
        try {
            const data = {
                team: team?.team?.id,
            };
            const response = await getTeamSquad(data);
            if (response) {
                console.log("getTeamSquad response", response);
                setTeamSquad(response[0]?.players || []);
            }
        } catch (error) {
            console.error("Error fetching squad:", error);
        }
    };

    const getPlayerInfos = async (player: any = undefined) => {
        setLoadingPlayerInfos(true);
        try {
            const data = {
                player: player ? player?.id : selectedPlayer?.id,
            };
            const response = await getPlayerProfile(data);
            console.log("response getProfile", response);
            if (response) {
                setPlayerDetails(response[0]?.player || null);
                setSelectedPlayer(player);
            }
        } catch (error) {
            console.error("Error fetching player info:", error);
        } finally {
            setLoadingPlayerInfos(false);
        }
    };

    const renderHeaderInfos = () => {
        return (
            <div className={`flex items-center ${isArabic ? "space-x-reverse" : "space-x-6"}`}>
                <img
                    src={team.team.logo}
                    alt={team.team.name}
                    className="w-24 h-24 rounded-full shadow-md border-4 border-gray-200"
                />
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {team.team.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t("teamInfo", {
                            country: team.team.country,
                            founded: team.team.founded,
                        })}
                    </p>
                </div>
            </div>
        );
    };

    const renderCloseButton = () => {
        return (
            <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
                ✕
            </button>
        );
    };

    const renderVenueInfos = () => {
        return (
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">{t("venue")}</h3>
                <p className="text-sm text-gray-600">
                    <strong>{team.venue.name}</strong>, {team.venue.city}
                </p>
                <p className="text-sm text-gray-600">
                    {t("venueDetails", {
                        capacity: team.venue.capacity,
                        surface: team.venue.surface,
                    })}
                </p>
            </div>
        );
    };

    const renderSquad = () => {
        return (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {teamSquad.map((player: any) => (
                    <div
                        key={player.id}
                        className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer"
                        onClick={() => getPlayerInfos(player)}
                    >
                        <img
                            src={player.photo}
                            alt={player.name}
                            className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">{player.name}</h4>
                        <p className="text-sm text-gray-500">{player.position}</p>
                    </div>
                ))}
            </div>
        );
    };

    const renderPlayerCard = () => {
        if (!playerDetails) return null;
        return (
            <div className="mt-6 bg-white shadow-lg rounded-lg p-6 text-center">
                <img
                    src={playerDetails.photo}
                    alt={playerDetails.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-2xl font-semibold text-gray-800">{playerDetails.name}</h3>
                <p className="text-sm text-gray-600">{playerDetails.position}</p>
                <p className="text-sm text-gray-600">{t("Age", { age: playerDetails.age })}</p>
                <p className="text-sm text-gray-600">
                    {t("nationality", { nationality: playerDetails.nationality })}
                </p>
                <p className="text-sm text-gray-600">{t("number", { number: playerDetails.number })}</p>
                <p className="text-sm text-gray-600">{t("height", { height: playerDetails.height })}</p>
                <p className="text-sm text-gray-600">{t("weight", { weight: playerDetails.weight })}</p>
            </div>
        );
    };

    const renderTabs = () => {
        return (
            <div className="mt-4 w-full flex border-b-2">
                <button
                    onClick={() => {
                        setSelectedPlayer(null);
                        setShowSquad(false);
                    }}
                    className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
                        !showSquad ? "bg-white shadow-md" : "bg-gray-200"
                    }`}
                >
                    {t("stats")}
                </button>
                <button
                    onClick={() => {
                        setShowSquad(true);
                        setSelectedPlayer(null);
                        if (!teamSquad.length) getMyTeamSquad();
                    }}
                    className={`flex-1 py-3 text-lg text-center rounded-t-lg ${
                        showSquad ? "bg-white shadow-md" : "bg-gray-200"
                    }`}
                >
                    {t("squad")}
                </button>
            </div>
        );
    };

    if (!isOpen || !team) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
            onClick={onClose}
        >
            <div
                className={`relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-4xl overflow-auto max-h-[80vh] flex flex-col ${
                    isArabic ? "flex-row-reverse" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {renderCloseButton()}
                {renderHeaderInfos()}
                {renderVenueInfos()}
                {renderTabs()}

                <div className="mt-6 flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <LoadingSpinner2 />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {!showSquad ? (
                                stats && <TeamStats stats={stats} />
                            ) : selectedPlayer ? (
                                renderPlayerCard()
                            ) : (
                                renderSquad()
                            )}
                        </div>
                    )}
                </div>

                {selectedPlayer && (
                    <button
                        onClick={() => setSelectedPlayer(null)}
                        className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-4 w-full"
                    >
                        {t("backToSquad")}
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeamModal;
