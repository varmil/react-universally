import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'

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
    this.props.dispatch(searchFormActions.setArea(e.target.value))
  }

  onChangeGenreForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setGenre(e.target.value))
  }

  onTapListItem(e, link) {
    e.preventDefault()
    // Programmatically navigate using react router
    // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
    this.props.router.push(link)
  }

  render() {
    const { area, genre } = this.props
    return (
      <div>
        <Helmet title="SearchTop" />

        <div className={styles.searchFormContainer}>
          <InlineSearchForm
            areaFormValue={area}
            genreFormValue={genre}
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



        <FloatingActionButton secondary={true} className={styles.pen}>
          <ContentCreate />
        </FloatingActionButton>
        <FloatingActionButton secondary={true} className={styles.camera}>
          <ActionCameraEnhance />
        </FloatingActionButton>
      </div>
    )
  }
}

const DecoratedSearchTop = withRouter(SearchTop);
const SearchTopContainer = connect(state => state.searchForm)(DecoratedSearchTop)
export default SearchTopContainer
