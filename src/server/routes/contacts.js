const DbContacts = require('../../db/contacts')
const { renderError } = require('../utils')

const router = require('express').Router()

const loginRequired = (request, response, next) => {
  if(!request.session.user) {
    response.redirect('/users/login')
  } else {
    next()
  }
}

router.get('/new', loginRequired, (request, response) => {
  if(request.session.user.admin === true) {
    response.render('new')
  } else {
    response.status(403).send('Forbidden: User unauthorized :(')
  }
})

router.post('/', (request, response, next) => {
  DbContacts.createContact(request.body)
  .then(function(contact) {
    if (contact) return response.redirect(`/contacts/${contact[0].id}`)
    next()
  })
  .catch( error => renderError(error, response, response) )
})

router.get('/:contactId', loginRequired, (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  DbContacts.getContact(contactId)
    .then(function(contact) {
      if (contact) return response.render('show', { contact })
      next()
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/:contactId/delete', loginRequired, (request, response, next) => {
  const contactId = request.params.contactId
  if(request.session.user.admin === true) {
    DbContacts.deleteContact(contactId)
      .then(function(contact) {
        if (contact) return response.redirect('/')
        next()
      })
      .catch( error => renderError(error, response, response) )
  } else {
    response.status(403).send('Forbidden: User unauthorized :(')
  }
})

router.get('/search', loginRequired, (request, response, next) => {
  const query = request.query.q
  DbContacts.searchForContact(query)
    .then(function(contacts) {
      if (contacts) return response.render('index', { query, contacts })
      next()
    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
