import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { AppBar, IconButton, IconMenu, MenuItem, Divider } from 'material-ui'
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import NavArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

import API from '../api'
import * as userActions from '../actions/user'

class AppHeader extends Component {

  onTapArrowBack(e, arrowLink) {
    e.preventDefault()
    // this.props.router.push(arrowLink || REFERER_PATH)
    this.props.router.goBack()
  }

  onTapLoginButton(e) {
    e.preventDefault()
  }

  createLoginButton() {
    const onTap = (e, link) => {
      e.preventDefault()
      this.props.router.push(link)
    }

    const onTapLogout = (e) => {
      e.preventDefault()
      API.postLogout().then(() => {
        // とりあえず空にしておく
        this.props.dispatch(userActions.set({}))
      })
    }

    return(
      <IconMenu
        iconButtonElement={<IconButton><ActionAccountCircle /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem onTouchTap={(e) => {}} primaryText="My Page" />
        <MenuItem onTouchTap={(e) => onTap(e, `/search/top`)} primaryText="Top" />
        <MenuItem onTouchTap={(e) => onTap(e, `/login`)} primaryText="Login" />
        <Divider />
        <MenuItem onTouchTap={onTapLogout} primaryText="Logout" />
      </IconMenu>
    )
  }

  createAppBar() {
    const { arrowLink, title, leftIcon, rightIcon, zDepth } = this.props

    const myLeftIcon = (leftIcon !== undefined) ?
      leftIcon :
      (<IconButton onTouchTap={(e) => this.onTapArrowBack(e, arrowLink)}><NavArrowBack /></IconButton>)

    const myRightIcon = (rightIcon !== undefined) ?
      rightIcon :
      this.createLoginButton()

    return (
      <AppBar
        title={title}
        zDepth={zDepth}
        iconElementLeft={myLeftIcon}
        iconElementRight={myRightIcon}
        titleStyle={{ fontSize: 13 }}
      />
    )
  }

  // header typeの切り替えをどうやるか？URLを見て？ --> this.props.location
  render() {
    return (
      <div>
        <header className="header-container">
          {this.createAppBar()}
        </header>
      </div>
    )
  }
}

const DecoratedHeader = withRouter(AppHeader)
export default connect()(DecoratedHeader)
