const DbUsers = require('../../db/users')
const { renderError } = require('../utils')

const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/signup', (req, res) => {
  res.render('signup')
})

router.post('/signup', (req, res) => {
  const { email, password, confirm_pass } = req.body

  DbUsers.createUser(email, password)
  .then(() => {
    res.redirect('/')
  })
})

module.exports = router
