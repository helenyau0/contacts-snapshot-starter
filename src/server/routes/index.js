const router = require('express').Router();
const contacts = require('./contacts')
const users = require('./users')
const DbContacts = require('../../db/contacts');

const loginRequired = (request, response, next) => {
  if(!request.session.user) {
    response.redirect('/users/login')
  } else {
    next()
  }
}

router.get('/', loginRequired, (request, response) => {
  if(request.session.user) {
    DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
  } else {
    response.redirect('/users/login')
  }
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', users); // /userlogin

module.exports = router;
