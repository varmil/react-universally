import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import InlineSearchForm from '../../components/InlineSearchForm'
import * as searchFormActions from '../../actions/searchForm'

const penStyle = {
  position: 'fixed',
  bottom: 20,
  right: 90,
};

const cameraStyle = {
  position: 'fixed',
  bottom: 20,
  right: 20,
};

class SearchTop extends Component {
  onChangeAreaForm(e) {
    this.props.dispatch(searchFormActions.setArea(e.target.value))
  }

  onChangeGenreForm(e) {
    this.props.dispatch(searchFormActions.setGenre(e.target.value))
  }

  render() {
    const { area, genre } = this.props
    return (
      <div>
        <Helmet title="SearchTop" />

        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <InlineSearchForm
            areaFormValue={area}
            genreFormValue={genre}
            onChangeAreaForm={::this.onChangeAreaForm}
            onChangeGenreForm={::this.onChangeGenreForm}
          />
        </div>

        <List>
          <ListItem primaryText="エリア・駅・条件からお店を探す" leftIcon={<ContentInbox />} />
          <ListItem primaryText="現在地周辺からお店を探す" leftIcon={<ActionGrade />} />
        </List>

        <FloatingActionButton secondary={true} style={penStyle}>
          <ActionNoteAdd />
        </FloatingActionButton>
        <FloatingActionButton secondary={true} style={cameraStyle}>
        <ActionCameraEnhance />
        </FloatingActionButton>
      </div>
    )
  }
}

const SearchTopContainer = connect(state => state.searchForm)(SearchTop)
export default SearchTopContainer
