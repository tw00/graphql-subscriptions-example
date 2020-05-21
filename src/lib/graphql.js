import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

const GRAPHQL_ENDPOINT = 'ws://localhost:4000/subscriptions';

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: GRAPHQL_ENDPOINT,
  options: {
    reconnect: true
  }
});

const apolloClient = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
