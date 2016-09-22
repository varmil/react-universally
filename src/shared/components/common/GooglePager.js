import React from 'react'
import { Paper, IconButton, FlatButton, CircularProgress } from 'material-ui'
import { grey600 } from 'material-ui/styles/colors';
import { Flex, Box } from 'reflexbox'

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page'
import NavChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const FIRST_PAGE_NUMBER = 1
const SECOND_PAGE_NUMBER = 2
const THRID_PAGE_NUMBER = 3

const containerStyle = {}

function handler(props, e, page) {
  e.preventDefault()
  e.stopPropagation()
  props.onPageChanged(e, page)
}

function createTextNode(props) {
  if (+props.current === FIRST_PAGE_NUMBER) {
    return (
      <FlatButton
        labelStyle={{ top: -1, color: grey600 }}
        label="next"
        onTouchTap={(e) => handler(props, e, SECOND_PAGE_NUMBER)} />
    )
  } else {
    return <span style={{ color: grey600 }}>{`PAGE ${props.current}`}</span>
  }
}

function createToFirst(props) {
  // show nothing if current page is 1 or 2
  if (+props.current < THRID_PAGE_NUMBER) return null

  return (
    <Box mr={2}>
      <IconButton onTouchTap={(e) => handler(props, e, FIRST_PAGE_NUMBER)} tooltip="First">
        <NavFirstPage color={grey600} />
      </IconButton>
    </Box>
  )
}

function createToPrev(props) {
  // show nothing if current page is 1
  if (+props.current < SECOND_PAGE_NUMBER) return null

  return (
    <Box>
      <IconButton onTouchTap={(e) => handler(props, e, +props.current - 1)} tooltip="Prev">
        <NavChevronLeft color={grey600} />
      </IconButton>
    </Box>
  )
}

function createToNext(props) {
  // do not show next icon if this props is trusy
  if (props.hideNext) return null

  return (
    <Box>
      <IconButton onTouchTap={(e) => handler(props, e, +props.current + 1)} tooltip="Next">
        <NavChevronRight color={grey600} />
      </IconButton>
    </Box>
  )
}

function createContent(props) {
  return (props.nowLoading) ?
  (
    <div style={{ textAlign: 'center' }} ><CircularProgress /></div>
  )
  :
  (
    <Flex align='center' justify="center">
      {createToFirst(props)}
      {createToPrev(props)}
      <Box
        ml={3} mr={(+props.current === FIRST_PAGE_NUMBER) ? 0 : 3}
      >
        {createTextNode(props)}
      </Box>
      {createToNext(props)}
    </Flex>
  )
}

export default class GooglePager extends React.Component {
  render() {
    const props = this.props

    return(
      <Paper style={{ ...containerStyle, ...props.style, }}>
        {createContent(props)}
      </Paper>
    )
  }
}
