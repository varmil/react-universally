import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import GoogleMap from 'google-map-react'

import { Paper, DropDownMenu, GridList, GridTile, } from 'material-ui'

import MapMarker from '../../../components/MapMarker'

const URL_KEYS = {
  key: process.env.GMAP_API_KEY
}

const MAP_OPTIONS = {
  panControl: false,
  mapTypeControl: false,
  scrollwheel: true,
  zoomControl: false,
}

const addressTextStyle = {
  padding: 15,
  fontSize: 15,
}

const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  bottom: 0,
  paddingTop: 200,
  zIndex: -1,
}


class Access extends Component {
  render() {
    // block
    if (!this.props.center.lat || !this.props.center.lng) return

    return (
      <div>
        <Helmet title="RestaurantDetailAccess" />

        <h2 style={addressTextStyle}>{this.props.address}</h2>

        <div style={containerStyle}>
          <GoogleMap
            options={MAP_OPTIONS}
            bootstrapURLKeys={URL_KEYS}
            defaultCenter={this.props.center}
            defaultZoom={16}
          >
            <MapMarker lat={this.props.center.lat} lng={this.props.center.lng} text='koko' />
          </GoogleMap>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const common = state.restaurantDetail.common
  return {
    address: common.address,
    center: { lat: common.lat, lng: common.lng }
  }
})(Access)
