'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExperienceSchema = Schema({
  name : String,
  description : String
})

module.exports = mongoose.model('Experience' , ExperienceSchema)
