import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Redirection from './Redirection'
import CircularProgress from 'material-ui/CircularProgress';

const circleStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  margin: '-20px 0 0 -20px',
}

class UserOnly extends Redirection {
  /**
   * @Override
   */
  redirect() {
    // Serverで認証情報はfetch済みの想定
    if (! this.props.user.id) {
      console.info('user is not authenticateed, so redirect to login page')
      this.props.router.replace('/login')
    }
  }

  render() {
    // ログインしていない場合、リダイレクトが発生するまでロード中表示にする
    if (! this.props.user.id) return (
      <CircularProgress style={circleStyle} />
    )

    return <div>{this.props.children}</div>
  }

}


export default connect(state => ({
  user: state.user,
}))(withRouter(UserOnly))
