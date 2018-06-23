const rp = require('request-promise');

var requests = require('./requests')();

console.log(requests);
const API_KEY = process.env.API_KEY;

var requestParams = {
  method: "POST",
  url: "https://vision.googleapis.com/v1/images:annotate",
  qs: {
    key: API_KEY
  },
  json: true,
  body: requests
}

rp(requestParams)
.then(resp => {
  console.log(resp);
})
.catch(err => {
  console.log(err);
})