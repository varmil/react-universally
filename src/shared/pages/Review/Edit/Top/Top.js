import React, { Component } from 'react'
import { isEmpty, range, round } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import Dropzone from 'react-dropzone'
import { Flex, Box } from 'reflexbox'

import { Paper, Divider, TextField, IconButton, SelectField, MenuItem, RaisedButton } from 'material-ui'
import ImgAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

import * as restaurantDetailActions from '../../../../actions/restaurantDetail'
import * as headerActions from '../../../../actions/header'
import * as errorsActions from '../../../../actions/errors'

import API from '../../../../api'
import FiveStar from '../../../../components/FiveStar'
import ImgPreviewList from '../../../../components/list/ImgPreviewList'



// TODO: とりあえずcommonデータを参照

const rstNameStyle = {
  fontSize: 15,
}

const containerMargin = {
  margin: 15,
}

const textFieldStyle = {
  width: '100%',
}

const iconStyles = {
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
  marginBottom: 10
}

const bottomPaperStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%'
}

const initialState = {
  rating: undefined,
  files: [],
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
    this.state = initialState
  }

  componentWillMount() {
    const { dispatch, common } = this.props
    const { location, params } = this.context

    if (isEmpty(common) || params.restaurantId !== common.id) {
      Top.fetchData(location.query, params, dispatch)
    }

    dispatch(headerActions.setTitle("口コミ・写真投稿"))
  }




  onChangeRating(rate) {
    // 文字列で渡ってくる場合もあるので
    const strRate = (rate.toFixed) ? rate.toFixed(1) : rate
    this.setState({ ...this.state, rating: strRate })
  }

  onDrop(files) {
    console.log('Received files: ', files);
    this.setState({ ...this.state, files: this.state.files.concat(files) })
  }



  onTapImgDelete(e, tappedFile) {
    e.preventDefault()
    e.stopPropagation()
    // Remove tappedItem from state.files
    const filtered = this.state.files.filter(f => f.preview !== tappedFile.preview )
    this.setState({ ...this.state, files: filtered })
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
      <div style={{ marginBottom: 100 }}>
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

        <div style={{ ...containerMargin, marginTop: 20 }}>
          <TextField
            id="reviewTopKuchikomi"
            hintText={<span>口コミ本文を入れてください<br />（15,000文字以下）</span>}
            style={textFieldStyle}
            hintStyle={{ fontSize: 13, lineHeight: 1.4 }}
            textareaStyle={{ fontSize: 13 }}
            multiLine={true}
          />
        </div>

        <div style={containerMargin}>
          <Dropzone accept="image/*" onDrop={::this.onDrop} style={dropzoneStyle}>
            <IconButton
              iconStyle={iconStyles.medium}
              style={iconButtonStyles.medium}
            >
              <ImgAddPhoto />
            </IconButton>
          </Dropzone>

          {this.state.files.length > 0 ?
            <ImgPreviewList files={this.state.files} onTapDelete={::this.onTapImgDelete} />
          : null}
        </div>

        <Paper style={bottomPaperStyle}>
          <Flex align="center" justify="space-between" p={2} style={{}}>
            <Box>
              <RaisedButton label="下書き保存" style={{}} />
            </Box>
            <Box auto ml={1}>
              <RaisedButton label="規約に同意して投稿" secondary={true} style={{ width: '100%' }} />
            </Box>
          </Flex>
        </Paper>
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
