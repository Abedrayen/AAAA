import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getTeams, getTeamStats } from "../../API/API";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import TeamModal from "./TeamModal";

const TeamsScrollable = () => {
  const { t } = useTranslation();
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [teamStats, setTeamStats] = useState<any>(null);

  const getSATeams = async () => {
    setLoading(true);
    try {
      const response = await getTeams();
      if (response && response?.length) {
        setTeams(response);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const getMyTeamStats = async (team: any = undefined) => {
    setLoadingModal(true);
    try {
      const data = {
        team: team?.team?.id || (selectedTeam ? team?.id : undefined),
      };
      const response = await getTeamStats(data);
      if (response) {
        setTeamStats(response);
      }
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoadingModal(false);
    }
  };

  const openModal = (team: any) => {
    setSelectedTeam(team);
    setLoadingModal(true); // Start loading when modal opens
    setIsModalOpen(true);
    getMyTeamStats(team);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
    setTeamStats(null);
    setLoadingModal(false); // Reset modal loading
  };

  useEffect(() => {
    getSATeams();
  }, []);

  return (
    <div className="w-full px-8 pt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">{t("teamsInfo")}</h1>
      {loading ? (
        <p className="text-center text-lg">{t("loading")}...</p>
      ) : (
        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {teams.map((item) => (
              <div
                key={item.team.id}
                className="min-w-[300px] bg-gradient-to-r from-green-200 to-teal-400 shadow-lg rounded-lg p-4 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openModal(item)} // Open modal on click
              >
                <div className="flex flex-col items-center">
                  <img
                    src={item.team.logo}
                    alt={item.team.name}
                    className="w-20 h-20 mb-4 rounded-full border-2 border-white"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.team.name}
                  </h2>
                  <p className="text-sm text-gray-700">{item.team.country}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {t("founded")}: {item.team.founded}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
          >
            <FaChevronCircleLeft />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors"
          >
            <FaChevronCircleRight />
          </button>
        </div>
      )}

      {/* Modal */}
      {
        isModalOpen && <TeamModal isLoading={loadingModal} isOpen={isModalOpen} onClose={closeModal} team={selectedTeam} stats={teamStats} />
      }
    
    </div>
  );
};

export default TeamsScrollable;
