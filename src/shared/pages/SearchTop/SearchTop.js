import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'

import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';

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
          <ListItem onTouchTap={(e) => this.onTapListItem(e, '/search/regular')} primaryText="エリア・駅・条件からお店を探す" leftIcon={<ContentInbox />} />
          <ListItem primaryText="現在地周辺からお店を探す" leftIcon={<ActionGrade />} />
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
