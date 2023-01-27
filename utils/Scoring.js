const data = require("./fillerdata");

class Scoring {

    /*

        extrapolate the range of driverScores into 1 - 100

        for example: 

        min is 0.0238
        max is 12.589
        range is 12.5652

        driverX's pre fleet-weighted score is 2.344

        2.344 as a percentage of 12.5652 is 18.6

        so drivers final score is 18.6, ill invert that (100 - 18.6) so its 81.4 BOOM

    */

    // SORT
    static customSort(data, key2SortOn){
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

    // CALCULATE THE SCORE OF THE WHOLE FLEET
    static calculateScoreFullFleet(data, weightConfig){
        let vals2Consider = Object.keys(weightConfig)
        let max = 0; // min value found in dataset
        let min = 100; // max value found in dataset
        for (let i=0; i < data.length; i++){
            let totalEvents = 0; // sum of driver's undesireable events
            let driver = data[i];
            for (let j=0; j < vals2Consider.length; j++){
                totalEvents += (driver[vals2Consider[j]] *= weightConfig[vals2Consider[j]])
            }
            driver.driverScore = totalEvents / driver.distance;
            if (driver.driverScore > max){ max = driver.driverScore }
            if (driver.driverScore < min){ min = driver.driverScore }
        }
        let range = max - min;
        // extrapolate the driver's scores
        data.forEach(driver => {
            driver.driverScore = 100 - (( driver.driverScore / range ) * 100);
        });
        return this.customSort(data, 'driverScore');
    }

    // GET THE FLEET AVG DRIVERSCORE
    static calcMeanFleetScore(data, weightConfig){
        let scoredData = this.calculateScoreFullFleet(data, weightConfig);
        let sum = 0, num = 0;
        for (let i of scoredData){
            sum += i.driverScore
            num++;
        }
        return sum / num
    }
    
    // GET RANGE DYNAMICALLY
    static getScoreDriver(drivername, weightConfig){
        let scoredFleetData = this.calculateScoreFullFleet(data, weightConfig);
        for (let i of scoredFleetData){
            if (i.driver == drivername){
                return i;
            }
        }
    }

}

module.exports = Scoring