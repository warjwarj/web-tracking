if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const checkAuth = require('./middleware/checkAuth')
const mongoose = require('mongoose')
const cors = require('cors')


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use([passport.session()])
app.use(methodOverride('_method'))
app.use(cors())

// serve the map folder
app.use('/map', express.static('map'))

app.get('/', checkAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)


const homeRouter = require('./routes/home')
app.use('/home', homeRouter)

const proxyRouter = require('./routes/proxy')
app.use('/proxy', proxyRouter) 

const dbconnection = mongoose.connect('mongodb://localhost/usersdb', console.log("db connected"))
app.listen(3000, console.log("server started, port 3000"))

module.exports = dbconnection