const db = require('./db')

const getUser = () => {
  return db.query(`
    SELECT
      *
    FROM
      users
    `
  )
  .catch(error => error)
}

const createUser = (email, password) => {
  return db.query(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1::text, $2::text)
    RETURNING
      *
    `,
    [
      email,
      password,
    ])
    .catch(error => error);
}

module.exports = {
  getUser,
  createUser
}
