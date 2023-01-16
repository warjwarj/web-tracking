const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const checkNotAuth = require('../utils/middleware/checkNotAuth')
const checkAuth = require('../utils/middleware/checkAuth')
const checkPermLvl = require("../utils/middleware/checkPermissions");
const initialisePassport = require('../passport-config')
const User = require('../User')


function queryOnEmail(email){
    try {
        let emailquery = User.findOne({ 'email': email }, 'email password id')
        return emailquery
    } catch (err) {
        console.log(err)
    }
}

function queryOnId(id){
    let data;
    try {
       let query = User.findOne({ 'id': id }).exec();
       return query.then(function(obj){ return obj })
    } catch (err) {
        console.log(err)
    }
}

initialisePassport(
    passport, 
    queryOnEmail,
    queryOnId
)

router.get('/login', checkNotAuth, (req, res) => {
    res.render('login.ejs')
})

router.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login',
    failureFlash: true
}))

router.get('/register', checkAuth, async (req, res) => {
    let user = await req.user
    // get all the admin acccounts to choose the parent of another account
    let pp = await User.find({'permLevel': 3}, {'username': 1, _id: 0}).exec()
    if (user.permLevel > 3){
        console.log(pp)
        res.render('register.ejs', {
            possibleParents: pp,
            user: user,
        })
    } else {
        res.render('register.ejs', { 
            user: user,
            possibleParents: null
        })
    }
})

router.post('/register', checkAuth, checkPermLvl(3, 'you cannot create a user as you are not an admin'), async (req, res) => {
    console.log(req.body)
    if (req.user.permLevel < 4 && req.body.permLevel < 3){ res.render('error.ejs', { reason: 'you cannot create a user with the same permision level as your own.' }) }
    try {
        if (await queryOnEmail(req.body.email) !== null){
            req.flash('error', 'email already registered')
            throw console.error(`email ${req.body.email} already registered`);
        }
        hashedPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            permLevel: req.body.permLevel,
            id: Date().toString()
        })
        res.redirect('/auth/register')
    } catch (err) {
        res.redirect('/auth/register')
    }
})

module.exports = router
