import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper } from 'material-ui';
import { filter } from 'lodash';

import styles from './index.css'
import markers from '../../stub/markers'
import GoogleMap from 'google-map-react'
import MapMarker from '../../components/MapMarker'

import * as headerActions from '../../actions/header'


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
  left: '15%',
  bottom: 15,
  height: 55,
  width: '70%',
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

  componentWillMount() {
    this.props.dispatch(headerActions.setTitle("標準"))
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

  // Make sure the container element has width and height.
  // The map will try to fill the parent container,
  // but if the container has no size, the map will collapse to 0 width / height.
  render() {
    return (
      <div>
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

        <Paper style={style} zDepth={0}>
          <div dangerouslySetInnerHTML={{__html: this.state.popInfo}} />
        </Paper>
      </div>
    )
  }
}

export default connect()(SearchMap)
