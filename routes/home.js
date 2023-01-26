const express = require('express')
const router = express.Router()
const checkAuth = require('../utils/middleware/checkAuth')
const filler = require("../utils/fillerdata")
const Scoring = require("../utils/Scoring")

function gethomedata(data, scope, scopeName){
  if (scope == 'driver'){
    return driver = data.find(obj => obj.driver = scopeName);
  }
  else if (scope == 'fleet'){
    return fleet = data;
  }
  else if (scope == 'dealer'){
    console.warn('implement this')
    return null;
  }
}

function getMinMax(arr, key) {
  const sortedArr = arr.sort((a, b) => b[key] - a[key]);
  const maxValues = sortedArr.slice(0, 3);
  const minValues = sortedArr.slice(-3).reverse();
  return { maxValues, minValues };
}

let weightConfig = {
  "harshAccelerationCount": "1",
  "harshBrakingCount": "1",
  "harshCorneringCount": "1",
  "speedingCount": "1",
  "idlingCount": "1"
}

router.get('/', checkAuth, async (req, res) => {
  const user = await req.user;
  if (user.permLevel == 1){
    const drivername = 'Alan Riach' // FIND SOME WAY TO MAKE THIS DYNAMIC
    const scopeData = Scoring.calculateScoreDriver(weightConfig, (filler.find(obj => obj.driver == drivername)), 30);
    for (let i of filler){
      if (i.driver == drivername){
        return res.render('home.ejs', {
          user: user,
          scope: 'driver',
          scopeData: scopeData,
          scopeName: scopeData['driver'],
          driverScore: scopeData['driverScore'],
          driversMPG: (scopeData['distance'] / scopeData['totalFuelUsed'])
        })
      }
    }
  }
  else if (user.permLevel > 1){
    const scopeData = gethomedata(filler, 'fleet', 'General Traffic')
    const weighted = Scoring.calculateScoreFullFleet(scopeData, weightConfig);
    const scope = 'fleet'
    return res.render('home.ejs', {
      user: user,
      scope: 'fleet',
      scopeName: 'General Traffic',
      minMax: getMinMax(scopeData, 'driverScore'),
    })
  }
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
