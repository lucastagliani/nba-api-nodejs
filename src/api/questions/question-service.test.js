import { getQuestion } from './question-service'

describe('question-service', () => {
  const expectedQuestion = {
    sentence: 'Which basketball player is this?',
    correctAnswerKey: 2544,
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
    alternativeOptions: [
      { key: 201939, value: 'Stephen Curry' },
      { key: 203076, value: 'Anthony Davis' },
      { key: 2544, value: 'LeBron James' },
      { key: 201188, value: 'Marc Gasol' },
    ],
  }
  it('should return a question', () => {
    const actualQuestion = getQuestion()
    expect(actualQuestion).toEqual(expectedQuestion)
  })

  it('should have 4 alternatives to choose', () => {
    const actualQuestion = getQuestion()
    expect(actualQuestion.alternativeOptions.length).toEqual(4)
  })

  // it('should have correct answer key in one of the alternatives', () => {
  //   const actualQuestion = getQuestion()
  //   expect(actualQuestion.alternativeOptions).
  // })
})
