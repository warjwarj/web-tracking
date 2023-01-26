const User = require("../User");
const checkAuth = require("../utils/middleware/checkAuth");
const checkPermLvl = require("../utils/middleware/checkPermissions");
const router = require("./auth");
const filler = require("../utils/fillerdata")


/*

extrapolate the range of driverScores into 1 - 100

for example: 

    min is 0.0238
    max is 12.589
    range is 12.5652

    driverX's pre fleet-weighted score is 2.344

    2.344 as a percentage of 12.5652 is 18.6

    so drivers final score is 18.6, ill invert that (100 - 18.6) so its 81.4 BOOM

*/

function calculateScoreFullFleet(data, weightConfig){
    let vals2Consider = Object.keys(weightConfig)
    let max = 0; // min value found in dataset
    let min = 100; // max value found in dataset
    for (let i=0; i < data.length; i++){
        let totalEvents = 0; // sum of driver's undesireable events
        let driver = data[i];
        for (let j=0; j < vals2Consider.length; j++){
            totalEvents += (driver[vals2Consider[j]] *= weightConfig[vals2Consider[j]])
        }
        driver.driverScore = totalEvents / driver.distance;
        if (driver.driverScore > max){ max = driver.driverScore }
        if (driver.driverScore < min){ min = driver.driverScore }
    }
    let range = max - min;
    // extrapolate the driver's scores
    data.forEach(driver => {
        driver.driverScore = 100 - (( driver.driverScore / range ) * 100);
    });
    return data;
}

// GET RANGE DYNAMICALLY
function calculateScoreDriver(weightConfig, driver, range){
    let vals2Consider = Object.keys(weightConfig)
    let totalEvents = 0; // sum of driver's undesireable events
    for (let j=0; j < vals2Consider.length; j++){
        totalEvents += (driver[vals2Consider[j]] *= weightConfig[vals2Consider[j]])
    }
    driver.driverScore = totalEvents / driver.distance;
    driver.driverScore = (100 - (( driver.driverScore / range ) * 100));
    driver.driverScore = Math.round(driver.driverScore * 10) / 10
    return driver;
}

// these will at some point be a db query | NEED TO GET RANGE DYNAMICALLY
function getDriverData(fleetdata, weightConfig, dname, range){ for (let i of fleetdata){ if (i.driver.trim() == dname) { return calculateScoreDriver(weightConfig, i, range); } } }

function getFleetData(fleetdata, weightConfig){ return calculateScoreFullFleet(fleetdata, weightConfig); }


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
        res.json(getDriverData(filler, user.settings.weightConfig, req.query.driver, 40))
    } 
    else if (req.query.fleet){
        res.json(calculateScoreFullFleet(filler, user.settings.weightConfig))
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