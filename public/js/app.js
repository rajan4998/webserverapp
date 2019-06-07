console.log("This is static js file")

const url = "http://localhost:3000/products?address=meerut"
fetch(url, {
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
    }).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.forecast)
        }
    })
})