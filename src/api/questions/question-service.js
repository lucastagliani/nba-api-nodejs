import { getPlayers } from '../players/player-service.js'

const getRandomPlayers = (players) => {
  const ALTERNATIVE_QUESTION_QUANTITY = 4
  return players
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .slice(0, ALTERNATIVE_QUESTION_QUANTITY)
}

const defineRightAnswerRandomly = (players) => {
  const randomIndex = Math.floor(Math.random() * players.length)
  return players[randomIndex]
}

export const getQuestion = () => {
  const eligiblePlayers = getPlayers({ isActive: true, minPointsReboundsOrAssists: 15 })

  const alternativePlayers = getRandomPlayers(eligiblePlayers)

  const rightAnswerPlayer = defineRightAnswerRandomly(alternativePlayers)

  const alternativeKeyValues = alternativePlayers
    .map((player) => ({ key: player.personId, value: player.fullName }))

  return ({
    sentence: 'Which basketball player is this?',
    correctAnswerKey: rightAnswerPlayer.personId,
    image: rightAnswerPlayer.imageLinks.large,
    alternativeOptions: alternativeKeyValues,
  })
}
