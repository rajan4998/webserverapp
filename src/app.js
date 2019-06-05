const port = 3000

//init native packages
const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')

app.set('view engine','hbs')
app.use(express.static(publicDirectoryPath))

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

app.get('/*',(req,res)=>{
    res.redirect('/')
})
app.listen(port,()=>{
    console.log('Server Up at : '+port)
})