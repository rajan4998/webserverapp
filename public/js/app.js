const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit',(e)=>{

    const search = document.querySelector('input')
    const location = search.value
    const url = "http://localhost:3000/products?address=" + location

    e.preventDefault()

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data.forecast)
            }
        })
    })
})
