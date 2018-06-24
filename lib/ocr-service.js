module.exports = function(secretsManager) {
  const rp = require('request-promise');
  
  if(!secretsManager) {
    const { SecretsManager } = require('./secrets-manager')();
    secretsManager = new SecretsManager();    
  }
  
  class TextExtractFeature {
    constructor(url) {
      this.image = {
        "source": {
          "imageUri": url
        }
      };
      
      this.features = [
        {
          "type": "TEXT_DETECTION"
        }
      ]
    }
  }
  
  class OcrService { 
    constructor() {
    }
    
    recognizeText({ url=undefined }) {
      var body = { 
        requests: [
          new TextExtractFeature(url)
        ]
      }
      var requestParams = {
        method: "POST",
        url: "https://vision.googleapis.com/v1/images:annotate",
        qs: {
          key: "<replace with secrets>"
        },
        json: true,
        body: body
      }

      this.extractTextPromise = secretsManager.getSecretValue('services/google/visionapi')
      .then(visionApiSecrets => {
        requestParams.qs.key = visionApiSecrets.key;
        return requestParams;
      })
      .then(rp);
      return this;
    }
    
    _parseResponse(resp) {
      return resp.responses.map(aiResp => {
        console.log('ai resp is', aiResp);
        return aiResp.fullTextAnnotation.text;
      })[0];
  //    }).map(annotation => {
  //      console.log('annotation is', annotation);
  //      return Object.keys(annotation)//.description;
  //    }).map(desc => {
  //      console.log('desc is', desc);
  ////      return desc.length > 200;
  //      return desc;
  //    })
    }
    
    raw() {
      return this.extractTextPromise;
    }
    
    text() {
      return this.extractTextPromise
      .then(this._parseResponse);
    }
  }
  
  return {
    OcrService,
    TextExtractFeature
  }
}