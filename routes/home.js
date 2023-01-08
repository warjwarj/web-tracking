const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')

// need to await because req.user calls deserialise and that calls a query thats async
router.get('/', checkAuth, async (req, res) => {
    res.render('home.ejs', {
        user: await req.user
    })
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
