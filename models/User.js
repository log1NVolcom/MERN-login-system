const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const joi = require('joi');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
});

/*const joiUserSchema = joi.object().keys({
  name: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().email({minDomainAtoms: 2}),
});

const


const mongooseUserSchema = mongoose.Schema(joigoose.convert(joiUserSchema));*/

//mongooseUserSchema.username.unique = true;
//mongooseUserSchema.email.unique = true;

module.exports = User = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  const query = {
    username: username,
  };
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.updateUserByUsername = function(username, data, callback) {
  const query = {
    username: data.user.username,
  };

  User.findOneAndUpdate(query, data.newUser, {upsert: true}, callback);
};
