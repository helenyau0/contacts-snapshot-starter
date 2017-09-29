const chai = require('chai')
const should = chai.should()
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const dbHelper = require('../helpers/db')
const contacts = require('../../src/db/contacts.js')
const server = require('../../src/server.js')
chai.use(chaiHttp)

describe('contacts', () => {
  beforeEach('reset the database', () => {
    return dbHelper.initDB()
  })

  it('should login and create authorization to access other routes', () => {
    const agent = chai.request.agent(server)

    return agent
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({email: 'hello@gmail.com', password: '1234'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.redirect

        return agent.get('/')
          .then(res => {
            expect(res).to.have.status(200)
            return agent.post('/contacts')
            .send({first_name: 'Luna', last_name: 'Love'})
            .then(res => {
              expect(res).to.have.status(200)
              expect(res).to.redirect
              expect(res.res.text).to.include('<h1>Luna&nbsp;Love</h1>')

              return dbHelper.getContacts()
              .then(contacts => {
                expect(contacts).to.be.an('array')
                expect(contacts[3]).to.deep.include({ id: 4, first_name: 'Luna', last_name: 'Love' })
              })
          })
          .then(res => {
            return agent.get('/')
            .then(res => {
              expect(res).to.have.status(200)
              expect(res.res.text).to.deep.include(`<a class="contact-link" href="/contacts/4">\n          Luna&nbsp;Love\n        </a>\n`)
            })
          })
        })
    })
  })

  it('should only allow authorized users to access the /contacts/new route', () => {
    const agent = chai.request.agent(server)

    return agent
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({email: 'hello@gmail.com', password: '1234'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.redirect

        return agent.get('/contacts/new')
          .then(res => {
            expect(res).to.have.status(200)
            expect(res.request.cookies).to.include('connect.sid')
            expect(res.res.text).to.include('<h1>New Contact</h1>\n\n  <form method="post" action="/contacts" class="new-contact-form">\n')
          })
      })
  })

  it('should be able to do match searching', () => {
    const agent = chai.request.agent(server)

    return agent
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({email: 'hello@gmail.com', password: '1234'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.redirect

        return agent.get('/contacts/search')
          .query({q: 'jared'})
          .then(res => {
            expect(res).to.have.status(200)
            expect(res.request.cookies).to.include('connect.sid')
            expect(res.res.text).to.deep.include('<a class="contact-link" href="/contacts/1">\n          Jared&nbsp;Grippe\n        </a>\n')
          })
      })
  })

  it('should allow authorized users to delete contacts', () => {
    const agent = chai.request.agent(server)

    return agent
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({email: 'hello@gmail.com', password: '1234'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.redirect

        return agent.get(`/contacts/${1}/delete`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.request.cookies).to.include('connect.sid')
          expect(res.res.text).to.not.include('<a class="contact-link" href="/contacts/1">\n          Jared&nbsp;Grippe\n        </a>\n')
          expect(res.res.text).to.include('<a class="contact-link" href="/contacts/2">\n          Tanner&nbsp;Welsh\n        </a>\n')
          expect(res.res.text).to.include('<a class="contact-link" href="/contacts/3">\n          NeEddra&nbsp;James\n        </a>\n')
        })
      })
  })

  it(`should go to that user's profile page`, () => {
    const agent = chai.request.agent(server)

    return agent
      .post('/users/login')
      .set('Accept', 'application/json')
      .send({email: 'hello@gmail.com', password: '1234'})
      .then(res => {
        expect(res).to.have.status(200)
        expect(res).to.redirect

        return agent.get(`/contacts/${1}/`)
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.request.cookies).to.include('connect.sid')
          expect(res.res.text).to.include('<div class="contact-show-page-controls">\n    <a class="delete-contact" href="/contacts/1/delete">delete</a>\n  </div>\n\n  <h1>Jared&nbsp;Grippe</h1>\n\n')
        })
      })
  })
})
