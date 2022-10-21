
const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

markers = new L.FeatureGroup

// find if an object is already in array - only looking at the reg so if reg matches retuirns true
// if this return true then you want to update because the value has changed
function vehicleInList(obj, arr){
  arr.forEach(element => {
    if (element.registration === obj.registration){
      return element
    }
  });
}

// pass the vehicle obj to the functions
// each function in this class is designed to be used on one singular vehicle/representation of.

function drawMarker(obj){
  let m = L.marker([obj.latitude, obj.longitude])
  m.bindPopup(`Reg: ${obj.registration}`)
  return m
}



async function callApi(){
    let request = await fetch('http://127.0.0.1:3000/proxy/apirouter', { 
    method: 'GET',  
    rejectUnauthorized: false,
  })
  let data = await request.json()
  console.log(data)
  return data
}



// handle the data returned by the api call
// assume data is an array of objects
async function refresh(newdata){
  try {
    markers.clearLayers()
  } finally {
    newdata.forEach(obj => {
      drawMarker(obj).addTo(markers)
    });
    markers.addTo(map)
  }
}

async function callApi(){
  let request = await fetch('http://127.0.0.1:3000/proxy/apirouter', { 
  method: 'GET',  
  rejectUnauthorized: false,
})
let data = await request.json()
console.log(data)
return data
}

// timer for calling callApi
async function timerFunc(){
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  while (true){
    callApi().then(
      data => refresh(data)
    )
    console.log("refreshed")
    await sleep(60000)
  }
}

timerFunc()



