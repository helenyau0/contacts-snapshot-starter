const db = require('./db')

const getUser = (email) => {
  return db.one(`
    SELECT
      *
    FROM
      users
      WHERE
      email=$1
    `,
    [
      email
    ]
  )
  .catch(error => error)
}

const createUser = (email, hash) => {
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
      hash
    ])
    .catch(error => error)
}

module.exports = {
  getUser,
  createUser
}
