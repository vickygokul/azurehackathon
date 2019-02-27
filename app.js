var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var qs = require('qs');
const axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://cloudchainers:xgePyca3jJEm7NiCkwVehoFOk4mSXtw4dg5GpvUxj4W3G8U1IzTvPnIoerUwQgv5DsWdHj3aBOUGiLMpJNUQgA%3D%3D@cloudchainers.documents.azure.com:10255/?ssl=true';
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
var productDetails =[];
var products;

const AUTHORITY = 'https://login.microsoftonline.com/4e9e0552-d7e8-4d76-a28b-dad9fb50570b';
const WORKBENCH_API_URL = 'https://icfsblockchain-65bnjp-api.azurewebsites.net';
const RESOURCE = '49a7d8e5-2021-4cde-bbf1-97f634da6303';
const CLIENT_APP_Id = '2535aadf-2f97-4d7b-8f70-6a19ae7ab27a';
const CLIENT_SECRET = 'olExspUd4AGe41YGT1RIMBp8CooMVHwPGibyuHyDD4c=';


// Getting token from AAD
const acquireTokenWithClientCredentials = async (resource, clientId, clientSecret, authority) => {
  const requestBody = {
    resource: resource,
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  };

  const response = await axios({
    method: 'POST',
    url: `${authority}/oauth2/token`,
    data: qs.stringify(requestBody),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  return response.data;
}


//app.use('/', indexRouter);
app.get('/',async function(req, res, next) {
    try {
      productDetails= [];
      const token = await acquireTokenWithClientCredentials(RESOURCE, CLIENT_APP_Id, CLIENT_SECRET, AUTHORITY);
      for (var j=8; j<=11;j++){
      // Calling workbench API
      const response = await axios({
        method: 'GET',
        url: `${WORKBENCH_API_URL}/api/v1/contracts/${j}`,
        headers: {'Authorization': `Bearer ${token.access_token}`},
      });

    var productDetailsIndividual = {};
    products = response.data.contractProperties;
    console.log(products.length);
    for(var i=0;i<products.length;i++){
      if(products[i].workflowPropertyId == 70){
        console.log("inside if");
        if (products[i].value === '0x1584b17ff1a97649284526e3906d62e169446b95'){
          console.log("inisde asus");
          productDetailsIndividual.Manufacturer = "ASUS";
        }
        if (products[i]['value'] === '0x032f7fb389480308bcc5e952cd8a246dba48e112'){
          productDetailsIndividual.Manufacturer = "Levis";
        }
        if (products[i].value === '0x909a4cb9eeba9533edc983d7492768ef77e8edd5'){
          productDetailsIndividual.Manufacturer = "Reebok";
        }
      }
      if(products[i].workflowPropertyId == 71){
        productDetailsIndividual.Distributor = 'JMD Distributor';
      }
      if(products[i].workflowPropertyId == 72){
        productDetailsIndividual.Retailer = 'Retail Net';
      }
      if(products[i].workflowPropertyId == 73){
        productDetailsIndividual.ShipmentCompany = 'Ekart';
      }
      if(products[i].workflowPropertyId == 74){
        productDetailsIndividual.SupplyChainObserver = 'Administrator';
      }
      if(products[i].workflowPropertyId == 76){
        productDetailsIndividual.CompilanceDetail = products[i].value;
      }
      if(products[i].workflowPropertyId == 77){
        productDetailsIndividual.ProductName = products[i].value;
      }
      if(products[i].workflowPropertyId == 78){
        productDetailsIndividual.ProductCategory = products[i].value;
      }
      if(products[i].workflowPropertyId == 79){
        productDetailsIndividual.ProductDetails = products[i].value;
      }
      if(products[i].workflowPropertyId == 80){
        productDetailsIndividual.ProductQuantity = products[i].value;
      }
      if(products[i].workflowPropertyId == 81){
        productDetailsIndividual.ProductImage = products[i].value;
      }
      if(products[i].workflowPropertyId == 82){
        productDetailsIndividual.ProductPrice = products[i].value;
      }

    }
    productDetails.push(productDetailsIndividual);




  }
  }
  catch (err) {
    console.error(err);
  }
    console.log(productDetails);
    res.render('index', { productDetails : productDetails });
  });

app.use('/users', usersRouter);
app.set('view engine', 'ejs');






module.exports = app;
