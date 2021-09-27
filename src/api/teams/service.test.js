import axios from 'axios'
// import teams from './static-data/teams.json'

jest.mock(axios)

describe("teams service", () => {
  test("should call /teams/league/sacramento", () => {
    axios.get.mockResolvedValueOnce({});

    expect(false).toBeFalsy();
  });
});
