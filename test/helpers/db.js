const pgp = require('pg-promise')()
require('./env.js')
const cn = process.env.DATABASE_URL
const db = pgp(cn)
const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql(file) {
  const fullPath = path.join(__dirname, file)
  return new QueryFile(fullPath)
}

const seedFiles = {contacts: sql('../seed/contacts.sql'), users: sql('../seed/users.sql')}

const truncateTables = () => {
  const tables = ['contacts', 'users']
  return Promise.all(tables.map(table => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`)
  }))
}

const seedDB = () => {

  return db.none(seedFiles.contacts).then(() => db.none(seedFiles.users))

}

const initDB = () => {
  return truncateTables().then(() => {
    return seedDB()
  })
}

module.exports = {
  initDB
}
