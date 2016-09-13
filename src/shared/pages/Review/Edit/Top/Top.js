import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import API from '../../../../api'
import * as restaurantsActions from '../../../../actions/restaurants'
import * as errorsActions from '../../../../actions/errors'

// TODO

class Top extends Component {
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
      Top.fetchData(location.query, params, dispatch)
    }
  }




  render() {
    return (
      <div>
        <Helmet title="ReviewRestaurantList" />
      </div>
    )
  }
}

const DecoratedTop = withRouter(Top);
export default connect(
  (state) => {
    const { searchForm, restaurants } = state
    return { searchForm, restaurants }
   }
)(DecoratedTop)
