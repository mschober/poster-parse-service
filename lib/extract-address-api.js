//https://smartystreets.com/products/apis/us-extract-api
//https://market.mashape.com/smartystreets/liveaddress-extract-addresses-from-text
//https://stackoverflow.com/questions/11160192/how-to-parse-freeform-street-postal-address-out-of-text-and-into-components

module.exports = function(secretsManager) {
  const rp = require('request-promise');
  
  if(!secretsManager) {
    console.log('no secrets manager passed in');
    const { SecretsManager } = require('./secrets-manager')();
    secretsManager = new SecretsManager();    
  }
  
  class ExtractAddress {
    constructor() {
      
    }
    
    /*
    addr_line_breaks: boolean
    This parameter specifies whether addresses in your input text will ever have line breaks. Typically, you'll only set this to false if you're processing a bunch of single-line addresses (like those in a spreadsheet) and can guarantee that every address in your input will be on the same line, and never have a line break.
    addr_per_line: number
    Default 0 (no limit). Limits the extractor to getting a certain number of addresses per line. Generally, you will leave this unchanged to find as many addresses per line as necessary. If you set this to 1, for instance, the extractor will find an address starting on a certain line, and then skip any other addresses that start on that line. This option is typically set to 1 along with setting addr_line_breaks to false if you're extracting from spreadsheet data.
    aggressive: boolean
    Set to true if you want the extractor to be more aggressive in finding addresses. This can use more lookups, but can sometimes find more addresses. For example, aggressive mode can find addresses in popular cities without a state and ZIP code. If too many false positives are appearing, turn off aggressive mode.
    html: boolean
    HTML in your input is auto-detected, but you can override auto-detection by setting this parameter to true or false if needed. For example, if you have addresses inside HTML tags, you should set this to false and submit only as much HTML code as necessary. Do not submit your input text in this field.
    input: string (required)
    The text from which to extract addresses. This is only required if using a GET request. If using a POST request, submit the data in the raw body of the POST request (don't use an "input" field name). For input strings longer than a sentence or two, use a POST request (not GET). The maximum input length is currently 64 KB.
    */
    search({ text=undefined } = {}) {
      var requestParams = {
        method: "POST", //can be a GET
        url: "https://us-extract.api.smartystreets.com/",
        qs: {
          "auth-id": "<replace>",
          "auth-token": "<replace>",
        },
        body: {
          "input": text 
        },
        json: true
      }
      
      return secretsManager.getSecretValue('services/smartystreets/extractapi')
      .then(secrets => {
        requestParams.qs = {
          "auth-id": secrets.auth_id,
          "auth-token": secrets.auth_token
        };
        return requestParams;
      })
      .then(rp);
    }
  }
  
  return {
    ExtractAddress
  }
}