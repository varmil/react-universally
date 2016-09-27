import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

import { Avatar, Dialog, FlatButton, Divider, Subheader, RaisedButton, Chip } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ActionLabel from 'material-ui/svg-icons/action/label-outline'

import * as searchFormActions from '../../actions/searchForm'

import API from '../../api'
import AppHeader from '../../containers/AppHeader'
import IconTextField from '../../components/IconTextField'
import BudgetSelectField from '../../components/BudgetSelectField'
import AreaList from '../../components/list/AreaList'
import GenreList from '../../components/list/GenreList'
import stubArea from '../../stub/area'
import stubGenre from '../../stub/genre'

import styles from './index.css'

const initialDialogState = {
  areaDialogOpened: false,
  genreDialogOpened: false,
}

const dialogStyle = {
  width: '98%',
  // maxWidth: 'none',
}

const FORM_TYPE = {
  AREA: Symbol('AREA'),
  GENRE: Symbol('GENRE'),
}


class SearchRegular extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialDialogState }
  }



  onChangeForm(value, type) {
    if (type === FORM_TYPE.AREA) {
      this.props.dispatch(searchFormActions.setAreaText(value))
    } else if (type === FORM_TYPE.GENRE) {
      this.props.dispatch(searchFormActions.setGenreText(value))
    }
  }

  onChangeLowerLimitBudget(e, index, value) {
    this.props.dispatch(searchFormActions.setLowerLimitBudget(value))
  }

  onChangeUpperLimitBudget(e, index, value) {
    this.props.dispatch(searchFormActions.setUpperLimitBudget(value))
  }


  onTapAreaButton(e) {
    e.preventDefault()
    const state = this.state
    this.setState({ ...state, areaDialogOpened: true })
  }

  onTapGenreButton(e) {
    e.preventDefault()
    const state = this.state
    this.setState({ ...state, genreDialogOpened: true })
  }

  onTapSearchButton(e) {
    e.preventDefault()
    // TODO: いい感じにGETパラメータを整形、付与してURLチェンジ
    this.props.router.push({
      pathname: '/restaurant/list',
      query: this.props.searchForm,
    })
  }


  // 本当は配列ではなくそれぞれのareaにIDを振って、ID管理のほうがパフォーマンスは良い
  onCheckArea(name, isInputChecked) {
    const { dispatch } = this.props
    if (isInputChecked) {
      dispatch(searchFormActions.addAreaChip(name))
    } else {
      dispatch(searchFormActions.removeAreaChip(name))
    }
  }

  onCheckGenre(name, isInputChecked) {
    const { dispatch } = this.props
    if (isInputChecked) {
      dispatch(searchFormActions.addGenreChip(name))
    } else {
      dispatch(searchFormActions.removeGenreChip(name))
    }
  }


  handleCloseDialog() {
    const state = this.state
    this.setState({ ...state, ...initialDialogState })
  }

  handleDeleteChip(e, name, type) {
    e.preventDefault()
    const { dispatch } = this.props

    if (type === FORM_TYPE.AREA) {
      dispatch(searchFormActions.removeAreaChip(name))
    } else if (type === FORM_TYPE.GENRE) {
      dispatch(searchFormActions.removeGenreChip(name))
    }
  }


  // エリア選択、ジャンル洗濯用のChip生成
  createChips(chips, type) {
    return (
      <div>
        {chips.map(chipName =>
          <Chip
            key={chipName}
            onRequestDelete={(e) => this.handleDeleteChip(e, chipName, type)}
          >
            <Avatar><ActionLabel /></Avatar>
            {chipName}
          </Chip>
        )}
      </div>
    )
  }

  createBudgetSelectField(value, onChange, floatingLabelText) {
    return (
      <div>
        <BudgetSelectField
          id={`SearchRegular-budget-${floatingLabelText.replace(/ /g,'')}`}
          value={value}
          onChange={onChange}
          floatingLabelText={floatingLabelText} />
      </div>
    )
  }

  // Dialog用のボタン生成
  createActions() {
    return [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={::this.handleCloseDialog}
      />,
    ]
  }


  render() {
    const { areaText, genreText, areaChip, genreChip, lowerLimitBudget, upperLimitBudget } = this.props.searchForm
    return (
      <div>
        <Helmet title="SearchRegular" />

        <AppHeader title="条件入力" />

        <div className={styles.pageContainer}>
          <div className={styles.formContainer}>
            <IconTextField
              id="SearchRegular-area"
              style={{ margin: '10px 0' }}
              leftIcon={<MapsPlace />}
              hintText="東京都、銀座"
              onChange={(value) => this.onChangeForm(value, FORM_TYPE.AREA)}
              value={areaText}
              buttonLabel="area"
              buttonIcon={<ChevronRight />}
              onTapButton={::this.onTapAreaButton}
            />
            {this.createChips(areaChip, FORM_TYPE.AREA)}

            <IconTextField
              id="SearchRegular-genre"
              style={{ margin: '10px 0' }}
              leftIcon={<MapsRestaurant />}
              hintText="Restaurant name..."
              onChange={(value) => this.onChangeForm(value, FORM_TYPE.GENRE)}
              value={genreText}
              autoCompleteApi={API.fetchAutoCompleteRst}
              buttonLabel="genre"
              buttonIcon={<ChevronRight />}
              onTapButton={::this.onTapGenreButton}
            />
            {this.createChips(genreChip, FORM_TYPE.GENRE)}
          </div>

          <Divider />

          <div className={styles.formContainer}>
            <Subheader>Budget</Subheader>
            {this.createBudgetSelectField(lowerLimitBudget, ::this.onChangeLowerLimitBudget, "lower limit")}
            {this.createBudgetSelectField(upperLimitBudget, ::this.onChangeUpperLimitBudget, "upper limit")}
          </div>

          <RaisedButton onTouchTap={::this.onTapSearchButton} className={styles.fixedBottom} label="検索" secondary={true} />


          <Dialog
            title="Select Area"
            actions={this.createActions()}
            modal={false}
            contentStyle={dialogStyle}
            open={this.state.areaDialogOpened}
            onRequestClose={::this.handleCloseDialog}
            autoScrollBodyContent={true}
          >
            <AreaList subheader="Phnom Penh" data={stubArea} checkedItems={areaChip} onCheck={::this.onCheckArea} />
          </Dialog>

          <Dialog
            title="Select Genre"
            actions={this.createActions()}
            modal={false}
            contentStyle={dialogStyle}
            open={this.state.genreDialogOpened}
            onRequestClose={::this.handleCloseDialog}
            autoScrollBodyContent={true}
          >
            <GenreList subheader="Food" data={stubGenre} checkedItems={genreChip} onCheck={::this.onCheckGenre} />
          </Dialog>
        </div>
      </div>
    )
  }
}

const DecoratedSearchRegular = withRouter(SearchRegular);
const SearchRegularContainer = connect(
  state => ({ searchForm: state.searchForm })
)(DecoratedSearchRegular)
export default SearchRegularContainer
