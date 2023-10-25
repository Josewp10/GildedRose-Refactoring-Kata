var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

});

describe("Once the sell-by date has passed, Quality degrades twice as fast", function() {

  it("Quality degrades twice as fast", function() {
    let quality=30;
    const gildedRose = new Shop([ new Item("Random Item", 0, quality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(quality-2);
  });

});
