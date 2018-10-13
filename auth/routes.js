const {Router} = require('express')
const {toJWT, toData} = require('./jwt.js')
const User = require('../users/model')
const bcrypt = require('bcrypt');
const auth = require('./middleware.js')

const router = new Router()

router.post('/login', (req, res, next) => {
  const {email, password} = req.body
  if(!email||!password)
  {
    return res.status(400).send({
    message: 'Your email or password was invalid'
    })
  }
  User
  .findOne({
    where: {
      email: req.body.email
    }
  })
  .then(entity => {
    if (!entity) {
      res.status(400).send({
        message: 'That email address does not exist'
      })
    }

    if (bcrypt.compareSync(req.body.password, entity.password)) {

      res.send({
        jwt: toJWT({ userId: entity.id })
      })
    }
    else {
      res.status(400).send({
        message: 'Password was incorrect'
      })
    }
  })
  .catch(err => {
    console.error(err)
    res.status(500).send({
      message: 'Something went wrong'
    })
  })


})//end of login

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})

module.exports = router
