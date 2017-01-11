import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { FloatingActionButton } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Flex, Box } from 'reflexbox'

import AppHeader from '../../containers/AppHeader'
import Restaurants from '../../components/list/RestaurantList'
import RstSortMenu from '../../components/header/RstSortMenu'
import Pager from '../../containers/Pager'

import styles from './index.css'
import API from '../../api'
import * as restaurantsActions from '../../actions/restaurants'
import * as errorsActions from '../../actions/errors'


class RestaurantList extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantList(query, params)
      .then(({ data }) => {
        dispatch(restaurantsActions.setQuery(query))
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
    const { dispatch, restaurants, searchQuery } = this.props
    const { location, params } = this.context

    // クエリストリングが変化した場合も再度FETCH
    if (isEmpty(restaurants.dict) || searchQuery !== location.query) {
      RestaurantList.fetchData(location.query, params, dispatch)
    }
  }




  fetchPage(number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('FETCH END')
        resolve(false)
      }, 500)
    })
  }




  onChangeRstSortMenu(e, key, payload) {
    console.log(e, key, payload)
  }

  onTapConditionBox(e) {
    e.preventDefault()
    this.props.router.push('/search/map')
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
      <div style={{ marginBottom: 100 }}>
        <Helmet title="RestaurantList" />

        <AppHeader title={<RstSortMenu onChange={::this.onChangeRstSortMenu} />} />

        <Restaurants restaurants={this.props.restaurants} />

        <Pager
          style={{ width: '96%', margin: '18px auto 0' }}
          fetch={::this.fetchPage}
          location={this.props.location}
        />

        <div className={`${styles.fixedBottom}`}>
          <Flex align="center" justify="space-around">
            <Box p={2} ml={2} mr={2} auto onTouchTap={::this.onTapConditionBox} className={`${styles.conditionBox}`}>
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
