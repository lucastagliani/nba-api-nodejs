import { getPlayers } from './service.js'

describe('players service', () => {
  const expectedPlayersFormat = [
    {
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
      points: 27.400,
      rebounds: 6.800,
      assists: 6.500,
      statusTimeframe: 'Season',
      fromYear: '2003',
      toYear: '2021',
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
    expect(actualPlayers.length).toEqual(4713)
  })

  it('should filter active players', () => {
    const actualPlayers = getPlayers({ isActive: true })
    expect(actualPlayers.length).toEqual(583)
  })

  it('should filter players by name that exists in fullName considering case insensitive', () => {
    const actualPlayers = getPlayers({ name: 'lebron' })
    expect(actualPlayers).toEqual(expect.arrayContaining(expectedPlayersFormat))
    expect(actualPlayers.length).toEqual(1)
  })

  it('should filter players by minimum points', () => {
    const actualPlayers = getPlayers({ minPoints: 10 })
    expect(actualPlayers.length).toEqual(851)
  })

  it('should filter players by minimum rebounds', () => {
    const actualPlayers = getPlayers({ minRebounds: 8 })
    expect(actualPlayers.length).toEqual(174)
  })

  it('should filter players by minimum assists', () => {
    const actualPlayers = getPlayers({ minAssists: 6 })
    expect(actualPlayers.length).toEqual(78)
  })

  it('should filter active players by minimum value on at least one stat', () => {
    const actualPlayers = getPlayers({ isActive: true, minPointsReboundsOrAssists: 10 })
    expect(actualPlayers.length).toEqual(186)
  })
})
