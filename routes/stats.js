const User = require("../User");
const checkAuth = require("../utils/middleware/checkAuth");
const checkPermLvl = require("../utils/middleware/checkPermissions");
const router = require("./auth");
const filler = require("../utils/fillerdata")
const Scoring = require("../utils/Scoring.js")

// these will at some point be a db query | NEED TO GET RANGE DYNAMICALLY
function getDriverData(fleetdata, weightConfig, dname){ for (let i of fleetdata){ if (i.driver.trim() == dname) { return Scoring.getScoreDriver(filler, i.driver, weightConfig); } } }

function getFleetData(fleetdata, weightConfig){ return Scoring.calculateScoreFullFleet(fleetdata, weightConfig); }


router.get('/', checkAuth, checkPermLvl(2, 'your permissions are not high enough'), async (req, res) => {
    const user = await req.user
    res.render('stats.ejs', {
        user: user,
        drivers: filler,
        fleets: [{ fleetName: 'General Traffic' }],
        settings: user.settings
    })
})

router.get('/data', async (req, res) => {
    const user = await req.user
    if (req.query.driver){
        res.json(getDriverData(filler, user.settings.weightConfig, req.query.driver))
    } 
    else if (req.query.fleet){
        res.json(Scoring.calculateScoreFullFleet(filler, user.settings.weightConfig))
    }
})

router.post('/settings', checkAuth, async (req, res) => {
    let user = await req.user;
    // map the weightConfig array into an object
    let keysArray = ["harshAccelerationCount", "harshBrakingCount", "harshCorneringCount", "speedingCount", "idlingCount"]
    let weightConfigObject = {}; 
    for (let i=0; i < req.body.weightConfig.length; i++){ weightConfigObject[keysArray[i]] = req.body.weightConfig[i]; }
    await User.updateOne({ username: user.username }, { $set: { "settings.weightConfig": weightConfigObject } });
    res.redirect('back')
})

module.exports = router