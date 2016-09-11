/* @flow */

import { render } from 'react-dom';
import browserHistory from 'react-router/lib/browserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';
import match from 'react-router/lib/match';
import routes from '../shared/pages/routes';
import { createClientApp } from '../shared/utils/createApp';
import configureStore from '../shared/store/configureStore';

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app');

// Needed for onTouchTap, needed on server too
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

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
