import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import UserOnly from '../containers/UserOnly'
import GuestOnly from '../containers/GuestOnly'


function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route') // eslint-disable-line no-console
  console.log(err) // eslint-disable-line no-console
}

function loadRoute(cb) {
  return (module) => cb(null, module.default)
}

// require.ensure cannot work with dynamic module paths, which leads to a lot of repetitive code
// this is workaround
// http://henleyedition.com/implicit-code-splitting-with-react-router-and-webpack/

function resolveIndex(nextState, cb) {
  System.import('./Home')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveAbout(nextState, cb) {
  System.import('./About')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveLogin(nextState, cb) {
  System.import('./Login')
    .then(loadRoute(cb))
    .catch(handleError)
}



function resolveSearchTop(nextState, cb) {
  System.import('./SearchTop')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveSearchRegular(nextState, cb) {
  System.import('./SearchRegular')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveSearchMap(nextState, cb) {
  System.import('./SearchMap')
    .then(loadRoute(cb))
    .catch(handleError)
}




function resolveRestaurantList(nextState, cb) {
  System.import('./RestaurantList')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantEdit(nextState, cb) {
  System.import('./RestaurantEdit')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetail(nextState, cb) {
  System.import('./RestaurantDetail')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetailTop(nextState, cb) {
  System.import('./RestaurantDetail/Top')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetailPhoto(nextState, cb) {
  System.import('./RestaurantDetail/Photo')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetailAccess(nextState, cb) {
  System.import('./RestaurantDetail/Access')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetailReviews(nextState, cb) {
  System.import('./RestaurantDetail/Reviews')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveRestaurantDetailReview(nextState, cb) {
  System.import('./RestaurantDetail/Review')
    .then(loadRoute(cb))
    .catch(handleError)
}




function resolveReviewRestaurantList(nextState, cb) {
  System.import('./Review/Restaurant/List')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveReviewEditTop(nextState, cb) {
  System.import('./Review/Edit/Top')
    .then(loadRoute(cb))
    .catch(handleError)
}

function resolveReviewEditPhoto(nextState, cb) {
  System.import('./Review/Edit/Photo')
    .then(loadRoute(cb))
    .catch(handleError)
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

    <Route component={GuestOnly}>
      <Route path="login" getComponent={resolveLogin} />
    </Route>

    <Route component={UserOnly}>

      <Route path="search">
        <Route path="top" getComponent={resolveSearchTop} />
        <Route path="regular" getComponent={resolveSearchRegular} />
        <Route path="map" getComponent={resolveSearchMap} />
      </Route>

      <Route path="restaurant">
        <Route path="list" getComponent={resolveRestaurantList} />
        <Route path="edit" getComponent={resolveRestaurantEdit} />

        <Route path="detail/:restaurantId" getComponent={resolveRestaurantDetail}>
          <IndexRoute getComponent={resolveRestaurantDetailTop} />
          <Route path="photo" getComponent={resolveRestaurantDetailPhoto} />
          <Route path="access" getComponent={resolveRestaurantDetailAccess} />
          <Route path="reviews" getComponent={resolveRestaurantDetailReviews} />
          <Route path="review/:reviewId" getComponent={resolveRestaurantDetailReview} />
        </Route>
      </Route>

      <Route path="review">
        <Route path="restaurant">
          <Route path="list" getComponent={resolveReviewRestaurantList} />
        </Route>
        <Route path="edit/:restaurantId">
          <IndexRoute getComponent={resolveReviewEditTop} />
          <Route path="photo" getComponent={resolveReviewEditPhoto} />
        </Route>
      </Route>

    </Route>

  </Route>
)

export default routes
