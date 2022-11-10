/*




*/


const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = []
let highlightedRow;
let first = true

function handleMarker(obj){
  // if marker not there create it
  if (!(obj.id in markers)){
    markers[obj.id] = L.marker([+(obj.latitude), +(obj.longitude)], {
      vName: obj.registration,
      vData: obj,
      alt: `this marker represents the vehicle ${obj.registration}, and is being driven by ${obj.driverName}`
    })
    .bindPopup(`Reg: ${obj.registration}`)
    .addTo(map)
  } else {
    // if marker is there update its position
    markers[obj.id].setLatLng([+(obj.latitude), +(obj.longitude)])
  }
}


function addFocusEvent(element){
  element.addEventListener('click', () => {
    try {
    highlightedRow.classList.remove('highlighted');
  } catch {
    console.log("no row is highlighted")
  } finally {
    marker = markers[element.id];
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
  newdata.forEach(obj => {
    handleMarker(obj)
  });
  populateMenu(newdata)
  console.log("returned " + newdata.length + " vehicles")
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



