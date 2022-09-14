import axios from 'axios'
import staticTeams from './static-data/teams.json' assert {type: 'json'}
import { features } from '../../constants.js'

export const getTeams = async () => {
  if (!features.HIT_REAL_API_TEAMS) {
    return staticTeams
  }

  const options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/teams/league/sacramento',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_NBA_API_KEY,
    },
  }

  const response = await axios.request(options)
  if (!response?.data) {
    return {}
  }
  return response.data
}
