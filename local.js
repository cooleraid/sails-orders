/**
 * Local environment settings
 *
 * Use this file to specify configuration settings for use while developing
 * the app on your personal system.
 *
 * For more information, check out:
 * https://sailsjs.com/docs/concepts/configuration/the-local-js-file
 */

module.exports = {
  port: process.env.PORT || 1500,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      ssl: { rejectUnauthorized: false },
      url: `postgresql://zwtexqyrplcqos:7391cacb5781a60e5d62e530db0fe9aafacf9e6ca0b020cf46e394cf9ca8bc83@ec2-52-22-135-159.compute-1.amazonaws.com:5432/d3toc2or2b7fc2`
    },
  },
  models: {
    migrate: 'alter',
  },
  session: {
    adapter: '@sailshq/connect-redis',
    host: '127.0.0.1',
    port: '6379',
    db: 4,
    prefix: 'prod_sess:',
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  },
  sockets: {
    adapter: '@sailshq/socket.io-redis',
    host: '127.0.0.1',
    port: '6379',
    db: 5,
  },
  settings: {
    jwt: {
      domain: 'localhost',
      host: 'localhost',
      secret: 's4Cf9t5QJzLKmBvugFJqPaBGepXb4GH2',
      expiry: 7200,
    },
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },
  blueprints: {
    shortcuts: false,
  },
  log: {
    level: 'debug'
  },
  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000,
  },
};