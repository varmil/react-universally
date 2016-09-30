import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { withRouter, Link } from 'react-router'
import { isEmpty, throttle } from 'lodash'

import { Paper, List, ListItem, Avatar, Divider, IconButton /*Tabs, Tab*/ } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRst from 'material-ui/svg-icons/maps/restaurant'
import MapsRstMenu from 'material-ui/svg-icons/maps/restaurant-menu'
import NavClose from 'material-ui/svg-icons/navigation/close'
import NavArrow from 'material-ui/svg-icons/navigation/arrow-back'

import styles from './SearchBox.css'
import API from '../api'
import SearchBox from '../components/common/SearchBox'
import stubGenre from '../stub/genre'

import * as searchFormActions from '../actions/searchForm'


const suggestPaperStyle = {
  width: '100%',
  zIndex: 1000
}

const avatarStyle = {
  top: 5,
  left: 20,
}

const innerDivStyle = { paddingTop: 10, paddingBottom: 10, fontSize: 12 }


const DEFAULT_GENRE = stubGenre.map((genre, i) => {
  return { id: i, name: genre, avatar: (<Avatar size={25} style={avatarStyle} icon={<MapsRst />} />) }
}).slice(0, 3)


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

  onBlur(e) {
    // if (this.timerTouchTapCloseId === null) {
    //   this.setState({ ...this.state, focusing: false })
    //   this.close()
    // }
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


  createCandidate() {
    const { dataSource } = this.state
    if (isEmpty(dataSource)) return null

    const icon = (data) => (
      <IconButton style={{ top: -6, transform: 'rotate(45deg)' }} onTouchTap={(e) => this.onTapItemArrow(e, data)}>
        <NavArrow />
      </IconButton>
    )

    return (
      <List>
        {dataSource.map(data => (
          <ListItem
            key={`ListItem-${data.id}`}
            innerDivStyle={innerDivStyle}
            // TODO: 入力されていない文字をbold highlight
            primaryText={data.name}
            rightIconButton={icon(data)}
            onTouchTap={(e) => this.onTapItem(e, data)}
          />
        ))}
      </List>
    )
  }

  /**
   * 何も表示されていない状態のときにだすナビ
   */
  createHintNode() {
    return (
      <div>
        <List>
          {DEFAULT_GENRE.map((data, i) => (
            <ListItem
              key={`ListItem-Hint-${data.id}`}
              innerDivStyle={innerDivStyle}
              primaryText={data.name}
              leftAvatar={data.avatar}
              onTouchTap={(e) => this.onTapItem(e, data)}
            />
          ))}
        </List>
        <Divider inset={true} />
        <List>
          <Link to={`/search/regular`}>
            <ListItem
              insetChildren={true}
              innerDivStyle={innerDivStyle}
              primaryText="検索画面へ"
              onTouchTap={(e) => this.onTapItem(e)}
            />
          </Link>
        </List>
      </div>
    )
  }

  createSuggestPaper() {
    const { open, hintNode } = this.state
    if (open === false) return null

    return (
      <Paper style={suggestPaperStyle} zDepth={3}>
        {(hintNode) ? (
          this.createHintNode()
        ) : (
          this.createCandidate()
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
                    // onBlur={(e) => this.onBlur(e)}
                  />

                  <SearchBox
                    id='SearchBox-Area'
                    style={areaSearchBoxStyle}
                    hintText="Near Me"
                    value={areaText}
                    leftIcon={<MapsPlace />}
                    onChange={::this.onChangeAreaForm}
                    onFocus={(e) => this.onFocus(e)}
                    // onBlur={(e) => this.onBlur(e)}
                  />
                </div>
              </Box>
            </Flex>
        </Paper>

        {this.createSuggestPaper()}
      </Paper>
    )
  }
}

export default connect(state => state.searchForm)(withRouter(SearchBoxContainer))
