var qs = require('qs');
const axios = require('axios');


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

var productDetails =[];
var products;
main = async () => {
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
}

exports.main =  main();
