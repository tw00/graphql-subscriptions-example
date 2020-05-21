const { makeExecutableSchema } = require("graphql-tools");
const gql = require('graphql-tag')
const resolvers = require('./resolvers')

const rootQuery = gql`
  type MyDocument {
    id: String
    title: String
    rev: Float
  }

  type Query {
    retrieveDocument: MyDocument
  }

  type Subscription {
    newDocument: MyDocument
  }
`

module.exports = makeExecutableSchema({
  typeDefs: rootQuery,
  resolvers
});