const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcrypt')
const checkNotAuth = require('../middleware/checkNotAuth')
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

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', checkNotAuth, async (req, res) => {
    console.log(req.body)
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
        res.redirect('/auth/login')
    } catch (err) {
        res.redirect('/auth/register')
    }
})

module.exports = router
