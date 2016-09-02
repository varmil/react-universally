import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router'

import { AppBar, ListItem, List, Divider } from 'material-ui';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  onListItemTaped(link) {
    // Programmatically navigate using react router
    // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.router.push(link);
  }

  render() {
    return (
      <div>
        <header className="header-container">
          <AppBar title={ this.props.title } />

          <List>
            <ListItem onTouchTap={this.onListItemTaped.bind(this, "/")} primaryText="To Home" leftIcon={<ContentInbox />} />
            <ListItem onTouchTap={this.onListItemTaped.bind(this, "/about")} primaryText="To About" leftIcon={<ActionGrade />} />
          </List>
          <Divider />
          <List>
            <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
          </List>
        </header>
      </div>
    );
  }
}

const DecoratedHeader = withRouter(Header);
export default DecoratedHeader;
