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

const playerFiltersByLevel = {
  easy: { isActive: true, min_score: 50 },
  regular: { min_lastYear: 1995, min_score: 40 },
  hard: { min_score: 20, min_lastYear: 1990 },
  impossible: { min_lastYear: 1968 },
}

const getFilterByLevel = (level) => {
  const key = level || 'regular'
  return playerFiltersByLevel[key.toLowerCase()] ?? playerFiltersByLevel.regular
}

export const getQuestion = (level) => {
  const eligiblePlayers = getPlayers(getFilterByLevel(level))

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
