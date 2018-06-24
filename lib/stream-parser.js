module.exports = function() {
  
  class StreamParser {
    constructor() {
      
    }
    
    replaceAll(matchText, replaceText) {
      return (text) => {
        return text.replace(new RegExp(matchText, 'g'), replaceText);
      }
    }
  }
  
  return {
    StreamParser
  }
}