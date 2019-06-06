const request = require('request')

//function geoCode init
const geoCode = (address, callback) => {

    //initalize API url
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFqYW40OTk4IiwiYSI6ImNpaGtha3RyYTBub3B2YmtsY3JieTljbXIifQ.AXJswCu_nMlcg4hSmBkABg&limit=1'

    //making HTTP request
    request({ url: geocodeUrl, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0) {
            callback('No coordinates found for the location', undefined)
        } else if (body.features.length > 0) {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode