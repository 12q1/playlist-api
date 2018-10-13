const { Router } = require('express')
const Playlist = require('./model')
const Songs = require('./model')
const auth = require('../auth/middleware.js')

const router = new Router()

//---------------------Step 2.1------------------
//POST /playlists: A user should be able to create a playlist (with just a name)

router.post('/playlists', auth, (req, res, next) => {
  Playlist
    .create(req.body)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.status(201).send(playlist)
    })
    .catch(error => next(error))
})

//---------------Step 2.2------------------
//GET /playlists: A user should be able to retrieve all their playlists
router.get('/playlists', auth, (req, res, next) => {
  Playlist
    .findAll()
    .then(playlists => {
      res.send({ playlists })
    })
    .catch(error => next(error))
})

//---------------Step 2.3------------------
//GET /playlists/:id: A user should be able to get a single one of their playlists,TODO with all the songs on it (but no others).
router.get('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return res.send(playlist)
    })
    .catch(error => next(error))
})

//---------------Step 2.4------------------
//DELETE /playlists/:id: A user may delete a playlist, and all songs on it.
router.delete('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.destroy()
        .then(() => res.send({
          message: `Playlist was deleted`
        }))
    })
    .catch(error => next(error))
})

//--------------End of Step 2 ----------

router.put('/playlists/:id', auth, (req, res, next) => {
  Playlist
    .findById(req.params.id, {include:[Songs]})
    .then(playlist => {
      if (!playlist) {
        return res.status(404).send({
          message: `Playlist does not exist`
        })
      }
      return playlist.update(req.body).then(playlist => res.send(playlist))
    })
    .catch(error => next(error))
})


module.exports = router
