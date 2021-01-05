/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  attributes: {
    user: {
      model: 'user',
      required: true,
    },
    product: {
      model: 'product',
      required: true,
    },
    status: {
      type: 'string',
      isIn: ['pending', 'completed', 'cancelled'],
      defaultsTo: 'pending',
    },
    quantity: {
      type: 'number',
      required: true,
    },
    cost: {
      type: 'number',
      columnType: 'float',
      required: true,
    },
    shippingFee: {
      type: 'number',
      columnType: 'float',
    },
    shippingAddress: {
      type: 'string',
    },
    deliveryOption: {
      type: 'string',
      isIn: ['pickUp', 'delivery'],
      required: true,
    },
    currency: {
      type: 'string',
      isIn: ['NGN', 'USD'],
      defaultsTo: 'NGN'
    }
  },
  /*
   * Validation messages
   */
  validationMessages: {
    deliveryOption: {
      required: 'Delivery option is required',
    },
    product: {
      required: 'Product is required',
    },
    quantity: {
      required: 'Quantity is required',
    },
  },
};