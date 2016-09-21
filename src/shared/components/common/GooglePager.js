import React from 'react'
import { Paper, IconButton, FlatButton } from 'material-ui'
import { grey600 } from 'material-ui/styles/colors';
import { Flex, Box } from 'reflexbox'

import NavFirstPage from 'material-ui/svg-icons/navigation/first-page'
import NavChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const FIRST_PAGE_NUMBER = 1
const SECOND_PAGE_NUMBER = 2
const THRID_PAGE_NUMBER = 3

const containerStyle = {}

function createTextNode(props) {
  if (props.current === FIRST_PAGE_NUMBER) {
    return <FlatButton labelStyle={{ top: -1, color: grey600 }} label="next" />
  } else {
    return <span style={{ color: grey600 }}>{`page ${props.current}`}</span>
  }
}

function createToFirst(props) {
  // show nothing if current page is 1 or 2
  if (props.current < THRID_PAGE_NUMBER) return null

  return (
    <Box mr={2}>
      <IconButton tooltip="First">
        <NavFirstPage color={grey600} />
      </IconButton>
    </Box>
  )
}

function createToPrev(props) {
  // show nothing if current page is 1
  if (props.current < SECOND_PAGE_NUMBER) return null

  return (
    <Box>
      <IconButton tooltip="Prev">
        <NavChevronLeft color={grey600} />
      </IconButton>
    </Box>
  )
}

function createToNext(props) {
  return (
    <Box>
      <IconButton tooltip="Next">
        <NavChevronRight color={grey600} />
      </IconButton>
    </Box>
  )
}

export default class GooglePager extends React.Component {
  render() {
    const props = this.props

    return(
      <Paper style={{ ...containerStyle, ...props.style, }}>
        <Flex align='center' justify="center" p={0}>
          {createToFirst(props)}

          {createToPrev(props)}

          <Box
            ml={3} mr={(props.current === FIRST_PAGE_NUMBER) ? 0 : 3}
          >
            {createTextNode(props)}
          </Box>

          {createToNext(props)}
        </Flex>
      </Paper>
    )
  }
}
