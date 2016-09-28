import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { withRouter } from 'react-router'
import { map, debounce } from 'lodash'

import { Paper, List, ListItem, Avatar /*Tabs, Tab*/ } from 'material-ui'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRst from 'material-ui/svg-icons/maps/restaurant'
import MapsRstMenu from 'material-ui/svg-icons/maps/restaurant-menu'

import API from '../api'
import SearchBox from '../components/common/SearchBox'

import * as searchFormActions from '../actions/searchForm'


const contentPaperStyle = {
  position: 'absolute',
  width: '100%',
  zIndex: 1000
}


const DEFAULT_GENRE = [
  { id: 1, name: '中華', avatar: (<Avatar icon={<MapsRst />} />) },
  { id: 11, name: '精進料理', avatar: (<Avatar icon={<MapsRst />} />) },
  { id: 111, name: 'クメールフード', avatar: (<Avatar icon={<MapsRst />} />) },
]


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

  onBlur(e) {
    if (this.timerTouchTapCloseId === null) {
      this.setState({ ...this.state, focusing: false })
      this.close()
    }
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
      // HACK: reduxだとあんまり行儀よくないけど...
      API.fetchAutoCompleteRst({ value })
      .then(({data}) => {
        console.log(data)
        this.setState({ ...this.state, hintNode: false, dataSource: data })
      })
      .catch((error) => {})
    } else {
      // デフォルト表示
      this.setState({ ...this.state, hintNode: true })
    }
  }

  onItemTap(e, data) {
    this.timerTouchTapCloseId = setTimeout(() => {
      this.timerTouchTapCloseId = null

      // TODO: handle event

      this.close()
    }, this.props.menuCloseDelay || 300)
  }

  close() {
    this.setState({ open: false })
  }


  createCandidate() {
    const { dataSource, open } = this.state
    if (dataSource.length === 0) return null
    if (open === false) return null

    return (
      <List>
        {dataSource.map(data => (
          <ListItem
            key={`ListItem-${data.id}`}
            primaryText={data.name}
            leftAvatar={<Avatar src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/36496/150x150_square_36496705.jpg" />}
            onTouchTap={(e) => this.onItemTap(e, data)}
          />
        ))}
      </List>
    )
  }

  /**
   * 何も表示されていない状態のときにだすナビ
   */
  createHintNode() {
    const { open } = this.state
    if (open === false) return null

    return (
      <List>
        {DEFAULT_GENRE.map(data => (
          <ListItem
            key={`ListItem-Hint-${data.id}`}
            primaryText={data.name}
            leftAvatar={data.avatar}
            onTouchTap={(e) => this.onItemTap(e, data)}
          />
        ))}
      </List>
    )
  }

  render() {
    const { areaText, genreText } = this.props

    const paperStyle = {
      backgroundColor: this.context.muiTheme.palette.primary1Color
    }

    return (
      <div>
        <Paper style={paperStyle} zDepth={1}>
          <Flex align="center" style={{ padding: '0 5px 5px' }}>
            <Box col={5}>
              <SearchBox
                id='SearchBox-Area'
                style={{ borderRight: '1px solid #d2d2d2' }}
                hintText="現在地周辺"
                value={areaText}
                leftIcon={<MapsPlace />}
                onChange={::this.onChangeAreaForm}
                onFocus={(e) => this.onFocus(e)}
                onBlur={(e) => this.onBlur(e)}
              />
            </Box>
            <Box auto>
              <SearchBox
                id='SearchBox-Genre'
                style={{}}
                hintText="Restaurant"
                value={genreText}
                leftIcon={<MapsRstMenu />}
                onChange={::this.onChangeGenreForm}
                onFocus={(e) => this.onFocus(e)}
                onBlur={(e) => this.onBlur(e)}
              />
            </Box>
          </Flex>
        </Paper>

        <Paper style={contentPaperStyle} zDepth={3}>
          {(this.state.hintNode) ? (
            this.createHintNode()
          ) : (
            this.createCandidate()
          )}
        </Paper>
      </div>
    )
  }
}

export default connect(state => state.searchForm)(withRouter(SearchBoxContainer))
