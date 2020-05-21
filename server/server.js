const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const PORT = 4000
const schema = require('./schema.js');

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  console.log("FOOBAR")
  response.writeHead(404);
  response.end();
});

websocketServer.listen(PORT, () => {
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/`);
});

// Subscriptions handling:
const subscriptionServer = new SubscriptionServer({
  execute,
  subscribe,
  schema
}, {
  server: websocketServer,
  path: '/subscriptions',
});

module.exports = subscriptionServer;
