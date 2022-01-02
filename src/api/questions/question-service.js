import { getPlayers } from '../players/player-service.js'

export const getQuestion = () => {
  // buscar os players - filtrar por mais conhecidos - como filtrar isso?
  const players = getPlayers({ isActive: true, minPointsReboundsOrAssists: 15 })
  // pegar 4 randomicos - como ser randomico?
  const alternativePlayers = players
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .slice(0, 4)

  // escolher 1 entre os randomicos - como?
  const randomIndex = Math.floor(Math.random() * alternativePlayers.length)
  const correctAnswerPlayer = alternativePlayers[randomIndex]

  // dos 4 jogadores, colocar os id e nome na questão
  // do 1 jogador escolhido, preencher correctAnswerKey com a key
  // do 1 jogador escolhido, definir a imagem
  const alternativeKeyValues = alternativePlayers
    .map((player) => ({ key: player.personId, value: player.fullName }))

  return ({
    sentence: 'Which basketball player is this?',
    correctAnswerKey: correctAnswerPlayer.personId,
    image: correctAnswerPlayer.imageLinks.large,
    alternativeOptions: alternativeKeyValues,
  })
}
