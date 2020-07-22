const Order = require('../models/orders')
const Client = require('../models/clients')
const Product = require('../models/products')
const User = require('../models/users')

async function create (orderData, seller) {
  // verificar si existe el client
  // verificar si el cliente es del vendedor
  // REVISAR QUE EL STOCK ESTE DISPONIBLE
  // ASIGNARLE UN VENDEDOR
  // guardar en la base de datos
  const { client, seller: sellerUser, products } = orderData
  const clientExists = await Client.findById(client)
  if (!clientExists) throw new Error('The Client not found')
  if (sellerUser !== seller) throw new Error('You do not have permission to create this Order')

  // con operador asyncrono
  for await (const product of products) {
    const { id } = product
    const productCurrent = await Product.findById(id)
    if (product.quantity > productCurrent.stock) throw new Error(`El producto ${productCurrent.name} excede la cantidad disponible`)
    // restar la cantidad a lo disponible
    productCurrent.stock = product.stock - product.quantity
    await product.save()
  }

  // crear uu nuevo pedido
  return Order.create({ ...products, seller: sellerUser, client })
}

function getAll () {
  return Order.find()
}

async function getBySeller (seller) {
  seller = await User.findById(seller)
  if (!seller) throw new Error('Seller not found')
  return Order.find({ seller })
}

async function getAOrder (id, seller) {
  const order = await Order.findById(id)
  if (!order) throw new Error('Not not found Order')
  if (order.seller.toString() !== seller) throw new Error('You dont have permission to get order')
  return Order.findById(id)
}

async function updatedById (id, seller, newData) {
  const { products, client: clientId } = newData
  // revisar si existe el order
  const order = await Order.findById(id)
  if (!order) throw new Error('Order not found')
  // revisar si el cliente existe
  const client = await Client.findById(clientId)
  if (!client) throw new Error('Client not found')
  // revisar si el vendedor es el actual al que esta loggeado
  if (client.seller.toString() !== seller) throw new Error('You dont have permission')
  // verificar el stock
  if (products) {
    for await (const product of products) {
      const { id } = product
      const productCurrent = await Product.findById(id)
      if (product.quantity > productCurrent.stock) throw new Error(`El producto ${productCurrent.name} excede la cantidad disponible`)
      // restar la cantidad a lo disponible
      productCurrent.stock = product.stock - product.quantity
      await product.save()
    }
  }
  // save
  return Order.findOneAndUpdate({ _id: id }, newData, { new: true })
}

async function deleteById (id, seller) {
  const order = await Order.findById(id)
  if (!order) throw new Error('Order not found')
  if (order.seller.toString() !== seller) throw new Error('You dont have permission')
  return Order.findByIdAndRemove(id)
}

async function getByStatus (status, seller) {
  return Order.find({ seller, status })
}

module.exports = {
  create,
  getAll,
  getBySeller,
  getAOrder,
  updatedById,
  deleteById,
  getByStatus
}
