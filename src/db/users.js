const db = require('./db')

const getUserEmail = (email) => {
  return db.one(`
    SELECT
      *
    FROM
      users
    WHERE
      email=$1
    LIMIT
      1
      `,
      [
        email
      ]
    )
  .catch(error => error)
}

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

const createUser = (email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `,
    [
      email,
      password
    ])
    .catch(error => error)
}

module.exports = {
  getUser,
  createUser,
  getUserEmail
}
