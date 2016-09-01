import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';

import * as AuthActions from '../../actions/auth';
import './globals.css';
import logo from './logo.png';

const websiteDescription =
  'A starter kit giving you the minimum requirements for a production ready ' +
  'universal react application.';

// This component is mounted on Initial Loading
class App extends Component {
  componentWillMount() {
    const { /*params,*/ /*dispatch,*/ onComponentWillMount } = this.props
    // 非同期通信。ユーザログイン情報をfetch。ローディングし終わるまでは、ロード画面を表示し続ける。
    // それによって、App以下のComponentsではほぼ認証情報をローカルから取得できる前提で処理をかける。
    // https://github.com/nabeliwo/jwt-react-redux-auth-example/blob/master/src/containers/App.jsx

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    onComponentWillMount()
  }

// TODO: remove layout

  render() {
    return this.props.isPrepared ?
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

// ここで非同期APIを叩くのも誤りではない
// http://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux

// まさにここがAction Creatorにあたる。非同期APIを叩いて、必要に応じてactionをdispatchする役割。
// stateが取れればベストなんだが… react-thunkを使えということらしい
// https://github.com/reactjs/react-redux/issues/211

const AppContainer = connect(
  (state) => {
     return Object.assign(state.auth)
   },

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
