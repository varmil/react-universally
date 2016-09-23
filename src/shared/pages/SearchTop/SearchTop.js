import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter, Link } from 'react-router'

import { FloatingActionButton, List, /*Tabs, Tab*/ } from 'material-ui'

// import ActionSearch from 'material-ui/svg-icons/action/search'
// import ActionPermMedia from 'material-ui/svg-icons/action/perm-media'
// import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance'
import MapsMap from 'material-ui/svg-icons/maps/map'
import MapsNearMe from 'material-ui/svg-icons/maps/near-me'

import AppHeader from '../../containers/AppHeader'
import ImgTextGrid from '../../components/ImgTextGrid'
import InlineSearchForm from '../../components/InlineSearchForm'

import * as searchFormActions from '../../actions/searchForm'
import styles from './index.css'


class SearchTop extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  onChangeAreaForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setAreaText(e.target.value))
  }

  onChangeGenreForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setGenreText(e.target.value))
  }

  render() {
    const { areaText, genreText } = this.props
    return (
      <div>
        <Helmet title="SearchTop" />

        <AppHeader title="foodbook" leftIcon={null} zDepth={0} />

        {/* <Tabs>
          <Tab icon={<ActionSearch />} />
          <Tab icon={<ActionPermMedia />} />
          <Tab icon={<ActionAccountCircle />} />
        </Tabs> */}

        <div className={styles.searchFormContainer}>
          <InlineSearchForm
            areaFormValue={areaText}
            genreFormValue={genreText}
            onChangeAreaForm={::this.onChangeAreaForm}
            onChangeGenreForm={::this.onChangeGenreForm}
          />
        </div>

        <List>
          <ImgTextGrid
            img={
              <MapsMap
                style={{ width: 50, height: 50, position: 'relative', top: 10 }}
                color={this.context.muiTheme.palette.primary1Color} />
            }
            text={<span>エリア・駅・条件<br />からお店を探す</span>}
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

const DecoratedSearchTop = withRouter(SearchTop)
const SearchTopContainer = connect(state => state.searchForm)(DecoratedSearchTop)
export default SearchTopContainer
