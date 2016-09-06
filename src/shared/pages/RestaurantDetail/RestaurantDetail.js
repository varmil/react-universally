import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Tabs, Tab } from 'material-ui'
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import EditorCoupon from 'material-ui/svg-icons/editor/monetization-on';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'

import API from '../../api'
import * as restaurantDetailActions from '../../actions/restaurantDetail'

class RestaurantDetail extends Component {
  static fetchData({ params, dispatch }) {
    return API.fetchRestaurantDetail(params).then((data) => {
      dispatch(restaurantDetailActions.set(data))
    })
  }

  constructor(props) {
    super(props);
    // HACK: basePathはImmutableな値なのでstateに入れたくないが他の方法を知らない
    let pathname = props.location.pathname
    pathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    this.state = { tabsValue: '', basePath: pathname }
  }

  // TODO: ここがエントリーポイントになった際にサーバからデータフェッチ。restaurantDetail Storeを更新
  componentWillMount() {
    const { params, dispatch } = this.props

    // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
    if (true) {
      RestaurantDetail.fetchData({ params, dispatch })
    }
  }

  onChangeTabs(value) {
    const currentState = this.state
    // this.setState({ ...currentState, tabsValue: value })
    this.props.router.push(`${currentState.basePath}${value}`)
  }

  render() {
    return (
      <div>
        <Tabs value={this.state.tabsValue} onChange={::this.onChangeTabs}>
          <Tab
            icon={<MapsRestaurant />}
            label="TOP"
            value=''
          />
          <Tab
            icon={<ImagePhotoCamera />}
            label="PHOTO"
            value='/photo'
          />
          <Tab
            icon={<MapsPinDrop />}
            label="ACCESS"
            value='/access'
          />
          <Tab
            icon={<EditorCoupon />}
            label="COUPON"
            value='/coupon'
          />
        </Tabs>

        {this.props.children}
      </div>
    )
  }
}

const DecoratedRestaurantDetail = withRouter(RestaurantDetail)
export default connect()(DecoratedRestaurantDetail)
