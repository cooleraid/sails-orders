/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /*
   * AuthController routes
   */
  'POST /auth/login': {
    controller: 'AuthController',
    action: 'login',
  },
  'POST /auth/register': {
    controller: 'AuthController',
    action: 'register',
  },

  /*
   * ProductController routes
   */
  'GET /product': {
    controller: 'ProductController',
    action: 'list',
  },
  'POST /product': {
    controller: 'ProductController',
    action: 'create',
  },

   /*
   * OrderController routes
   */
  'GET /order': {
    controller: 'OrderController',
    action: 'list',
  },
  'POST /order': {
    controller: 'OrderController',
    action: 'create',
  },
  'PATCH /order/:id': {
    controller: 'OrderController',
    action: 'update',
  },


};
