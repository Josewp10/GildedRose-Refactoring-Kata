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

  decreaseQuality(item) {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      if (currentItem.name !== 'Aged Brie' && currentItem.name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
          this.decreaseQuality(currentItem);
        }
      } else {
        this.increaseQuality(currentItem);

        if (currentItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (currentItem.sellIn < 11) {
            this.increaseQuality(currentItem);
          }

          if (currentItem.sellIn < 6) {
            this.increaseQuality(currentItem);
          }
        }
      }

      if (currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn--;
      }

      if (currentItem.sellIn < 0) {
        if (currentItem.name !== 'Aged Brie') {
          if (currentItem.name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (currentItem.name !== 'Sulfuras, Hand of Ragnaros') {
              this.decreaseQuality(currentItem);
            }
          } else {
            currentItem.quality = 0;
          }
        } else {
          this.increaseQuality(currentItem);
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
