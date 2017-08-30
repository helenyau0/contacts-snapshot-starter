const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const DbContacts = require('../../db/contacts');

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( err => console.log('err', err) )
})

router.use('/contacts', contacts); // /contacts/search
router.use('/users', auth); // /userlogin

module.exports = router;
