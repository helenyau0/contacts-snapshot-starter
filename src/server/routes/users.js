const Users = require('../auth')
const DbUsers = require('../../db/users')
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
  const { email, password } = request.body

  DbUsers.getUser(email)
  .then(user => {
    return Users.findUser(password, user.password)
    .then(isMatch => {
      if(isMatch) {
        request.session.user = user
        response.redirect('/')
      }
    })
    .catch(err => next(err))
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
    return DbUsers.createUser(email, hash)
  })
  .then(user => {
    request.session.user = user
    response.redirect('/')
  }).catch(err => next(err))
})

module.exports = router
