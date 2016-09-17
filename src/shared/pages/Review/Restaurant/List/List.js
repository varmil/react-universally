import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'

import AppHeader from '../../../../containers/AppHeader'
import InlineSearchForm from '../../../../components/InlineSearchForm'
import RestaurantSimpleList from '../../../../components/list/RestaurantSimpleList'

import API from '../../../../api'

import * as searchFormActions from '../../../../actions/searchForm'
import * as restaurantsActions from '../../../../actions/restaurants'
import * as errorsActions from '../../../../actions/errors'


class List extends Component {
  // TODO: 「現在地」をデフォルトクエリにして検索結果をFetch
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantList(query, params)
      .then(({ data }) => {
        dispatch(restaurantsActions.replaceRestaurants(data))
      })
      .catch((reason) => {
        dispatch(errorsActions.push(reason))
      })
  }

  static contextTypes = {
    location: React.PropTypes.object,
    params: React.PropTypes.object,
  }




  componentWillMount() {
    const { dispatch, restaurants } = this.props
    const { location, params } = this.context

    if (isEmpty(restaurants.dict)) {
      List.fetchData(location.query, params, dispatch)
    }
  }




  onChangeAreaForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setAreaText(e.target.value))
  }

  onChangeGenreForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setGenreText(e.target.value))
  }

  onTapRestaurant(e, restaurantId) {
    e.preventDefault()
    this.props.router.push(`/review/edit/${restaurantId}`)
  }



  render() {
    const { areaText, genreText, restaurants } = this.props
    return (
      <div>
        <Helmet title="ReviewRestaurantList" />

        <AppHeader title="投稿するお店を選ぶ" />

        <InlineSearchForm
          areaFormValue={areaText}
          genreFormValue={genreText}
          onChangeAreaForm={::this.onChangeAreaForm}
          onChangeGenreForm={::this.onChangeGenreForm}
        />

        <RestaurantSimpleList restaurants={restaurants.dict} onTapItem={::this.onTapRestaurant} />
      </div>
    )
  }
}

const DecoratedList = withRouter(List);
export default connect(
  (state) => {
    const { searchForm, restaurants } = state
    return {
      areaText: searchForm.areaText,
      genreText: searchForm.genreText,
      restaurants,
    }
   }
)(DecoratedList)
