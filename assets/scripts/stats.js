const cfglol = {
  "type": "bar",
  "data": {
      "datasets": [
          {
              "data": [
                  {
                      "driver": "Heather White",
                      "distance": 76.63688329755678,
                      "harshAccelerationCount": 344,
                      "harshBrakingCount": 317,
                      "harshCorneringCount": 708,
                      "speedingCount": 79.2,
                      "idlingCount": 0,
                      "totalFuelUsed": 8.2000732421875,
                      "driverScore": 0
                  },
                  {
                      "driver": "Chris Brock",
                      "distance": 116.30165643244982,
                      "harshAccelerationCount": 256,
                      "harshBrakingCount": 237,
                      "harshCorneringCount": 468,
                      "speedingCount": 56,
                      "idlingCount": 0,
                      "totalFuelUsed": 10.5999755859375,
                      "driverScore": 53.72522200405938
                  },
                  {
                      "driver": "Alexander Moore",
                      "distance": 106.03132224688306,
                      "harshAccelerationCount": 188,
                      "harshBrakingCount": 173,
                      "harshCorneringCount": 341,
                      "speedingCount": 48,
                      "idlingCount": 0,
                      "totalFuelUsed": 9.800048828125,
                      "driverScore": 62.568573577662825
                  },
                  {
                      "driver": "Timothy Corlett",
                      "distance": 7.358238518238068,
                      "harshAccelerationCount": 8,
                      "harshBrakingCount": 5,
                      "harshCorneringCount": 24,
                      "speedingCount": 4,
                      "idlingCount": 0,
                      "totalFuelUsed": 1.10009765625,
                      "driverScore": 70.51376744226462
                  },
                  {
                      "driver": "Richard Burchell",
                      "distance": 57.033880554372445,
                      "harshAccelerationCount": 64,
                      "harshBrakingCount": 51,
                      "harshCorneringCount": 126,
                      "speedingCount": 9.600000000000001,
                      "idlingCount": 0,
                      "totalFuelUsed": 6.699951171875,
                      "driverScore": 76.74815409597517
                  },
                  {
                      "driver": "Keith Powrie",
                      "distance": 70.3362526036799,
                      "harshAccelerationCount": 37,
                      "harshBrakingCount": 48,
                      "harshCorneringCount": 152,
                      "speedingCount": 10.4,
                      "idlingCount": 0,
                      "totalFuelUsed": 8,
                      "driverScore": 81.38642642103878
                  },
                  {
                      "driver": "Steven Sing-Bhaker",
                      "distance": 55.36256415233947,
                      "harshAccelerationCount": 19,
                      "harshBrakingCount": 35,
                      "harshCorneringCount": 74,
                      "speedingCount": 12.8,
                      "idlingCount": 0,
                      "totalFuelUsed": 7.9000244140625,
                      "driverScore": 86.54152818084434
                  },
                  {
                      "driver": "Corey Schofield",
                      "distance": 8.698567539453506,
                      "harshAccelerationCount": 6,
                      "harshBrakingCount": 6,
                      "harshCorneringCount": 10,
                      "speedingCount": 0,
                      "idlingCount": 0,
                      "totalFuelUsed": 1.5999755859375,
                      "driverScore": 86.61605226052704
                  },
                  {
                      "driver": "John Clarke Wayne             ",
                      "distance": 111.0197546184063,
                      "harshAccelerationCount": 39,
                      "harshBrakingCount": 60,
                      "harshCorneringCount": 138,
                      "speedingCount": 11.200000000000001,
                      "idlingCount": 1,
                      "totalFuelUsed": 10.199951171875,
                      "driverScore": 88.1216240625926
                  },
                  {
                      "driver": "Raymond Baccino",
                      "distance": 2.794262170791626,
                      "harshAccelerationCount": 0,
                      "harshBrakingCount": 0,
                      "harshCorneringCount": 6,
                      "speedingCount": 0,
                      "idlingCount": 0,
                      "totalFuelUsed": 0.4000244140625,
                      "driverScore": 88.63698996140246
                  }
              ]
          }
      ],
      "labels": [
          "Heather White",
          "Chris Brock",
          "Alexander Moore",
          "Timothy Corlett",
          "Richard Burchell",
          "Keith Powrie",
          "Steven Sing-Bhaker",
          "Corey Schofield",
          "John Clarke Wayne",
          "Raymond Baccino"
      ]
  },
  "options": {
      "parsing": {
          "xAxisKey": "driver",
          "yAxisKey": "driverScore"
      }
  }
}

function getCheckedRadio(nameOfGroup){
  const group = document.getElementsByName(nameOfGroup)
  for (let i=0; i < group.length; i++){
    if (group[i].checked){ console.log(group[i].id); return group[i].id; }
  }
}

async function requestPerformanceData(query=''){
  let request = await fetch('/stats/data?driver=' + query, { 
    method: 'GET',  
    rejectUnauthorized: false,
  })
  return await request.json()
}

function customSort(data, key2SortOn){
  function customCompare(a, b){
    if (a[key2SortOn] < b[key2SortOn]){
      return -1;
    } else if (a[key2SortOn] > b[key2SortOn]){
      return 1;
    } else if (a[key2SortOn] == b[key2SortOn]){
      return 0;
    }
  }
  return data.sort(customCompare)
}

async function getDriverStats(){ return await requestPerformanceData(getCheckedRadio("selectedDriver")); }

async function getFleetStats(){ return await requestPerformanceData(); }

// keys is an array like [xkey, ykey]
function makeBarChartConfig(type, keys, driverdata){
  if (driverdata.length){ driverdata = customSort(driverdata, "driverScore"); }
  const cfg = {
    type: null,
    data: {
      datasets: [{
        data: [],
      }],
      labels: []
    },
    options: {
      parsing: {}
    }
  }
  cfg.type = type
  cfg.data.datasets[0].data = driverdata.slice(0, 10)
  cfg.options.parsing.xAxisKey = keys[0];
  cfg.options.parsing.yAxisKey = keys[1]
  for (let i of driverdata) { cfg.data.labels.push(i.driver.trim()); if(driverdata.indexOf(i) == 9){ break; } }
  console.log(cfg)
}

async function drawCharts(){
  let cfg = makeBarChartConfig("bar", ['driver', 'driverScore'], await getDriverStats())
  let driverScoreBar = new Chart(document.getElementById("driverScore"), cfglol) 
}

/* 

functions that run on script load below 

*/

const input = document.getElementById('searchName');
input.onkeyup = function () {
  let filter = input.value.toUpperCase();
  const list = document.getElementsByClassName('driver-li');
  for (let i=0; i < list.length; i++) {
    let name = list[i].textContent;
    if (name.toUpperCase().trim().indexOf(filter) == 0){
      list[i].style.display = 'list-item';
    } else {
      list[i].style.display = 'none';
    }
  }
}


function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "inline-block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


document.getElementById("induvidualDriverStats").addEventListener("click", drawCharts)