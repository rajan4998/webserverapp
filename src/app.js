const port = 3000

//include native packages
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//include custom packages
const geoCode = require('./utils/geocode')
const forecast = require('./utils/weatherforecast')

const app = express()

//creating public directory path
const publicDirectoryPath = path.join(__dirname,'../public')

//create views directory path for express
const viewsPath = path.join(__dirname,'../templates/views')

//create partials path
const partialsPath = path.join(__dirname,'../templates/partials')

//set template engine default views
app.set('view engine','hbs')
app.set('views',viewsPath)

//register partialPath
hbs.registerPartials(partialsPath)

//setup statuc directory to server
app.use(express.static(publicDirectoryPath))

//routes star
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help view',
        message : 'This is help view',
        name: 'Rajan Joshi'
    })
})

app.get('/weather',(req, res)=>{
    let coordinates = {
        latitude: 28.995483,
        longitude: 77.704608,
        location : 'Meerut'
    }
    
    res.send(coordinates)
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name: 'Rajan Joshi'
    })
})

app.get('/',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Rajan Joshi'
    })
})

app.get('/products',(req,res)=>{

    let msg = "We find something for your search term"
    let response = {};

    if(!req.query.address){
        return res.send({
            error: "You must provide address",
            response: response
        })

    }else{

        geoCode(req.query.address,(error,response)=>{
            console.log(error)
            console.log(response)
            forecast(response.longitude, response.latitude,response.location,(error,weatherforecast)=>{
                return res.send({
                    forecast: weatherforecast,
                    location: response.location,
                })
            })
        })
    }

})

//default route if not found
app.get('/*',(req,res)=>{
    res.render('404',{
        title : 'Error 404',
        name : 'Rajan Joshi'
    })
})

//start server
app.listen(port,()=>{
    console.log('Server Up at : '+port)
})