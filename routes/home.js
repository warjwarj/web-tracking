const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')


router.get('/', checkAuth, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})


router.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err){
            return next(err);
        }
        res.redirect('/auth/login')
    })
})


module.exports = router
