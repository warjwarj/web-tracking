/*




*/


const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
map.zoomControl.remove();

L.control.zoom({
  position: 'bottomright'
}).addTo(map);

let markers = {}
let highlightedRow;
let first = true
let fleetIds = []

const greenIcon = new L.Icon({
  iconUrl: '../map/images/marker-icon-green.png',
  shadowUrl: '../map/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const yellowIcon = new L.Icon({
  iconUrl: '../map/images/marker-icon-yellow.png',
  shadowUrl: '../map/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const greyIcon = new L.Icon({
  iconUrl: '../map/images/marker-icon-grey.png',
  shadowUrl: '../map/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: '../map/images/marker-icon-blue.png',
  shadowUrl: '../map/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

async function handleMarker(newdata){
  console.log("markers on page = ", Object.keys(markers).length, " vehicles updated = ", newdata.length);
  let idsThatHaveUpdated = []
  let idsThatHaventUpdated = []
  function decideColour(obj){
    if (obj.vehicleStatus == 2 || obj.vehicleStatus == 3 || obj.vehicleStatus == 4 || obj.vehicleStatus == 8){
      return greenIcon
    }
    else if(obj.vehicleStatus == 6 || obj.vehicleStatus == 7){
      return yellowIcon
    }
    else if (obj.vehicleStatus == 1 || obj.vehicleStatus == 5 || obj.vehicleStatus == 9) {
      return blueIcon
    }
    else {
      return greyIcon
    }
  }
  newdata.forEach(obj => {
    // IF VEHICLE IS NOT REPRESENTED ON PAGE (FIRST = TRUE)
    if (!(fleetIds.includes(obj.id))) {
      fleetIds.push(obj.id)
      markers[obj.id] = L.marker([+(obj.latitude), +(obj.longitude)], {
        vName: obj.registration,
        vStatus: obj.vehicleStatus,
        alt: `this marker represents the vehicle ${obj.registration}, and is being driven by ${obj.driverName}`,
        icon: decideColour(obj)
      })
      .bindPopup(`Reg: ${obj.registration}, Driver: ${obj.driverName}`)
      .addTo(map)
      markers[obj.id].setOpacity(1.0)
      idsThatHaveUpdated.push(obj.id)
    }
    // IF VEHICLE IS REPRESENTED ON PAGE (FIRST = FALSE)
    else {
      idsThatHaveUpdated.push(obj.id)
      markers[obj.id].setLatLng([+(obj.latitude), +(obj.longitude)])
      ._icon = decideColour(obj)
    }
    idsThatHaventUpdated = fleetIds.filter(id => {
      return !idsThatHaveUpdated.includes(id)
    })
  })
  // DO STUFF TO MARKERS THAT HAVE NOT UPDATED
  idsThatHaventUpdated.forEach(id => {
    // could be useful at some point
  });
}

function addFocusEvent(element){
  element.addEventListener('click', () => {
    try {
    highlightedRow.classList.remove('highlighted');
  } catch {
  } finally {
    let marker = markers[element.id];
    console.log([+(marker._latlng.lat), +(marker._latlng.lng)])
    highlightedRow = element;
    element.classList.add('highlighted');
    map.setView([+(marker._latlng.lat), +(marker._latlng.lng)],17);
    marker.openPopup();
  }
  })
}

function populateMenu(vArr){
  const menu = document.getElementById("menu-table-body")
  function getIds(){
    const menu_children = menu.childNodes;
    let temp = [];
    for (let i=0; i < menu_children.length; i++){
      temp.push(menu_children[i].id)
    }
    return temp;
  }
  function handleNullVal(val){
    if (val == null){
      return ' '
    } else {
      return val
    }
  }
  const createElement = function (type, attributes, ...children){
      const el = document.createElement(type)
      for (key in attributes) {
          el.setAttribute(key, attributes[key])
      }
      children.forEach(child => {
          if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child))
          } else {
            el.appendChild(child)
          }
      })
      return el
  }
  const vCell = function(cellData, attributes){
      const el = document.createElement('td')
      for(key in attributes){
        el.setAttribute(key, attributes[key])
      }
      el.appendChild(document.createTextNode(cellData))
      return el
  }
  function vRow(vObject){
    let row = createElement(
      'tr',
      { class: 'middle-row-item' },
      vCell(vObject.registration, { class: 'inner-row-item' }),
      vCell(handleNullVal(vObject.driverName), { class: 'inner-row-item' })
    )
    row.id = vObject.id
    return row
  }

  function markerHasElement(nodeList, id){
    for (let i=0; i < nodeList.length; i++){
      if (nodeList[i].id == id){
        return id
      }
    }
  }

  vArr.forEach(obj => {
    const menu_children = menu.childNodes;
    if (markerHasElement(menu_children, obj.id)){
      return
    }
    let el = vRow(obj)
    addFocusEvent(el)
    menu.appendChild(el)
  });
}



// handle the data returned by the api call
function refresh(newdata){
  handleMarker(newdata)
  populateMenu(newdata)
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
  while (true){
    callApi(first).then(
      data => refresh(data)
    )
    first = false
    await sleep(60000)
  }
}

timerFunc()



