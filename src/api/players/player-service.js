/* eslint-disable max-len */
import playersOriginalDataSet from './static-data/playerindex-original-data.json'

const getMappedPlayers = () => {
  const { rowSet } = playersOriginalDataSet.resultSets[0]
  const highestYear = rowSet
    .reduce((acc, row) => (acc > parseInt(row[25], 10) ? acc : parseInt(row[25], 10)), 0)
  return rowSet
    .map((player) => ({
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
      draftRound: player[17],
      draftNumber: player[18],
      rosterStatus: player[19],
      points: player[20],
      rebounds: player[21],
      assists: player[22],
      statusTimeframe: player[23],
      fromYear: player[24],
      toYear: player[25],
      isActive: player[25] === highestYear.toString(),
      imageLinks: {
        small: `https://cdn.nba.com/headshots/nba/latest/260x190/${player[0]}.png`,
        large: `https://cdn.nba.com/headshots/nba/latest/1040x760/${player[0]}.png`,
      },
    }))
}

const getFilteredPlayers = (players, {
  name, minPoints, minRebounds, minAssists, isActive, minPointsReboundsOrAssists,
}) => {
  let filteredPlayers = players

  if (isActive) {
    filteredPlayers = filteredPlayers.filter((player) => player.isActive === !!isActive)
  }

  if (name) {
    const nameInLowerCase = name.toLowerCase()
    filteredPlayers = filteredPlayers.filter((player) => player.fullName.toLowerCase().includes(nameInLowerCase))
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

  return filteredPlayers
}

export const getPlayers = (filters = {}) => {
  const players = getMappedPlayers()
  return getFilteredPlayers(players, filters)
}
