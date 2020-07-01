const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt')

async function create (userData) {
  const { email, password } = userData
  const existsUser = await User.findOne({ email })
  if (existsUser) throw new Error('User is registered')

  const hash = await bcrypt.hash(password, 10)

  return User.create({ ...userData, password: hash })
}

async function login (email, password) {
  const userExists = await User.findOne({ email })
  if (!userExists) throw new Error('Invalid Credentials')
  const { _id } = userExists
  const passwordIsCorrect = await bcrypt.compare(password, userExists.password)
  if (!passwordIsCorrect) throw new Error('Invalid Credentials')

  return jwt.sign({ _id, email })
}

function getAll () {
  return User.find({})
}

function getByToken (token) {
  const tokenDecoded = jwt.verify(token)
  const { _id } = tokenDecoded
  return User.findById(_id)
}

module.exports = {
  create,
  login,
  getByToken,
  getAll
}
