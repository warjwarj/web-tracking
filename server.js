require('dotenv').config()
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const checkAuth = require('./utils/middleware/checkAuth')
const mongoose = require('mongoose')
const cors = require('cors')
const request = require('supertest')
const assert = require('assert')

// static assets
app.use('/assets', express.static('assets'))

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(cors())

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)
const homeRouter = require('./routes/home')
app.use('/home', homeRouter)
const proxyRouter = require('./routes/proxy')
app.use('/proxy', proxyRouter)
const statsRouter = require('./routes/stats')
app.use('/stats', statsRouter)
const mapRouter = require('./routes/map')
const { isTypedArray } = require('util/types')
app.use('/map', mapRouter) 

app.get('/', checkAuth, (req, res) => {
    res.redirect('/home')
})

const dbconnection = mongoose.connect(process.env.DB_URL, console.log("db connected"))

app.listen(3000, console.log("server started, port 3000"))

module.exports = dbconnection

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TESTING FOR ROUTE HANDLING BELOW

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


// CHECK URLS WORK AND THAT YOU CANNOT ACCESS PROTECTED ROUTES
request(app)
    .get('/auth/login')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200)
    .end(function(err, res) {
        if (err) throw err;
    });

request(app)
    .get('/stats')
    .expect('Found. Redirecting to /auth/login')
    .expect(302)
    .end(function(err, res) {
        if (err) throw err;
    });

request(app)
  .get('/map')
  .expect('Found. Redirecting to /auth/login')
  .expect(302)
  .end(function(err, res) {
      if (err) throw err;
    });

request(app)
    .get('/')
    .expect('Found. Redirecting to /auth/login')
    .expect(302)
    .end(function(err, res) {
        if (err) throw err;
    });