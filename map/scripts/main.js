const initialise = require("../../passport-config");

const map = L.map('map').setView([51.505, -0.09], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = []
let currentdata = []
  
function updateMarkers(data){
  data.forEach(v => {
    const m = L.marker([v.latitude, v.longitude])
    m.bindPopup(`Reg: ${v.registration}, Heading: ${v.heading}, Speed: ${v.speed}, Lat: ${v.latitude}, Long: ${v.longitude}`)
    markers.push(m)
  });
}

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

function updateVList(newdata, currentdata){
  newdata.forEach(element => {
    if (objInArr(element, currentdata)){
      currentdata[element.registration] = element
    } else {
      currentdata.push(element)
    }
  });
}


function drawMarkers(){

}

// handle the data returned by the api call
// assume data is an array of objects
function initialise(newd, currentd){


  updateVList(newd, currentd)
}


// timer for calling callApi
async function timerFunc(timeinseconds){
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  while (true){
    callApi().then(
      data => updateMarkers(data)
    )
    console.log("refreshed")
    await sleep(timeinseconds * 1000)
  }
}

// timerFunc(60)



