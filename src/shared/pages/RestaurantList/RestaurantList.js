import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { FloatingActionButton } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Flex, Box } from 'reflexbox'

import Restaurants from '../../components/RestaurantList'
import styles from './index.css'
import API from '../../api'
import * as restaurantsActions from '../../actions/restaurants'
import * as errorsActions from '../../actions/errors'


class RestaurantList extends Component {
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
      RestaurantList.fetchData(location.query, params, dispatch)
    }
  }




  onTapSearchButton(e) {
    e.preventDefault()
    this.props.router.push({
      pathname: '/search/regular',
    })
  }

  // TODO: Componentsに切り出すか、もっとちゃんと表示整える
  createBottomButtonLabel() {
    const { dict } = this.props.restaurants
    const { areaChip, genreChip, lowerLimitBudget } = this.props.searchForm
    return (
      <span>
        {Object.keys(dict).length}件<br />
        {areaChip.join(',')} {genreChip.join(',')} {lowerLimitBudget}
      </span>
    )
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantList" />

        <Restaurants restaurants={this.props.restaurants} />

        <div className={`${styles.fixedBottom}`}>
          <Flex align="center" justify="space-around">
            <Box p={2} ml={2} mr={2} auto onTouchTap={::this.onTapSearchButton} className={`${styles.conditionBox}`}>
              <span className={`${styles.conditionBoxText}`}>
                {this.createBottomButtonLabel()}
              </span>
            </Box>
            <Box mr={2}>
              <FloatingActionButton onTouchTap={::this.onTapSearchButton} secondary={false} className={`${styles.floatButton}`} mini={true}>
                <ActionSearch />
              </FloatingActionButton>
            </Box>
          </Flex>
        </div>
      </div>
    )
  }
}

const DecoratedRestaurantList = withRouter(RestaurantList);
export default connect(
  (state) => {
    const { searchForm, restaurants } = state
    return { searchForm, restaurants }
   }
)(DecoratedRestaurantList)
