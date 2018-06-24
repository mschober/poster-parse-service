const { should, expect, assert } = require('chai');
const { StreamParser } = require('../../lib')();

describe('stream parser', () => {
  it('should construct', () => {
    expect(new StreamParser()).to.exist;
  })
  
  it('should replace all', () => {
    var parser = new StreamParser();
    return new Promise((fullfill) => {
      fullfill(
        "fixing my <bad> <bad> string"
      )
    })
    .then(parser.replaceAll('<bad> ', ''))
    .then(text => {
      assert.equal(text, 'fixing my string');
    })
  })
})