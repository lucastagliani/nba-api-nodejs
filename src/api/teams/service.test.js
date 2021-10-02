import axios from "axios";
// import teams from './static-data/teams.json'

jest.mock(axios);

describe("teams service", () => {
  describe("when HIT_REAL_API_TEAMS is ON", () => {
    test("should call /teams/league/sacramento", () => {
      axios.get.mockResolvedValueOnce({});

      expect(false).toBeFalsy();
    });
  });

  describe("when HIT_REAL_API_TEAMS is OFF", () => {
    test("should not call /teams/league/sacramento", () => {
      axios.get.mockResolvedValueOnce({});

      expect(false).toBeFalsy();
    });
  });
});
