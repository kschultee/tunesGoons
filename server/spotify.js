/* eslint-disable camelcase */

const request = require('request')

const spotify = {
  authorize(code, callback) {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, (err, response, body) => {
      if (err) return callback(err)
      let access_token = body.access_token
      callback(null, access_token)
    })
  }
}

module.exports = spotify
