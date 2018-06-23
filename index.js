const rp = require('request-promise');

var requests = require('./requests')();

console.log(requests);
const API_KEY = "AIzaSyCQGWVQZe_UXzK4lcClXVBiXxTmsQaUkpQ";
//curl -v -s -H "Content-Type: application/json" \
//    https://vision.googleapis.com/v1/images:annotate?key=API_KEY \
//    --data-binary @request.json

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