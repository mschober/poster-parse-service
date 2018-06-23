const rp = require('request-promise');

var requests = require('./requests')();
const { SecretsManager } = require('./lib')();
const secretsManager = new SecretsManager();

const API_KEY = process.env.API_KEY;

module.exports.post = (req, context, res) => {
  var requestParams = {
    method: "POST",
    url: "https://vision.googleapis.com/v1/images:annotate",
    qs: {
      key: API_KEY
    },
    json: true,
    body: requests
  }
  
  return secretsManager.getSecretValue('services/google/visionapi')
  .then(visionApiSecrets => {
    requestParams.qs.key = visionApiSecrets.key;
    return requestParams;
  })
  .then(rp)
  .then(resp => {
    console.log(resp);
    var response = {
      statusCode: 200,
      headers: {},
      body: resp
    }
    return response;
  })
  .catch(err => {
    console.log(err);
    var response = {
      statusCode: 500,
      headers: {},
      body: err
    }
    return response;
  })  
};