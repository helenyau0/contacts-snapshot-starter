const bcrypt = require('bcrypt')

const findUser = (password, hash) => {
  return bcrypt.compare(password, hash)
}

const createValidUser = (password) => {
  let saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

module.exports = {
  findUser,
  createValidUser
}
