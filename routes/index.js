'use strict'
const express = require('express')
const api = express.Router()
const experienceController = require('../controllers/experiences')
const userController = require('../controllers/users')
const auth = require('../middlewares/auth')


// Experiences
api.get('/experiences' , experienceController.getExperiences)
api.get('/experiences/:experienceid' ,  experienceController.getExperience)
api.post('/experiences' , auth ,  experienceController.setExperience)
api.put('/experiences/:experienceid' , experienceController.updateExperiences)
api.delete('/experiences/:experienceid' , experienceController.deleteExperiences)

api.post('/singup' , userController.signUp)
api.post('/singin' , userController.signIn)


api.get('/private', function(req, res){
  res.status(200).send( { message : 'Tienes acceso' } )
})

/*
api.post('/private', function(req, res){
  console.log(req.body)
})
*/

module.exports  = api
