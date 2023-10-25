class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  decreaseQuality(item, factor) {
    if (item.quality > 0) {
      item.quality = item.quality - factor;
    }
  }

  increaseQuality(item, factor) {
    if (item.quality < 50) {
      item.quality = item.quality + factor;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      if (currentItem.name != 'Aged Brie' && currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (currentItem.name != 'Sulfuras, Hand of Ragnaros' && currentItem.name != 'Conjured') {
          this.decreaseQuality(currentItem,1);
        }else if (currentItem.name == 'Conjured') this.decreaseQuality(currentItem,2);
      } else {
        this.increaseQuality(currentItem,1);

        if (currentItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (currentItem.sellIn < 11) {
            this.increaseQuality(currentItem,1);
          }

          if (currentItem.sellIn < 6) {
            this.increaseQuality(currentItem,1);
          }
        }
      }

      if (currentItem.name != 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn--;
      }

      if (currentItem.sellIn < 0) {
        if (currentItem.name != 'Aged Brie') {
          if (currentItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.name != 'Sulfuras, Hand of Ragnaros' && currentItem.name != 'Conjured') {
              this.decreaseQuality(currentItem,1);
            }else if (currentItem.name == 'Conjured') this.decreaseQuality(currentItem,2);
          } else {
            currentItem.quality = 0;
          }
        } else {
          this.increaseQuality(currentItem,1);
        }
      }

      currentItem.quality = Math.max(0, Math.min(currentItem.quality, 50));
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
