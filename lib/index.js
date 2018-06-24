module.exports = function() {
  const { SecretsManager } = require('./secrets-manager')();
  const secretsManager = new SecretsManager();
  
  const { NlpService } = require('./nlp-service')(secretsManager);
  const nlpService = new NlpService();
  
  return {
    nlpService,
    NlpService,
    SecretsManager,
    secretsManager
  }
}