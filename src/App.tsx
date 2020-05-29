import React from 'react';
import './App.scss';
import MainComponent from './components/MainComponent';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { SigninReducer } from './reducers/signinReducer';
import { withNamespaces, WithNamespaces } from 'react-i18next';

const rootReducer = combineReducers({
  Signin: SigninReducer,
});

export type rootState = ReturnType<typeof rootReducer>;


function App({ t }: any) {

  let store = createStore(
    rootReducer,
  );

  return (
    <Provider store={store}>
      <div>{t("t1")}</div>
      <BrowserRouter>
        <Route path="/" component={() =>
          <MainComponent postSigninForm={() => void {}} translate={t} />} />
      </BrowserRouter>
    </Provider>
  );
}

export default withNamespaces()(App);
