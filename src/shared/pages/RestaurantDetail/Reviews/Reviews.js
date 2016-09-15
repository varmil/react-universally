import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'

import { Paper, DropDownMenu, GridList, GridTile, } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import API from '../../../api'
import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'

/**
 * Review List Page
 */
class Reviews extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantDetailReviews(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setReviews(data))
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
    const { dispatch, common, reviews } = this.props
    const { location, params } = this.context

    if (isEmpty(reviews) || params.restaurantId !== common.id) {
      Reviews.fetchData(location.query, params, dispatch)
    }
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantDetailReviews" />
      </div>
    )
  }
}

// NOTE: We must watch the prop "restaurantDetail.nowLoading", so get it for props
export default connect(state => ({
  common: state.restaurantDetail.common,
  reviews: state.restaurantDetail.reviews,
}))(Reviews)
