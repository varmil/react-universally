import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { Tabs, Tab } from 'material-ui'
import ImagePhotoCamera from 'material-ui/svg-icons/image/photo-camera'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import EditorCoupon from 'material-ui/svg-icons/editor/monetization-on';
import MapsPinDrop from 'material-ui/svg-icons/maps/pin-drop'

class RestaurantDetail extends Component {
  constructor(props) {
    super(props);
    // HACK: basePathはImmutableな値なのでstateに入れたくないが他の方法を知らない
    this.state = { tabsValue: '', basePath: props.location.pathname }
  }

  // TODO: ここがエントリーポイントになった際にサーバからデータフェッチ

  onChangeTabs(value) {
    const currentState = this.state
    // this.setState({ ...currentState, tabsValue: value })
    this.props.router.push(`${currentState.basePath}/${value}`)
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

        {this.props.children}
      </div>
    )
  }
}

const DecoratedRestaurantDetail = withRouter(RestaurantDetail)
export default DecoratedRestaurantDetail
