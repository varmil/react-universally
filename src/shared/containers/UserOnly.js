import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import CenterCircle from '../components/loading/CenterCircle';


class UserOnly extends Component {
  componentWillMount() {
    this.redirect(this.props)
  }

  componentWillUpdate(nextProps) {
    this.redirect(nextProps)
  }

  redirect(props) {
    const { user, router } = props
    if (! user.id) {
      router.replace('/login')
    }
  }

  render() {
    // ログインしていない場合、リダイレクトが発生するまでロード中表示にする
    if (! this.props.user.id) return (
      <CenterCircle />
    )

    return <div>{this.props.children}</div>
  }

}


export default connect(state => ({
  user: state.user,
}))(withRouter(UserOnly))
