import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

import { Dialog, FlatButton, Divider, Subheader, RaisedButton } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

import * as searchFormActions from '../../actions/searchForm'
import IconTextField from '../../components/IconTextField'
import BudgetSelectField from '../../components/BudgetSelectField'
import styles from './index.css'


const initialDialogState = { areaDialogOpened: false, genreDialogOpened: false }
const dialogStyle = {
  width: '98%',
  // maxWidth: 'none',
}

class SearchRegular extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialDialogState }
  }

  onChangeAreaForm(e) {
    this.props.dispatch(searchFormActions.setArea(e.target.value))
  }

  onChangeGenreForm(e) {
    this.props.dispatch(searchFormActions.setGenre(e.target.value))
  }

  onChangeLowerLimitBudget(e, index, value) {
    this.props.dispatch(searchFormActions.setLowerLimitBudget(value))
  }

  onChangeUpperLimitBudget(e, index, value) {
    this.props.dispatch(searchFormActions.setUpperLimitBudget(value))
  }


  onTapAreaButton(e) {
    const state = this.state
    this.setState({ ...state, areaDialogOpened: true })
  }

  onTapGenreButton(e) {
    const state = this.state
    this.setState({ ...state, genreDialogOpened: true })
  }

  onTapSearchButton(e) {
    // TODO: いい感じにGETパラメータを整形、付与してURLチェンジ
    this.props.router.push({
      pathname: '/restaurant/list',
      query: this.props.searchForm,
    })
  }


  handleCloseDialog = () => {
    const state = this.state
    this.setState({ ...state, ...initialDialogState })
  }


  createBudgetSelectField(value, onChange, floatingLabelText) {
    return (
      <BudgetSelectField
        id={`SearchRegular-budget-${floatingLabelText.replace(/ /g,'')}`}
        value={value}
        onChange={onChange}
        floatingLabelText={floatingLabelText} />
    )
  }

  createActions() {
    return [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDialog}
      />,
    ]
  }


  render() {
    const { area, genre, lowerLimitBudget, upperLimitBudget } = this.props.searchForm
    return (
      <div>
        <Helmet title="SearchRegular" />

        <div className={styles.formContainer}>
          <IconTextField
            id="SearchRegular-area"
            style={{ margin: '10px 0' }}
            leftIcon={<MapsPlace />}
            hintText="東京都、銀座"
            onChange={::this.onChangeAreaForm}
            value={area}
            buttonLabel="area"
            buttonIcon={<ChevronRight />}
            onTapButton={::this.onTapAreaButton}
          />

          <IconTextField
            id="SearchRegular-genre"
            style={{ margin: '10px 0' }}
            leftIcon={<MapsRestaurant />}
            hintText="店名、ラーメン"
            onChange={::this.onChangeGenreForm}
            value={genre}
            buttonLabel="genre"
            buttonIcon={<ChevronRight />}
            onTapButton={::this.onTapGenreButton}
          />
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
          onRequestClose={this.handleCloseDialog}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    )
  }
}

const DecoratedSearchRegular = withRouter(SearchRegular);
const SearchRegularContainer = connect(
  state => ({ searchForm: state.searchForm })
)(DecoratedSearchRegular)
export default SearchRegularContainer
