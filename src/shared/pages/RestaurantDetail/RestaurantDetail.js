import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'


class RestaurantDetail extends Component {
  render() {
    return (
      <div>
        <Helmet title="RestaurantDetail" />
      </div>
    )
  }
}

export default connect()(RestaurantDetail)
