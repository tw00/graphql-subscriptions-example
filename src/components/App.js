import React from 'react';
import { subscribe } from '../lib/state'

function App() {

  const onClickButton = () => {
    subscribe()
  }

  return (
    <div className="App">
      <header className="App-header">
        Foobar
        <button onClick={onClickButton}>Button</button>
      </header>
    </div>
  );
}

export default App;
