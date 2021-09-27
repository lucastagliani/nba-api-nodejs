import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
// const express = require('express')
import {getTeams} from './api/teams/service.js'


const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/teams', async (req, res) => {
  const teams = await getTeams()
  res.send(teams)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})