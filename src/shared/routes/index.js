/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

// require.ensure cannot work with dynamic module paths, which leads to a lot of repetitive code
// this is workaround
// http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/

function resolveIndex(nextState, cb) {
  System.import('../components/Home')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveAbout(nextState, cb) {
  System.import('../components/About')
    .then(loadRoute(cb))
    .catch(handleError);
}

/**
 * Our routes.
 *
 * NOTE: We load our routes asynhronously using the `getComponent` API of
 * react-router, doing so combined with the `System.import` support by
 * webpack 2 allows us to get code splitting based on our routes.
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
 * @see https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={resolveIndex} />
    <Route path="about" getComponent={resolveAbout} />
  </Route>
);

export default routes;
