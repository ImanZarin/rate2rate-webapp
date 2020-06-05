import React from 'react';
import './App.scss';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { SigninReducer, initialSigninReducerState } from './reducers/signinReducer';
import { withNamespaces, WithNamespaces } from 'react-i18next';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  signin: SigninReducer,
});

export type rootState = ReturnType<typeof rootReducer>;


function App({ t }: any) {

  let store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );

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
