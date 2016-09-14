import React, { Component } from 'react'
import { isEmpty, range, round } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import Dropzone from 'react-dropzone'
import { Flex, Box } from 'reflexbox'

import { Divider, TextField, IconButton, SelectField, MenuItem } from 'material-ui'
import ImageAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

import API from '../../../../api'
import * as restaurantDetailActions from '../../../../actions/restaurantDetail'
import * as errorsActions from '../../../../actions/errors'
import FiveStar from '../../../../components/FiveStar'

// TODO: とりあえずcommonデータを参照

const rstNameStyle = {
  fontSize: 15,
}

const containerMargin = {
  margin: 15,
}

const textFieldStyle = {
  marginTop: 40,
  marginBottom: 0,
}

const iconStyles = {
  small: {
    width: 36,
    height: 36,
  },
  medium: {
    width: 48,
    height: 48,
  },
  large: {
    width: 60,
    height: 60,
  },
}

const iconButtonStyles = {
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
}

const dropzoneStyle = {
  display: 'inline-block',
  backgroundColor: 'whitesmoke',
  border: '1px dashed gray',
}

class Top extends Component {
  static fetchData(query, params, dispatch) {
    return API.fetchRestaurantDetailCommon(query, params)
      .then(({ data }) => {
        dispatch(restaurantDetailActions.setCommon(data))
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
    this.state = { rating: undefined }
  }

  componentWillMount() {
    const { dispatch, common } = this.props
    const { location, params } = this.context

    if (isEmpty(common) || params.restaurantId !== common.id) {
      Top.fetchData(location.query, params, dispatch)
    }
  }




  onChangeRating(rate) {
    // 文字列で渡ってくる場合もあるので
    const strRate = (rate.toFixed) ? rate.toFixed(1) : rate
    this.setState({ rating: strRate })
  }

  onDrop(files) {
    console.log('Received files: ', files);
  }


  createRatingMenuItem() {
    return range(1.0, 5.1, 0.1).map(number => {
      const rounded = round(number, 1).toFixed(1)
      return (
        <MenuItem key={rounded} value={rounded} primaryText={rounded} />
      )
    })
  }

  render() {
    const { name } = this.props.common
    return (
      <div>
        <Helmet title="ReviewEditTop" />

        <h2 style={{ ...containerMargin, ...rstNameStyle}}>{name}</h2>

        <Divider />

        <div style={containerMargin}>
          <Flex align="center" justify="flex-start" style={{}}>
            <Box sm={10}>
              <FiveStar readonly={false} fractions={2} size={38} onChange={::this.onChangeRating} rating={this.state.rating} noLabel={true} />
            </Box>
            <Box sm={2} ml={2}>
              <SelectField
                id="Top-SelectField-rating"
                value={this.state.rating}
                maxHeight={400}
                style={{ width: 60 }}
                labelStyle={{ fontSize: '22px', fontWeight: 'bold' }}
                onChange={(e, i, rating) => this.onChangeRating(rating)}
              >
                {this.createRatingMenuItem()}
              </SelectField>
            </Box>
          </Flex>
        </div>

        <Divider />

        <TextField
          id="reviewTopKuchikomi"
          hintText={<span>口コミ本文を入れてください<br />（15,000文字以下）</span>}
          style={{ ...containerMargin, ...textFieldStyle }}
          hintStyle={{ fontSize: 13 }}
        />

        <div style={containerMargin}>
          <Dropzone accept="image/*" onDrop={::this.onDrop} style={dropzoneStyle}>
            <IconButton
              iconStyle={iconStyles.medium}
              style={iconButtonStyles.medium}
            >
              <ImageAddPhoto />
            </IconButton>
          </Dropzone>
        </div>
      </div>
    )
  }
}


const DecoratedTop = withRouter(Top);
export default connect(
  (state) => {
    const { common } = state.restaurantDetail
    return { common }
   }
)(DecoratedTop)
