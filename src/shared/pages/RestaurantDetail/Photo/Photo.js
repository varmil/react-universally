import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { Paper, DropDownMenu, GridList, GridTile, } from 'material-ui'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';

import API from '../../../api'
import styles from '../index.css'
import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'

const ICON_HEIGHT = 24
const TOOLBAR_HEIGHT = 40
const TOOLBAR_HEIGHT_PX = `${TOOLBAR_HEIGHT}px`

class Photo extends Component {
  static fetchData({ params, dispatch }) {
    return API.fetchRestaurantDetailPhoto(params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setPhoto(data))
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
      })
  }

  constructor(props) {
     super(props);
     this.state = { value: 1 }
   }

   componentWillMount() {
     const { params, dispatch } = this.props

     // TODO: Server側でもFETCH出来るように。また初期ロード時に二重通信しないようにしたい。
     if (true) {
       Photo.fetchData({ params, dispatch })
     }
   }

  handleChange = (event, index, value) => this.setState({ value });

  createToolbar() {
    return (
      <Paper>
        <Toolbar style={{ height: TOOLBAR_HEIGHT_PX, backgroundColor: 'white' }}>
          <ToolbarGroup>
            <ToolbarTitle text="写真一覧" style={{ fontSize: 14, lineHeight: TOOLBAR_HEIGHT_PX }} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <DropDownMenu
              value={this.state.value} onChange={this.handleChange}
              style={{ height: TOOLBAR_HEIGHT_PX }}
              labelStyle={{ lineHeight: TOOLBAR_HEIGHT_PX }}
              iconStyle={{ top: `${(TOOLBAR_HEIGHT - ICON_HEIGHT) / 2}px` }}
            >
              <MenuItem value={1} primaryText="すべて" />
              <MenuItem value={2} primaryText="料理" />
              <MenuItem value={3} primaryText="内観" />
              <MenuItem value={4} primaryText="外観" />
              <MenuItem value={5} primaryText="その他" />
            </DropDownMenu>
          </ToolbarGroup>
        </Toolbar>
      </Paper>
    )
  }

  createPostedPhotoContent() {
    const photoList = this.props.photo.list || []

    return (
      <div>
        <div className={styles.gridListContainer}>
          <GridList
            cellHeight={100}
            cols={3}
            style={styles.gridList}
          >
            {photoList.map((photo, index) => (
              <GridTile key={photo.src}>
                <img src={photo.src} role='presentation' />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantDetailPhoto" />

        {this.createToolbar()}

        {this.createPostedPhotoContent()}
      </div>
    )
  }
}

// NOTE: We must watch the prop "restaurantDetail.nowLoading", so get it for props
export default connect(state => ({
  photo: state.restaurantDetail.photo
}))(Photo)
