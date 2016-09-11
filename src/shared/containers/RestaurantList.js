import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import API from '../api'
import RestaurantListItem from '../components/RestaurantListItem'
import * as restaurantsActions from '../actions/restaurants'
import * as errorsActions from '../actions/errors'

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

  onTapItem(e, restaurantId) {
    e.preventDefault()
    this.props.router.push(`/restaurant/detail/${restaurantId}`)
  }

  // INFO: http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
  render() {
    const restaurants = this.props.restaurants.dict
    return (
      <div>
        {Object.keys(restaurants).map(restaurantId =>
          <RestaurantListItem
            key={restaurantId}
            data={restaurants[restaurantId]}
            onTapItem={(e) => this.onTapItem(e, restaurantId)}
          />
        )}
      </div>
    )
  }
}


const DecoratedRestaurantList = withRouter(RestaurantList)
const RestaurantListContainer = connect(
  (state) => {
    return {
      restaurants: state.restaurants,
    }
  }
)(DecoratedRestaurantList)
export default RestaurantListContainer
