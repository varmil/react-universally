import { find } from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Paper, Tabs, Tab } from 'material-ui'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import EditorCoupon from 'material-ui/svg-icons/editor/monetization-on';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import SocialShare from 'material-ui/svg-icons/social/share'

import styles from './index.css'
import API from '../../api'
import * as restaurantDetailActions from '../../actions/restaurantDetail'


const BOTTOM_NAVIGATION_HEIGHT = 50

// bottomNavIcon用
const BOTTOM_NAVIGATION_PHONE = 0
const BOTTOM_NAVIGATION_SHARE = 1

// HACK: pathをconstで書くのはどうなのか…
const BASE_PATH = '/restaurant/detail'

class RestaurantDetail extends Component {
  static fetchData({ params, dispatch }) {
    dispatch(restaurantDetailActions.fetchStart())
    return API.fetchRestaurantDetail(params).then((data) => {
      dispatch(restaurantDetailActions.set(data))
      dispatch(restaurantDetailActions.fetchSuccess())
    })
  }

  constructor(props) {
    super(props);

    // HACK: URLを無理やりパースして、現在どのタブをアクティブにするべきか判定
    const splitedPathname = props.location.pathname.split('/')
    const tabsValue = find(['photo', 'access', 'coupon'], (e) => splitedPathname.indexOf(e) !== -1)

    this.state = { tabsValue }
  }

  // TODO: ここがエントリーポイントになった際にサーバからデータフェッチ。restaurantDetail Storeを更新
  componentWillMount() {
    const { params, dispatch } = this.props

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    if (true) {
      RestaurantDetail.fetchData({ params, dispatch })
    }
  }

  onChangeTabs(tabsValue) {
    const { restaurantId } = this.props.params
    const currentState = this.state
    this.setState({ ...currentState, tabsValue })
    this.props.router.push(`${BASE_PATH}/${restaurantId}/${tabsValue}`)
  }

  onTapBottomNavigation(type) {
    // TODO: インテント起動
  }

  createContent() {
    const props = this.props
    return props.restaurantDetail.nowLoading ? (
      <div>"NOW LOADING CONTENT"</div>
    )
    :
    (
      <div>{props.children}</div>
    )
  }

  createBottomNavigation() {
    return (
      <Paper style={{ position: 'fixed', bottom: 0, width: '100%', height: BOTTOM_NAVIGATION_HEIGHT }} zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            icon={<CommunicationCall className={styles.bottomNavIcon} />}
            onTouchTap={() => this.onTapBottomNavigation(BOTTOM_NAVIGATION_PHONE)}
          />
          <BottomNavigationItem
            icon={<SocialShare className={styles.bottomNavIcon} />}
            onTouchTap={() => this.onTapBottomNavigation(BOTTOM_NAVIGATION_SHARE)}
          />
        </BottomNavigation>
      </Paper>
    )
  }

  render() {
    return (
      <div style={{ marginBottom: BOTTOM_NAVIGATION_HEIGHT }}>
        <Tabs value={this.state.tabsValue} onChange={::this.onChangeTabs}>
          <Tab
            icon={<MapsRestaurant />}
            label="TOP"
            value=''
          />
          <Tab
            icon={<ImagePhotoCamera />}
            label="PHOTO"
            value='photo'
          />
          <Tab
            icon={<MapsPinDrop />}
            label="ACCESS"
            value='access'
          />
          <Tab
            icon={<EditorCoupon />}
            label="COUPON"
            value='coupon'
          />
        </Tabs>

        {this.createContent()}

        {this.createBottomNavigation()}
      </div>
    )
  }
}

const DecoratedRestaurantDetail = withRouter(RestaurantDetail)
export default connect(state => ({ restaurantDetail: state.restaurantDetail }))(DecoratedRestaurantDetail)
