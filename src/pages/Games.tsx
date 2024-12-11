import React, { useEffect, useState } from 'react';
import { getMyGames } from '../API/API';
import PredictionPopup from '../components/predictionPopup';
import { useTranslation } from 'react-i18next';

const useDebouncedScroll = (delay: number) => {
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const debouncedHandleScroll = (callback: () => void) => {
    // Clear the previous timeout if it's still running
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const timeout = window.setTimeout(() => {
      callback();
    }, delay);

    setDebounceTimeout(timeout);
  };

  return debouncedHandleScroll;
};

function Games() {
  const { t } = useTranslation();
  const [games, setGames] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [loadingMore, setLoadingMore] = useState(false); // Loading more games state
  const [currentRound, setCurrentRound] = useState<string>(''); // Track the latest round
  const [page, setPage] = useState(1); // Page for pagination
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await getMyGames();
        if (response) {
          setGames(response);
          const latestRound = response[response.length - 1].league.round;
          setCurrentRound(latestRound); // Update the current round
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

 
  const debouncedScroll = useDebouncedScroll(200); 
  const handleScroll = () => {
    const elementScroll = document.getElementById('games-div');
    if (!elementScroll) return;

    const boundingRect = elementScroll.getBoundingClientRect();
    const { bottom } = boundingRect;

    // Check if the bottom of the element is visible in the viewport
    if (bottom <= window.innerHeight + 100 && !loadingMore) {
      console.log(`User has reached the bottom of the games section, latest round fetched: ${currentRound}`);
      const latesRoundNumber=parseInt(currentRound.split('-')[1])
      console.log('latestRound',latesRoundNumber)
      
      // setPage((prevPage) => prevPage + 1); // Fetch the next page of games
    }
  };
  useEffect(() => {
    const onScroll = () => {
      debouncedScroll(handleScroll);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [loadingMore, currentRound, debouncedScroll]);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const elementScroll = document.getElementById('games-div');
  //     if (!elementScroll) return;
    
  //     const boundingRect = elementScroll.getBoundingClientRect();
  //     const { bottom } = boundingRect;
    
  //     // Check if the bottom of the element is visible in the viewport
  //     if (bottom <= window.innerHeight + 100 && !loadingMore) {  // You can tweak the `+ 100` as needed
  //       console.log(`User has reached the bottom of the games section, latest round fetched: ${currentRound}`);
  //       setPage((prevPage) => prevPage + 1); // Fetch the next page of games
  //     }
  //   };
    

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [loadingMore, currentRound]);
  // Group games by league.round
  const groupedGames = games.reduce((acc: any, game: any) => {
    const round = game.league.round;
    if (!acc[round]) {
      acc[round] = [];
    }
    acc[round].push(game);
    return acc;
  }, {});

  // Sort games within each round by fixture.date in ascending order
  Object.keys(groupedGames).forEach((round) => {
    groupedGames[round].sort(
      (a: any, b: any) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center  items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1000px] 2xl:min-w-[1100px] py-5 flex flex-col  w-full mx-auto" id="games-div">
        <button
              className="p-3 rounded-lg text-xl bg-[#056A4C] text-white w-full"
              onClick={()=>setIsPopupOpen(true)}
            >
              {t('predictionPage')}
            </button>
      <h1 className="text-2xl md:text-4xl font-bold text-center text-[#1F5059] mb-8">{t('saudiLeagueGames')}</h1>
      {/* Loop through each round */}
      {Object.keys(groupedGames).map((round: string) => (
        <div key={round} className="mb-10 px-3">
          {/* Round heading */}
          <h2 className="text-lg md:text-2xl font-semibold text-[#297058] mb-4 border-b-2 border-[#297058] pb-2">
            {round}
          </h2>
          {/* Table of games */}
          <table className="table-auto  border-collapse text-left w-full">
            <thead>
              <tr className="bg-white text-xs sm:text-sm md:text-base text-[#1F5059]">
                  <th className="px-4 py-2 text-center">{t('matchHome')}</th>
                  <th className="px-4 py-2 text-center">{t('matchVs')}</th>
                  <th className="px-4 py-2 text-center">{t('matchAway')}</th>
                  <th className="px-4 py-2 text-center">{t('matchDate')}</th>
              </tr>
            </thead>
            <tbody>
              {groupedGames[round].map((game: any, index: number) => (
                <tr
                  key={game.fixture.id}
                  className={`border-b text-xs ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`} // Alternate between white and gray rows
                >
                  {/* Home team */}
                  <td className="text-[8px] sm:text-sm md:text-[18px] px-4 py-2 flex items-center justify-center whitespace-nowrap font-semibold">
                    <img
                      src={game.teams.home.logo}
                      alt={`${game.teams.home.name} logo`}
                      className="md:w-5 md:h-5 w-3 h-3 mr-2"
                    />
                    {game.teams.home.name}
                  </td>
                  <td className="px-2 py-2 font-semibold text-center">{t('matchVs')}</td>
                  {/* Away team */}
                  <td className="text-[8px] sm:text-sm md:text-[18px] px-4 py-2 flex items-center justify-center whitespace-nowrap font-semibold">
                    <img
                      src={game.teams.away.logo}
                      alt={`${game.teams.away.name} logo`}
                      className="md:w-5 md:h-5 w-3 h-3 mr-2"
                    />
                    {game.teams.away.name}
                  </td>
                  {/* Match date */}
                  <td className="px-2 py-2 text-[8px] sm:text-xs md:text-sm text-center">
                    {new Date(game.fixture.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true, // true for 12-hour format
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
                  {isPopupOpen&&<PredictionPopup handleClosePopup={()=>setIsPopupOpen(false)} /> }

    </div>
  );
}

export default Games;
