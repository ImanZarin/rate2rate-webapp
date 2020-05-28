import React from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { SigninReducer } from './reducers/signinReducer';

const rootReducer = combineReducers({
  Signin: SigninReducer,
});

export type rootState = ReturnType<typeof rootReducer>;

function App() {

  let store = createStore(
    rootReducer,
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={MainComponent} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
