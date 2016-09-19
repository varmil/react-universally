import type { Middleware } from 'express'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'

import render from '../htmlPage/render'
import { DISABLE_SSR } from '../config'
import Service from '../service'
import routes from '../../shared/pages/routes'
import { createServerApp } from '../../shared/utils/createApp'
import { IS_DEVELOPMENT } from '../../shared/config'
import configureStore from '../../shared/store/configureStore'


function renderComponents(req, res, renderProps) {
  // （SSR用）SessionからUser情報を取り出して、サーバ側でSETしておく
  const user = Service.User.pickInitialState(req.user)
  const store = configureStore({ user })

  // fetch all data for initial rendering
  const query = renderProps.location.query
  const params = renderProps.params
  const dispatch = store.dispatch
  const promises = renderProps.components
    // ignore undefined the component which has no 'component' property
    .filter(c => c)
    // NOTE: Route Componentに実装されたfetchData()しか拾ってこないので注意。
    // Child ComponentsにfetchData()が実装されていてもSSRでは無意味になります
    .map(c => {
      return c.fetchData ? c.fetchData(query, params, dispatch) : Promise.resolve('not found fetchData method')
    })

  // now all data is ready ! (store is updated)
  Promise.all(promises)
    .then(() => {
      // The UserAgent is needed for material-ui server rendering
      // https://github.com/callemall/material-ui/pull/2172#issuecomment-157404901
      const app = createServerApp(store, renderProps, req.headers['user-agent'])
      const initialState = store.getState()
      const html = render(app, initialState)
      res.status(200).send(html)
    })
    .catch((reason) => {
      console.error(reason)
      res.status(500).json(reason)
    })
}

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(req, res) {
  if (DISABLE_SSR) {
    if (IS_DEVELOPMENT) {
      console.log('==> Handling react route without SSR')  // eslint-disable-line no-console
    }
    // SSR is disabled so we will just return an empty html page and will
    // rely on the client to populate the initial react application state.
    const html = render()
    res.status(200).send(html)
    return
  }

  const history = createMemoryHistory(req.originalUrl)

  // Server side handling of react-router.
  // Read more about this here:
  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      renderComponents(req, res, renderProps)
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default (universalReactAppMiddleware : Middleware)
