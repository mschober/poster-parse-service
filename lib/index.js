module.exports = function() {
  const { SecretsManager } = require('./secrets-manager')();
  const secretsManager = new SecretsManager();
  
  const { NlpService } = require('./nlp-service')(secretsManager);
  const nlpService = new NlpService();
  
  const { StreamParser } = require('./stream-parser')();
  const { OcrService, TextExtractFeature } = require('./ocr-service')();
  return {
    nlpService,
    NlpService,
    SecretsManager,
    secretsManager,
    StreamParser,
    OcrService,
    TextExtractFeature
  }
}