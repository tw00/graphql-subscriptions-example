import gql from 'graphql-tag';
import apolloClient from './graphql';

export async function subscribe(cb = null) {
  return apolloClient.subscribe({
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
    next({ data }) {
      // Notify your application with the new arrived data
      console.log(`[subscribe update]`, data)
      cb && cb(data);
    }
  });
}
