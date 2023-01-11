const checkAuth = require("../middleware/checkAuth");
const checkPermLvl = require("../middleware/checkPermissions");
const express = require('express')
const router = express.Router();

router.get('/', checkAuth, checkPermLvl(2, 'your permissions are not high enough'), async (req, res) => {
    res.render('map.ejs', { 
        user: await req.user 
    })
})

module.exports = router;