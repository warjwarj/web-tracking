const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')

// need to await because req.user calls deserialise and that calls a query thats async
router.get('/', checkAuth, async (req, res) => {
    const user = await req.user
    console.log(user.permLevel, user.username)
    res.render('home.ejs', {
        permLvl: user.permLevel,
        username: user.username
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
