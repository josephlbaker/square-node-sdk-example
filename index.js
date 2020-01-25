const cors = require('cors');
const express = require('express')
const app = express();
app.use(cors());
app.options('*', cors());

//////////////////
////Square SDK////
//////////////////

var SquareConnect = require('square-connect');
var defaultClient = SquareConnect.ApiClient.instance;
// Set sandbox url
defaultClient.basePath = 'https://connect.squareupsandbox.com';
// Configure OAuth2 access token for authorization: oauth2
var oauth2 = defaultClient.authentications['oauth2'];
// Set sandbox access token
oauth2.accessToken = "EAAAENO8nHIbccNhALKQOv0D-iY951GmFCpNyxPnHFpXnfeS6vMPaXKifZp5R-3O";
// Pass client to API
var api = new SquareConnect.LocationsApi();

api.listLocations().then(function (data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data, 0, 1));
}, function (error) {
  console.error(error);
});

// location id
// J03B6D90TQAZ1

////////////////////////////////
////////LIST CATALOG ITEMS/////

var apiInstance = new SquareConnect.CatalogApi();

var opts = {
  'cursor': "", // String | The pagination cursor returned in the previous response. Leave unset for an initial request. See [Pagination](https://developer.squareup.com/docs/basics/api101/pagination) for more information.
  'types': "ITEM,IMAGE" // String | An optional case-insensitive, comma-separated list of object types to retrieve, for example `ITEM,ITEM_VARIATION,CATEGORY,IMAGE`.  The legal values are taken from the CatalogObjectType enum: `ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`, `MODIFIER`, `MODIFIER_LIST`, or `IMAGE`.
};

app.get('/', (req, res) => {
  apiInstance.listCatalog(opts).then(function (data) {
    res.send(data);
  }, function (error) {
    console.error(error);
  });
});

//     res.send(data.objects[0].item_data.name);

///////////////
////END SDK////
///////////////

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });


app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});


