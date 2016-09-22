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
import GooglePager from '../../components/common/GooglePager'

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


  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.location.query.page || 1,
      nowLoading: false,
    }
  }

  componentWillMount() {
    const { dispatch, restaurants } = this.props
    const { location, params } = this.context

    if (isEmpty(restaurants.dict)) {
      RestaurantList.fetchData(location.query, params, dispatch)
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: to container
    // TODO: async fetch when query.page is changed
    const nextPageNum = nextProps.location.query.page
    if (nextPageNum !== this.props.location.query.page) {
      setTimeout(() => {
        this.setState({ ...this.state, currentPage: nextPageNum, nowLoading: false })
      }, 300)
    }
  }


  onChangeRstSortMenu(e, key, payload) {
    console.log(e, key, payload)
  }

  onTapPage(e, nextNum) {
    this.setState({ ...this.state, nowLoading: true })
    this.props.router.push({
      pathname: this.props.location.pathname,
      query: { page: nextNum },
    })
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

        <GooglePager
          current={this.state.currentPage}
          style={{ width: '96%', margin: '18px auto 0' }}
          nowLoading={this.state.nowLoading}
          hideNext={false}
          onPageChanged={::this.onTapPage}
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
