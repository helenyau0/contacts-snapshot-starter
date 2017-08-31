const DbUsers = require('../../db/users')
const Users = require('../auth')
const { renderError } = require('../utils')

const router = require('express').Router()

router.get('/login', (request, response) => {
  if(request.session.user) {
    response.redirect('/')
  } else {
    response.render('login')
  }
})

router.post('/login', (request, response) => {
  const { email, password } = req.body

  DbUser.getUser(email)
  .then(user => {

  })
})

router.get('/signup', (request, response) => {
  if(request.session.user) {
    response.redirect('/')
  } else {
    response.render('signup')
  }
})

router.post('/signup', (request, response) => {
  const { email, password, confirm_pass } = request.body

  Users.createValidUser(password)
  .then(hash => {
    console.log('heyyyyyyyy');
    DbUsers.createUser(email, hash)
  })
  .then(user => {
    console.log('hellooooo');
    console.log('whatru', user);
    request.session.user = user
    response.redirect('/')
  }).catch(err => next(err))
})

module.exports = router
