const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markerlist = []
let vehiclelist = []

// pass the vehicle obj to the functions
// each function in this class is designed to be used on one singular vehicle/representation of.
class Vehicle {
 static drawMarker(obj){
    m = L.marker([obj.latitude, obj.longitude])
    m.bindPopup(`Reg: ${obj.registration}, Heading: ${obj.heading}, Speed: ${obj.speed}, Lat: ${obj.latitude}, Long: ${obj.longitude}`)
    return m
  }
}

class Fleet {
  static updatemarkers(vlist, mlist){

  }
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


// handle the data returned by the api call
// assume data is an array of objects
function refresh(newdata, currentdata, markerlist){
  updatevlist(newdata, currentdata)
  updatemarkers(currentdata, markerlist)
}


// timer for calling callApi
async function timerFunc(timeinseconds){
  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  while (true){
    callApi().then(
      data => refresh(data, vehiclelist)
    )
    console.log("refreshed")
    await sleep(60000)
  }
}

timerFunc()



