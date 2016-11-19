import React, { Component } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Helmet from 'react-helmet'
import { TextField, SelectField, MenuItem, AutoComplete, RaisedButton } from 'material-ui'

import ContentAddBox from 'material-ui/svg-icons/content/add-box';

import API from '../../api'
import AppHeader from '../../containers/AppHeader'
import Dropzone from '../../components/Dropzone'
import * as userActions from '../../actions/user'
import masterArea from '../../master/area'
import masterGenre from '../../master/genre'
import masterBudget from '../../master/budget'


const exampleStyle = {
  color: 'grey',
  fontSize: 12,
}

class RestaurantEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rstName: '',
      rstAddress: '',
      rstPhone: '',
      area: '',
      genreId: 1001,
      budgetId: 1,
      files: [],
      errMsg: '',
    }
  }

  createAreaAutoCompleteData() {
    return Object.keys(masterArea).reduce((prev, currDistrict) => {
      return prev.concat(masterArea[currDistrict])
    }, [])
  }



  onChangeRstName(e, value) {
    console.log(value)
    this.setState({ ...this.state, rstName: value })
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
    const { dispatch } = this.props
    const params =  this.state
    let formData = new FormData()

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
      .then(({ data }) => {
        console.info(data)
      })
      .catch((reason) => {
        console.error(reason)
        this.setState({ ...this.state, errMsg: reason.toString() })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="RestaurantEdit" />
        <AppHeader title="Register New Restaurant" />

        <div style={{ margin: 10 }}>
          <h2>Register New Restaurant</h2>

          <TextField id="TextField-RstName"
            floatingLabelText="Restaurant Name"
            onChange={::this.onChangeRstName}
          />
          <div style={exampleStyle}>ex) Malis Cambodian Restaurant</div>

          <TextField id="TextField-RstAddress"
            floatingLabelText="Restaurant Address"
            onChange={::this.onChangeRstAddress}
          />
          <div style={exampleStyle}>ex) 136 Norodom Boulevard, Phnom Penh 12101, Cambodia</div>

          <TextField id="TextField-RstPhone"
            floatingLabelText="Restaurant Phone Number"
            onChange={::this.onChangeRstPhone}
          />
          <div style={exampleStyle}>ex) 85515814888</div>

          <AutoComplete id="AutoComplete-Area"
            floatingLabelText="Located Area (autocomplete)"
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={this.createAreaAutoCompleteData()}
            onNewRequest={::this.onNewRequestArea}
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
              icon={<ContentAddBox />}
              onTouchTap={::this.onSubmit}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(RestaurantEdit))
