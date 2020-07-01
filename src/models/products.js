const { Schema, model } = require('mongoose')

const productsSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('Product', productsSchema)
