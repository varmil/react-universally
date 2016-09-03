import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
;
import * as searchFormActions from '../../actions/searchForm'
import styles from './index.css'

class SearchRegular extends Component {
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

  createBudgetSelectField(value, onChange, floatingLabelText) {
    return (
      <SelectField value={value} onChange={onChange} floatingLabelText={floatingLabelText}>
        <MenuItem value={1000} primaryText="1,000" />
        <MenuItem value={2000} primaryText="2,000" />
        <MenuItem value={3000} primaryText="3,000" />
      </SelectField>
    )
  }

  render() {
    const { area, genre, lowerLimitBudget, upperLimitBudget } = this.props
    return (
      <div>
        <Helmet title="SearchRegular" />

        <div className={styles.container}>
          <div className={styles.areaAndGenre}>
            <TextField
              hintText={<span><MapsPlace className={styles.mapsIcon} />東京都、銀座</span>}
              value={area}
              onChange={::this.onChangeAreaForm}
              fullWidth={true}
            />
            <TextField
              hintText={<span><MapsRestaurant className={styles.mapsIcon} />店名、ラーメン</span>}
              value={genre}
              onChange={::this.onChangeGenreForm}
              fullWidth={true}
            />
          </div>

          <h4>予算</h4>

          {this.createBudgetSelectField(lowerLimitBudget, ::this.onChangeLowerLimitBudget, "下限")}
          {this.createBudgetSelectField(upperLimitBudget, ::this.onChangeUpperLimitBudget, "上限")}

          <RaisedButton className={styles.fixedBottom} label="検索" secondary={true} />
        </div>
      </div>
    )
  }
}

const SearchRegularContainer = connect(state => state.searchForm)(SearchRegular)
export default SearchRegularContainer
