import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { withRouter } from 'react-router'
import { isEmpty, throttle } from 'lodash'

import { Paper, /*Tabs, Tab*/ } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRstMenu from 'material-ui/svg-icons/maps/restaurant-menu'
import NavClose from 'material-ui/svg-icons/navigation/close'

import styles from './SearchBox.css'
import API from '../api'
import SearchBox from '../components/SearchBox/SearchBox'
import HintNode from '../components/SearchBox/HintNode'
import SuggestNode from '../components/SearchBox/SuggestNode'

import * as searchFormActions from '../actions/searchForm'


const suggestPaperStyle = {
  width: '100%',
  zIndex: 1000
}

const innerDivStyle = { paddingTop: 10, paddingBottom: 10, fontSize: 12 }


class SearchBoxContainer extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      focusing: false,
      dataSource: [],
      open: false,
      // ジャンル表示など、ユーザが入力しやすくなる仕組み
      hintNode: true,
    }

    // HACK: reduxだとあんまり行儀よくないけど...
    this.throttleFetch = throttle((value) => {
      API.fetchAutoCompleteRst({ value })
      .then(({data}) => {
        console.log(data)
        this.setState({ ...this.state, hintNode: false, dataSource: data, open: ! isEmpty(data) })
      })
      .catch((error) => {})
    }, 200, { trailing: false })
  }

  componentWillMount() {
    this.timerTouchTapCloseId = null
  }

  componentWillUnmount() {
    clearTimeout(this.timerTouchTapCloseId)
  }


  onFocus(e) {
    this.setState({ ...this.state, focusing: true, open: true })
  }

  onChangeAreaForm(e) {
    e.preventDefault()
    this.props.dispatch(searchFormActions.setAreaText(e.target.value))
  }

  onChangeGenreForm(e) {
    e.preventDefault()
    const value = e.target.value
    this.props.dispatch(searchFormActions.setGenreText(value))

    if (value) {
      this.throttleFetch(value)
    } else {
      // デフォルト表示
      this.setState({ ...this.state, hintNode: true })
    }
  }

  onTapItem(e, data) {
    // TODO: handle event
    this.props.dispatch(searchFormActions.setGenreText(data.name))

    this.timerTouchTapCloseId = setTimeout(() => {
      this.timerTouchTapCloseId = null
      this.close()
    }, this.props.menuCloseDelay || 300)
  }

  onTapItemArrow(e, data) {
    // TODO: handle event
    this.props.dispatch(searchFormActions.setGenreText(data.name))
  }


  close() {
    this.setState({ open: false, focusing: false, })
  }


  createHelper() {
    const { open, hintNode } = this.state
    if (open === false) return null

    return (
      <Paper style={suggestPaperStyle} zDepth={3}>
        {(hintNode) ? (
          <HintNode innerDivStyle={innerDivStyle} />
        ) : (
          <SuggestNode
            dataSource={this.state.dataSource}
            innerDivStyle={innerDivStyle}
            onTapItem={::this.onTapItem}
            onTapItemArrow={::this.onTapItemArrow}
          />
        )}
      </Paper>
    )
  }


  render() {
    const { areaText, genreText } = this.props

    const containerStyle = (this.state.focusing) ? (
      {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000000,
      }
    )
    :
    (
      { marginTop: -1 }
    )

    const paperStyle = {
      backgroundColor: this.context.muiTheme.palette.primary1Color
    }

    const genreSearchBoxStyle = (this.state.focusing) ?
    (null)
    :
    (
      {
        display: 'inline-flex',
        width: '60%',
      }
    )

    const areaSearchBoxStyle = (this.state.focusing) ? (
      {
        marginTop: 5,
      }
    )
    :
    (
      {
        display: 'inline-flex',
        width: '40%',
      }
    )

    return (
      <Paper style={containerStyle}>
        <Paper style={paperStyle} zDepth={1}>
            <Flex align="center" style={{ padding: '5px 5px' }}>

              {(this.state.focusing) ? (
                <Box style={{ width: 20 }}>
                  <NavClose onTouchTap={(e) => this.setState({ ...this.state, focusing: false, open: false })} />
                </Box>
              ) : null}

              <Box auto>
                <div style={{ padding: '0 10px 0' }}>
                  <SearchBox
                    id='SearchBox-Genre'
                    style={genreSearchBoxStyle}
                    hintText="Restaurant"
                    value={genreText}
                    leftIcon={<MapsRstMenu />}
                    onChange={::this.onChangeGenreForm}
                    onFocus={(e) => this.onFocus(e)}
                  />

                  <SearchBox
                    id='SearchBox-Area'
                    style={areaSearchBoxStyle}
                    hintText="Near Me"
                    value={areaText}
                    leftIcon={<MapsPlace />}
                    onChange={::this.onChangeAreaForm}
                    onFocus={(e) => this.onFocus(e)}
                  />
                </div>
              </Box>
            </Flex>
        </Paper>

        {this.createHelper()}
      </Paper>
    )
  }
}

export default connect(state => state.searchForm)(withRouter(SearchBoxContainer))
