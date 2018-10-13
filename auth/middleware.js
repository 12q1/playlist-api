const User = require('../users/model')
const {toData} = require('./jwt.js')


//--------------------Step 1.3-------------------------
//A user should be able to authenticate using an Authorization header with a Bearer <JWT>
function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      User
        .findById(data.userId)
        .then(user => {
          if (!user) return next('User does not exist')

          req.user = user
          next()
        })
        .catch(next)
    }
    catch(error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: `Your authentication token is invalid, if you got here by mistake please go back and try again, if you know what you're doing stop being naughty`
    })
  }
}

module.exports = auth
