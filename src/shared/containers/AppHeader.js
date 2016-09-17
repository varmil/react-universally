import React, { Component } from 'react';
import { withRouter } from 'react-router'

import { AppBar, FlatButton, IconButton, } from 'material-ui';
import NavArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const REFERER_PATH = '/search/top'

class AppHeader extends Component {

  onTapArrowBack(e, arrowLink) {
    e.preventDefault()
    this.props.router.push(arrowLink || REFERER_PATH)
  }

  createLoginButton() {
    return(
      <FlatButton
        label="LOGIN"
        onTouchTap={this.props.onLoginButtonTap}
      />
    )
  }

  createAppBar() {
    const { arrowLink, title, leftIcon, rightIcon, zDepth } = this.props

    const myLeftIcon = (leftIcon) ?
      leftIcon :
      (<IconButton onTouchTap={(e) => this.onTapArrowBack(e, arrowLink)}><NavArrowBack /></IconButton>)

    const myRightIcon = (rightIcon) ?
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
    );
  }
}

const DecoratedHeader = withRouter(AppHeader);
export default DecoratedHeader;
