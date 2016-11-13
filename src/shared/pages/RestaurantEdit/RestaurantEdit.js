import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { TextField, RaisedButton } from 'material-ui'

import ActionInput from 'material-ui/svg-icons/action/input';

import API from '../../api'
import AppHeader from '../../containers/AppHeader'
import * as userActions from '../../actions/user'

class RestaurantEdit extends Component {

  constructor(props) {
    super(props)
    this.state = { rstName: '', password: '', errMsg: '' }
  }




  onChangeRstName(e, value) {
    console.log(value)
    this.setState({ ...this.state, rstName: value })
  }

  onChangePassword(e, value) {
    console.log(value)
    this.setState({ ...this.state, password: value })
  }

  onSubmit(e) {
    const { dispatch } = this.props
    const { rstName, password } = this.state
    const params =  { rstName, password }

    API.postLogin(params)
      .then(({ data }) => {
        // リダイレクトはHigher Componentで制御する（GuestOnly）
        dispatch(userActions.setId(data.id))
      })
      .catch((reason) => {
        this.setState({ ...this.state, errMsg: reason.toString() })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantEdit" />
        <AppHeader title="Add Restaurant" />

        <TextField
          id="TextField-RstName"
          floatingLabelText="Restaurant Name"
          onChange={::this.onChangeRstName}
        />
        <div>ex) Malis Cambodian Restaurant</div>

        <TextField
          id="TextField-RstAddress"
          floatingLabelText="Restaurant Address"
          onChange={::this.onChangeRstName}
        />
        <div>ex) 136 Norodom Boulevard, Phnom Penh 12101, Cambodia</div>

        <TextField
          id="TextField-RstPhone"
          floatingLabelText="Restaurant Phone Number"
          onChange={::this.onChangeRstName}
        />
        <div>ex) 85515814888</div>



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

export default connect()(withRouter(RestaurantEdit))
