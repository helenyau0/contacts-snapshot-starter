const expect = require('chai').expect
const dbHelper = require('../../helpers/db')
const contacts = require('../../../src/db/contacts.js')

describe('contacts', () => {
  beforeEach('reset the database', () => {
    return dbHelper.initDB()
  })

  context('createContact', () => {
    it('should be a function', () => {
      expect(contacts.createContact).to.be.a('function')
    })
  })
})
