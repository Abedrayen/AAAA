import axios from "axios";
export const baseUrl = "https://v3.football.api-sports.io"

function formatDate(date: Date) {
  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, '0'); // Pad single digits with leading zeros
  return `${year}-${month}-${day}`;
}
export const getMyGames = async (dataGot: any = undefined) => {

  const today = new Date();
  const todayFormatted = formatDate(today);
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);
  const oneMonthLaterFormatted = formatDate(oneMonthLater);
  const data = {
    league: 307, //KSA
    season: 2024,
    from: todayFormatted,
    to: oneMonthLaterFormatted
  } //dataGot
  console.log('getGames....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/fixtures", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });
    console.log('response get games',response)
    return response?.data?.response
  } catch (error) {
    console.error('Error getGames :', error);
  }
}
export const getMatches = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getMatches....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/fixtures", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data
  } catch (error) {
    console.error('Error getMatches :', error);
  }
}

export const getMatchesByIds = async (dataGot: any = undefined) => {
  const data = {

    ids: dataGot.ids.slice(0, 20).join('-'),
    // status:"NS"
  } //dataGot
  console.log('getMatches....', JSON.stringify(data))
  try {

    // return fixturesByIds
    console.log('ids', data.ids)
    const response = await axios.get(baseUrl + "/fixtures", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });
    console.log('response fixs', response.data)
    return response?.data
  } catch (error) {
    console.error('Error getMatches :', error);
  }
}


export const getPredictions=async(dataPredictions:any=undefined)=>{

  // try {
    
  //   const tokenData="TU2ZnSdUXMHIcFC2Wz2RSQH6q3W8bpPvbR1A8LpeAUihDrsCOe1B5uY8QC2p33JD"
  //   const Authorization= `Bearer TU2ZnSdUXMHIcFC2Wz2RSQH6q3W8bpPvbR1A8LpeAUihDrsCOe1B5uY8QC2p33JD/export`
  //   const predictionsUrl = "https://api.betty.works/get-user-export";
    
  //   const response = await axios.post(predictionsUrl, {token:tokenData} ,{
  //     // Pass token as query params
  //     // params: {token:tokenData},
      
  //     // Add Bearer token to Authorization header
  //     headers: {
  //       Authorization: Authorization, // Replace with your actual Bearer token
  //     },
  //   });


 
  //   console.log('response predictionsUrl', response.data)
  //   return response?.data
  // } catch (error) {
  //   console.error('Error predictionsUrl :', error);
  // }
  let data = JSON.stringify({
    "token": "TU2ZnSdUXMHIcFC2Wz2RSQH6q3W8bpPvbR1A8LpeAUihDrsCOe1B5uY8QC2p33JD"
  });
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.betty.works/get-user-export',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer tc67CWlxlF3Y7PyMDJVB55e2KQ4SvtYNrfeLMGr8TKS738lgOoZ6cZHRbrRxFlgL'
    },
    data : data
  };
  try {
    const response = await axios.request(config)
    return response?.data
  } catch (error) {
    console.error('Error predictionsUrl :', error);
  }
  // .then((response) => {
  //   console.log(JSON.stringify(response.data));
  //   return response.data
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}


export const getStandings = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getStandings....', JSON.stringify(data))
  try {

    const response = await axios.get(baseUrl + "/standings", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });
    console.log('response stands',response?.data)
    return response?.data
  } catch (error) {
    console.error('Error getStandings :', error);
  }
}

const formatDateNews = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for the month
  const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for the day
  return `${year}-${month}-${day}`;
};

export const getNewsOld = async () => {
  try {
    // Define the API URL with query parameters
    const newsUrl = 'https://newsapi.org/v2/everything';
    const today = new Date(); // Today's date
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2); // Date 2 days ago
    
    // Format dates to 'YYYY-MM-DD'
    const fromDate = formatDateNews(twoDaysAgo);
    const toDate = formatDateNews(today);
    // Axios GET request with query parameters
    console.log('from to ',fromDate,toDate)
    const response = await axios.get(newsUrl, {
      params: {
        q: `saudi arabia sports "football" +saudi +football`,
        from: fromDate, // Dynamic 'from' date (2 days ago)
        // to: toDate,
        sortBy: 'popularity',
        apiKey: '4280ea33a4bb442bb736ce40b2dc4545', // Replace with your actual API key
        language: 'en',
      },
    });
    
    console.log('News response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const getNews= async () => {
  try {
    // Define the API URL with query parameters
    const newsUrl = 'https://transfermarket.p.rapidapi.com/news/list-by-competition';
    const today = new Date(); // Today's date
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2); // Date 2 days ago
    
    // Format dates to 'YYYY-MM-DD'
    const fromDate = formatDateNews(twoDaysAgo);
    const toDate = formatDateNews(today);
    // Axios GET request with query parameters
    console.log('from to ',fromDate,toDate)
    const response = await axios.get(newsUrl, {
      params: {
        q: `saudi arabia sports "football" +saudi +football`,
        from: fromDate, // Dynamic 'from' date (2 days ago)
        // to: toDate,
        sortBy: 'popularity',
        apiKey: '4280ea33a4bb442bb736ce40b2dc4545', // Replace with your actual API key
        language: 'en',
        id:'SA1',
        domain:'com'
      },
      headers:{
        'x-rapidapi-key':"008fee5f63msh322ef619b8edd59p1c53afjsn9c72aaa582fb",
        "x-rapidapi-host":"transfermarket.p.rapidapi.com"
      }
    });
    
    console.log('News response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};


export const getTopScorers = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getMatches....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/players/topscorers", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getMatches :', error);
  }
}

export const getTopAssists = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getTopAssists....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/players/topassists", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getTopAssists :', error);
  }
}

export const getTopYellowCards = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getTopYellowCards....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/players/topyellowcards", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getTopYellowCards :', error);
  }
}

export const getTopRedCards = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getTopRedCards....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/players/topredcards", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getTopRedCards :', error);
  }
}


export const getTeams = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
  } //dataGot
  console.log('getMatches....', JSON.stringify(data))
  try {

    // return matchesResponseTest
    const response = await axios.get(baseUrl + "/teams", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getMatches :', error);
  }
}

export const getTeamStats = async (dataGot: any = undefined) => {
  const data = {
    league: 307, //KSA
    season: 2024,
    team:dataGot?.team
  } //dataGot
  console.log('getTeamStats....', JSON.stringify(data))
  try {



    const response = await axios.get(baseUrl + "/teams/statistics", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getTeamStats :', error);
  }
}





export const getTeamSquad = async (dataGot: any = undefined) => {
  const data = {
    // league: 307, //KSA
    // season: 2024,
    team:dataGot?.team
  } //dataGot
  console.log('getTeamSquad....', JSON.stringify(data))
  try {



    const response = await axios.get(baseUrl + "/players/squads", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getTeamSquad :', error);
  }
}


export const getPlayerProfile = async (dataGot: any = undefined) => {
  const data = {
    player:dataGot?.player
  } 
  console.log('getPlayerProfile....', JSON.stringify(data))
  try {



    const response = await axios.get(baseUrl + "/players/profiles", {
      headers: {
        'Content-Type': 'application/json', // Modify the content type as needed
        'x-rapidapi-key': "6cc2ad3ed4f64f224b924ac8afceb834",
        'x-rapidapi-host': "v3.football.api-sports.io"
      },
      params: {
        ...data
      }
    });

    return response?.data?.response
  } catch (error) {
    console.error('Error getPlayerProfile :', error);
  }
}

