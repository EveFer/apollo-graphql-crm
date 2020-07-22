const Client = require('../models/clients')
const Order = require('../models/Orders')

async function create (clientData, seller) {
  const { email } = clientData
  const client = await Client.findOne({ email })
  if (client) throw new Error('Client is already registered')
  return Client.create({ ...clientData, seller })
}

function getAll () {
  return Client.find()
}

async function getById (id, seller) {
  const client = await Client.findById(id)
  const { seller: sellerUser } = client
  if (!client) throw new Error('Client not found')
  if (sellerUser.toString() !== seller) throw new Error('You do not have permission to access this')
  return client
}

function getBySeller (seller) {
  return Client.find({ seller })
}

async function deleteById (id, seller) {
  const client = await Client.findById(id)
  if (!client) throw new Error('Client not found')
  const { seller: sellerUser } = client
  if (sellerUser.toString() !== seller) throw new Error('You do not have permission to delete this client')
  return client
}

async function updateById (id, newData, seller) {
  const client = await Client.findById(id)
  if (!client) throw new Error('Client not found')
  const { seller: sellerUser } = client
  if (sellerUser.toString() !== seller) throw new Error('You do not have permission to update this client')
  return Client.findByIdAndUpdate(id, newData, { new: true })
}

function betterClients () {
  return Order.aggregate([
    { $match: { status: 'COMPLETADO' } },
    {
      $group: {
        _id: '$Client',
        total: { $sum: '$total' }
      }
    },
    {
      $lookup: {
        from: 'Clients',
        localField: '_id',
        foreignField: '_id',
        as: 'clients'
      }
    },
    {
      $limit: 10
    },
    {
      $sort: { total: -1 }
    }
  ])
}

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
  getBySeller,
  betterClients
}
