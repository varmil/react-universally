import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import { withRouter, Link } from 'react-router'
import { isEmpty, throttle } from 'lodash'

import { Paper, List, ListItem, Avatar, Divider, IconButton, FlatButton /*Tabs, Tab*/ } from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRst from 'material-ui/svg-icons/maps/restaurant'
import MapsRstMenu from 'material-ui/svg-icons/maps/restaurant-menu'
import NavClose from 'material-ui/svg-icons/navigation/close'

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

  onItemTap(e, data) {
    // TODO: handle event
    this.props.dispatch(searchFormActions.setGenreText(data.name))

    // this.timerTouchTapCloseId = setTimeout(() => {
    //   this.timerTouchTapCloseId = null
    //
    //   this.props.dispatch(searchFormActions.setGenreText(data.name))
    //
    //   this.close()
    // }, this.props.menuCloseDelay || 300)
  }

  close() {
    this.setState({ open: false })
  }


  createCandidate() {
    const { dataSource } = this.state
    if (isEmpty(dataSource)) return null

    return (
      <List>
        {dataSource.map(data => (
          <ListItem
            key={`ListItem-${data.id}`}
            innerDivStyle={innerDivStyle}
            // TODO: 入力されていない文字をbold highlight
            primaryText={data.name}
            rightIconButton={<IconButton style={{ top: -6 }} onTouchTap={(e) => e.preventDefault()}><ActionSearch /></IconButton>}
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
    return (
      <div>
        <List>
          {DEFAULT_GENRE.map((data, i) => (
            <ListItem
              key={`ListItem-Hint-${data.id}`}
              innerDivStyle={innerDivStyle}
              primaryText={data.name}
              leftAvatar={data.avatar}
              onTouchTap={(e) => this.onItemTap(e, data)}
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
              onTouchTap={(e) => this.onItemTap(e)}
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

    return (
      <div style={containerStyle}>
        <Paper style={paperStyle} zDepth={1}>
            <Flex align="center" style={{ padding: '5px 5px' }}>

              {(this.state.focusing) ? (
                <Box col={1}>
                  <NavClose onTouchTap={(e) => this.setState({ ...this.state, focusing: false, open: false })} />
                </Box>
              ) : null}

              <Box auto>
                <div style={{ padding: '0 10px 0' }}>
                  <SearchBox
                    id='SearchBox-Genre'
                    style={{}}
                    hintText="Restaurant"
                    value={genreText}
                    leftIcon={<MapsRstMenu />}
                    onChange={::this.onChangeGenreForm}
                    onFocus={(e) => this.onFocus(e)}
                    // onBlur={(e) => this.onBlur(e)}
                  />

                  {(this.state.focusing) ? (
                    <SearchBox
                      id='SearchBox-Area'
                      style={{ marginTop: 5 }}
                      hintText="Near Me"
                      value={areaText}
                      leftIcon={<MapsPlace />}
                      onChange={::this.onChangeAreaForm}
                      onFocus={(e) => this.onFocus(e)}
                      // onBlur={(e) => this.onBlur(e)}
                    />
                  ) : null}
                </div>
              </Box>
            </Flex>
        </Paper>

        {this.createSuggestPaper()}
      </div>
    )
  }
}

export default connect(state => state.searchForm)(withRouter(SearchBoxContainer))
