import gql from 'graphql-tag';
import apolloClient from './graphql';

export async function subscribe() {
  apolloClient.subscribe({
    query: gql`
    subscription onDocumentEvent {
      newDocument {
        id
        title
        rev
      }
    }`,
    variables: {},
  }).subscribe({
    next(data) {
      // Notify your application with the new arrived data
      console.log(`oh new data...${JSON.stringify(data)}`)
    }
  });
}

// export function test2() {
//     apolloClient.query({
//       query: gql`
//       {
//         retrieveDocument {
//           id
//         }
//       }
//     `
//     }).then((result) => console.log(`res2 ${JSON.stringify(result)}`))
// }
