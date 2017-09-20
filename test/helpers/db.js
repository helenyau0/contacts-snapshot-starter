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

const seedFiles = {contacts: sql('../seed/contacts.sql')}

const truncateTables = () => {
  const tables = ['contacts']
  return Promise.all(tables.map(table => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`)
  }))
}

const seedDB = () => {
  return db.query('select * from contacts').then( contacts => {
  return db.none(seedFiles.contacts)
  })
}

const initDB = () => {
  return truncateTables().then(() => {
    return seedDB()
  })
}

module.exports = {
  initDB
}
