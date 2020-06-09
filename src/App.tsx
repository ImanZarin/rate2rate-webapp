// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import './App.scss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MainComponent from './components/MainComponent';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider } from 'react-redux';
import { SigninReducer } from './reducers/signinReducer';
import { withNamespaces } from 'react-i18next';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  signin: SigninReducer,
});

export type rootState = ReturnType<typeof rootReducer>;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App({ t }: any) {

  const store = createStore(
    rootReducer)
  applyMiddleware(thunk, logger);

  return (
    <Provider store={store}>
      <div>{t("t1")}</div>
      <BrowserRouter>
        <Route path="/"
          component={() =>
            <MainComponent translate={t} />}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default withNamespaces()(App);
