/*var express = require('express');

var require = require('ejs');
var qs = require('qs');
const axios = require('axios');
var router = express.Router();
var productDetails =[];
var products;

/* GET home page. */
/*
router.get('/', async function(req, res, next) {
  try {
    const token = await acquireTokenWithClientCredentials(RESOURCE, CLIENT_APP_Id, CLIENT_SECRET, AUTHORITY);

    // Calling workbench API
    const response = await axios({
      method: 'GET',
      url: `${WORKBENCH_API_URL}/api/v1/contracts/6`,
      headers: {'Authorization': `Bearer ${token.access_token}`},
    });
    products = response.data.contractProperties;
    console.log(JSON.stringify(response.data));
    console.log(response.data);

   
    for(var i=0;i<products.length;i++){
        
        if(products[i].workflowPropertyId > 30 && products[i].workflowPropertyId < 35){
            
            productDetails.push(products[i].value);
        }
    }
    console.log(productDetails);
    console.log("returned");
    return productDetails;

  }
  catch (err) {
    console.error(err);
  }

  res.render('index', { productDetails : productDetails });
});







module.exports = router;*/
