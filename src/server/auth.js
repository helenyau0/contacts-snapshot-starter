const bcrypt = require('bcrypt')

const createValidUser = (password) => {
  let saltRounds = 10;

  return bcrypt.hash(password, saltRounds).then(function(hashedPassword) {
    return hashedPassword;
  })
}

module.exports = {
  createValidUser
}
