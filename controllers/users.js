'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const service = require('../services')

function signUp(req,res){


  if(!req.body.email ||!req.body.displayNames || !req.body.password)
    return res.status(404).send( { message : 'Invalid SignUp data' } )


  const user = new User({
      email : req.body.email,
      displayName : req.body.displayName,
      password : req.body.password
  })

  user.save((err) => {
    if(err) return res.status(500).send( { message : 'Error on user create' } )

    res.status(200).send( { token : service.createToken(user) } )
  })

}

function signIn(req,res){
  const emailIn = req.body.email
  const emailPass = req.body.password

  if(!emailIn || !emailPass)
    return res.status(404).send( { message : 'Credenciales invalidas' })

  User.find({ email : emailIn } , (err , user) => {
    if(err) return res.status(500).send( { message :  err} )
    if(!user || user.length == 0) return res.status(404).send( { message : 'invalid credentials , check user and password' } )

    const isMathc = user[0].validPassword(emailPass)// true

    if(user[0].validPassword(emailPass))
    {
      req.user = user
      return res.status(200).send({
        message : 'Logged correctly !!',
        token : service.createToken(user)
      })
    }

    res.status(404).send({
      message : 'invalid credentials , check user and password',
      token : ''
    })

  })
}

module.exports = {
  signUp,
  signIn
}
