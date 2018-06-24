const rp = require('request-promise');

var requests = require('./requests')();
const { secretsManager, OcrService, NlpService, StreamParser } = require('./lib')();
const SAMPLE_URL = "https://lh3.googleusercontent.com/Sc8V956uBFSsD7GQ9NAlK6cxq1oYcNYdNRydCYGOQngOQyLn3CE9moshLmwenLNoEfXJJtKJVkbLTiZVTp10E2boTc096KKSTWta97aQzqF8AfK_PocoeBHjnXP4uCajQeV8swdg2PU=w1052-h1870-no";

module.exports.post = (req, context, res) => {
  const nlpService = new NlpService();
  const parser = new StreamParser();
  const ocrService = new OcrService();
  
  return ocrService.recognizeText({ url: SAMPLE_URL}).text()
  .then(text => {
    console.log("text is", text);
    return text;
  })
//  return new Promise((fullfill) => fullfill(
//"[ Q Emily McVicker\nHOMEABOUT VIDEOS EVENTS PHOTOS POSTS\nEmily McVicker shared an event.\nJun 22 at 2:13pm\nSee you tomorrow morning! Chris and I are playing at\n10:30am. Lots of looping!!\nELMER'S\nSHORELINE\nARIS\nFESTIVAL\nHAPPENING NOW\n28th Annual Shoreline Arts Festival Free\nShoreline-Lake Forest Park Arts Council Sho...\nINTERESTED\nArt. 761 people\n1 Comment\nLike\nComment\nShare\nEmily McVicker\nJun 22 at 1:46pm\nHey! Some great shows this weekend!\n"
//  ))
  .then(parser.replaceAll('\\n', ' '))
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