const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const https = require('https')

/*

pass the latest, most recent datelastUpdated value to only get the vehicles which have updated since then.

need a cors proxy server for development?

"https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter"

"LsVntsEp6XBab4CjF5ZAHLhL7YuWxBtdK2fqNwOIdx33H5tp4S0DNxA5sR6oQWFKPcIPH7KFzGY+/buopufYBXL+K+4mQUZKQK04/kgH3+c+oV/wXMOdodvwRIDBPk9B" - FW Fleet
"wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y" - GT

*/

let lastUpdatedAfter = ''

function sortDates(data){
  let arr = [];

}

async function getData(){
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    })
    const url = 'https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter=' + lastUpdatedAfter
    console.log(url)
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y',
        },
        agent: httpsAgent
    })
    console.log(response)
    const data = await response.json()
    // get the latest date to pass back to api
    lastUpdatedAfter = data.map(function(e) { return e.dateLastUpdated; }).sort().reverse()[0]
    return data
}


router.get('/apirouter', async (req, res) => {
    let data = await getData()
    console.log(data.length)
    res.send(data)
})

module.exports = router