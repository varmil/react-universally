import React from 'react';
import { Router, RouterContext, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// FIXME: This cause server error 'injectTapEventPlugin() should be called once in app lyfecycle'
// http://stackoverflow.com/a/34015469/988941
// import injectTapEventPlugin from 'react-tap-event-plugin';
// var isLoaded
// if (isLoaded === undefined) {
//   isLoaded = true
//   injectTapEventPlugin()
// }


const withReduxProvider = (store, children, userAgent) => {
  // HACK: call getMuiTheme every time for rendering, but this is needed for server rendering
  // Client side uses `navigator.userAgent`
  const muiTheme = getMuiTheme({
    appBar: {
      height: 48, // Instead of 64
    },
  }, { userAgent: userAgent || navigator.userAgent })

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        {children}
      </Provider>
    </MuiThemeProvider>
  )
}

export const createClientApp = (store, renderProps) => {
  return withReduxProvider(store, <Router render={applyRouterMiddleware(useScroll())} {...renderProps} />);
}

export const createServerApp = (store, renderProps, userAgent) => {
  return withReduxProvider(store, <RouterContext {...renderProps}/>, userAgent);
}
