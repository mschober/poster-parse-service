const rp = require('request-promise');

var requests = require('./requests')();
const { secretsManager, OcrService, NlpService, StreamParser } = require('./lib')();
//const SAMPLE_URL = "https://lh3.googleusercontent.com/Sc8V956uBFSsD7GQ9NAlK6cxq1oYcNYdNRydCYGOQngOQyLn3CE9moshLmwenLNoEfXJJtKJVkbLTiZVTp10E2boTc096KKSTWta97aQzqF8AfK_PocoeBHjnXP4uCajQeV8swdg2PU=w1052-h1870-no";
const SAMPLE_URL = "https://lh3.googleusercontent.com/J859IvnOy6V9OeXivqbARfzV9dnHs8n58caC-fjNZFZLRtJdcgXvgx7ZKGgwFJkdG26wGDIsApUxQ05IKTgAlKY313BXetcROpC2unf42iJCptlb2P8HlQ6QZ8EcsdhJ3Brc4L5EvS7yxf5lkK_Bvf-k8YqmOU5wUvfP7bNY8Gc6E6SLdY4PNdMDT88l5LuSd1UEzWctAk7BYJJViqCvRIZJX7EPEs0C7hvJPCS8XPJEtzhxrJJ6URPDLVeuVqvNGMZn6mhBbaoY3N9UY_R7Xrb5K9BA6-dmTnAQkWAPNkc6oSiRiqIpuCpgN3bX1QO8HsvjZV1XjtIVH1JtJBcQaSDdepgx-oqNfNJM8B3ZGS1z5UqQVuDNJSqKx9xl0tW88_-C2Eb3pTsy1p7AYYkNE4LATATItY5MSU5Hr1kLbB0IGxi78hLcheItokxNf7fy3NLT1N8fT95F0q0wSjIT07F9Hmq39Xsiy1EK3TVfki2CmP51VUqgX7hOHKF36QDySjZteSIpdJdO1A7ZUyDE3-u52OR9PA_B36wivp290Ea4eX_dnko_iPTJzO8uQK-Ql7rZ3qP5QiUWLseHZnLkZi40nfSbBQNacBohj-qUATlQyN__iiaTbr_D8lLXVoQK9EKJOpfbiCY5DOlMnH2jB9Y-2gHtkYOLwA=w1302-h1736-no";

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
//    var textAnalysisPromise = nlpService.analyzeText({ text: resp });
//    var textClassificationPromise = nlpService.categorizeText({text: resp });
    var annotateTextPromise = nlpService.annotateText({ text: resp });
    return Promise.all([
//      textAnalysisPromise,
//      textClassificationPromise
      annotateTextPromise
    ])
  })
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