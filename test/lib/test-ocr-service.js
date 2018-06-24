const { should, expect, assert } = require('chai');
const { OcrService, TextExtractFeature } = require('../../lib')();

const testImageUrl = "https://img.freepik.com/free-vector/music-festival-poster-with-instruments-in-flat-style_23-2147795101.jpg?size=338&ext=jpg";
describe('ocr service', () => {
  it('should construct', () => {
    expect(new OcrService()).to.exist;
  })
  
  it('should have text extract feature', () => {
    var feature = new TextExtractFeature("http://some.domain.com");
    expect(feature).to.have.keys(['image', 'features']);
  })
  
  it('should parse image by url', () => {
    var ocrService = new OcrService();
    return ocrService.recognizeText({url: testImageUrl}).text()
    .then(resp => {
      assert.deepEqual(resp, 'MUSIC\nESTIVA\n12 Baker Street 12\nOpen doors at s\n8$\ndesigned by宙froopik.com\n');
    })
  })
})
