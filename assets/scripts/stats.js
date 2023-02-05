const charts = [];

function getChartConfig (){ return {  type: null, data: {}, options: {} } }

function getChartData (){ return { datasets: [], labels: [] } }

function getChartDataset (){ return { label: '', fill: true, data: [] } }

function getCheckedRadio(nameOfGroup){
  const group = document.getElementsByName(nameOfGroup)
  for (let i=0; i < group.length; i++){
    if (group[i].checked){ console.log(group[i].id); return group[i].id; }
  }
  const random = Math.floor(Math.random() * group.length)
  return group[random].id; // if none checkedn return a random one
}

async function requestPerformanceData(queryParams=''){
  function formatParams(params){
    if (!params){ return ''; }
    let paramstring = ''
    for (let [key, val] of Object.entries(params)){ 
      key = '?' + key
      val = '=' + val
      paramstring += key + val;
    }
    return paramstring
  }
  let request = await fetch('/stats/data' + formatParams(queryParams), {
    method: 'GET',
    rejectUnauthorized: false,
  })
  let driverdata = await request.json()
  console.log(driverdata)
  if (driverdata.length){ driverdata = customSort(driverdata, "driverScore"); }
  return driverdata
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

async function getCheckedDriverStats(driver){ return await requestPerformanceData(driver); }

async function getFleetStats(){ return await requestPerformanceData(); }

/*

The purpose of this functnio is to return the 'cfg' object

easier to control the keys and format myself rather than try and dynamically define parsing options (probably)

keys can be all (for radar/polar chart types), or an array where [0] is x axis and [1] is y axis (for bar/line charts)
pass driverdata as an array even if length is one

*/

function formatConfigDriver(chartType, driverData, keys){
  const cfg = getChartConfig();
  const dataobj = getChartData();
  const possiblekeys = Object.keys(driverData[0]).filter(val => val != 'driver' && val != 'totalFuelUsed' && val != 'driverScore' && val != 'distance' && val != 'mpg')
  // charts that have multiple 'axis', multiple data points, radar, polar, etc. Practically also use to determine if need data for whole fleet or no
  if (keys == 'all'){
    const datasets = []
    for (let i in driverData){ // each driver obj - create a dataset for each
      const dataset = getChartDataset()
      dataset.label = driverData[i].driver
      for (let j of possiblekeys){ // loop through keys
        dataset.data.push(driverData[i][j])
      }
      datasets.push(dataset);
      dataobj.datasets = datasets;
      dataobj.labels = possiblekeys;
      cfg.type = chartType;
      cfg.data = dataobj;
      return cfg
    }
  } else {

    const xkey = keys[0]
    const ykey = keys[1]
  }
}

function formatDataFleet(){
  const cfg = getChartConfig();
  const dataobj = getChartData();
}

async function drawCharts(driver, fleet){
  if (driver){
    charts.forEach(chart => chart.destroy()) // clear charts on page
    const data = []; data.push(driver) // get and add driver object/s to an array
    const cfg = formatConfigDriver('polarArea', data, 'all'); // make config with driver/s data
    let driverSummary = new Chart(document.getElementById("driverSummary"), cfg)
    charts.push(driverSummary)
  }
  else if (fleet){
    charts.forEach(chart => chart.destroy())
    const data = []; data.push
  }
}

const fleetStatsContainer = document.getElementById("fleet-stats-container")
const driverStatsContainer = document.getElementById('driver-stats-container')

async function updateVisualsDriver(){
  if (driverStatsContainer.style.display != 'block'){ 
    driverStatsContainer.style.display = 'block'; 
    fleetStatsContainer.style.display = 'none';
  }
  const driver = getCheckedRadio('selectedDriver')
  const driverStats = await requestPerformanceData({ 'driver': driver })
  document.getElementById('driver-name').innerHTML = driverStats.driver
  document.getElementById('driver-score').innerHTML = "Driver Score: " + driverStats.driverScore;
  document.getElementById('driver-mpg').innerHTML = "Driver Avg MPG: " + driverStats.mpg;
  drawCharts(driverStats, false)

}

async function updateVisualsFleet(){
  if (fleetStatsContainer.style.display != 'block'){ 
    fleetStatsContainer.style.display = 'block' 
    driverStatsContainer.style.display = 'none';
  }
  const fleet = getCheckedRadio('selectedFleet')
  const fleetStats = await requestPerformanceData({'fleet': fleet})

}

/* 

functions that run on script load below 

*/
function sortFunc(searchbarid){
  const input = document.getElementById(searchbarid);
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
}
sortFunc('searchName')
sortFunc('searchFleet')

function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
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

// const menu_btn = document.getElementById("collapse_button");
// const menu_svg = document.getElementById("menu_svg");
// const arrow_svg = document.getElementById("arrow_svg");
// const menu = document.getElementById("menu-wrapper");

// collapse_button.addEventListener("click", () => {
//   if (window.getComputedStyle(menu, null).display == "block"){
//     menu.style.display = "none";
//     menu_btn.style.left = "2rem"
//     arrow_svg.style.display = "none";
//     menu_svg.style.display = "block";

//   } else {
//     menu.style.display = "block";
//     menu_btn.style.left = "20.6rem";
//     arrow_svg.style.display = "inline";
//     menu_svg.style.display = "none";
//   }
// })

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

document.getElementById("induvidualDriverStats").addEventListener("click", updateVisualsDriver)
document.getElementById("fleetStats").addEventListener("click", updateVisualsFleet)