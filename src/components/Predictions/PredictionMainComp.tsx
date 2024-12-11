import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SiAdidas, SiNike } from "react-icons/si";
import { SiFifa } from "react-icons/si";
import { getPredictions } from "../../API/API";
import { createUserPrediction } from "../../API/ServerApi";
import { Dialog } from '@headlessui/react'; // Import Headless UI Dialog
import SuccessModal from "../success-failure-models/SuccessModal";
import FailureModal from "../success-failure-models/FailureModal";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

interface Team {
  id: number;
  name: string;
  logo: string;
}

const PredictionMainComp = () => {

  const { t } = useTranslation();
  const {updateBalance,userBalance}=useAuth()
  const [predictions, setPredictions] = useState<any[]>([]);
  const [specialGames, setSpecialGames] = useState<any[]>([]);
  const [selectedPercentages, setSelectedPercentages] = useState<{ [key: number]: string }>({});
  const [scores, setScores] = useState({
    game8: { home: '', away: '' },
    game9: { home: '', away: '' }
  });
  const [minScore,setMinScore]=useState(0)
  const [maxScore,setMaxScore]=useState(900)
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isDialogOpen,setIsDialogOpen]=useState(false)
  const [selectedGames,setSelectedGames]=useState<any[]> ([])
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);
  const [failureMessage,setFailureMessage]=useState<string>("")

  
  const handlePercentageClick = (gameIndex: number, type: string) => {
    setSelectedPercentages(prev => {
      const newSelections = { ...prev };

      // Toggle the selected prediction
      if (newSelections[gameIndex] === type) {
        delete newSelections[gameIndex]; // Deselect if clicked again
      } else {
        newSelections[gameIndex] = type; // Select the new type, automatically deselect others
      }

      return newSelections;
    });
  };

  const handleScoreChange = (game: string, team: string, value: string) => {
    setScores((prevScores: any) => ({
      ...prevScores,
      [game]: {
        ...prevScores[game],
        [team]: value
      }
    }));
  };

  const calculateAccumulatedPercentage = () => {
    const total = Object.entries(selectedPercentages).reduce((sum, [gameIndex, type]) => {
      const game = predictions[parseInt(gameIndex)];
      const gameOdds = (game.odds as any)[type];
      return sum + parseFloat(gameOdds);
    }, 0);
    return total.toFixed(2) + '%';
  };

  const handleSendClick = () => {
    // Create an array to store the selected predictions
    const selectedGames = [];
  
    // Add predictions for regular games
    predictions.forEach((game, index) => {
      if (selectedPercentages[index]) {
        selectedGames.push({
          game:`Game ${index + 1}`,
          home_team: game.home_team.name,
          away_team: game.away_team.name,
          prediction: selectedPercentages[index], // home_win, draw, or away_win
         ... game
        });
      }
    });
  
    // Add predictions and scores for special games (Game 8 and Game 9)
    if (specialGames.length >= 2) {
      // Game 8
      if(scores.game8.home && scores.game8.away){
        selectedGames.push({
          game: 'Game 8',
          home_team: specialGames[0].home_team.name,
          away_team: specialGames[0].away_team.name,
          prediction: 'special',
          score: {
            home: scores.game8.home,
            away: scores.game8.away,
          },
          ...  specialGames[0]
        });
      }


      // Game 9
      if(scores.game9.home && scores.game9.away){
        selectedGames.push({
          game: 'Game 9',
          home_team: specialGames[1].home_team.name,
          away_team: specialGames[1].away_team.name,
          prediction: 'special',
          score: {
            home: scores.game9.home,
            away: scores.game9.away,
          },
          ...  specialGames[1]

        });
      }
     
  
     
    }
  
    // Log the final selected games array
    console.log('Selected Games Array:', selectedGames);
    // placePrediction(selectedGames)
    setSelectedGames(selectedGames)
    if(selectedGames.length<9){
      setFailureMessage("Please fill in all the games!")
      setShowFailureModal(true);
      return
    }else{
      setFailureMessage("")

    }
    console.log('userBalance' ,userBalance )
    if(!userBalance){
 
      setFailureMessage("Please proceed to payment before !")
      setShowFailureModal(true);
      return
    }else{
      setFailureMessage("")
    }
    setIsDialogOpen(true)
  };
  const placePredictions=async()=>{

    const predictionGames=selectedGames.map((game:any)=>{
      let choicePlaced
      
      if(game.prediction=="draw"){
         choicePlaced="x"
      }else if(game.prediction=="away_win"){
        choicePlaced="2"
      }else{
        choicePlaced="1"
      }

      if(game?.score){
        choicePlaced=null
      }


      return {
        match_id:game.fixture_id,
        choice:choicePlaced,
        score:game?.score||null
      }
    })
    const data={
      matches:predictionGames
    }
    const response=await createUserPrediction(data)
    setIsDialogOpen(false); // Close the dialog
    console.log('response bets',response)

    
    if(response?.success){
      updateUserBalance(response?.balance)
      setShowSuccessModal(true);

      // alert('predictions created successfully!')
    }else{
      // alert('something went wrong !')
      setShowFailureModal(true);

    }

  }
  
  const updateUserBalance=(newBal:number)=>{
    updateBalance(newBal)
  }

  useEffect(() => {
    const getPreds = async () => {
      try {
        const res = await getPredictions();
        if (res && res.data && Array.isArray(res.data)) {
          let specialGamesGot:any=res.data.filter((game: any) => game.isSpecial);
        
          if (specialGames.length === 0) {
            const gamesLength = res.data.length;
            specialGamesGot = res.data.slice(gamesLength - 2, gamesLength);
             
          }  
          console.log('specialGames',specialGamesGot)
          const specialGamesIds=specialGamesGot.map((game:any)=>game.fixture_id)
          let minPercentages=0
          let maxPercentages=0
          res.data.forEach((game:any)=>{

            if(!specialGamesIds.includes(game.fixture_id)){
              const homeWin = parseFloat(game.odds.home_win);
              const draw = parseFloat(game.odds.draw);
              const awayWin = parseFloat(game.odds.away_win);
  
  
              const minValue = Math.min(homeWin, draw, awayWin);
              const maxValue = Math.max(homeWin, draw, awayWin);
  
              minPercentages+=minValue
              maxPercentages+=maxValue
            }
           
          })
          setMinScore(minPercentages)
          setMaxScore(maxPercentages)
         
          setSpecialGames(specialGamesGot);
          setPredictions(res.data.slice(0, res.data?.length - 2));
        }
      } catch (error) {
        console.error("Error fetching predictions:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching data
      }
    };
    getPreds();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-gray-500"></div>
      </div>
    );
  }

  const calculateProgress = () => {
    const total = Object.entries(selectedPercentages).reduce((sum, [gameIndex, type]) => {
      const game = predictions[parseInt(gameIndex)];
      const gameOdds = (game.odds as any)[type];
      return sum + parseFloat(gameOdds);
    }, 0);
    if (total < minScore) {
      return 0;
    } else if (total > maxScore) {
      return 100;
    } else {
      return ((total - minScore) / (maxScore - minScore)) * 100;
    }
  };

  const getProgressBarColor = (progress: any) => {
    const hue = (120 * (100 - progress)) / 100; // Hue from 120 (green) to 0 (red)
    
    // Lightness ranges from 30% (darkest) to 50% (brightest)
    const lightness = 30 + (progress / 100) * 20;
    
    return `hsl(${hue}, 100%, ${lightness}%)`;
  };
  
  

  //MOCK SUCCESS AND FAILURE MODALS XXXXXXXXXXXXXXXXXX 
  //**************************** */

  const placePredictionsMock = () => {
    const success = Math.random() > 0.5; // Simulate success or failure
    if (success) {
      setShowSuccessModal(true);
    } else {
      setShowFailureModal(true);
    }
  };
  return (
    <div className="overflow-x-auto  py-5 flex justify-center gap-y-8 items-center flex-col w-full">
      <h1 className="text-4xl font-bold text-[#1f5059c9] mb-4">MY PREDICTION</h1>

      <div className="flex flex-col justify-center items-center gap-y-2 w-full">
        <h1 className="text-xl font-bold text-[#1f5059e2]">OUR SPONSORS</h1>
        <div className="flex w-full justify-evenly items-center">
          <SiNike className="text-gray-500 text-5xl " />
          <SiFifa className="text-gray-500 text-5xl" />
          <SiAdidas className="text-gray-500 text-5xl" />
        </div>
      </div>

      <h1 className="text-4xl font-bold text-[#1f5059c9]">GAMES</h1>
      <ul className="list-none text-left w-full">
        {predictions
          .filter((game) => !game.isSpecial)
          .map((game, index) => (
            <React.Fragment key={index}>
              {/* Game Number Row */}
              <li className="text-xs font-semibold mb-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-3xl mr-4">Game {index + 1}</span>
                  <span className="text-[9px] text-gray-500">
                    {new Date(game.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </span>
                </div>
              </li>

              {/* Game Information Row */}
              <li className="border-b text-xs bg-[#51A186] bg-opacity-65 border rounded-xl px-16 overflow-hidden border-gray-600 mb-4">
                <div className="flex justify-between items-center text-center">
                  {/* Home Team with logo */}
                  <div className="text-[9px] px-4 py-4 flex flex-col gap-y-3 items-center whitespace-nowrap font-semibold">
                    <div className="flex items-center">
                      <img
                        src={game.home_team.logo}
                        alt={`${game.home_team.name} logo`}
                        className="w-7 h-7 mr-2"
                      />
                      <span className="text-base">{game.home_team.name}</span>
                    </div>
                    <div
                      className={`text-sm mt-1 cursor-pointer border border-gray-300 bg-white bg-opacity-50 p-2 rounded-md ${
                        selectedPercentages[index] === 'home_win' ? 'bg-yellow-400 text-black' : 'text-gray-700'
                      }`}
                      onClick={() => handlePercentageClick(index, 'home_win')}
                    >
                      {game.odds.home_win}
                    </div>
                  </div>

                  {/* VS Column */}
                  <div className="px-4 py-2">
                    <div className="flex flex-col gap-y-3 justify-center">
                      <span className="text-base">VS</span>
                      <div
                        className={`text-sm mt-1 cursor-pointer border border-gray-300 font-semibold bg-white bg-opacity-50 p-2 rounded-md ${
                          selectedPercentages[index] === 'draw' ? 'bg-yellow-400 text-black' : 'text-gray-800'
                        }`}
                        onClick={() => handlePercentageClick(index, 'draw')}
                      >
                        {game.odds.draw}
                      </div>
                    </div>
                  </div>

                  {/* Away Team with logo */}
                  <div className="text-[9px] px-4 py-2 flex flex-col items-center gap-y-3 whitespace-nowrap font-semibold text-center">
                    <div className="flex items-center">
                      <img
                        src={game.away_team.logo}
                        alt={`${game.away_team.name} logo`}
                        className="w-7 h-7 mr-2"
                      />
                      <span className="text-base">{game.away_team.name}</span>
                    </div>
                    <div
                      className={`text-sm mt-1 cursor-pointer border border-gray-300 bg-white bg-opacity-50 p-2 rounded-md ${
                        selectedPercentages[index] === 'away_win' ? 'bg-yellow-400 text-black' : 'text-gray-700'
                      }`}
                      onClick={() => handlePercentageClick(index, 'away_win')}
                    >
                      {game.odds.away_win}
                    </div>
                  </div>
                </div>
              </li>
            </React.Fragment>
          ))}

        {/* Display Total Accumulated Odds */}
        <div className="text-center mt-6">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold">
              Min Percentages: {minScore.toFixed(2) + "%"}
            </h2>
            <h2 className="text-lg font-bold">
              Accumulated Percentages: {calculateAccumulatedPercentage() + "%"}
            </h2>
            <h2 className="text-lg font-bold">
              Max Percentages: {maxScore.toFixed(2) + "%"}
            </h2>
          </div>

          {/* Percentage Accumulator Bar */}
          <div className="w-full bg-gray-200 h-8 rounded-full overflow-hidden mt-4 shadow-inner relative">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${calculateProgress()}%`,
                backgroundColor: getProgressBarColor(calculateProgress()),
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-semibold">
                {calculateAccumulatedPercentage() + "%"}
              </span>
            </div>
          </div>
        </div>

      </ul>
    
      {
    specialGames.length>=2
    &&
    <div className="mt-4 w-full">
    {/* Game 8 Predictions */}
    <h2 className="text-lg font-semibold mb-4 ">Game 8 Predictions</h2>
    <div className="flex flex-col py-3 lg:flex-row items-center lg:items-start justify-center lg:justify-between rounded-xl  bg-[#51A186] bg-opacity-40 border border-gray-600 ">
      {/* Home Team */}
      <div className="flex flex-col items-center lg:items-center lg:w-1/3 mb-4 lg:mb-0">
        <div className="flex items-center mb-2">
          <img
            src={specialGames[0].home_team.logo}
            alt={`${specialGames[0].home_team.name} logo`}
            className="w-8 h-8 mr-2"
          />
          <span className="font-semibold">{specialGames[0].home_team.name}</span>
        </div>
        <input
          type="number"
          placeholder="Home Score"
          style={{fontSize:'10px'}}
          value={scores.game8.home}
          onChange={(e) => handleScoreChange('game8', 'home', e.target.value)}
          className="border border-gray-300 p-2 rounded-3xl-xl text-center w-24"
        />
      </div>
  
      {/* VS Text */}
      <div className="text-gray-700 text-xl font-semibold mb-4 lg:mb-0">VS</div>
  
      {/* Away Team */}
      <div className="flex flex-col items-center lg:items-center lg:w-1/3">
        <div className="flex items-center mb-2">
          <img
          // specialGames
            src={specialGames[0].away_team.logo}
            alt={`${specialGames[0].away_team.name} logo`}
            className="w-8 h-8 mr-2"
          />
          <span className="font-semibold">{specialGames[0].away_team.name}</span>
        </div>
        <input
          type="number"
          placeholder="Away Score"
          style={{fontSize:'10px'}}
          value={scores.game8.away}
          onChange={(e) => handleScoreChange('game8', 'away', e.target.value)}
          className="border border-gray-300 p-2 rounded-3xl-xl text-center w-24"
        />
      </div>
    </div>
  
    {/* Game 9 Predictions */}
    <h2 className="text-lg font-semibold mt-8 mb-4">Game 9 Predictions</h2>
    <div className="flex flex-col py-3 lg:flex-row items-center lg:items-start justify-center lg:justify-between rounded-xl  bg-[#51A186] bg-opacity-40 border border-gray-600 ">
      {/* Home Team */}
      <div className="flex flex-col items-center lg:items-center lg:w-1/3 mb-4 lg:mb-0">
        <div className="flex items-center mb-2">
          <img
            src={specialGames[1].home_team.logo}
            alt={`${specialGames[1].home_team.name} logo`}
            className="w-8 h-8 mr-2"
          />
          <span className="font-semibold">{specialGames[1].home_team.name}</span>
        </div>
        <input
          type="number"
          placeholder="Home Score"
          style={{fontSize:'10px'}}
          value={scores.game9.home}
          onChange={(e) => handleScoreChange('game9', 'home', e.target.value)}
          className="border border-gray-300 p-2 rounded-3xl-xl text-center w-24"
        />
      </div>
  
      {/* VS Text */}
      <div className="text-gray-700 text-xl font-semibold mb-4 lg:mb-0">VS</div>
  
      {/* Away Team */}
      <div className="flex flex-col items-center lg:items-center lg:w-1/3">
        <div className="flex items-center mb-2">
          <img
            src={specialGames[1].away_team.logo}
            alt={`${specialGames[1].away_team.name} logo`}
            className="w-8 h-8 mr-2"
          />
          <span className="font-semibold">{specialGames[1].away_team.name}</span>
        </div>
        <input
          type="number"
          placeholder="Away Score"
          style={{fontSize:'10px'}} 
          value={scores.game9.away}
          onChange={(e) => handleScoreChange('game9', 'away', e.target.value)}
          className="border border-gray-300 p-2 rounded-3xl-xl text-center w-24"
        />
      </div>
    </div>
  </div>
  
   }
      <div className="mt-4 w-full flex justify-center items-center">
      <button
        onClick={handleSendClick}
        className="bg-[#297058] text-white px-24 py-2 rounded-3xl-xl"
      >
        Submit
      </button>
    </div>
    <Dialog
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50"
>
  {/* Background overlay to close on outside click */}
  <div
    className="fixed inset-0 bg-black opacity-50"
    aria-hidden="true"
    onClick={() => setIsDialogOpen(false)}
  ></div>

  <div
    className={`relative bg-white w-full xs:w-2/3 sm:w-1/2 xl:w-1/3 h-2/3 sm:h-full shadow-lg overflow-auto ${
      isDialogOpen ? 'animate-slide-in' : 'animate-slide-out'
    }`}
  >
    {/* Modal content */}
    <div className="p-6 relative">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={() => setIsDialogOpen(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="md:text-3xl text-xl font-bold mb-4">Prediction Recap</h2>




      {/* Recap of the user's selections */}

      
      <ul className="space-y-4">
        {selectedGames.map((game, index) => (
          <li
            key={index}
            className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-start justify-start"
          >
            <div className="flex items-start flex-col gap-y-3 space-4">
              <span className="text-sm md:text-base font-semibold text-gray-600">
                {game.game}:
              </span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* <img
                    src={game.home_team.logo}
                    alt={`${game.home_team.name} logo`}
                    className="md:w-10 w-6 h-6 md:h-10 rounded-full border border-gray-200"
                  /> */}
                  <span className="text-base md:text-lg font-semibold text-gray-800">
                    {game.home_team.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">vs</span>
                <div className="flex items-center space-x-2">
                  {/* <img
                    src={game.away_team.logo}
                    alt={`${game.away_team.name} logo`}
                    className="md:w-10 w-6 h-6 md:h-10 rounded-full border border-gray-200"
                  /> */}
                  <span className="text-base md:text-lg font-semibold text-gray-800">
                    {game.away_team.name}
                  </span>

                  <span className="font-medium">
                  { game.score? `(Final score) ${game.score.home}-${game.score.away}`:""}
                  {game.prediction&&game.prediction!='special'? `(${game.odds[game.prediction]}) ${game.prediction}`:''}
                </span>
                </div>
              </div>
            
              {/* <div className="mt-2 md:mt-0 md:ml-4 text-base md:text-lg text-gray-600">
                Prediction:{" "}
                <span className="font-medium">
                  { game.score? `(Final score) ${game.score.home}-${game.score.away}`:""}
                  {game.prediction&&game.prediction!='special'? `(${game.odds[game.prediction]}) ${game.prediction}`:''}
                </span>
              </div> */}
            </div>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          placePredictions();
         
        }}
      >
        Confirm
      </button>
    </div>
  </div>
</Dialog>
<SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
<FailureModal isOpen={showFailureModal} onClose={() => setShowFailureModal(false)} failureMessage={failureMessage} />


    </div>



  );
};

export default PredictionMainComp;
