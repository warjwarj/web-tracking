const checkAuth = require("../middleware/checkAuth");
const checkPermLvl = require("../middleware/checkPermissions");
const express = require('express')
const router = express.Router();

router.get('/', checkAuth, checkPermLvl(2), (req, res) => {
    res.render('map.ejs')
})

module.exports = router;