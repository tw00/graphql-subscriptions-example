const pubsub = require('./pubsub');

// The root provides a resolver function for each API endpoint
const root = {
  Query: {
    retrieveDocument: () => {
      console.log(`hello`)
      pubsub.publish('NOTIFICATION_NEW_DOCUMENT', {
        newDocument: { id: "222", title: 'newdocument2' }
      });
      return {
        id: '111',
        title: 'hello world'
      }
    },
  },
  // Mutation: {},
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
      // subscribe: () => pubsub.asyncIterator("pinAdded")
    }
  }
};

(function run() {
  let rev = 0;
  setInterval(() => {
    pubsub.publish('NOTIFICATION_NEW_DOCUMENT', {
      newDocument: {
        id: "1",
        rev: ++rev,
        title: 'test:' + Math.random(),
      }
    });
  }, 5000);
})();

module.exports = root;