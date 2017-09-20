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
    it.only('should insert a contact by first name and last name', (done) => {

      const contact = {
        first_name: 'chococat',
        last_name: 'kitty'
      }
      contacts.createContact(contact)
      .then(contact => {
        expect(contact).to.be.an('array')
        expect(contact[0]).to.be.an('object')
        expect(typeof contact[0].id).to.equal('number')
        expect(contact[0].first_name).to.deep.equal('chococat')
        expect(contact[0].last_name).to.deep.equal('kitty')
        done()
      })
      .catch(err => done(err))
    })
  })
})
