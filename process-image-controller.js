const rp = require('request-promise');

var requests = require('./requests')();
const { secretsManager, NlpService } = require('./lib')();

module.exports.post = (req, context, res) => {
  const nlpService = new NlpService();
  
  function _parseResponse(resp) {
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
  
  function _replace(matchText, replaceText) {
    return (text) => {
//      console.log('text is', text);
      return text.replace(new RegExp(matchText, 'g'), replaceText);
    }
  }
  
  var requestParams = {
    method: "POST",
    url: "https://vision.googleapis.com/v1/images:annotate",
    qs: {
      key: "<replace with secrets>"
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
  .then(_parseResponse)
  .then(text => {
    console.log("text is", text);
    return text;
  })
//  return new Promise((fullfill) => fullfill(
//"[ Q Emily McVicker\nHOMEABOUT VIDEOS EVENTS PHOTOS POSTS\nEmily McVicker shared an event.\nJun 22 at 2:13pm\nSee you tomorrow morning! Chris and I are playing at\n10:30am. Lots of looping!!\nELMER'S\nSHORELINE\nARIS\nFESTIVAL\nHAPPENING NOW\n28th Annual Shoreline Arts Festival Free\nShoreline-Lake Forest Park Arts Council Sho...\nINTERESTED\nArt. 761 people\n1 Comment\nLike\nComment\nShare\nEmily McVicker\nJun 22 at 1:46pm\nHey! Some great shows this weekend!\n"
//  ))
  .then(_replace('\\n', ' '))
//  .then(resp => {
//    var html = resp;
//    return nlpService.articleExtraction({html: html}); 
//  })
  .then(resp => {
    console.log(JSON.stringify(resp));
    var response = {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(resp)
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