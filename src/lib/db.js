const mongoose = require('mongoose')
require('dotenv').config()

function connect () {
  return mongoose.connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

module.exports = { connect }
