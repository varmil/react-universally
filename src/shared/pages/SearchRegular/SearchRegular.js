import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

import { TextField, SelectField, MenuItem, RaisedButton } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'

import * as searchFormActions from '../../actions/searchForm'
import IconTextField from '../../components/IconTextField'
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

  onTapSearchButton(e) {
    // TODO: いい感じにGETパラメータを整形、付与してURLチェンジ
    this.props.router.push({
      pathname: '/restaurant/list',
      query: this.props.searchForm,
    })
  }

  createBudgetSelectField(value, onChange, floatingLabelText) {
    return (
      <SelectField value={value} onChange={onChange} floatingLabelText={floatingLabelText}>
        <MenuItem value={1} primaryText="1,000" />
        <MenuItem value={2} primaryText="2,000" />
        <MenuItem value={3} primaryText="3,000" />
      </SelectField>
    )
  }

  render() {
    const { area, genre, lowerLimitBudget, upperLimitBudget } = this.props.searchForm
    return (
      <div>
        <Helmet title="SearchRegular" />

        <div className={styles.container}>
          <div className={styles.areaAndGenre}>
            <div>
              <MapsPlace className={styles.mapsIcon} />
              <TextField
                className={styles.textField}
                hintText="東京都、銀座"
                value={area}
                onChange={::this.onChangeAreaForm}
              />
            </div>
            <div>
              <MapsRestaurant className={styles.mapsIcon} />
              <TextField
                className={styles.textField}
                hintText="店名、ラーメン"
                value={genre}
                onChange={::this.onChangeGenreForm}
              />
            </div>
          </div>

          <IconTextField
            leftIcon={<MapsPlace className={styles.mapsIcon} />}
            hintText="東京都、銀座"
            value={area}
            onChange={::this.onChangeAreaForm}
          />

          <h4>予算</h4>

          {this.createBudgetSelectField(lowerLimitBudget, ::this.onChangeLowerLimitBudget, "下限")}
          {this.createBudgetSelectField(upperLimitBudget, ::this.onChangeUpperLimitBudget, "上限")}

          <RaisedButton onTouchTap={::this.onTapSearchButton} className={styles.fixedBottom} label="検索" secondary={true} />
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
