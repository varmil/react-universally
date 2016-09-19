import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { TextField, RaisedButton } from 'material-ui'

import ActionInput from 'material-ui/svg-icons/action/input';

import API from '../../api'
import AppHeader from '../../containers/AppHeader'

// TODO

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { username: '', password: '' }
  }

  componentWillMount() {

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
    const params =  this.state
    API.postLogin(params)
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />

        <AppHeader title="Login" leftIcon={null} />

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

export default connect()(Login)
