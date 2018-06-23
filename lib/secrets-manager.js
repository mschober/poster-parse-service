module.exports = function() {
  var AWS = require('aws-sdk/global');
  require('aws-sdk/clients/secretsmanager');
//  var AWS = require('aws-sdk');
  
  const endpoint = "https://secretsmanager.us-west-2.amazonaws.com",
        region = "us-west-2";
  
  class SecretsManager {
    constructor() {
      this.secretNameKey = undefined;
      this.secret = undefined;
      this.secretsManager = new AWS.SecretsManager({endpoint:endpoint, region:region});
      console.log('constructed', this);
    }
    
    getSecretValue(secretName) {
      return this.secretsManager.getSecretValue({SecretId: secretName})
        .promise()
        .then(secretData => {
          if(secretData.SecretString !== "") {
            return JSON.parse(secretData.SecretString);  
          } 
          else {
            return secretData.SecretBinary;
          }
        })
    }
    
    fetchSecrets(secretsToFetch) {
      return Promise.all(secretsToFetch.map(secretKey => {
        return this.getSecretValue(secretKey);
      }))
    }
  }
  
  return {
    SecretsManager
  }
}