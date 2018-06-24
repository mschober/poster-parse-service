const { should, expect, assert } = require('chai');
const { NlpService } = require('../../lib')();

describe('nlp service', () => {
  it('should construct', () => {
    var nlpService = new NlpService();
    
    expect(nlpService).to.exist;
  })
  
  it('should extract articles', () => {
    var nlpService = new NlpService();
    
//    expect(nlpService._aylienApi.headers).to.contain.keys([
//      "X-AYLIEN-TextAPI-Application-ID",
//      "X-AYLIEN-TextAPI-Application-Key"
//    ]);
    
//    return nlpService.articleExtraction({ url: "https://aylien.com/" })
//    .then(resp => {
//      var expected = {
//        "article": "Bring the power of Natural Language Processing to your products and applications for a better understanding of human languages.",
//        "author": "",
//        "feeds": [],
//        "image": "",
//        "publishDate": "",
//        "tags": [],
//        "title": "Text Analysis API | Natural Language Processing",
//        "videos": []
//      }
//      assert.deepEqual(resp, expected);
//    })
    return nlpService.articleExtraction({ html: "<html><body> my text </body></html>" })
    .then(resp => {
      var expected = {
        "article": "my text",
        "author": "",
        "feeds": [],
        "image": "",
        "publishDate": "",
        "tags": [],
        "title": "", 
        "videos": []
      }
      assert.deepEqual(resp, expected);
    })
  })
  
  it('should analyze a document', () => {
    var nlpService = new NlpService();
    var expected = {
        "entities": [
          {
            "mentions": [
              {
                "text": {
                  "beginOffset": -1,
                  "content": "text"
                },
                "type": "COMMON"
              }
            ],
            "metadata": {},
            "name": "text",
            "salience": 0.6877991,
            "type": "OTHER"
          },
          {
            "mentions": [
              {
                "text": {
                  "beginOffset": -1,
                  "content": "Coffee shop"
                },
                "type": "COMMON"
              }
            ],
            "metadata": {},
            "name": "Coffee shop",
            "salience": 0.18818863,
            "type": "LOCATION"
          },
          {
            "mentions": [
              {
                "text": {
                  "beginOffset": -1,
                  "content": "Michael Schober"
                },
                "type": "PROPER"
              }
            ],
            "metadata": {},
            "name": "Michael Schober",
            "salience": 0.124012254,
            "type": "PERSON"
          }
        ],
        "language": "en"
      }
    
    return nlpService.analyzeText( { text: "some text is here with Michael Schober at The Den Coffee shop by Tuesday at 11:00"})
    .then(resp => {
      assert.deepEqual(resp, expected);
    })
  })
})