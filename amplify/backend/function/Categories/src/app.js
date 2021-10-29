var express = require('express')
var bodyParser = require('body-parser')
var axios = require('axios')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
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


// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.get('/data/categories/:catName', async function(req, res) {
  // Add your code here
  const categories=await getCategories()   
  const filteredData=categories.filter((item,index)=>item.category_name==req.params.catName)
  res.send(filteredData)
  //res.json({success: 'get call succeed!', url: req.url});
});

app.get('/data/categories',async function(req, res) {
  // Add your code here
  const categories=await getCategories()   
  res.send(categories)
  // res.json({success: 'get call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
