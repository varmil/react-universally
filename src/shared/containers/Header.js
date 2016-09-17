import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { AppBar, FlatButton, IconButton, Tabs, Tab } from 'material-ui';
import NavArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const REFERER_PATH = '/search/top'

class Header extends Component {
  onTapListItem(link) {
    // Programmatically navigate using react router
    // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.router.push(link);
  }

  onTapArrowBack(e) {
    e.preventDefault()
    this.props.router.push(REFERER_PATH)
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
    const { title, leftIcon } = this.props
    const myLeftIcon = (leftIcon) ?
      leftIcon :
      (<IconButton onTouchTap={::this.onTapArrowBack}><NavArrowBack /></IconButton>)


    return (
      <AppBar
        title={title}
        iconElementLeft={myLeftIcon}
        iconElementRight={this.createLoginButton()}
        titleStyle={{ fontSize: 13 }}
      />
    )
  }

  createHeaderBar() {
    return this.createAppBar()
  }

  // header typeの切り替えをどうやるか？URLを見て？ --> this.props.location
  render() {
    return (
      <div>
        <header className="header-container">
          {this.createHeaderBar()}
        </header>
      </div>
    );
  }
}

const DecoratedHeader = withRouter(Header);
const HeaderContainer = connect(state => state.header)(DecoratedHeader)
export default HeaderContainer;
