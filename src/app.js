import dotenv from 'dotenv'
import express from 'express'
import { cache } from './cache.js'
import { getTeams } from './api/teams/service.js'
import { getPlayers } from './api/players/service.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/teams', cache(), async (req, res) => {
  const teams = await getTeams()
  res.json(teams)
})

app.get('/players', async (req, res) => {
  const players = await getPlayers()
  res.json(players)
})

app.listen(port, () => {
  console.log(`[1.0] Example app listening at http://localhost:${port}`)
})
