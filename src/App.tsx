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
import { SIGNIN_REDUCER } from './components/Signin/signinReducer';
import { withNamespaces } from 'react-i18next';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const rootReducer = combineReducers({
  signin: SIGNIN_REDUCER,
});

export type RootState = ReturnType<typeof rootReducer>;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function app({ t }: any): JSX.Element {

  const store = createStore(
    rootReducer)
  applyMiddleware(thunk, logger);

  return (
    <Provider store={store}>
      <div>{t("t1")}</div>
      <BrowserRouter>
        <Route path="/"
          component={(): JSX.Element =>
            <MainComponent translate={t} />}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default withNamespaces()(app);
