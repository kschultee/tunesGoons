/* eslint-disable camelcase */

require('dotenv').config()
const path = require('path')
const express = require('express')
const request = require('request')
const querystring = require('querystring')
const app = express()

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)

let access_token
const redirect_uri = process.env.REDIRECT_URI

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-library-read',
      redirect_uri
    }))
})

app.get('/callback', (req, res) => {
  let code = req.query.code
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, (error, response, body) => {
    if (error) throw error
    access_token = body.access_token
    let uri = process.env.LANDING_URI
    res.redirect(uri + '?access_token=' + access_token)
  })
})

app.get('/library', (req, res) => {
  let songOptions = {
    url: 'https://api.spotify.com/v1/me/tracks',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }
  request.get(songOptions, (error, response, body) => {
    console.log(error)
    res.send(body)
  })
})

console.log(`Listening on port` + process.env.PORT)
app.listen(process.env.PORT)
