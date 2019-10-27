const Products = require('../products/products.js');

describe('Products Model', () => {

  let products;

  beforeEach(() => {
    products = new Products();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    let obj = { price: 14, quantity_in_stock: 12 };
    return products.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { price: 14, quantity_in_stock: 12 };
    return products.create(obj)
      .then(record => {
        return products.get(record.id)
          .then(product => {
            Object.keys(obj).forEach(key => {
              expect(product[0][key]).toEqual(obj[key]);
            });
          })
          .catch(e => console.error('ERR', e));
      });
  });

  it('can delete() a product', () => {
    let obj = { price: 14, quantity_in_stock: 12 };
    products.create(obj)
      .then(results => {
        console.log(results.id);
        products.delete()
          .then(() => {
            products.get(results.id)
              .then(results => {
                expect(results.length).toBe(0);
              })
              .catch(e => console.error('ERR', e));
          });
      });
  });

  it('can update() a product', () => {
    let obj = { price: 14, quantity_in_stock: 12 };
    products.create(obj)
      .then(results => {
        products.get(results)
          .then(results => {
            products.update({ price: 14, quantity_in_stock: 12 });
            expect(results).toBe({ price: 14, quantity_in_stock: 12 });
          })
          .catch(e => console.error('ERR', e));
      });
  });
});