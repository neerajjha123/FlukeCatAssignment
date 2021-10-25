const { default: axios } = require('axios')
const express=require('express')
const app=express()
const BASE_URL = `https://www.cubyt.io/data/categories`

async function getCategories(){
    const response = await axios({
        method:"GET",
        url : BASE_URL,
        headers: {
            
        },
        params:{

        }
    })
    return response.data
}

app.get("/data/categories/:id",async (req,res)=>{
    const data=await getCategories()   
    const filteredData=data.filter((item,index)=>item.category_name==req.params.id)
    res.send(filteredData)
})

app.listen(3000,()=>{console.log("port started")})