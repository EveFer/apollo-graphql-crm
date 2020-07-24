const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  products: {
    type: Array,
    required: true
  },
  totalToPay: {
    type: Number,
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['PENDIENTE', 'COMPLETADO', 'CANCELADO'],
    default: 'PENDIENTE'
  }
}, {
  timestamps: true
})

module.exports = model('Order', orderSchema)
