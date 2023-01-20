

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
  console.log(driverdata)
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
  if (type == "bar"){
    cfg.type = type
    cfg.data.datasets.data = driverdata
    cfg.options.parsing.xAxisKey = keys[0]
    cfg.options.parsing.yAxisKey = keys[1]
    for (let i of driverdata) { cfg.data.labels.push(i.driver); }
    console.log(cfg)
  }
}

async function drawCharts(){
  let cfg = makeBarChartConfig("bar", ["driver", "driverScore"], await getDriverStats())
  let driverScoreBar = new Chart(document.getElementById("driverScore"), cfg)
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

const menu_btn = document.getElementById("collapse_button");
const menu_svg = document.getElementById("menu_svg");
const arrow_svg = document.getElementById("arrow_svg");
const menu = document.getElementById("menu-container");

collapse_button.addEventListener("click", () => {
  if (window.getComputedStyle(menu, null).display == "block"){
    menu.style.display = "none";
    menu_btn.style.left = "2rem"
    arrow_svg.style.display = "none";
    menu_svg.style.display = "block";

  } else {
    menu.style.display = "block";
    menu_btn.style.left = "25rem";
    arrow_svg.style.display = "inline";
    menu_svg.style.display = "none";
  }
})


document.getElementById("induvidualDriverStats").addEventListener("click", drawCharts)