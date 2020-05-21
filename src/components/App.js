import React, { useState } from 'react';
import { subscribe } from '../lib/state'

function App() {

  const [eventlist, setEventList] = useState([])
  const [subscription, setSubscription] = useState(null)

  const onClickSubscribe = () => {
    subscribe(({ newDocument }) => {
      setEventList(list => list.concat(newDocument));
    }).then(subscription => setSubscription(subscription))
  }

  const onClickUnsubscribe = () => {
    if ( subscription ) {
      subscription.unsubscribe();
      setSubscription(null)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        GraphQL Subscriptions Example
        <div>
          <button onClick={onClickSubscribe} disabled={subscription}>
            Subscribe
            </button>
          <button onClick={onClickUnsubscribe} disabled={!subscription}>
            Unsubscribe
            </button>
        </div>
        <code>
        <ul>
        {eventlist.map(item => (
          <li key={item.rev}>{item.title} ({item.rev})</li>
        ))}
        </ul>
        </code>
      </header>
    </div>
  );
}

export default App;
