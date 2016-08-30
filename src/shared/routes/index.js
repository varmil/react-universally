/* @flow */

import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';
var path = require('path');

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

// FIXME: path.resolve()でも無理。やはりサーバ側での実行時解決は無理なのか
function systemImport(modulePath) {
  // switch load function depending on IS_SERVER
  // On server side, require() supports only literal, not dynamic module loading...

  return (location, cb) => {
    System.import(path.resolve(modulePath) )
      .then(module => cb(null, module.default))
      .catch(handleError);
  };
}

// function resolveIndex(nextState, cb) {
//   System.import('../components/Home')
//     .then(module => cb(null, module.default))
//     .catch(handleError);
// }

// function resolveAbout(nextState, cb) {
//   System.import('../components/About')
//     .then(module => cb(null, module.default))
//     .catch(handleError);
// }

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
    <IndexRoute getComponent={systemImport('src/shared/components/Home')} />
    <Route path="about" getComponent={systemImport('src/shared/components/About')} />
  </Route>
);

export default routes;
