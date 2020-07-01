const { Schema, model } = require('mongoose')

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8
  }
}, {
  timestamps: true
})

module.exports = model('User', userSchema)
