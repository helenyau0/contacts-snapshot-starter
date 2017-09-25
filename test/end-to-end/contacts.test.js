const chai = require('chai')
const should = chai.should()
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const dbHelper = require('../helpers/db')
const contacts = require('../../src/db/contacts.js')
const server = require('../../src/server.js')
chai.use(chaiHttp)

let register_details = {
  'email': 'hi@email.com',
  'password': '1234',
  'confirm_pass': '1234'
};


const logInUser = () => {
  return chai.request.agent(server)
    .post('/users/login')
    .send({email: 'hello@gmail.com', password: '1234'})
    .then(res => {
      expect(res).to.have.cookie('connect.sid')
      console.log('agent::', agent);
      return agent
    })
}

describe.only('contacts', () => {
  beforeEach('reset the database', () => {
    return dbHelper.initDB()
  })

  context('/POST signup', () => {
    it('should register, login, and check authentication', () => {
      // const agent = chai.request.agent(server)
      // agent
      // .post('/users/signup')
      // .send(register_details)
      // .end((err, res) => {
      //   expect(res).to.have.status(200)
      //   expect(res.request.cookies).to.include('connect.sid')
      //   expect(res).to.redirect
      //
      //   chai.request(server)
      //   .get('/')
      //   .end((err, res) => {
      //     expect(res).to.have.status(200)
      //     done()
      //   })
      // })


      return chai.request.agent(server)
        .post('/users/login')
        .send({email: 'hello@gmail.com', password: '1234'})
        .then(res => {
          expect(res.request.cookies).to.include('connect.sid')
          chai.request(server)
          .get('/')
          .then(res => {
            expect(res).to.have.status(200)
          })
        })


    })
  })





  // context('/GET ', () => {
  //   it.only('it should GET all the contacts', (done) => {
  //     chai.request(server)
  //     .get('/')
  //     .set('Cookie', 'cookieName=cookieValue')
  //     .end((err, res) => {
  //       console.log('res::::', res);
  //       expect(res.status).to.equal(200)
  //       done()
  //     })
  //   })
  // })

  // context('/POST ', () => {
  //   it.only('it should create a new contact', (done) => {
  //     chai.request(server)
  //     .post('/contacts')
  //     .send({
  //       first_name: 'ryan',
  //       last_name: 'popsicle'
  //     })
  //     .end((err, res) => {
  //       res.status.should.equal(200)
  //       res.body.data.should.include.keys(
  //         'id', 'first_name', 'last_name'
  //       )
  //       done()
  //     })
  //   })
  // })
})
