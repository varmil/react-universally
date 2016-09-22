import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'

import API from '../../../api'
import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'
import ReviewList from '../../../components/list/ReviewList'
import GooglePager from '../../../components/common/GooglePager'

const PAGER_TOP_BOTTOM_MARGIN = '18px'

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

  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.location.query.page || 1,
      nowLoading: false,
    }
  }

  componentWillMount() {
    const { dispatch, common, reviews } = this.props
    const { location, params } = this.context

    if (isEmpty(reviews) || params.restaurantId !== common.id) {
      Reviews.fetchData(location.query, params, dispatch)
    }
  }

  onTapPage(e, nextNum) {
    this.setState({ ...this.state, nowLoading: true })
    // TODO: async fetch
    setTimeout(() => {
      this.setState({ ...this.state, currentPage: nextNum, nowLoading: false })
    }, 300)
  }

  render() {
    const postedReviews = this.props.reviews || []

    return (
      <div>
        <Helmet title="RestaurantDetailReviews" />

        <ReviewList reviews={postedReviews} restaurantId={this.props.common.id} />

        <GooglePager
          current={this.state.currentPage}
          style={{ width: '96%', margin: `${PAGER_TOP_BOTTOM_MARGIN} auto 0` }}
          nowLoading={this.state.nowLoading}
          hideNext={false}
          onPageChanged={::this.onTapPage}
        />

        <div style={{ height: PAGER_TOP_BOTTOM_MARGIN }}></div>
      </div>
    )
  }
}

export default connect(state => ({
  common: state.restaurantDetail.common,
  reviews: state.restaurantDetail.reviews,
}))(Reviews)
