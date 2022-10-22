
const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



L.FeatureGroup.include({

  // treu if vehicle is marked on the map
  vehicleMarked: function(reg){
    let x = false
    this.eachLayer(function(layer){
      if (layer.options.vName === reg){
        x = true;
    }})
    return x
  },

  // custom getLayer searhing on vehicle name
  getVehicle: function(vName){
    this.eachLayer(function(layer){
      if (layer.options.vName === vName){
        return layer
      }
    })
  }

})

markers = new L.FeatureGroup;

function handleMarker(obj){
  if (!markers.vehicleMarked(obj.registration)){
    L.marker([obj.latitude, obj.longitude], {
      vName: obj.registration,
      vData: obj
    })
    .bindPopup(`Reg: ${obj.registration}`)
    .addTo(markers)
    console.log("new")
  } else {
    markers.getVehicle(obj.registration).setLatLng([obj.latitude, obj.longitude])
    console.log("updated")
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



// handle the data returned by the api call
// assume data is an array of objects
async function refresh(newdata){
  try {
    markers.clearLayers()
  } finally {
    newdata.forEach(obj => {
      handleMarker(obj)
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



