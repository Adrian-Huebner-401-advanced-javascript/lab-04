'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;

// Validator Code that I will figure out

// class Validator{
//   /**
//    * Based on a set of rules, is the input valid?
//    * TODO: Define the rules ... how do we send them in? How do we identify?
//    * @param input
//    * @param rules
//    * @returns {boolean}
//    */
//   isValid(input, rules){
//     return true;
//   };
  
//   /**
//    * Is this a string?
//    * @param input
//    * @returns {boolean}
//    */
//   isString (input){
//     return typeof input === 'string';
//   };
  
//   /**
//    * Is this a number?
//    * @param input
//    * @returns {boolean}
//   */
//   isNumber (input){
//     return typeof input === 'number';
//   }
  
//   /**
//    * Is this an array?
//    * @param input
//    * @returns {boolean}
//    */
//   isArray (input){
//     return Array.isArray(input);
//   }
  
//   /**
//    * Is this an object?
//    * @param input
//    * @returns {boolean}
//    */
//   isObject (input) {
//     return typeof input === 'object';
//   }
  
//   /**
//    * Is this a boolean?
//    * @param input
//    * @returns {boolean}
//    */
//   isBool (input) {
//     return typeof input === 'boolean';
//   }
  
//   /**
//    * Is this a funcion?
//    * @param input
//    * @returns {boolean}
//    */
//   isFunc (input){
//     return typeof input === 'function';
//   }
  
//   /**
//    * Area all values in array same type?
//    * @param input
//    * @returns {boolean}
//    */
//   //thanks to Julie for helping me through this
//   typeArray (input) {
//     const type = typeof input[0];
//       for(let i = 1; input.length > 0; i++){
//         if (typeof input[i] !== type) {
//         return false;
//         }
//         return true;
//       }
//   };
//   }
  
//   module.exports = Validator;