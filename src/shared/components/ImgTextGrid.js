import React from 'react'
import { Link } from 'react-router'
import { Flex, Box } from 'reflexbox'
import { Paper } from 'material-ui';

import TapHighlight from './common/TapHighlight'

const linkStyle = {
  display: 'block',
  position: 'relative',
  width: '90%',
  maxWidth: 500,
  margin: '0 auto',
  textDecoration: 'none',
}
const flexStyle = { maxWidth: 'inherit' }

export default (props) => {
  return(
    <Link to={props.href} style={{ ...linkStyle, ...(props.style) }}>
      <Paper onTouchTap={props.onTap}>
        <TapHighlight />
        <Flex align="center" p={0} style={{ ...flexStyle, ...(props.flexStyle) }}>
          <Box sm={3} style={{ height: 70, minWidth: 70, textAlign: 'center' }}>
            {props.img}
          </Box>
          <Box sm={9} ml={2}>
            {props.text}
          </Box>
        </Flex>
      </Paper>
    </Link>
  )
}
