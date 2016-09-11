/* @flow */

import type { Middleware } from 'express';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import render from '../htmlPage/render';
import routes from '../../shared/pages/routes';
import { createServerApp } from '../../shared/utils/createApp';
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

      // fetch all data for initial rendering
      const query = renderProps.location.query
      const params = renderProps.params
      const dispatch = store.dispatch
      const promises = renderProps.components
        // ignore undefined the component which has no 'component' property
        .filter(c => c)
        .map(c => {
          return c.fetchData ?
            c.fetchData(query, params, dispatch) :
            Promise.resolve('not found fetchData method')
        })

      // now all data is ready ! (store is updated)
      Promise.all(promises)
        .then(() => {
          const app = createServerApp(store, renderProps);
          const initialState = store.getState();
          const html = render(app, initialState);
          response.status(200).send(html);
        })
        .catch((reason) => {
          console.error(reason)
          response.status(500).json(reason);
        })
    } else {
      response.status(404).send('Not found');
    }
  });
}

export default (universalReactAppMiddleware : Middleware);
