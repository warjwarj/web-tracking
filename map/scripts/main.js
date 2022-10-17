const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = []
let vlist = []


// find if an object is already in array - only looking at the reg so if reg matches retuirns true
// if this return true then you want to update because the value has changed
function objInArr(obj, arr){
  arr.forEach(element => {
    if (element.registration === obj.registration){
      return true
    }
  });
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

// update the global ist of vehicle data
function updatevlist(newdata, currentdata){
  newdata.forEach(element => {
    if (objInArr(element, currentdata)){
      currentdata[element.registration] = element
    } else {
      currentdata.push(element)
    }
  });
}

// take the values from global vlist and use them to create markers, put in markers array
function updatemarkers(currentdata, markerlist){
  function drawMarker(v){
    m = L.marker([v.latitude, v.longitude])
    m.bindPopup(`Reg: ${v.registration}, Heading: ${v.heading}, Speed: ${v.speed}, Lat: ${v.latitude}, Long: ${v.longitude}`)
    return m
  }
  currentdata.forEach(v => {
    markerlist.length = 0
    markerlist.push(drawMarker(v).addTo(map))
  });
}

// handle the data returned by the api call
// assume data is an array of objects
function refresh(newdata, currentdata){
  updatevlist(newdata, currentdata)
  updatemarkers(currentdata, markers)
}


// timer for calling callApi
async function timerFunc(timeinseconds){
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  while (true){
    callApi().then(
      data => refresh(data, vlist)
    )
    console.log("refreshed")
    await sleep(60000)
  }
}

timerFunc()



