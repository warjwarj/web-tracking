const ctx = document.getElementById('myChart');


async function requestData(){
  let request = await fetch('/stats/data', { 
    method: 'GET',  
    rejectUnauthorized: false,
  })
  return await request.json()
}



// possible paramaters - type of chart, parent div
async function makeChart(){

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

  async function getAndFormatData(){

    let driverData = await requestData()

    // easier to add values to a template
    let data = {
      datasets: [{
        label: "Driver Score",
        borderWidth: 1,
        data: [],
      }],
      labels: []
    };

    // sort the data so it is in order. Easier to do when driverName and driverScore are both in same object.
    customSort(driverData, driverScore)

    let y_axis_data = driverData.map(obj => obj.driverScore)
    let x_axis_data = driverData.map(obj => obj.driverName)

    data.datasets[0].data = y_axis_data;
    data.labels = x_axis_data
    
    return data;
  }

  let chartData = await getAndFormatData();

  console.log(chartData)

  return new Chart(
    document.getElementById('myChart'), {
      type: 'bar',
      data: chartData,
  }).update()

}

makeChart()


