import { useEffect, useState } from "react"
import { getTopScorers } from "../../API/API"
import { useTranslation } from "react-i18next";

const TopScoreres=()=>{
    const { t } = useTranslation();
    const [topScorers, setTopScorers] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getStas = async () => {
          setIsLoading(true)
          try {
    
            const response = await getTopScorers()
            console.log('response got ', response)
            if (response) {
              const formattedResponse = response.map((item: any) => {
                return { 
                  ...item, 
                  team: item.statistics[0].team,  // Adding the team field
                  statistics: item.statistics[0]  // Overwriting statistics with the first entry
                };
              });
            
              console.log('formatted res', formattedResponse);
              setTopScorers(formattedResponse);  // Correctly setting the top scorers
            }
            
            setIsLoading(false)
          } catch (error) {
            setIsLoading(false)
          }
    
        }
    
        getStas()
    
      }, [])

    return (
        <div className=" mx-auto overflow-x-auto p-4 gap-y-4 flex-col items-center justify-center w-1/2 xss:w-[60%] xs:w-[80%] sm:w-full flex">

        <h1 className="text-4xl font-bold text-[#1F5059]">{t('topScorers')}</h1>
  
        <table className="z-30 table-auto border-collapse text-left">
          <thead>
              <tr className="bg-white  sm:text-[8px]  md:text-sm xl:text-base text-[#1F5059]">
                      <th className="px-4 py-2">{t('rank')}</th>
                      <th className="px-4 py-2">{t('player')}</th>
                      <th className="px-4 py-2">{t('age')}</th>
                      <th className="px-4 py-2">{t('team')}</th>
                      <th className="px-4 py-2">{t('appearances')}</th>
                      <th className="px-4 py-2">{t('goals')}</th>
                      <th className="px-4 py-2">{t('assists')}</th>
                      <th className="px-4 py-2">{t('minutes')}</th>
                      <th className="px-4 py-2">{t('position')}</th>
                      <th className="px-4 py-2">{t('rating')}</th>
                      <th className="px-4 py-2">{t('penalty')}</th>
                      <th className="px-4 py-2">{t('shotsOn')}</th>
                      <th className="px-4 py-2">{t('dribblesWon')}</th>
  
            
  
              
            </tr>
          </thead>
          <tbody>
            {topScorers.map((item:any, index) => (
              <tr
                key={item.player.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-transparent"
                }`}
              >
  
                {/* rank */}
                <td className="px-4 py-2">{(index+1).toString()}</td> 
  
                <td className="px-4 py-2 flex sm:text-[8px]  md:text-sm xl:text-base  items-center font-semibold whitespace-nowrap">
                  <img
                    src={item.player.photo}
                    alt={`${item.player.name} logo`}
                    className="md:w-8 md:h-8 w-5 h-5 mr-2"
                  />
                  {item.player.name}
                </td>
  
                <td className="px-4 py-2">{item.player.age}</td>
  
                <td className="px-4 py-2 flex sm:text-[8px]  md:text-sm xl:text-base  items-center font-semibold whitespace-nowrap">
                  <img
                    src={item.team.logo}
                    alt={`${item.team.name} logo`}
                    className="md:w-8 md:h-8 w-5 h-5 mr-2"
                  />
                  {item.team.name}
                </td>
  
  
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.games.appearences}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.goals.total}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.goals.assists}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.games.minutes}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.games.position}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{parseFloat(item.statistics.games.rating).toFixed(2)}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{ item.statistics.penalty.scored+"/"+ (item.statistics.penalty.scored+item.statistics.penalty.missed)}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.shots.on+"/"+item.statistics.shots.total}</td>
                <td className="px-4 py-2 sm:text-[8px]  md:text-sm xl:text-base">{item.statistics.dribbles.attempts+"/"+item.statistics.dribbles.success}</td>
  
  
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )
}

export default TopScoreres