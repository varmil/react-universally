import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { FloatingActionButton, RaisedButton } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search';

import Restaurants from '../../components/RestaurantList'
import styles from './index.css'
import API from '../../api'
import * as restaurantsActions from '../../actions/restaurants'
import * as errorsActions from '../../actions/errors'


class RestaurantList extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantList(query, params)
      .then(({ data }) => {
        dispatch(restaurantsActions.replaceRestaurants(data))
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
      })
  }

  static contextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }




  componentWillMount() {
    const { dispatch } = this.props
    const { location, params } = this.context

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    if (true) {
      RestaurantList.fetchData(location.query, params, dispatch)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.info('componentWillUpdate', nextProps, nextState)
  }




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
    return (
      <div>
        <Helmet title="RestaurantList" />

        <Restaurants restaurants={this.props.restaurants} />

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
    const { searchForm, restaurants } = state
    return { searchForm, restaurants }
   }
)(DecoratedRestaurantList)
