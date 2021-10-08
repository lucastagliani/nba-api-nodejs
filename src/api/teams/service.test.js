import axios from 'axios'
import constants from '../../constants.js'
import staticTeams from './static-data/teams.json'
// import * as constants from '../../constants.js'

import { getTeams } from './service.js'

jest.mock('axios')
jest.mock('../../constants.js', () => ({
  get features() {
    return { HIT_REAL_API_TEAMS: false }
  },
}))

describe('teams service', () => {
  const expectedData = {
    api: {
      filters: expect.any(Array), message: 'GET teams/league/sacramento', results: 34, status: 200, teams: expect.any(Array),
    },
  }

  describe('when HIT_REAL_API_TEAMS is ON', () => {
    it('should call /teams/league/sacramento', async () => {
      const mySpy = jest.spyOn(constants, 'features', 'get')
      mySpy.mockReturnValue({ HIT_REAL_API_TEAMS: true })

      axios.request.mockImplementation(() => Promise.resolve({ data: staticTeams }))
      const result = await getTeams()
      expect(axios.request).toHaveBeenCalledTimes(1)
      expect(result).toMatchObject(expectedData)
    })
  })

  describe('when HIT_REAL_API_TEAMS is OFF', () => {
    it('should not call /teams/league/sacramento', async () => {
      const mySpy = jest.spyOn(constants, 'features', 'get')
      mySpy.mockReturnValue({ HIT_REAL_API_TEAMS: false })

      const result = await getTeams()
      expect(axios.request).not.toHaveBeenCalled()
      expect(result).toMatchObject(expectedData)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
