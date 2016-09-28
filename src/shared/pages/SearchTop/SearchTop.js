import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'

import { /*Tabs, Tab*/ } from 'material-ui'
// import ActionSearch from 'material-ui/svg-icons/action/search'
// import ActionPermMedia from 'material-ui/svg-icons/action/perm-media'
// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'

import Content from './Content'
import AppHeader from '../../containers/AppHeader'
import SearchBoxContainer from '../../containers/SearchBox'


class SearchTop extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <Helmet title="SearchTop" />

        <AppHeader title="foodbook" leftIcon={null} zDepth={0} />

        <SearchBoxContainer />

        <div>
          {(false/*this.state.focusing*/) ? (
            null
          ) : (
            <Content />
          )}
        </div>
      </div>
    )
  }
}

const DecoratedSearchTop = withRouter(SearchTop)
const SearchTopContainer = connect()(DecoratedSearchTop)
export default SearchTopContainer
