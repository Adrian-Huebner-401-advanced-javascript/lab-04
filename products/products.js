'use strict';

const DataModel = require('../memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      category_id: {type: String, required: true },
      price: {type: Number, required: true },
      weight: {type: Number},
      quantity_in_stock: {type: Number, required: true},
    };
  }
}

module.exports = Products;