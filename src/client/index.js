/* @flow */

import { render } from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import routes, { createClientApp } from '../shared/pages/routes';
import configureStore from '../shared/store/configureStore';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

function routerError(error) {
  // TODO: Error handling.
  console.error('==> 😭  React Router match failed.'); // eslint-disable-line no-console
  if (error) { console.error(error); } // eslint-disable-line no-console
}

function renderApp() {
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      routerError(error);
    } else if (redirectLocation) {
      return;
    } else if (renderProps) {
      const initialState = window.APP_STATE;
      const store = configureStore(initialState);
      render(
        createClientApp(store, renderProps),
        container
      );
    } else {
      routerError();
    }
  });
}

renderApp();
