const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware.js')

const router = new Router()

router.get('/songs', auth, (req, res, next) => {
  Song
    .findAll()
    .then(songs => {
      res.send({ songs })
    })
    .catch(error => next(error))
})

router.get('/songs/:id', auth, (req, res, next) => {
  Song
    .findById(req.params.id, {include:[Playlist]})
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.send(song)
    })
    .catch(error => next(error))
})

//------------------------------Step 3----------------------------------
//A user should be able to add a song to the playlist with POST /playlists/:id/songs

router.post('/playlists/:id/songs', auth,  (req, res, next) => {
  Song
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

router.put('/songs/:id', auth, (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.update(req.body).then(song => res.send(song))
    })
    .catch(error => next(error))
})

router.delete('/songs/:id', auth,  (req, res, next) => {
  Song
    .findById(req.params.id)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `Song does not exist`
        })
      }
      return song.destroy()
        .then(() => res.send({
          message: `Song was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router
