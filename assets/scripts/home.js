function getChartConfig (){ return {  type: null, data: {}, options: {} } }

function getChartData (){ return { datasets: [], labels: [] } }

function getChartDataset (){ return { label: '', fill: true, data: [] } }


const charts = [];
const userdata = document.getElementById("userdata")
const scopeData = JSON.parse(userdata.dataset.scopedata);
const scope = userdata.dataset.scope;
const pl = userdata.dataset.pl;
const meanMpg = userdata.dataset.avgmpg
const meanScore = userdata.dataset.avgscore


function formatConfig(chartType, scopeData, keys){
  const cfg = getChartConfig();
  const dataobj = getChartData()
  // charts that have multiple 'axis', multiple data points, radar, polar, etc.
  if (keys == 'all'){
    const possiblekeys = Object.keys(scopeData[0]).filter(val => val != 'driver' && val != 'totalFuelUsed' && val != 'driverScore' && val != 'distance' && val != 'mpg')
    const datasets = [];
    for (let i in scopeData){ // each driver obj - create a dataset for each
      const dataset = getChartDataset()
      dataset.label = scopeData[i].driver
      for (let j of possiblekeys){ // loop through keys
        dataset.data.push(scopeData[i][j])
      }
      datasets.push(dataset);
      dataobj.datasets = datasets;
      dataobj.labels = possiblekeys;
      cfg.type = chartType;
      cfg.data = dataobj;
    }
  } else {
    const xkey = keys[0]
    const ykey = keys[1]
    const datasets = [{ data: [] }];
    for (let i of scopeData){
      let set = {}
      set.x = i[xkey];
      set.y = i[ykey];
      datasets[0].data.push(set)
    }
    dataobj.datasets = datasets;
    cfg.data = dataobj
    cfg.type = chartType
    delete cfg.data.labels;
    cfg.options.parsing = 'false';

  }
  cfg.options.maintainAspectRatio = false
  return cfg
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

let phone = window.matchMedia("(max-width: 48em)")

async function drawCharts(driver, fleet){
  if (driver){
    charts.forEach(chart => chart.destroy()) // clear charts on page
    const data = []; data.push(driver) // get and add driver object/s to an array
    const cfg = formatConfig('polarArea', data, 'all'); // make config with driver/s data
    let driverSummary = new Chart(document.getElementById("driver-events-summary"), cfg)
    charts.push(driverSummary)
  }
  else if (fleet){
    if (!phone.matches){
      charts.forEach(chart => chart.destroy()) // clear charts on page
      let score_canvas = document.getElementById("fleet-score-summary");
      let mpg_canvas = document.getElementById("fleet-mpg-summary");
      const score_cfg = formatConfig('bar', customSort(fleet, 'driverScore'), ['driver', 'driverScore']); // make config with driver/s data
      const mpg_cfg = formatConfig('bar', customSort(fleet, 'mpg'), ['driver', 'mpg'])
      let scoreSummary = new Chart(score_canvas, score_cfg)
      let mpgSummary = new Chart(mpg_canvas, mpg_cfg)
      charts.push(scoreSummary)
      charts.push(mpgSummary)
    } else {
      document.getElementById("score-graph").style.display = 'none';
      document.getElementById("mpg-graph").style.display = 'none';
    }
  }
}

if (scope == 'driver'){
  drawCharts(scopeData, false)
}
else if (scope == 'fleet'){
  drawCharts(false, scopeData)
}