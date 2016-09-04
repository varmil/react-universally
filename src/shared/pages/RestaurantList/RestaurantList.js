import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search';

import RestaurantListContainer from '../../containers/RestaurantList'
import styles from './index.css'

class RestaurantList extends Component {
  onTapSearchButton(e) {
    e.preventDefault()
    this.props.router.push({
      pathname: '/search/regular',
    })
  }

  // TODO: Componentsに切り出すか、もっとちゃんと表示整える
  createBottomButtonLabel() {
    const { area, genre, lowerLimitBudget } = this.props.searchForm
    return (
      `7777件 ${area} ${genre} ${lowerLimitBudget}`
    )
  }

  render() {
    console.log(this.props.searchForm)
    return (
      <div>
        <Helmet title="RestaurantList" />

        <RestaurantListContainer />

        <div className={`${styles.fixedBottom}`}>
          <RaisedButton onTouchTap={::this.onTapSearchButton} className={`${styles.raisedButton}`} label={this.createBottomButtonLabel()} secondary={true} />
          <FloatingActionButton onTouchTap={::this.onTapSearchButton} secondary={true} className={`${styles.floatButton}`} mini={true}>
            <ActionSearch />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

const DecoratedRestaurantList = withRouter(RestaurantList);
export default connect(
  (state) => {
    const { searchForm } = state
    return { searchForm }
   }
)(DecoratedRestaurantList)
