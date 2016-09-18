import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Paper, FloatingActionButton } from 'material-ui';
import { filter } from 'lodash';

import ActionSearch from 'material-ui/svg-icons/action/search';
import MapNearMe from 'material-ui/svg-icons/maps/near-me';

import styles from './index.css'
import markers from '../../stub/markers'
import GoogleMap from 'google-map-react'


import AppHeader from '../../containers/AppHeader'
import MapMarker from '../../components/MapMarker'
import RstSortMenu from '../../components/header/RstSortMenu'


const URL_KEYS = {
  key: process.env.GMAP_API_KEY
}

const MAP_OPTIONS = {
  panControl: false,
  mapTypeControl: false,
  scrollwheel: true,
  zoomControl: false,
}

const style = {
  position: 'fixed',
  left: '12%',
  bottom: 15,
  height: 55,
  width: '76%',
};

const centerLat = markers.minLat + ((markers.maxLat - markers.minLat) / 2)
const centerLng = markers.minLng + ((markers.maxLng - markers.minLng) / 2)

class SearchMap extends Component {
  static defaultProps = {
    center: { lat: centerLat, lng: centerLng },
    zoom: 16,
    greatPlaceCoords: {lat: null, lng: null }
  }

  constructor(props) {
    console.warn('key', URL_KEYS.key)
    super(props);

    // TODO: stateではなくstoreで管理すべきだろう
    this.state = { popInfo: undefined, markers: this.findInitialMarkers() }
  }




  // XXX
  findInitialMarkers() {
    return markers.Markers.slice(0, 20)
  }

  // XXX 本当はサーバ側でDBから取得
  fetchMarkers(center, bounds) {
    const latIsIn = (lat) => lat >= bounds.se.lat && lat <= bounds.nw.lat
    const lngIsIn = (lng) => lng >= bounds.nw.lng && lng <= bounds.se.lng

    return filter(markers.Markers, (marker, index) => {
      return latIsIn(marker.lat) && lngIsIn(marker.lng)
    })
  }

  // onClick({x, y, lat, lng, event}) {
  // }

  onChange({ center, zoom, bounds }) {
    // TODO: 見つけたmarkersをstateにset。本当はmarkers-storeとか使うべきかも。
    const markers = this.fetchMarkers(center, bounds).slice(0, 20)
    this.setState({ markers: markers })
  }

  onTapMarker(id) {
    console.log('TAPTAP: ', id)
    this.setState({ popInfo: markers.Markers[id].content })
  }

  onChangeRstSortMenu(e, key, payload) {
    console.log(e, key, payload)
  }

  onTapSearchButton(e) {
    this.props.router.push('/search/regular')
  }

  onTapMyPlaceButton(e) {
  }

  // Make sure the container element has width and height.
  // The map will try to fill the parent container,
  // but if the container has no size, the map will collapse to 0 width / height.
  render() {
    return (
      <div>
        <AppHeader title={<RstSortMenu onChange={::this.onChangeRstSortMenu} />} />

        <div className={styles.container}>
          <GoogleMap
            options={MAP_OPTIONS}
            bootstrapURLKeys={URL_KEYS}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onChange={this.onChange.bind(this)}
          >
            {this.state.markers.map((marker, index) =>
              <MapMarker key={index} onTouchTap={() => this.onTapMarker(index)} lat={marker.lat} lng={marker.lng} text={index.toString()} />
            )}
          </GoogleMap>
        </div>

        <div className={styles.floatButtonContainer}>
          <FloatingActionButton onTouchTap={::this.onTapMyPlaceButton} secondary={false} className={`${styles.floatMyPlaceButton}`} mini={true}>
            <MapNearMe />
          </FloatingActionButton>

          <FloatingActionButton onTouchTap={::this.onTapSearchButton} secondary={false} className={`${styles.floatSearchButton}`} mini={true}>
            <ActionSearch />
          </FloatingActionButton>
        </div>

        <Paper style={style} zDepth={0}>
          <div dangerouslySetInnerHTML={{__html: this.state.popInfo}} />
        </Paper>
      </div>
    )
  }
}

export default connect()(withRouter(SearchMap))
