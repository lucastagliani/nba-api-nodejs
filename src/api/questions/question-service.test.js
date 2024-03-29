import { getQuestion } from './question-service'
import * as playerService from '../players/player-service'

const getPlayersSpy = jest.spyOn(playerService, 'getPlayers')

describe('question-service', () => {
  describe('getQuestion', () => {
    it('should return a question with the right data types', () => {
      const actualQuestion = getQuestion()
      expect(actualQuestion && typeof actualQuestion === 'object').toBe(true)
      expect(typeof actualQuestion.sentence).toBe('string')
      expect(typeof actualQuestion.correctAnswerKey).toBe('number')
      expect(typeof actualQuestion.image).toBe('string')
      expect(Array.isArray(actualQuestion.alternativeOptions)).toBe(true)
    })

    it('should have 4 alternatives to choose', () => {
      const actualQuestion = getQuestion()
      expect(actualQuestion.alternativeOptions.length).toEqual(4)
    })

    it('should have correct answer key in one of the alternatives', () => {
      const actualQuestion = getQuestion()
      expect(actualQuestion.alternativeOptions.map((a) => a.key)).toEqual(
        expect.arrayContaining([actualQuestion.correctAnswerKey]),
      )
    })

    it('should call getPlayers with regular level parameters', () => {
      getQuestion()
      expect(getPlayersSpy).toBeCalledWith({ min_lastYear: 1995, min_score: 40 })
    })
  })
})
