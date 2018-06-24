module.exports = function(secretsManager) {
  var AYLIENTextAPI = require('aylien_textapi');
  const rp = require('request-promise');
  if(!secretsManager) {
    const { SecretsManager } = require('./secrets-manager')();
    const secretsManager = new SecretsManager();    
  }
  
  class AylienApi {
    constructor() {
//      return secretsManager.getSecretValue("services/ibm/aylien")
//      .then(secrets => {
//        this._textApi = new AYLIENTextAPI({
//          application_id: secrets.app_id,
//          application_key: secrets.api_key
//        });
//        this.headers = {
//          "X-AYLIEN-TextAPI-Application-Key": secrets.api_key, 
//          "X-AYLIEN-TextAPI-Application-ID": secrets.app_id
//        }        
//      })
//      .catch(err => {
//        console.log('failed to construct', err);
//      })
    }
  }
  
  class NlpService { 
    constructor() {
      this._aylienApi = new AylienApi();
    }
    
    articleExtraction({ url=undefined, html=undefined, best_image=false, language="auto" } = {}) {
      var requestParams = {
        method: "GET",
        url: "https://api.aylien.com/api/v1/extract",
        headers: this._aylienApi.headers,
        qs: {
          url: url,
          html: html,
          best_image: best_image,
          language: language
        },
        json: true
      }
      
      return secretsManager.getSecretValue("services/ibm/aylien")
      .then(secrets => {
        var headers = {
          "X-AYLIEN-TextAPI-Application-Key": secrets.api_key, 
          "X-AYLIEN-TextAPI-Application-ID": secrets.app_id
        }
        requestParams.headers = headers;
        console.log('requestParams for articleExtraction', requestParams);
        return requestParams;
      })
      .then(rp);
    }
  }
  
  return {
    NlpService
  }
}