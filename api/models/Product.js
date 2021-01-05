/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  primaryKey: 'id',
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    amount: {
      type: 'number',
      columnType: 'integer',
      required: true,
    },
    price: {
      type: 'number',
      columnType: 'float',
      required: true,
    },
    currency: {
      type: 'string',
      isIn: ['NGN', 'USD'],
      defaultsTo: 'NGN',
    },
    status: {
      type: 'string',
      isIn: ['available', 'unavailable'],
      defaultsTo: 'available',
    },
  },
  async reduceAmount(product, amount) {
    if (product.amount >= amount) {
      product.amount -= amount;
      if (product.amount == 0) {
        product.status = "unavailable";
      }
      await Product.update({ id: product.id }).set({ amount: product.amount, status: product.status });
      return true;
    }
    return false;
  },
  /*
   * Validation messages
   */
  validationMessages: {
    name: {
      required: 'Product name is required',
    },
    amount: {
      required: 'Product amount is required',
    },
    price: {
      required: 'Product price is required',
    },
  },
};
