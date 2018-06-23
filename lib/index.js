module.exports = function() {
  const { SecretsManager } = require('./secrets-manager')();
  
  return {
    SecretsManager
  }
}