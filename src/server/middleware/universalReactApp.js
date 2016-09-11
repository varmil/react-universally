/* @flow */

import type { Middleware } from 'express';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import render from '../htmlPage/render';
import routes, { createServerApp } from '../../shared/pages/routes';
import { DISABLE_SSR } from '../config';
import { IS_DEVELOPMENT } from '../../shared/config';

import configureStore from '../../shared/store/configureStore';

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request, response) {
  if (DISABLE_SSR) {
    if (IS_DEVELOPMENT) {
      console.log('==> 🐌  Handling react route without SSR');  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to populate the initial react application state.
    const html = render();
    response.status(200).send(html);
    return;
  }

  const history = createMemoryHistory(request.originalUrl);

  // This is needed for material-ui server rendering... ?
  // global.navigator = { userAgent: request.headers['user-agent'] };

  // Server side handling of react-router.
  // Read more about this here:
  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const store = configureStore()
      const app = createServerApp(store, renderProps);
      const initialState = store.getState();
      const html = render(app, initialState);
      response.status(200).send(html);
    } else {
      response.status(404).send('Not found');
    }
  });
}

export default (universalReactAppMiddleware : Middleware);
