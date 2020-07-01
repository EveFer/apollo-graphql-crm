const Product = require('../models/products')

function create (productData) {
  return Product.create(productData)
}

function getAll () {
  return Product.find()
}

async function getById (id) {
  const product = await Product.findById(id)
  if (!product) throw new Error('Product not found')
  return product
}

async function deleteById (id) {
  const product = await Product.findById(id)
  if (!product) throw new Error('Product not found')
  return Product.findByIdAndRemove(id)
}

async function updateById (id, newData) {
  const product = await Product.findById(id)
  if (!product) throw new Error('Product not found')
  return Product.findByIdAndUpdate(id, newData, { new: true })
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById
}
