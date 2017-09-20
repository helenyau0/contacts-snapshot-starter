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
    it('should insert a contact by first name and last name', (done) => {
      const contact = {
        first_name: 'chococat',
        last_name: 'kitty'
      }
      contacts.createContact(contact)
      .then(contact => {
        expect(contact).to.be.a('string')
        expect(contact[0]).to.be.an('object')
        expect(typeof contact[0].id).to.equal('number')
        expect(contact[0].first_name).to.deep.equal('chococat')
        expect(contact[0].last_name).to.deep.equal('kitty')
        done()
      })
      .catch(err => done(err))
    })
  })

  context('getContacts', () => {
    it('should be a function', () => {
      expect(contacts.getContacts).to.be.a('function')
    })
    it('should select everything inside the table', (done) => {
      contacts.getContacts()
      .then(all_contacts => {
        expect(all_contacts).to.be.an('array')
        expect(all_contacts[0]).to.be.an('object')
        done()
      })
      .catch(err => done(err))
    })
  })

  context('getContact', () => {
    it('should be a function', () => {
      expect(contacts.getContact).to.be.a('function')
    })
    it('should select everything inside the table', (done) => {
      contacts.getContact(1)
      .then(contact => {
        expect(contact).to.be.an('object')
        expect(contact).to.have.all.keys('id', 'first_name', 'last_name')
        expect(contact).to.deep.include({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        done()
      })
      .catch(err => done(err))
    })
  })

  context('deleteContact', () => {
    it('should be a function', () => {
      expect(contacts.deleteContact).to.be.a('function')
    })
    it('should select everything inside the table', (done) => {
      contacts.deleteContact(1)

      contacts.getContacts()
      .then(all_contacts => {
        expect(all_contacts).to.be.an('array')
        expect(all_contacts[0]).to.not.include({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        done()
      })
      .catch(err => done(err))
    })
  })

})
