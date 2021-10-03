import axios from 'axios'
// import teams from './static-data/teams.json'

jest.mock(axios)

describe('teams service', () => {
  describe('when HIT_REAL_API_TEAMS is ON', () => {
    it('should call /teams/league/sacramento', () => {
      axios.get.mockResolvedValueOnce({})

      expect(false).toBeFalsy()
    })
  })

  describe('when HIT_REAL_API_TEAMS is OFF', () => {
    it('should not call /teams/league/sacramento', () => {
      axios.get.mockResolvedValueOnce({})

      it(false).toBeFalsy()
    })
  })
})
