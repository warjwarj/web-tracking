const checkAuth = require("../middleware/checkAuth");
const express = require('express')
const router = express.Router();

router.get('/', checkAuth, (req, res) => {
    res.render('map.ejs')
})

module.exports = router;