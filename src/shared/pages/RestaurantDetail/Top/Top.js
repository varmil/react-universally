import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'

import { Paper, Divider, List, ListItem, GridList, GridTile, RaisedButton } from 'material-ui'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import {indigo500} from 'material-ui/styles/colors';

import API from '../../../api'
import TABS from '../TABS'
import styles from '../index.css'
import FiveStar from '../../../components/FiveStar'
import ReviewCount from '../../../components/ReviewCount'
import ReviewList from '../../../components/list/ReviewList'
import RstInfoSummary from '../../../components/RstInfoSummary'

import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'


const linkStyle = { textDecoration: 'none' }


class Top extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantDetailTop(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setTop(data))
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
    const { dispatch, common, top } = this.props
    const { location, params } = this.context

    if (isEmpty(top) || params.restaurantId !== common.id) {
      Top.fetchData(location.query, params, dispatch)
    }
  }





  createReadMoreButton(label, linkTab) {
    return (
      <div className={`${styles.readMore}`}>
        <Link to={`/restaurant/detail/${this.props.common.id}/${linkTab}`} style={linkStyle}>
          <RaisedButton
            label={label}
            labelPosition="before"
            primary={true}
            icon={<ChevronRight />}
            style={styles.button}
          />
        </Link>
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
            className={styles.gridList}
          >
            {postedPhotos.map((photo, index) => (
              <GridTile key={photo.src}>
                <img src={photo.src} role='presentation' />
              </GridTile>
            ))}
          </GridList>
        </div>
        {this.createReadMoreButton('See All Photos', TABS.photo)}
      </div>
    )
  }

  render() {
    const { id, name, rating, reviewCount, area, genre, address, tel } = this.props.common
    const postedReviews = this.props.top.postedReviews || []

    return (
      <div>
        <Helmet title="RestaurantDetailTop" />

        <Paper>
          <div className={styles.leftAndRightMargin} style={{ marginBottom: 10 }}>
            <h2 className={styles.rstName}>{name}</h2>

            <div className={styles.topPageFiveStar}>
              <FiveStar rating={rating} />
              <ReviewCount count={reviewCount} />
            </div>

            <div>
              <RstInfoSummary area={area} genre={genre} budget={2} />
            </div>
          </div>
          {this.createPostedPhotoContent()}


          <Paper className={styles.paperHeader}>
            口コミ
          </Paper>
          <ReviewList reviews={postedReviews} restaurantId={id} />
          {this.createReadMoreButton('See All Reviews', TABS.reviews)}


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
            <Link to={`/restaurant/detail/${id}/access`} style={linkStyle}>
              <ListItem
                leftIcon={<MapsPlace color={indigo500} />}
                rightIcon={<ChevronRight />}
                primaryText={address}
                secondaryText="Address"
              />
            </Link>
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
  top: state.restaurantDetail.top,
}))(Top)
