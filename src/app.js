require('dotenv').config()
const express = require('express')
const staticTeams = require('./api/teams/static-data/teams.json')

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/teams', (req, res) => {
  res.send(staticTeams)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})