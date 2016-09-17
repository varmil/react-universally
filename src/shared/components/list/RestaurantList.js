import React, { Component } from 'react'
import { Link } from 'react-router'
import RestaurantListItem from './RestaurantListItem'
import { Flex, Box } from 'reflexbox'

const linkStyle = {
  textDecoration: 'none'
}

class RestaurantList extends Component {
  // INFO: http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
  render() {
    const restaurants = this.props.restaurants.dict
    return (
      <div>
        <Flex wrap justify="center">
          {Object.keys(restaurants).map(restaurantId =>
            <Box key={`Box${restaurantId}`} sm={12} md={6} lg={4} style={{ maxWidth: 450, margin: 6 }}>
              <Link key={`Link${restaurantId}`} to={`/restaurant/detail/${restaurantId}`} style={linkStyle} >
                <RestaurantListItem
                  key={`RestaurantListItem${restaurantId}`}
                  data={restaurants[restaurantId]}
                />
              </Link>
            </Box>
          )}
        </Flex>
      </div>
    )
  }
}


export default RestaurantList
