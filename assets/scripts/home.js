function getChartConfig (){ return {  type: null, data: {}, options: {} } }

function getChartData (){ return { datasets: [], labels: [] } }

function getChartDataset (){ return { label: '', fill: true, data: [] } }


const charts = [];
const userdata = document.getElementById("userdata")
const scopeData = JSON.parse(userdata.dataset.scopedata);
const scope = userdata.dataset.scope;
const pl = userdata.dataset.pl;


function formatConfig(chartType, scopeData, keys, label){
  const cfg = getChartConfig();
  const dataobj = getChartData()
  // charts that have multiple 'axis', multiple data points, radar, polar, etc.
  if (keys == 'all'){
    const possiblekeys = Object.keys(scopeData[0]).filter(val => val != 'driver' && val != 'totalFuelUsed' && val != 'driverScore' && val != 'distance')
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
      return cfg
    }
  } else {
    const xkey = keys[0]
    const ykey = keys[1]
    const datasets = [];
    for (let i of scopeData){
      // NEED TO MAKE SURE DATA IS SORTED
    }
  }
}

async function drawCharts(driver, fleet){
  if (driver){
    charts.forEach(chart => chart.destroy()) // clear charts on page
    const data = []; data.push(driver) // get and add driver object/s to an array
    const cfg = formatConfig('polarArea', data, 'all'); // make config with driver/s data
    let driverSummary = new Chart(document.getElementById("driver-events-summary"), cfg)
    charts.push(driverSummary)
  }
  else if (fleet){
    charts.forEach(chart => chart.destroy()) // clear charts on page
    const cfg = formatConfig('bar', fleet, ['driver', 'driverScore']); // make config with driver/s data
    let fleet = new Chart(document.getElementById("fleet-score-summary"), cfg)
    charts.push(fleetSummary)
  }
}

if (scope == 'driver'){
  drawCharts(scopeData, false)
}
else if (scope == 'fleet'){
  drawCharts(false, scopeData)
}