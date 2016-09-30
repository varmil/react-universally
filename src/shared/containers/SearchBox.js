import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { withRouter } from 'react-router'
import { isEmpty, throttle } from 'lodash'

import { Paper } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRstMenu from 'material-ui/svg-icons/maps/restaurant-menu'
import NavClose from 'material-ui/svg-icons/navigation/close'

import API from '../api'
import styles from './SearchBox.css'
import SearchBox from '../components/SearchBox/SearchBox'
import HintGenreNode from '../components/SearchBox/HintGenreNode'
import HintAreaNode from '../components/SearchBox/HintAreaNode'
import SuggestNode from '../components/SearchBox/SuggestNode'

import * as searchFormActions from '../actions/searchForm'


const suggestPaperStyle = {
  width: '100%',
  zIndex: 1000
}

const innerDivStyle = { paddingTop: 10, paddingBottom: 10, fontSize: 12 }

const NODE_TYPE = {
  GENRE: 'genre',
  AREA: 'area',
}

class SearchBoxContainer extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      // 検索窓が拡大した状態
      focusing: false,
      // 現在Helperに表示すべき情報のタイプ（Area or Genre）
      helperNodeType: undefined,
      // Helperに表示するコンテンツ
      dataSource: [],
      // 何も入力されていない際のジャンル表示など、ユーザが入力しやすくなる仕組み
      hintNode: false,
    }

    // HACK: reduxだとあんまり行儀よくないけど...
    this.throttleFetch = throttle((value) => {
      API.fetchAutoCompleteRst({ value })
      .then(({data}) => {
        this.setState({ ...this.state, hintNode: false, dataSource: data })
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


  onFocus(e, nodeType) {
    this.setState({ ...this.state,
      focusing: true,
      // フォーカスしたテキストボックスが空ならばヒントを表示
      hintNode: isEmpty(e.target.value),
      helperNodeType: nodeType,
    })
  }

  close() {
    this.setState({ ...this.state,
      focusing: false,
    })
  }

  onChangeAreaForm(e, isClear) {
    e.preventDefault()
    const value = (isClear) ? '' : e.target.value
    this.props.dispatch(searchFormActions.setAreaText(value))

    // TODO: fetch
  }

  onChangeGenreForm(e, isClear) {
    e.preventDefault()
    const value = (isClear) ? '' : e.target.value
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
    // keep focus to textbox
    e.preventDefault()
    // TODO: handle event
    this.props.dispatch(searchFormActions.setGenreText(data.name))
  }



  createHelper() {
    const { focusing, hintNode, helperNodeType } = this.state
    console.log('[createHelper]', helperNodeType)
    if (focusing === false) return null

    return (
      <Paper style={suggestPaperStyle} zDepth={3}>
        {(hintNode) ? (
          (helperNodeType === NODE_TYPE.GENRE) ?
          (<HintGenreNode innerDivStyle={innerDivStyle} />)
          :
          (<HintAreaNode innerDivStyle={innerDivStyle} />)
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
                  <NavClose onTouchTap={(e) => {
                    // stop event propagation
                    setTimeout(::this.close, 0)
                  }} />
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
                    showClear={this.state.focusing}
                    onClear={(e) => this.onChangeGenreForm(e, true)}
                    onChange={(e) => this.onChangeGenreForm(e)}
                    onFocus={(e) => this.onFocus(e, NODE_TYPE.GENRE)}
                  />

                  <SearchBox
                    id='SearchBox-Area'
                    style={areaSearchBoxStyle}
                    hintText="Near Me"
                    value={areaText}
                    leftIcon={<MapsPlace />}
                    showClear={this.state.focusing}
                    onClear={(e) => this.onChangeAreaForm(e, true)}
                    onChange={(e) => this.onChangeAreaForm(e)}
                    onFocus={(e) => this.onFocus(e, NODE_TYPE.AREA)}
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
