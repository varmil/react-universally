import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import { isEmpty } from 'lodash'

import { Paper, DropDownMenu, GridList, GridTile, } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import API from '../../../api'
import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'
import ReviewList from '../../../components/list/ReviewList'

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
    const postedReviews = this.props.reviews || []

    return (
      <div>
        <Helmet title="RestaurantDetailReviews" />

        <ReviewList reviews={postedReviews} restaurantId={this.props.common.id} onTap={() => {}}  />
      </div>
    )
  }
}

export default connect(state => ({
  common: state.restaurantDetail.common,
  reviews: state.restaurantDetail.reviews,
}))(Reviews)
