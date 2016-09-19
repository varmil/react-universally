import _ from 'lodash'


export default class User {
  // deserializeされたreq.userを使用する。
  // SSR時にクライアント側に送りたいデータを抜き出す
  static pickInitialState(reqUser) {
    const picked = _.pick(reqUser, 'id')
    return picked
  }
}
