import React, { Component } from 'react'
import { map, find } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { TextField, SelectField, MenuItem, AutoComplete, RaisedButton, CircularProgress, Snackbar } from 'material-ui'

import ContentAddBox from 'material-ui/svg-icons/content/add-box';

import API from '../../api'
import AppHeader from '../../containers/AppHeader'
import Dropzone from '../../components/Dropzone'
import masterArea from '../../master/area'
import masterGenre from '../../master/genre'
import masterBudget from '../../master/budget'

const WAIT_MS_AFTER_REGISTER = 3000

const exampleStyle = {
  color: 'grey',
  fontSize: 12,
}

const initialState = {
  rstId: 0,
  rstName: '',
  rstNameDataSource: [],
  rstAddress: '',
  rstPhone: '',
  area: '',
  genreId: 1001,
  budgetId: 1,
  files: [],
  // registerボタン押下後、レスポンス帰ってくるまでtrue
  submitting: false,
  msg: '',
}

class RestaurantEdit extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }

  createAreaAutoCompleteData() {
    return Object.keys(masterArea).reduce((prev, currDistrict) => {
      return prev.concat(masterArea[currDistrict])
    }, [])
  }



  onUpdateInputRstName(value) {
    console.log(value)

    // いったん、UPDATE用のIDをリセット
    this.setState({ ...this.state, rstName: value, rstId: 0 })

    // サーバにHITする店名が既に存在しないかチェック
    API.fetchAutoCompleteRst({ value })
    .then(({data}) => {
      const nodes = map(data, (e) => {
        return {
          text: e.name,
          value: (<MenuItem key={`MenuItem-RstName-${e.id}`} value={e.id} primaryText={e.name} />)
        }})
      this.setState({ ...this.state, rstNameDataSource: nodes })
    })
    .catch((error) => {})
  }

  onNewRequestRstName(chosenRequest) {
    console.log(chosenRequest)
    // AutoComplete以外でEnter押した場合は弾く
    if (! chosenRequest.value) return

    // サーバから当該店舗の情報をfetchして、stateを上書きする
    const id = chosenRequest.value.props.value
    API.getRestaurantInfo({},  { id })
    .then(({data}) => {
      console.log('fetched', data)
      this.setState({
        ...this.state,
        rstId: data.id,
        rstName: data.name,
        rstAddress: data.address,
        rstPhone: data.phone_number,
        area: data.area,
        genreId: '' + data.genre_id,
      })

      // 予算はパースしてIDセット
      const budgetFound = find(masterBudget, { lowerLimit: data.low_budget, upperLimit: data.high_budget })
      if (budgetFound) this.setState({ ...this.state, budgetId: '' + budgetFound.id })

      // 画像は表示だけ

    })
    .catch((error) => {})
  }

  onChangeRstAddress(e, value) {
    console.log(value)
    this.setState({ ...this.state, rstAddress: value })
  }

  onChangeRstPhone(e, value) {
    console.log(value)
    this.setState({ ...this.state, rstPhone: value })
  }

  onNewRequestArea(chosenRequest) {
    console.log(chosenRequest)
    this.setState({ ...this.state, area: chosenRequest })
  }

  onChangeGenre(e, index, value) {
    console.log(value)
    this.setState({ ...this.state, genreId: value })
  }

  onChangeBudget(e, index, value) {
    console.log(value)
    this.setState({ ...this.state, budgetId: value })
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

  onSubmit(e) {
    this.setState({ ...this.state, submitting: true })

    const params =  this.state
    let formData = new FormData()
    formData.append('rstId', params.rstId)
    formData.append('rstName', params.rstName)
    formData.append('rstAddress', params.rstAddress)
    formData.append('rstPhone', params.rstPhone)
    formData.append('area', params.area)
    formData.append('genreId', params.genreId)
    formData.append('budgetId', params.budgetId)
    // 複数画像をPOSTするためにFormDataを使用する
    params.files.forEach(file => {
      formData.append('eyecatch', file);
    })

    API.postRestaurantEdit(formData)
      .then(({ res }) => {
        this.setState({ ...this.state, msg: 'SUCCESS! Page will be reloaded soon, please wait...', submitting: false })
        // 入力状態を初期化するためにリロード
        setTimeout(() => location.reload(), WAIT_MS_AFTER_REGISTER)
      })
      .catch((reason) => {
        this.setState({ ...this.state, msg: reason.toString(), submitting: false })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantEdit" />
        <AppHeader title="Register New Restaurant" />

        <div style={{ margin: 10 }}>
          <h2>Register New Restaurant</h2>

          <AutoComplete id="AutoComplete-TextField-RstName"
            floatingLabelText="Restaurant Name (autocomplete)"
            filter={AutoComplete.noFilter}
            dataSource={this.state.rstNameDataSource}
            onUpdateInput={::this.onUpdateInputRstName}
            onNewRequest={::this.onNewRequestRstName}
          />
          <div style={exampleStyle}>ex) Malis Cambodian Restaurant</div>

          <TextField id="TextField-RstAddress"
            floatingLabelText="Restaurant Address"
            onChange={::this.onChangeRstAddress}
            value={this.state.rstAddress}
          />
          <div style={exampleStyle}>ex) 136 Norodom Boulevard, Phnom Penh 12101, Cambodia</div>

          <TextField id="TextField-RstPhone"
            floatingLabelText="Restaurant Phone Number"
            onChange={::this.onChangeRstPhone}
            value={this.state.rstPhone}
          />
          <div style={exampleStyle}>ex) 85515814888</div>

          <AutoComplete id="AutoComplete-Area"
            floatingLabelText="Located Area (autocomplete)"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.createAreaAutoCompleteData()}
            onNewRequest={::this.onNewRequestArea}
            searchText={this.state.area}
          />
          <div style={exampleStyle}>ex) Tonle Basak, Monourom, etc.</div>

          <div>
            <SelectField id="SelectField-Genre"
              floatingLabelText="Genre"
              maxHeight={200}
              value={this.state.genreId}
              onChange={::this.onChangeGenre}
            >
              {map(masterGenre, (genreName, id) => (
                <MenuItem key={`MenuItem-Genre-${id}`} value={id} primaryText={genreName} />
              ))}
            </SelectField>
          </div>

          <div>
            <SelectField id={`BudgetField`}
              floatingLabelText="Budget"
              value={this.state.budgetId}
              onChange={::this.onChangeBudget}
            >
              {map(masterBudget, (obj, valueId) => (
                <MenuItem key={`MenuItem-Budget-${valueId}`} value={valueId} primaryText={`US$${obj.lowerLimit} - US$${obj.upperLimit}`} />
              ))}
            </SelectField>
          </div>

          <div style={{ margin: '10px 0' }}>
            <h5>Eye Catching Images</h5>
            <Dropzone files={this.state.files} onDrop={::this.onDrop} onTapImgDelete={::this.onTapImgDelete} />
          </div>

          <div>
            <RaisedButton
              label="Register"
              secondary={true}
              icon={(this.state.submitting) ? <CircularProgress thickness={5} /> : <ContentAddBox />}
              onTouchTap={::this.onSubmit}
              disabled={this.state.submitting}
            />
          </div>

          <Snackbar
            open={!!this.state.msg}
            message={this.state.msg}
            autoHideDuration={WAIT_MS_AFTER_REGISTER}
            onRequestClose={() => this.setState({ ...this.state, msg: '' })}
          />

        </div>
      </div>
    )
  }
}

export default connect()(withRouter(RestaurantEdit))
