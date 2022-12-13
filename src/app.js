import dotenv from 'dotenv'
import express from 'express'
import { cache } from './cache.js'
import { getTeams } from './api/teams/team-service.js'
import { getPlayers } from './api/players/player-service.js'
import { getQuestion } from './api/questions/question-service.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World! v3')
})

app.get('/teams', cache(), async (req, res) => {
  console.log('Request made to /teams')
  const teams = await getTeams()
  res.json(teams)
})

app.get('/players', (req, res) => {
  console.log('Request made to /players')
  const filters = req.query
  const players = getPlayers(filters)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.json(players)
})

app.get('/questions', (req, res) => {
  console.log('Request made to /questions')
  const { level } = req?.query || {}
  const question = getQuestion(level)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.json(question)
})

app.listen(port, () => {
  console.log(`[1.0] Example app listening at http://localhost:${port}`)
})
