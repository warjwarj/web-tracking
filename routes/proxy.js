const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const https = require('https')
const checkAuth = require("../utils/middleware/checkAuth");

/*

GET AN SSL CERT - rejectUnauthorized: false NOT GOOD

"https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter="

"LsVntsEp6XBab4CjF5ZAHLhL7YuWxBtdK2fqNwOIdx33H5tp4S0DNxA5sR6oQWFKPcIPH7KFzGY+/buopufYBXL+K+4mQUZKQK04/kgH3+c+oV/wXMOdodvwRIDBPk9B" - FW Fleet
"wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y" - GT

*/

let lastUpdatedAfter = ''


function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}


async function getData(firstLoad){
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    })
    function amountOfV(first){
        if (first == "true"){
            return ' ';
        } else {
            return lastUpdatedAfter
        }
    }
    const response = await fetch('https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter=' + amountOfV(firstLoad), {
        method: 'GET',
        headers: {
            'Authorization': 'bearer wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y',
        },
        agent: httpsAgent
    })
    const data = await response.json()
    // get the latest date to pass back to api
    lastUpdatedAfter = data.map(function(e) { return e.dateLastUpdated; }).sort().reverse()[0]
    return data
}

router.get('/subscribe', checkAuth, async (req, res) => {
    if (req.query.firstLoad == "true"){
        let data = await getData(req.query.firstLoad)
        res.status(200).send(data)
    } else {
        let data = await getData(req.query.firstLoad)
        await sleep(52000)
        res.status(200).send(data)
    }
})

module.exports = router