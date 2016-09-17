import React, { Component } from 'react'
import { withRouter } from 'react-router'
import RestaurantListItem from './RestaurantListItem'
import { Flex, Box } from 'reflexbox'


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
        <Flex wrap>
          {Object.keys(restaurants).map(restaurantId =>
            <Box key={`Box${restaurantId}`} sm={12} md={6} lg={4}>
              <RestaurantListItem
                key={`RestaurantListItem${restaurantId}`}
                data={restaurants[restaurantId]}
                onTapItem={(e) => this.onTapItem(e, restaurantId)}
              />
            </Box>
          )}
        </Flex>
      </div>
    )
  }
}


export default withRouter(RestaurantList)
