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
 * Individual Review Page
 */
class Review extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantDetailReview(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setReview(data))
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
    const { dispatch, common, review } = this.props
    const { location, params } = this.context

    if (isEmpty(review) || params.restaurantId !== common.id) {
      Review.fetchData(location.query, params, dispatch)
    }
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantDetailReview" />
      </div>
    )
  }
}

export default connect(state => ({
  common: state.restaurantDetail.common,
  review: state.restaurantDetail.review,
}))(Review)
