class Scoring {
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
        return data;
    }
    
    // GET RANGE DYNAMICALLY
    static calculateScoreDriver(weightConfig, driver, range){
        let vals2Consider = Object.keys(weightConfig)
        let totalEvents = 0; // sum of driver's undesireable events
        for (let j=0; j < vals2Consider.length; j++){
            totalEvents += (driver[vals2Consider[j]] *= weightConfig[vals2Consider[j]])
        }
        driver.driverScore = totalEvents / driver.distance;
        driver.driverScore = (100 - (( driver.driverScore / range ) * 100));
        driver.driverScore = Math.round(driver.driverScore * 10) / 10
        return driver;
    }
}

module.exports = Scoring