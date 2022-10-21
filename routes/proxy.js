const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const https = require('https')

/*

pass the latest, most recent datelastUpdated value to only get the vehicles which have updated since then.

need a cors proxy server for development?

"https://api.easytrack.ltd/api/Sixfold/Vehicles?UpdatedAfter"

"LsVntsEp6XBab4CjF5ZAHLhL7YuWxBtdK2fqNwOIdx33H5tp4S0DNxA5sR6oQWFKPcIPH7KFzGY+/buopufYBXL+K+4mQUZKQK04/kgH3+c+oV/wXMOdodvwRIDBPk9B" - FW Fleet
"wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y" - GT Traffic

*/

let lastUpdatedAfter = ''


async function getData(){
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    })
    const response = await fetch('https://api.easytrack.ltd/api/Sixfold/Vehicles?' + lastUpdatedAfter, {
        method: 'GET',
        headers: {
            'Authorization': 'bearer wZA9rWWqD+wmCqABoEyVRKSUz9tvHycStxEOBh71qNOqRFBRFqstxMrC4wiqdkxQ83lmKxQW2SJ9GjqtG6Z4S7gfkp+3l7PFRdkjhIwzu18jRcmU1Lkcd8X/vvFlqb9Y',
        },
        agent: httpsAgent
    })
    const data = await response.json()
    // get the latest date to pass back to api
    const latestDate = new Date(
        Math.max(
          ...data.map(element => {
            return new Date(element.dateLastUpdated);
          }),
        ),
      );
      lastUpdatedAfter = latestDate
    return data
}


router.get('/apirouter', async (req, res) => {
    let data = await getData()
    res.send(data)
})

module.exports = router