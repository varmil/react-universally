import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'

import { Card, CardHeader, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card'
import { FlatButton, GridList, GridTile, Divider } from 'material-ui';
// import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import API from '../../../api'
import * as restaurantDetailActions from '../../../actions/restaurantDetail'
import * as errorsActions from '../../../actions/errors'

import FiveStar from '../../../components/FiveStar'
import IsAuthenticated from '../../../components/review/IsAuthenticated'

// const imgBoxStyle = {
//   textAlign: 'center'
// }

const cardStyle = {
  paddingBottom: 0,
  boxShadow: 'none',
}

/*
 * Individual Review Page
 */
class Review extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantDetailReview(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setReview(data))
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
    const { dispatch, common, review } = this.props
    const { location, params } = this.context

    if (isEmpty(review) || params.restaurantId !== common.id) {
      Review.fetchData(location.query, params, dispatch)
    }
  }


  createHeaderSubTitle() {
    const review = this.props.review
    return (
      <div>
        <IsAuthenticated bool={review.isAuthenticated} />
      </div>
    )
  }

  createSubTitle() {
    const review = this.props.review
    return (
      <div>
        <p>
          <span className="rvw-date__number">'{review.postDate}</span>
          <span className="rvw-date__number">('{review.visitDate}</span> visited)
        </p>
        <p>
          {review.budget}
        </p>
      </div>
    )
  }

  render() {
    const { review } = this.props
    const imgSrc = review.imgSrc || []
    return (
      <div>
        <Helmet title="RestaurantDetailReview" />

        <Card style={cardStyle}>
          <CardHeader
            title={review.author}
            subtitle={this.createHeaderSubTitle()}
            avatar={review.authorAvatar}
          />

          <CardTitle
            title={review.title}
            subtitle={this.createSubTitle()}
          />

          <CardText>
            <FiveStar rating={review.rating} />
          </CardText>

          <CardText>
            {review.comment}
          </CardText>

          <CardMedia style={{ margin: '0 20px' }}>
            <GridList
              cellHeight={100}
              cols={3}
            >
              {imgSrc.map((src, index) => (
                <GridTile key={src}>
                  <img src={src} role='presentation' />
                </GridTile>
              ))}
            </GridList>
          </CardMedia>
        </Card>
      </div>
    )
  }
}

export default connect(state => ({
  common: state.restaurantDetail.common,
  review: state.restaurantDetail.review,
}))(Review)
