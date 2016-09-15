import { find } from 'lodash'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { isEmpty, values } from 'lodash'

import { Paper, Tabs, Tab } from 'material-ui'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import EditorCoupon from 'material-ui/svg-icons/editor/monetization-on';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'
import CommunicationCall from 'material-ui/svg-icons/communication/call'
import SocialShare from 'material-ui/svg-icons/social/share'
import MapsRateReview from 'material-ui/svg-icons/maps/rate-review'

import styles from './index.css'
import API from '../../api'
import * as restaurantDetailActions from '../../actions/restaurantDetail'
import * as errorsActions from '../../actions/errors'


const BOTTOM_NAVIGATION_HEIGHT = 50

// bottomNavIcon用
const BOTTOM_NAVIGATION_PHONE = 0
const BOTTOM_NAVIGATION_SHARE = 1

// HACK: pathをconstで書くのはどうなのか…
const BASE_PATH = '/restaurant/detail'

// the values is URL related
const TABS = {
  PHOTO: 'photo',
  REVIEWS: 'reviews',
  ACCESS: 'access',
  COUPON: 'coupon',
}

class RestaurantDetail extends Component {
  static fetchData(query, params, dispatch) {
    // dispatch(restaurantDetailActions.fetchStart())
    return API.fetchRestaurantDetailCommon(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setCommon(data))
        // dispatch(restaurantDetailActions.fetchSuccess())
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
        // dispatch(restaurantDetailActions.fetchError())
      })
  }

  static contextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }




  constructor(props) {
    super(props)
    const tabsValue = this.getCurrentTabsValue(props.location.pathname)
    this.state = { tabsValue }
  }

  componentWillMount() {
    const { dispatch, common } = this.props
    const { location, params } = this.context

    // 今見ようとしているレストランIDと、store内のレストランIDとを比較
    if (isEmpty(common) || params.restaurantId !== common.id) {
      RestaurantDetail.fetchData(location.query, params, dispatch)
    }
  }

  getCurrentTabsValue(pathname) {
    // HACK: URLを無理やりパースして、現在どのタブをアクティブにするべきか判定
    const splitedPathname = pathname.split('/')
    return find(values(TABS), (e) => splitedPathname.indexOf(e) !== -1)
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


  createTabs() {
    // FIXME: matchしなかった場合、タブを表示させない。TOPでうまくうごかない。要件としては個別レビュー表示時にどうするか
    // if (this.getCurrentTabsValue(this.props.location.pathname) === undefined) return null

    return (
      <Tabs value={this.state.tabsValue} onChange={::this.onChangeTabs}>
        <Tab
          icon={<MapsRestaurant />}
          // label="TOP"
          value=''
        />
        <Tab
          icon={<ImagePhotoCamera />}
          // label="PHOTO"
          value={TABS.PHOTO}
        />
        <Tab
          icon={<MapsRateReview />}
          // label="REVIEW"
          value={TABS.REVIEWS}
        />
        <Tab
          icon={<MapsPinDrop />}
          // label="ACCESS"
          value={TABS.ACCESS}
        />
        <Tab
          icon={<EditorCoupon />}
          // label="COUPON"
          value={TABS.COUPON}
        />
      </Tabs>
    )
  }

  createContent() {
    const props = this.props

    return (<div>{props.children}</div>)

    // return props.nowLoading ? (
    //   <div>"NOW LOADING CONTENT"</div>
    // )
    // :
    // (
    //   <div>{props.children}</div>
    // )
  }

  createBottomNavigation() {
    // アクセス画面ではGoogle Mapを使うのでフッターを消す
    if (this.getCurrentTabsValue(this.props.location.pathname) === TABS.ACCESS) return null

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
        {this.createTabs()}

        {this.createContent()}

        {this.createBottomNavigation()}
      </div>
    )
  }
}

const DecoratedRestaurantDetail = withRouter(RestaurantDetail)
export default connect(state => ({ common: state.restaurantDetail.common }))(DecoratedRestaurantDetail)
