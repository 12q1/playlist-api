const { Router } = require('express')
const {toJWT, toData} = require('.jwt.js')

const router = new Router()

router.post('/login', (req,res,next) => {
  const {email,password} = req.body
  if(!email||!password){
    return res.status(400).send({message:'Your email or password was not valid'})
  }
  return (res.send({jwt:toJWT({userId:1})}))
})//end of login router

module.exports = router
