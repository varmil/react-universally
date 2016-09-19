import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { TextField, RaisedButton } from 'material-ui'

import ActionInput from 'material-ui/svg-icons/action/input';

import API from '../../api'
import AppHeader from '../../containers/AppHeader'
import * as userActions from '../../actions/user'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { username: '', password: '', errMsg: '' }
  }



  onChangeUsername(e, value) {
    console.log(value)
    this.setState({ ...this.state, username: value })
  }

  onChangePassword(e, value) {
    console.log(value)
    this.setState({ ...this.state, password: value })
  }

  onSubmit(e) {
    const { dispatch, router } = this.props
    const { username, password } = this.state
    const params =  { username, password }

    API.postLogin(params)
      .then(({ data }) => {
        dispatch(userActions.setId(data.id))
        router.replace(`/search/top`)
      })
      .catch((reason) => {
        this.setState({ ...this.state, errMsg: reason.toString() })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />

        <AppHeader title="Login" leftIcon={null} />

        <div>{this.state.errMsg}</div>

        <TextField
          id="TextField-Username"
          hintText="Hint Text"
          floatingLabelText="username"
          onChange={::this.onChangeUsername}
        />
        <br />

        <TextField
          id="TextField-Password"
          hintText="Password Field"
          floatingLabelText="password"
          type="password"
          onChange={::this.onChangePassword}
        />

        <br />

        <RaisedButton
          label="Login"
          secondary={true}
          icon={<ActionInput />}
          onTouchTap={::this.onSubmit}
        />
      </div>
    )
  }
}

export default connect()(withRouter(Login))
