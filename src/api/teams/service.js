const axios = require("axios").default;

const getTeams = () => {
  var options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/leagues/sacramento',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_NBA_API_KEY
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

module.exports = {
  getTeams
}