const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const dbUsers = require('./db/contacts')
const dbContacts = require('./db/contacts')
const app = express()
const { renderError } = require('./server/utils')
const routes = require('./server/routes');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('dotenv').load();

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}))

app.use(flash())

app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
