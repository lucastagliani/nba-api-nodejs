import dotenv from 'dotenv'

import express from 'express'
import { cache } from './cache.js'
import { getTeams } from './api/teams/service.js'

dotenv.config()

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/teams', cache(), async (req, res) => {
  const teams = await getTeams()
  res.json(teams)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
