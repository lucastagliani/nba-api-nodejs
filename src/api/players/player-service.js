import _ from 'lodash'
import playersOriginalDataSet from './static-data/playerindex-original-data.json' assert {type: 'json'}

const draftScoreMap = {
  1: 5,
  2: 3,
  3: 2,
}

const calculatesPlayerFamousScore = ({
  points, rebounds, assists, draftRound, draftNumber,
}) => {
  const reboundsScore = rebounds * 1.4
  const assistsScore = assists * 2
  const draftRoundScore = draftScoreMap[draftRound] || 0
  const draftNumberScore = draftScoreMap[draftNumber] || 0
  return _.round(_.sum([points, reboundsScore, assistsScore, draftRoundScore, draftNumberScore]), 1)
}

const getHighestYear = (rowSet) => {
  rowSet
    .reduce((acc, row) => (acc > parseInt(row[25], 10) ? acc : parseInt(row[25], 10)), 0)
}

const getMappedPlayers = () => {
  const { rowSet } = playersOriginalDataSet.resultSets[0]
  const highestYear = getHighestYear(rowSet)
  return rowSet
    .map((player) => {
      const points = player[20]
      const rebounds = player[21]
      const assists = player[22]
      const draftRound = player[17]
      const draftNumber = player[18]

      const scoreParameters = {
        points, rebounds, assists, draftRound, draftNumber, fullName: `${player[2]} ${player[1]}`,
      }

      return {
        score: calculatesPlayerFamousScore(scoreParameters),
        personId: player[0],
        lastName: player[1],
        firstName: player[2],
        fullName: `${player[2]} ${player[1]}`,
        playerSlug: player[3],
        teamId: player[4],
        teamSlug: player[5],
        isDefunct: player[6],
        teamCity: player[7],
        teamName: player[8],
        teamAbbreviation: player[9],
        jerseyNumber: player[10],
        position: player[11],
        height: player[12],
        weight: player[13],
        college: player[14],
        country: player[15],
        draftYear: player[16],
        draftRound,
        draftNumber,
        rosterStatus: player[19],
        points,
        rebounds,
        assists,
        statusTimeframe: player[23],
        firstYear: player[24],
        lastYear: player[25],
        isActive: player[25] === highestYear.toString(),
        imageLinks: {
          small: `https://cdn.nba.com/headshots/nba/latest/260x190/${player[0]}.png`,
          large: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player[0]}.png`,
        },
      }
    })
}

const getFilteredPlayers = (players, {
  name,
  minPoints,
  minRebounds,
  minAssists,
  isActive,
  minPointsReboundsOrAssists,
  score,
  minLastYear,
}) => {
  let filteredPlayers = [...players]

  if (isActive) {
    filteredPlayers = filteredPlayers.filter((player) => player.isActive === !!isActive)
  }

  if (name) {
    const nameInLowerCase = name.toLowerCase()
    filteredPlayers = filteredPlayers
      .filter((player) => player.fullName.toLowerCase().includes(nameInLowerCase))
  }

  if (minPointsReboundsOrAssists) {
    filteredPlayers = filteredPlayers.filter((player) => player.points >= minPointsReboundsOrAssists
      || player.rebounds >= minPointsReboundsOrAssists
      || player.assists >= minPointsReboundsOrAssists)
  }

  if (minPoints) {
    filteredPlayers = filteredPlayers.filter((player) => player.points >= minPoints)
  }

  if (minRebounds) {
    filteredPlayers = filteredPlayers.filter((player) => player.rebounds >= minRebounds)
  }

  if (minAssists) {
    filteredPlayers = filteredPlayers.filter((player) => player.assists >= minAssists)
  }

  if (score) {
    filteredPlayers = filteredPlayers.filter((player) => player.score >= score)
  }

  if (minLastYear) {
    filteredPlayers = filteredPlayers
      .filter((player) => Number(player.lastYear) >= Number(minLastYear))
  }

  return filteredPlayers
}

export const getPlayers = (filters = {}) => {
  const players = getMappedPlayers()
  return getFilteredPlayers(players, filters)
}
