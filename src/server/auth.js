const bcrypt = require('bcrypt')

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

const createPassword = (password) => {
  let saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

module.exports = {
  comparePassword,
  createPassword
}
