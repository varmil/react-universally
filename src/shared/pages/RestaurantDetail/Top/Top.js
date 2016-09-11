import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { Paper, Divider, List, ListItem, GridList, GridTile, RaisedButton } from 'material-ui'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import {indigo500} from 'material-ui/styles/colors';

import API from '../../../api'
import styles from '../index.css'
import FiveStar from '../../../components/FiveStar'
import ReviewCount from '../../../components/ReviewCount'
import ReviewListItem from '../../../components/ReviewListItem'

import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'

class Top extends Component {
  static fetchData({ params, dispatch }) {
    return API.fetchRestaurantDetailTop(params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setTop(data))
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
      })
  }

  componentWillMount() {
    const { params, dispatch } = this.props

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    if (true) {
      Top.fetchData({ params, dispatch })
    }
  }

  createReadMoreButton(label) {
    return (
      <div className={`${styles.readMore}`}>
        <RaisedButton
          label={label}
          labelPosition="before"
          primary={true}
          icon={<ChevronRight />}
          style={styles.button}
        />
      </div>
    )
  }

  createPostedPhotoContent() {
    const postedPhotos = this.props.top.postedPhotos || []

    return (
      <div>
        <Paper className={styles.paperHeader}>
          投稿写真
        </Paper>

        <div className={styles.gridListContainer}>
          <GridList
            cellHeight={100}
            cols={3}
            style={styles.gridList}
          >
            {postedPhotos.map((photo, index) => (
              <GridTile key={photo.src}>
                <img src={photo.src} role='presentation' />
              </GridTile>
            ))}
          </GridList>
        </div>
        {this.createReadMoreButton('See All Photos')}
      </div>
    )
  }

  render() {
    const { name, rating, reviewCount, address, tel } = this.props.common
    const postedReviews = this.props.top.postedReviews || []

    return (
      <div>
        <Helmet title="RestaurantDetailTop" />

        <Paper>
          <div className={styles.leftAndRightMargin}>
            <h2 className={styles.rstName}>{name}</h2>
            <div className={styles.topPageFiveStar}>
              <FiveStar rating={rating} />
              <ReviewCount count={reviewCount} />
            </div>
          </div>

          {this.createPostedPhotoContent()}


          <Paper className={styles.paperHeader}>
            口コミ
          </Paper>
          {postedReviews.map((review, index) => (
            <ReviewListItem key={`review${index}`} rating={review.rating} />
          ))}
          {this.createReadMoreButton('See All Reviews')}


          <Paper className={styles.paperHeader}>
            お問い合わせ・地図
          </Paper>
          <List>
            <ListItem
              leftIcon={<CommunicationCall color={indigo500} />}
              rightIcon={<ChevronRight />}
              primaryText={tel}
              secondaryText="Tel"
            />
          </List>
          <Divider inset={true} />
          <List>
            <ListItem
              leftIcon={<MapsPlace color={indigo500} />}
              rightIcon={<ChevronRight />}
              primaryText={address}
              secondaryText="Address"
            />
          </List>


          <Paper className={styles.paperHeader}>
            店舗情報
          </Paper>
        </Paper>
      </div>
    )
  }
}

// NOTE: We must watch the prop "restaurantDetail.nowLoading", so get it for props
export default connect(state => ({
  common: state.restaurantDetail.common,
  top: state.restaurantDetail.top
}))(Top)
