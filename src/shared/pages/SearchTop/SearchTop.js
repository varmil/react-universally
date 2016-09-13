import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter, Link } from 'react-router'

import { List } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import MapsMyLocation from 'material-ui/svg-icons/maps/my-location';
import { lightBlue200 } from 'material-ui/styles/colors';

import ImgTextGrid from '../../components/ImgTextGrid'
import InlineSearchForm from '../../components/InlineSearchForm'
import * as searchFormActions from '../../actions/searchForm'
import styles from './index.css'

class SearchTop extends Component {
  onChangeAreaForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setAreaText(e.target.value))
  }

  onChangeGenreForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setGenreText(e.target.value))
  }

  onTapListItem(e, link) {
    e.preventDefault()
    // Programmatically navigate using react router
    // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.router.push(link)
  }

  render() {
    const { areaText, genreText } = this.props
    return (
      <div>
        <Helmet title="SearchTop" />

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
            onTap={(e) => this.onTapListItem(e, '/search/regular')}
            img={<img src='/img/world300.png' role='presentation' width={70} />}
            text={<span>エリア・駅・条件<br />からお店を探す</span>}
            paperStyle={{ marginBottom: 10 }}
          />

          <ImgTextGrid
            onTap={(e) => this.onTapListItem(e, '/search/map')}
            img={<MapsMyLocation style={{ width: 50, height: 50, position: 'relative', top: 10 }} color={lightBlue200} />}
            text={<span>現在地周辺<br />からお店を探す</span>}
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

const DecoratedSearchTop = withRouter(SearchTop);
const SearchTopContainer = connect(state => state.searchForm)(DecoratedSearchTop)
export default SearchTopContainer
