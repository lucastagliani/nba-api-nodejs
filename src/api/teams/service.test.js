import axios from 'axios'
import constants from '../../constants.js'
import staticTeams from './static-data/teams.json'
import { getTeams } from './service.js'

jest.mock('axios')
jest.mock('../../constants.js', () => ({
  get features() {
    return { HIT_REAL_API_TEAMS: false }
  },
}))

describe('teams service', () => {
  const expectedResponseData = {
    api: {
      filters: expect.any(Array), message: 'GET teams/league/sacramento', results: 34, status: 200, teams: expect.any(Array),
    },
  }

  describe('when HIT_REAL_API_TEAMS is ON', () => {
    beforeEach(() => {
      jest.spyOn(constants, 'features', 'get').mockReturnValue({ HIT_REAL_API_TEAMS: true })
    })
    it('should call /teams/league/sacramento', async () => {
      axios.request.mockImplementation(() => Promise.resolve({ data: staticTeams }))
      await getTeams()
      expect(axios.request).toHaveBeenCalledTimes(1)
    })
    it('should return response data with teams prop when fetch is successful', async () => {
      axios.request.mockImplementation(() => Promise.resolve({ data: staticTeams }))
      const result = await getTeams()
      expect(result).toMatchObject(expectedResponseData)
    })
    xit('should NOT return response data with teams prop when fetch is NOT successful', async () => {
      axios.request.mockImplementation(() => Promise.reject(new Error()))
      const result = await getTeams()
      expect(result).toMatchObject({})
    })
  })

  describe('when HIT_REAL_API_TEAMS is OFF', () => {
    beforeEach(() => {
      jest.spyOn(constants, 'features', 'get').mockReturnValue({ HIT_REAL_API_TEAMS: false })
    })
    it('should not call /teams/league/sacramento', async () => {
      const result = await getTeams()
      expect(axios.request).not.toHaveBeenCalled()
      expect(result).toMatchObject(expectedResponseData)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
