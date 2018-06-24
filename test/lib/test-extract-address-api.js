const { should, expect, assert } = require('chai');
const { ExtractAddress } = require('../../lib')();

describe('extract address api', () => {
  it('should construct', () => {
    var extractAddress = new ExtractAddress();
    
    expect(extractAddress).to.exist;
  })
  
  it('should find an address', () => {
    var extractAddress = new ExtractAddress();
    var text = "mpany . in.com COMEDY NIGHT LAF Tech Presents Den Coffee Shop Hosted by MARCELLE ALLEN & BRIAN TRENDLER LAF Tech Founders and Improv! July 6th, 7-9pm $10 tickets.$5 w/student or faculty ID Andrea Etz Scott Losse Monica Nevi BUY ONLINE @ http://paypal.me/LAFTechLLC/10 \"ton discount. bring ID and useS The Den Coffee Shop 10415 Beardslee Blvd Bothell, Washington 98011 Check out LAF Tech www.LAFtechNW.com ";
    
    return extractAddress.search({ text:text })
    .then(addressData => {
      expect(addressData).to.contain.key('addresses');
      expect(addressData.addresses).to.have.length.above(1);
      expect(addressData.addresses[1]).to.contain.key('text');
      assert.deepEqual(addressData.addresses[1].text, "10415 Beardslee Blvd Bothell, Washington 98011");
    })
  })
})