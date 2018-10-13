const {Router} = require('express')
const Users = require('./model')
const bcrypt = require('bcrypt');

const router = new Router()

router.post('/users', (req,res,next)=>{
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  Users
    .create(user)
    .then(person => {
      if(!person) res.status(401).send({
        message: 'You dun goofd, send a e-mail and password next time'
      })
      res.status(201).send(`Your email address was saved as '${person.email}'`)
    })
    .catch(error=>next(error))
})

module.exports = router
