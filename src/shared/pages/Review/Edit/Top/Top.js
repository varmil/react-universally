import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import Dropzone from 'react-dropzone'

import { Divider, TextField } from 'material-ui'
import ImageAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

import API from '../../../../api'
import * as restaurantDetailActions from '../../../../actions/restaurantDetail'
import * as errorsActions from '../../../../actions/errors'

// TODO: とりあえずcommonデータを参照

const rstNameStyle = {
  fontSize: 15,
}

const containerMargin = {
  margin: 20,
}

const textFieldStyle = {
  marginTop: 40,
  marginBottom: 0,
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




  componentWillMount() {
    const { dispatch, common } = this.props
    const { location, params } = this.context

    if (isEmpty(common) || params.restaurantId !== common.id) {
      Top.fetchData(location.query, params, dispatch)
    }
  }




  onDrop(files) {
    console.log('Received files: ', files);
  }




  render() {
    const { name } = this.props.common
    return (
      <div>
        <Helmet title="ReviewEditTop" />

        <h2 style={{ ...containerMargin, ...rstNameStyle}}>{name}</h2>

        <Divider />

        ★★★★★

        <Divider />

        <TextField
          id="reviewTopKuchikomi"
          hintText={<span>口コミ本文を入れてください<br />（15,000文字以下）</span>}
          style={{ ...containerMargin, ...textFieldStyle }}
          hintStyle={{ fontSize: 13 }}
        />

        <div style={containerMargin}>
          <Dropzone accept="image/*" onDrop={::this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
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
