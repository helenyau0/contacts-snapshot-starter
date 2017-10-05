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

  context('getContacts', () => {
    it('should be a function', () => {
      expect(contacts.getContacts).to.be.a('function')
    })
    it('should select everything inside the contacts table', (done) => {
      contacts.getContacts()
      .then(all_contacts => {
        expect(all_contacts).to.be.an('array')
        expect(all_contacts.length).to.deep.equal(3)
        expect(all_contacts[0]).to.deep.equal({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        expect(all_contacts[1]).to.deep.equal({ id: 2, first_name: 'Tanner', last_name: 'Welsh' })
        expect(all_contacts[2]).to.deep.equal({ id: 3, first_name: 'NeEddra', last_name: 'James' })
        done()
      })
      .catch(err => done(err))
    })
  })

  context('getContact', () => {
    it('should be a function', () => {
      expect(contacts.getContact).to.be.a('function')
    })
    it('should select everything inside the contacts table belonging to the given id', (done) => {
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
    it('should delete everything belonging to the given id inside the contacts table', (done) => {
      contacts.deleteContact(1)
      .then(() => {
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

  context('searchForContact', () => {
    it('should be a function', () => {
      expect(contacts.searchForContact).to.be.a('function')
    })
    it('should search a contact in the contacts table by given keywords', (done) => {
      contacts.searchForContact('jared')
      .then(contact => {
        expect(contact).to.be.an('array')
        expect(contact[0]).to.be.an('object')
        expect(contact[0]).to.deep.include({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        expect(contact[0]).to.deep.equal({ id: 1, first_name: 'Jared', last_name: 'Grippe' })
        done()
      })
      .catch(err => done(err))
    })
  })
})
