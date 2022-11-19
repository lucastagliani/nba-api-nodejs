import { getPlayers } from './player-service.js'

describe('players service', () => {
  const expectedPlayersFormat = [
    {
      score: 61,
      personId: 2544,
      lastName: 'James',
      firstName: 'LeBron',
      fullName: 'LeBron James',
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
      points: 24.900,
      rebounds: 8.800,
      assists: 6.900,
      statusTimeframe: 'Season',
      fromYear: '2003',
      toYear: '2022',
      isActive: true,
      imageLinks: {
        small: 'https://cdn.nba.com/headshots/nba/latest/260x190/2544.png',
        large: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
      },
    },
  ]

  it('should get all players', () => {
    const actualPlayers = getPlayers()
    expect(actualPlayers).toEqual(expect.arrayContaining(expectedPlayersFormat))
    expect(actualPlayers.length).toEqual(4806)
  })

  it('should filter active players', () => {
    const actualPlayers = getPlayers({ isActive: true })
    expect(actualPlayers.length).toEqual(503)
  })

  it('should filter players by name that exists in fullName considering case insensitive', () => {
    const actualPlayers = getPlayers({ name: 'lebron' })
    expect(actualPlayers).toEqual(expect.arrayContaining(expectedPlayersFormat))
    expect(actualPlayers.length).toEqual(1)
  })

  it('should filter players by minimum points', () => {
    const actualPlayers = getPlayers({ minPoints: 10 })
    expect(actualPlayers.length).toEqual(860)
  })

  it('should filter players by minimum rebounds', () => {
    const actualPlayers = getPlayers({ minRebounds: 8 })
    expect(actualPlayers.length).toEqual(177)
  })

  it('should filter players by minimum assists', () => {
    const actualPlayers = getPlayers({ minAssists: 6 })
    expect(actualPlayers.length).toEqual(85)
  })

  it('should filter active players by minimum value on at least one stat', () => {
    const actualPlayers = getPlayers({ isActive: true, minPointsReboundsOrAssists: 10 })
    expect(actualPlayers.length).toEqual(167)
  })
})
