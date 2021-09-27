import axios from 'axios'

export const getTeams = async () => {
  var options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/league/sacramento',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_NBA_API_KEY
    }
  };

  const response = await axios.request(options)
  return response.data
}

// module.exports = {
//   getTeams
// }