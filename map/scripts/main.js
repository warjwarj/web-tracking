/*



*/

const map = L.map('map').setView([51.505, -0.09], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = []
let highlightedRow;


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

function addFocusEvent(element, v){
  element.addEventListener('click', () => {
    try {
      highlightedRow.classList.remove('highlighted')
    } finally {
      element.classList.add('highlighted')
      markers[v.id].openPopup()
      map.setView([+(v.latitude), +(v.longitude)], 17)
      highlightedRow = element;
    }
  })
}


function populateMenu(vArr){
  const menu = document.getElementById("menu-table-body")

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
    return row
  }
  vArr.forEach(obj => {
    let el = vRow(obj)
    addFocusEvent(el, obj)
    menu.appendChild(el)
  });
}



// handle the data returned by the api call
async function refresh(newdata){
  populateMenu(newdata)
  newdata.forEach(obj => {
    handleMarker(obj)
  });
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
  let first = true
  while (true){
    callApi(first).then(
      data => refresh(data)
    )
    first = false
    await sleep(60000)
  }
}

timerFunc()



