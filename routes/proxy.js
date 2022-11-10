const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const https = require('https')

/*

GET AN SSL CERT - rejectUnauthorized: false NOT GOOD

"https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter="

"LsVntsEp6XBab4CjF5ZAHLhL7YuWxBtdK2fqNwOIdx33H5tp4S0DNxA5sR6oQWFKPcIPH7KFzGY+/buopufYBXL+K+4mQUZKQK04/kgH3+c+oV/wXMOdodvwRIDBPk9B" - FW Fleet
"wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y" - GT

*/

let lastUpdatedAfter = ''

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


router.get('/apirouter', async (req, res) => {
    console.log(req.query.firstLoad)
    let data = await getData(req.query.firstLoad)
    console.log("returned " + data.length + " vehicles")
    res.send(data)
})


module.exports = router