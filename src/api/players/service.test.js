import { getPlayers } from './service.js'

describe('players service', () => {
  const expectedPlayersFormat = [
    {
      personId: 2544,
      lastName: 'James',
      firstName: 'LeBron',
      playerSlug: 'lebron-james',
      teamId: 1610612747,
      teamSlug: 'lakers',
      isDefunct: 0,
      teamCity: 'Los Angeles',
      teamName: 'Lakers',
      teamAbbreviation: 'LAL',
      jerseyNumber: '6',
      position: 'F',
      height: '6-9',
      weight: '250',
      college: 'St. Vincent-St. Mary HS (OH)',
      country: 'USA',
      draftYear: 2003,
      draftRound: 1,
      draftNumber: 1,
      rosterStatus: 1.0,
      points: 27.400,
      rebounds: 6.800,
      assists: 6.500,
      statusTimeframe: 'Season',
      fromYear: '2003',
      toYear: '2021',
      imageLinks: {
        small: 'https://cdn.nba.com/headshots/nba/latest/260x190/2544.png',
        large: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
      },
    },
  ]

  it('should match object contract', () => {
    const actualPlayers = getPlayers()
    expect(actualPlayers).toEqual(expect.arrayContaining(expectedPlayersFormat))
  })
})
