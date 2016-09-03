import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'

import * as searchFormActions from '../../actions/searchForm'
import styles from './index.css'

class RestaurantList extends Component {
  render() {
    const { area, genre, lowerLimitBudget, upperLimitBudget } = this.props
    return (
      <div>
        <Helmet title="RestaurantList" />
      </div>
    )
  }
}

const RestaurantListContainer = connect(state => state.searchForm)(RestaurantList)
export default RestaurantListContainer
