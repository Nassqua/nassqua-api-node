'use strict'

const Experience = require('../models/experience')

function getExperiences(req, res){
  Experience.find({} , (err , experiences) => {
   if(err) return res.status(500).send( { message : `Error in request : ${err}` } )
   if(!experiences) return res.status(404).send( { message : 'It does not exist products'} )
   res.status(200).send( { experiences } )
  })
}

function getExperience(req,res){
  let experienceId = req.params.experienceid
  Experience.findById(experienceId , (err , experience) => {
    if(err) return res.status(500).send({ message : `Error in request : ${err}` })
    if(!experience) return res.status(404).send( { message : 'the experience does not exist' })
    res.status(200).send( { experience })
  })
}

function setExperience(req,res){
  console.log('POST /api/Experiences')
  console.log(req.body)
  let experience = new Experience()

  experience.expxeriencesid = req.body.expxeriencesid
  experience.name = req.body.name
  experience.description = req.body.description
  experience.image = req.body.image
  experience.price = req.body.price

  experience.save((err , experienceStored ) => {
    if(err) res.status(500).send( { message : `Error on DB saving : ${err}` })
    res.status(200).send( { experience : experienceStored } )
  })
}

function updateExperiences(req,res){
  let experienceId = req.params.experienceid
  let update = req.body
  Experience.findByIdAndUpdate(experienceId , update , (err , experienceUpdated) => {
    if(err) return res.status(500).send( { message : `Error on DB updating : ${err}` } )
    res.status(200).send( { experience : experienceUpdated } )
  })
}

function deleteExperiences(req,res){
  let experienceId = req.params.experienceid
  Experience.findById(experienceId , (err,experience) => {
    if(err) return res.status(500).send( { message : `Error on DB deleting : ${err}` } )
    if(!experience) return res.status(404).send( { message : `Experience does not exist ` } )
    experience.remove((err) => {
      if(err) return res.status(500).send( { message : `Error on DB deleting : ${err}` } )
      res.send( { message :  'The experiece has been deleted' } )
    })
  })
}

module.exports = {
  getExperiences,
  getExperience,
  setExperience,
  updateExperiences,
  deleteExperiences
}
