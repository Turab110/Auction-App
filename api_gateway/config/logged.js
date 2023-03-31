const Sentry = require("@sentry/node");

Sentry.init({

     dsn: "https://89f45665d474443fa16615682f33b8a7@o4504485658034176.ingest.sentry.io/4504491144380416",

    // Set tracesSampleRate to 1.0 to capture 100%

    // of transactions for performance monitoring.

    // We recommend adjusting this value in production

    tracesSampleRate: 1.0,

  });

module.exports = Sentry;