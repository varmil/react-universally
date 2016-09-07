/* @flow */

import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import App from './App';
import { Provider } from 'react-redux';

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
  System.import('./Home')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveAbout(nextState, cb) {
  System.import('./About')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveSearchTop(nextState, cb) {
  System.import('./SearchTop')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveSearchRegular(nextState, cb) {
  System.import('./SearchRegular')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveSearchMap(nextState, cb) {
  System.import('./SearchMap')
    .then(loadRoute(cb))
    .catch(handleError);
}


function resolveRestaurantList(nextState, cb) {
  System.import('./RestaurantList')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveRestaurantDetail(nextState, cb) {
  System.import('./RestaurantDetail')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveRestaurantDetailTop(nextState, cb) {
  System.import('./RestaurantDetail/Top')
    .then(loadRoute(cb))
    .catch(handleError);
}

function resolveRestaurantDetailPhoto(nextState, cb) {
  System.import('./RestaurantDetail/Photo')
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

    <Route path="search">
      <Route path="top" getComponent={resolveSearchTop} />
      <Route path="regular" getComponent={resolveSearchRegular} />
      <Route path="map" getComponent={resolveSearchMap} />
    </Route>

    <Route path="restaurant">
      <Route path="list" getComponent={resolveRestaurantList} />
      <Route path="detail/:restaurantId" getComponent={resolveRestaurantDetail}>
        <IndexRoute getComponent={resolveRestaurantDetailTop} />
        <Route path="photo" getComponent={resolveRestaurantDetailPhoto} />
      </Route>
    </Route>

  </Route>
);

const withReduxProvider = (store, children) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export const createClientApp = (store, renderProps) => {
  return withReduxProvider(store, <Router {...renderProps} />);
};

export const createServerApp = (store, renderProps) => {
  return withReduxProvider(store, <RouterContext {...renderProps}/>);
};

export default routes;
