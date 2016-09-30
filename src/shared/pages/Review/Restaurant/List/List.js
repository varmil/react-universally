import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

import AppHeader from '../../../../containers/AppHeader'
import SearchBoxContainer from '../../../../containers/SearchBox'
import RestaurantSimpleList from '../../../../components/list/RestaurantSimpleList'

import API from '../../../../api'

import * as restaurantsActions from '../../../../actions/restaurants'
import * as errorsActions from '../../../../actions/errors'


class List extends Component {
  // TODO: 「現在地」をデフォルトクエリにして検索結果をFetch
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
    const { dispatch, restaurants } = this.props
    const { location, params } = this.context

    if (isEmpty(restaurants.dict)) {
      List.fetchData(location.query, params, dispatch)
    }
  }




  onTapRestaurant(e, restaurantId) {
    e.preventDefault()
    this.props.router.push(`/review/edit/${restaurantId}`)
  }

  onTapDetail(e, restaurantId) {
    e.preventDefault()
    this.props.router.push(`/restaurant/detail/${restaurantId}`)
  }


  render() {
    const { restaurants } = this.props
    return (
      <div>
        <Helmet title="ReviewRestaurantList" />

        <AppHeader title="投稿するお店を選ぶ" zDepth={0} />

        <SearchBoxContainer />

        <RestaurantSimpleList restaurants={restaurants.dict}
          onTapItem={::this.onTapRestaurant} onTapDetail={::this.onTapDetail} />
      </div>
    )
  }
}

const DecoratedList = withRouter(List);
export default connect(
  (state) => {
    const { searchForm, restaurants } = state
    return {
      areaText: searchForm.areaText,
      genreText: searchForm.genreText,
      restaurants,
    }
   }
)(DecoratedList)
