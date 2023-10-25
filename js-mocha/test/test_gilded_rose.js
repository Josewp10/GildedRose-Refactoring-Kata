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

describe("Aged Brie actually increases in Quality the older it gets", function() {

  it("Should increase the quality", function() {
    let initialQuality = 0;
    const gildedRose = new Shop([ new Item('Aged Brie', 0, initialQuality) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.be.above(initialQuality);
  });

});

describe("Based on the he Quality of an item", function() {

  it("Should fail if the quality is negative", function() {
    const gildedRose = new Shop([ new Item("Negative", 0, -1) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.not.be.lessThan(0)
  });
  
  it("Should fail if the quality is more than 50", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 53) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.lessThanOrEqual(50)
  });
  
});

describe("Sulfuras, being a legendary item, never has to be sold or decreases in Quality", function() {
  let initialQuality = 20, sellIn = 5;
  const gildedRose = new Shop([ new Item('Sulfuras, Hand of Ragnaros', sellIn, initialQuality) ]);
  const items = gildedRose.updateQuality();

  it("Should never decrease Quality", function() {
    expect(items[0].quality).to.equal(initialQuality);
  });

  it("Should never has to be sold", function() {
    expect(items[0].sellIn).to.equal(sellIn);
  });

});

describe("Backstage passes", function() {
  const description = `Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert`
  it(description, function() {
    const gildedRose = new Shop([ new Item('Backstage passes to a TAFKAL80ETC concert', 12, 11) ]);
    let items = gildedRose.items;
    let sellDays,pQuality;
    
    for (let i = 0; i < 13; i++) {
      pQuality = items[0].quality;
      items = gildedRose.updateQuality();
      sellDays = items[0].sellIn;

      if(sellDays > 5 && sellDays < 10) {
        expect(items[0].quality).to.equal(pQuality+2);
      }else if(sellDays >=0 && sellDays < 5){
        expect(items[0].quality).to.equal(pQuality+3);
      }else if(sellDays<0){
        expect(items[0].quality).to.equal(0);
      }      
    }
    
  });

});