/* eslint-disable camelcase */

require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()

const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

app.use(staticMiddleware)

console.log(`Listening on port` + process.env.PORT)
app.listen(process.env.PORT)
