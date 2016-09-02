import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { AppBar, ListItem, List, Divider, FlatButton, Tabs, Tab } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionPermMedia from 'material-ui/svg-icons/action/perm-media';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';


class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  onListItemTaped(link) {
    // Programmatically navigate using react router
    // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.router.push(link);
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
          iconElementRight={this.createLoginButton()}
        />
      )
    }
  }

  debug() {
    return(
      <div>
        <List>
          <ListItem onTouchTap={this.onListItemTaped.bind(this, "/")} primaryText="To Home" leftIcon={<ContentInbox />} />
          <ListItem onTouchTap={this.onListItemTaped.bind(this, "/about")} primaryText="To About" leftIcon={<ActionGrade />} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
        </List>
      </div>
    )
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
