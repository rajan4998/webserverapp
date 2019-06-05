const port = 3000
const path = require('path')

const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{
    let coordinates = {
        latitude: 28.995483,
        longitude: 77.704608,
        location : 'Meerut'
    }

    res.send(coordinates)
})

app.get('/*',(req,res)=>{
    res.redirect('/')
})
app.listen(port,()=>{
    console.log('Server Up at : '+port)
})