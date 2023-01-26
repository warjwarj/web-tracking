// const pl = document.getElementById("pl").dataset.val

// async function requestPerformanceData(queryParams=''){
//     function customSort(data, key2SortOn){
//         function customCompare(a, b){
//           if (a[key2SortOn] < b[key2SortOn]){
//             return -1;
//           } else if (a[key2SortOn] > b[key2SortOn]){
//             return 1;
//           } else if (a[key2SortOn] == b[key2SortOn]){
//             return 0;
//           }
//         }
//         return data.sort(customCompare)
//     }
//     function formatParams(params){
//       if (!params){ return ''; }
//       let paramstring = ''
//       for (let [key, val] of Object.entries(params)){ 
//         key = '?' + key
//         val = '=' + val
//         paramstring += key + val;
//       }
//       return paramstring
//     }
//     let request = await fetch('/stats/data' + formatParams(queryParams), {
//       method: 'GET',
//       rejectUnauthorized: false,
//       credentials: "include"
//     })
//     let driverdata = await request.json()
//     if (driverdata.length){ driverdata = customSort(driverdata, "driverScore"); }
//     return driverdata
// }

// function minMaxScore(fleetdata){
//     function getMinMax(arr, key) {
//         const sortedArr = arr.sort((a, b) => b[key] - a[key]);
//         const maxValues = sortedArr.slice(0, 3);
//         const minValues = sortedArr.slice(-3).reverse();
//         return { maxValues, minValues };
//     }
//     min = getMinMax(fleetdata)
//     return (
//         <div>
//             <div className="main-block">
//                 <h5>Highest three scores in fleet:</h5>
//                 { max3.map(score => {
//                     return <strong key={score}>{score}</strong>
//                 }) }
//             </div>
//             <div className="main-block">
//             <h5>Highest three scores in fleet:</h5>
//             { min3.map(score => {
//                 return <strong key={score}>{score}</strong>
//             }) }
//             </div>
//         </div>
//     )
// }

// async function mainStats(scope){
//     const homedata = await requestPerformanceData({ 'homedata': true,  scope })
//     if (scope == 'driver'){
//         return <p>{scope.driver}</p>
//     }
//     else if (scope == 'fleet'){
//         return (
//             minMaxScore()
//         )
//     }
// }


// const stats_root = ReactDOM.createRoot(document.getElementById("stats_root"))

// if (pl == 1){
//     stats_root.render(mainStats({ fleet: 'General Traffic' }));
// }
// else if (pl > 1){
//     stats_root.render(mainStats({ driver: 'Stephen Dublin' }))
// }
/* <AsyncText url="/stats/data" parent='div' tag='p' content='Loading'/>, document.getElementById("stats_root") */

const charts = [];

function formatConfigDriver(chartType, driverData, keys){
    const cfg = getChartConfig();
    const dataobj = getChartData();
    const possiblekeys = Object.keys(driverData[0]).filter(val => val != 'driver' && val != 'totalFuelUsed' && val != 'driverScore' && val != 'distance')
    // charts that have multiple 'axis', multiple data points, radar, polar, etc.
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

async function drawCharts(driver, fleet){
    if (driver){
      charts.forEach(chart => chart.destroy()) // clear charts on page
      const data = []; data.push(driver) // get and add driver object/s to an array
      const cfg = formatConfigDriver('polarArea', data, 'all'); // make config with driver/s data
      let driverSummary = new Chart(document.getElementById("driver-events-summary"), cfg)
      charts.push(driverSummary)
    }
}