/* eslint-disable camelcase */

require('dotenv').config()
const path = require('path')
const express = require('express')
const request = require('request')
const querystring = require('querystring')
const spotify = require('./spotify')
const app = express()

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)

const redirect_uri = process.env.REDIRECT_URI

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-library-read user-read-playback-state streaming user-read-recently-played user-modify-playback-state user-read-currently-playing user-read-birthdate playlist-modify-public',
      redirect_uri
    }))
})

app.get('/callback', (req, res, next) => {
  const code = req.query.code
  spotify.authorize(code, (err, access_token) => {
    if (err) return next(err)
    const uri = process.env.LANDING_URI
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/library', (req, res, next) => {
  const songOptions = {
    url: req.query.url + '&limit=' + req.query.limit,
    headers: {
      'Authorization': 'Bearer ' + req.query.access_token
    }
  }
  request.get(songOptions, (err, response, body) => {
    if (err) return next(err)
    res.send(body)
  })
})

app.get('/playback', (req, res, next) => {
  const playbackOptions = {
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      'Authorization': 'Bearer ' + req.query.access_token
    }
  }
  request.get(playbackOptions, (err, response, body) => {
    if (err) return next(err)
    res.send(body)
  })
})

app.use(function (err, req, res, next) {
  console.error(err)
  res.sendStatus(500)
})

console.log(`Listening on port` + process.env.PORT)
app.listen(process.env.PORT)
