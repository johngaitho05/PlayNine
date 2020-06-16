import React, {useState} from 'react';
import './App.css';

function App({onClick,count}) {
  return (
      <button onClick={onClick}>{count}</button>
  );
}


export default App;
