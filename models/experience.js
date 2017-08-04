'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExperienceSchema = Schema({
  experiencesId : Number,
  name : String,
  description : String,
  image : String,
  price : Number
})

module.exports = mongoose.model('Experience' , ExperienceSchema)
