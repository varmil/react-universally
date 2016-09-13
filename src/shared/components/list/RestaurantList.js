import React, { Component } from 'react'
import { withRouter } from 'react-router'
import RestaurantListItem from './RestaurantListItem'


class RestaurantList extends Component {
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


export default withRouter(RestaurantList)
