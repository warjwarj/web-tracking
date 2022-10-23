/*



*/


const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = []


function handleMarker(obj){
  // if marker not there create it
  if (!(obj.id in markers)){
    markers[obj.id] = L.marker([+(obj.latitude), +(obj.longitude)], {
      vName: obj.registration,
      vData: obj
    })
    .bindPopup(`Reg: ${obj.registration}`)
    .addTo(map)
  } else {
    // if marker is there update its position
    markers[obj.id].setLatLng([+(obj.latitude), +(obj.longitude)])
  }
}




// handle the data returned by the api call
async function refresh(newdata){
  newdata.forEach(obj => {
    handleMarker(obj)
  });
}

async function callApi(firstLoad){
  let request = await fetch('http://127.0.0.1:3000/proxy/apirouter?firstLoad=' + firstLoad, { 
  method: 'GET',  
  rejectUnauthorized: false,
})
let data = await request.json()
return data
}

// timer for calling callApi
async function timerFunc(){
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  let first = true
  while (true){
    callApi(first).then(
      data => refresh(data)
    )
    console.log("refreshed")
    first = false
    await sleep(60000)
  }
}

// timerFunc()



