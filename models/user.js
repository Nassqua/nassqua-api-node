'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config');

const connection = mongoose.createConnection(config.db);

autoIncrement.initialize(connection);

const UserSchema = new Schema({
  user_id : { type : Number , unique : true },
  email : { type : String , unique : true , lowercase : true },
  displayName : String,
  avatar : String,
  password : { type : String },
  signupDate : { type: Date , default : Date.now() } ,
  lastLogin : Date
})

UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'user_id' , startAt: 1  });
var User = connection.model('User', UserSchema);

UserSchema.pre('save' , function (next) {
  let user = this
  if(!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err)

    bcrypt.hash(user.password , salt , null , (err , hash) => {
      if(err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = function(){
  if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&retro`
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.getNumber = function(){
  return 4;
}

module.exports = mongoose.model('User', UserSchema)
