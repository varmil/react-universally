import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { AppBar, FlatButton, IconButton, Tabs, Tab } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionPermMedia from 'material-ui/svg-icons/action/perm-media';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import NavArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

const REFERER_PATH = '/search/top'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  }

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

  createHeaderBar() {
    const { location } = this.props

    if (location.pathname === '/search/top') {
      return (
        <Tabs>
          <Tab icon={<ActionSearch />} />
          <Tab icon={<ActionPermMedia />} />
          <Tab icon={<ActionAccountCircle />} />
        </Tabs>
      )
    } else {
      return (
        <AppBar
          title={location.pathname}
          iconElementLeft={<IconButton onTouchTap={::this.onTapArrowBack}><NavArrowBack /></IconButton>}
          iconElementRight={this.createLoginButton()}
        />
      )
    }
  }

  // TODO: header typeの切り替えをどうやるか？URLを見て？ --> this.props.location
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
const HeaderContainer = connect()(DecoratedHeader)
export default HeaderContainer;
