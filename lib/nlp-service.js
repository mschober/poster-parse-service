module.exports = function(secretsManager) {
  var AYLIENTextAPI = require('aylien_textapi');
  const language = require('@google-cloud/language');
  const rp = require('request-promise');

  if(!secretsManager) {
    const { SecretsManager } = require('./secrets-manager')();
    secretsManager = new SecretsManager();    
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
  
  class GoogleNLPApi {
    //https://cloud.google.com/natural-language/docs/
//    https://language.googleapis.com/v1beta2/documents:analyzeEntities
  
    analyzeText({ text=undefined } = {} ){
      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      };
      
      var requestParams = {
        method: 'POST',
        url: 'https://language.googleapis.com/v1beta2/documents:analyzeEntities',
        qs: {
          key: "gets replaced"
        },
        json: true,
        body: {
          document: document
        }
      }
      
      return secretsManager.getSecretValue('services/google/naturallanguage')
      .then(secrets => {
        return secrets.key;
      })
      .then(apiKey => {
        requestParams.qs.key = apiKey;
        return requestParams;
      })
      .then(rp);
//      .then(apiKey => {
//        var options = {
//          version: "v1",
//          auth: apiKey
//        };
//
//        const client = new language.LanguageServiceClient(options);
//        console.log('options are', options);
//        console.log('document is', document);
//        return client
//        .analyzeEntities({document: document})
//        .then(results => {
//          const entities = results[0].entities;
//
//          console.log('Entities:');
//          entities.forEach(entity => {
//            console.log(entity.name);
//            console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
//            if (entity.metadata && entity.metadata.wikipedia_url) {
//              console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
//            }
//          });
//        })
//        .catch(err => {
//          console.error('ERROR:', err);
//        });
//      })
    }
  }
  
  class NlpService { 
    constructor() {
      this._aylienApi = new AylienApi();
      this._googleApi = new GoogleNLPApi();
    }
    
    analyzeText({ text=undefined } = {}) {
      return this._googleApi.analyzeText({ text: text });
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