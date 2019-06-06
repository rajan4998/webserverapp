const request = require('request')
const config = require('../config')

const weatherForecast = (longitude, latitude,location, callback) => {

    const url = config.baseUrl + config.secretKey + '/' + longitude + ',' + latitude

    request({ url: url, json: true }, (weatherError, {body}) => {

        if (weatherError) {
            callback('Unable to connect to geocoding service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else if (body.currently != null) {
            const forecast = body.currently
            callback(undefined, forecast.summary + '. It is currently ' + forecast.temperature + ' degree.There is ' + forecast.precipProbability + ' chance of raining today in ' + location)
        }
        else {
            callback("Config not set")
        }
    })
}

module.exports = weatherForecast