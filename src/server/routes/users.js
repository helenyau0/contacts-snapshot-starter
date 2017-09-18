const Users = require('../auth')
const DbUsers = require('../../db/users')
const { renderError } = require('../utils')

const router = require('express').Router()

router.get('/flash', (request, response) => {
  request.flash('error', 'This email is already taken')
  response.redirect('/users/signup')
})

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
    return Users.comparePassword(password, user.password)
    .then(isMatch => {
      if(email === user.email && isMatch) {
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
    response.render('signup', { message: request.flash('error') })
  }
})

router.post('/signup', (request, response) => {
  const { email, password, confirm_pass } = request.body

  DbUsers.getUserEmail(email)
  .then(user => {
    if(email === user.email) {
      response.redirect('/users/flash')
    } else {
      if(password === confirm_pass) {
        Users.createPassword(password)
        .then(hash => {
          return DbUsers.createUser(email, hash)
        })
        .then(user => {
          request.session.user = user
          response.redirect('/')
        }).catch(err => next(err))
      }
    }
  })
  .catch(err => next(err))
})

router.get('/logout', (request, response) => {
  request.session.destroy()
  response.redirect('/')
})

module.exports = router
