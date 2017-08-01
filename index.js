'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db , (err,res) => {
  if(err)
  {
    console.log('Error al conectar a la base de datos ...')
  }
  console.log('Conexion a la base de datos establecida ...')

  app.listen(config.port, () => {
    console.log(`API REST running in http://localhost:${config.port}`)
  })

});
