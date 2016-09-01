import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as AuthActions from '../actions/auth';

import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';

import 'normalize.css/normalize.css';

// TODO: move these files
import '../components/App/globals.css';
import logo from '../components/App/logo.png';

const websiteDescription =
  'A starter kit giving you the minimum requirements for a production ready ' +
  'universal react application.';

// This component is mounted on Initial Loading
class App extends Component {
  componentWillMount() {
    const { /*params, dispatch,*/ onComponentWillMount } = this.props
    // 非同期通信。ユーザログイン情報をfetch。ローディングし終わるまでは、ロード画面を表示し続ける。
    // それによって、App以下のComponentsではほぼ認証情報をローカルから取得できる前提で処理をかける。
    // https://github.com/nabeliwo/jwt-react-redux-auth-example/blob/master/src/containers/App.jsx

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    onComponentWillMount()
  }

  render() {
    console.info('state in render', this.state)
    return /*this.state.auth.isPrepared*/ true ?
    (
      <MuiThemeProvider>
        <div style={{ padding: '10px' }}>
          {/*
            All of the following will be injected into our page header.
            @see https://github.com/nfl/react-helmet
          */}
          <Helmet
            htmlAttributes={{ lang: 'en' }}
            titleTemplate="React Universally - %s"
            defaultTitle="React Universally"
            meta={[
              { name: 'description', content: websiteDescription },
            ]}
            script={[
              { src: 'https://cdn.polyfill.io/v2/polyfill.min.js', type: 'text/javascript' },
            ]}
          />

          <div style={{ textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '100px' }} />
            <h1>React, Universally</h1>
            <strong>
              {websiteDescription}
            </strong>
          </div>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>

          </div>
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
    :
    (
      <div>"LOADING AUTH INFORMATION"</div>
    )
    ;
  }
}

// See: http://qiita.com/193/items/7ff650616dd8f34804f4
// redux-thunkなのかredux-promiseなのかredux-sagaなのか、それともredux#bindActionCreatorsをやめるのか

const AppContainer = connect(
  (state) => ({
    isPrepared: state.auth.isPrepared,
  }),

  (dispatch) => ({
    onComponentWillMount: () => {
      // ホントはここでバリデーション
      setTimeout(() => {
        dispatch(AuthActions.setIsLoggedIn(true))
      }, 1000)
    },
    handleSubmit: () => {
      // 非同期処理は別モジュールに委譲
    },
  })
)(App)

export default AppContainer
