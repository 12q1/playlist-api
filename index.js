const express = require('express')
const bodyParser = require('body-parser')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')
const loginRouter = require('./auth/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(playlistsRouter)
  .use(songsRouter)
  .use(loginRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))
