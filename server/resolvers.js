const pubsub = require('./pubsub');

// The root provides a resolver function for each API endpoint
const root = {
  Subscription: {
    newDocument: {
      resolve: ({ newDocument }) => {
        console.log(`resolving new document`, newDocument)
        return newDocument;
      },
      subscribe: () => {
        console.log(`subscribed...`)
        return pubsub.asyncIterator('NOTIFICATION_NEW_DOCUMENT')
      }
    }
  },
  Query: {
    retrieveDocument: () => {
      return { id: '0', title: 'hello world' }
    },
  },
};

// Sends a notifcation every 2 sec
(function run() {
  let rev = 0;
  setInterval(() => {
    pubsub.publish('NOTIFICATION_NEW_DOCUMENT', {
      newDocument: {
        id: "1",
        rev: ++rev,
        title: 'server event: ' + String(Math.random()).substr(-8),
      }
    });
  }, 2000);
})();

module.exports = root;