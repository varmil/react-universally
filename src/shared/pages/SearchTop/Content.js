import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'

import { FloatingActionButton, List } from 'material-ui'

import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance'
import MapsMap from 'material-ui/svg-icons/maps/map'
import MapsNearMe from 'material-ui/svg-icons/maps/near-me'

import styles from './index.css'
import ImgTextGrid from '../../components/ImgTextGrid'


class Content extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div style={{ marginTop: 30 }}>
        <List>
          <ImgTextGrid
            img={
              <MapsMap
                style={{ width: 50, height: 50, position: 'relative', top: 10 }}
                color={this.context.muiTheme.palette.primary1Color} />
            }
            text={<span>詳細条件<br />からお店を探す</span>}
            style={{ marginBottom: 10 }}
            href={`/search/regular`}
          />

          {/* TODO: クエリに現在地を設定して検索 */}
          <ImgTextGrid
            img={
              <MapsNearMe
                style={{ width: 50, height: 50, position: 'relative', top: 10 }}
                color={this.context.muiTheme.palette.primary1Color} />
            }
            text={<span>現在地周辺<br />からお店を探す</span>}
            href={`/restaurant/list`}
          />
        </List>

        <Link to={`/review/restaurant/list`}>
          <FloatingActionButton secondary={true} className={styles.pen}>
            <ContentCreate />
          </FloatingActionButton>
        </Link>
        <Link to={`/review/restaurant/list`}>
          <FloatingActionButton secondary={true} className={styles.camera}>
            <ActionCameraEnhance />
          </FloatingActionButton>
        </Link>
      </div>
    )
  }
}

const DecoratedContent = withRouter(Content)
const ContentContainer = connect()(DecoratedContent)
export default ContentContainer
