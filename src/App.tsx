import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={MainComponent} />
    </BrowserRouter>
  );
}

export default App;
