import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet';
import 'normalize.css/normalize.css';

import API from '../../api';
import * as authActions from '../../actions/auth'
import * as errorsActions from '../../actions/errors'

import './globals.css';


const websiteDescription =
  'A starter kit giving you the minimum requirements for a production ready ' +
  'universal react application.';


// This component is mounted on Initial Loading
class App extends Component {
  static fetchDataOnlyClient(query, params, dispatch) {
    return API.fetchUser()
      .then(({ data }) => {
        dispatch(authActions.setIsPrepared(true))
        dispatch(authActions.setIsLoggedIn(data.isLoggedIn))
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
      })
  }

  // https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#accessing-location
  // あまり良くないが、Child Route Componentで props.location, props.paramsのように
  // データを取得したいのでcontextを利用する。そもそもrouter contextから呼べるようにすべき（3.0で入るかも）
  // https://github.com/reactjs/react-router/issues/3325
  // ======================================
  static childContextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }

  getChildContext() {
    return { location: this.props.location, params: this.props.params }
  }
  // context END =============================================================

  componentWillMount() {
    const { location, params, dispatch } = this.props;
    // 非同期通信。ユーザログイン情報をfetch。ローディングし終わるまでは、ロード画面を表示し続ける。
    // --> SSRしたいのでやらない。クライアント側でのみFetchする
    // --> 認証結果を待つ必要があるページ、すなわち会員しか見られないようなページではロード画面表示し続ける感じでいいかも
    // https://github.com/nabeliwo/jwt-react-redux-auth-example/blob/master/src/containers/App.jsx
    if (! process.env.__SERVER__) {
      App.fetchDataOnlyClient(location.query, params, dispatch)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.info('willUpdate', nextProps, nextState)
  }

  render() {
    return /*this.props.auth.isPrepared*/ true ?
    (
      <div>
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

        {this.props.children}
      </div>
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

// もっとSimpleにハンドラはContainer内に自分でメソッド切ればいいじゃん？stateも使えるし。

const AppContainer = connect(
  (state) => ({
    auth: state.auth,
    errors: state.errors,
})
)(App)

export default AppContainer
