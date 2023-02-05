const Scoring = require('./Scoring')
const filler = require('./fillerdata')

const weightConfig = {
    "harshAccelerationCount": "1",
    "harshBrakingCount": "1",
    "harshCorneringCount": "1",
    "speedingCount": "1",
    "idlingCount": "1"
}


// RETURN TRUE IF PARAM IS OF DESIRED VALUE
function arrayOfObjects(data){
    if (Array.isArray(data) && typeof data[0] === 'object'){
        lengthOfComprisedObject = Object.keys(data[0])
        if (lengthOfComprisedObject.length === 10){
            return true
        }
        return new Error('(at least) first driver object is of invalid format')
    }
    return new Error('data is not an array of objects, or is undefined')
}  

// TEST FORMAT OF OUTPUT
test('calculateScoreFullFleet: generate an array of objects', () => {
    const output = arrayOfObjects(Scoring.calculateScoreFullFleet(filler, weightConfig))
    expect (output).toBe(true)
})


// TEST EDGE CASES
test('calculateScoreFullFleet: params undefined throws error', () => {
    expect (() => {
         Scoring.calculateScoreFullFleet(undefined, undefined) 
    }).toThrow(new TypeError('one or more of the paramaters passed to this function are undefined'))
})

test('calculateScoreFullFleet: weightConfig invalid format throws error', () => {
    expect (() => {
        delete weightConfig.idlingCount
        Scoring.calculateScoreFullFleet(filler, weightConfig) 
    }).toThrow(new TypeError('weightConfig is of an invalid format'))
})

test('calcMeanFleetItem: undefined datapoint causes error', () => {
    expect (() => {
        Scoring.calcMeanFleetItem(filler, weightConfig, 'thisvalisnotdefined') 
    }).toThrow(new ReferenceError('datapoint is not present in driver obj'))
})

