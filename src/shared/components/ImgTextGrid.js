import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper } from 'material-ui';
import Ink from 'react-ink'

const paperStyle = { position: 'relative', width: '90%', maxWidth: 500, margin: '0 auto' }
const flexStyle = { maxWidth: 'inherit' }

export default (props) => {
  return(
    <Paper onTouchTap={props.onTap} style={{ ...paperStyle, ...(props.paperStyle) }}>
      <Ink radius={50} duration={200} />
      <Flex align="center" p={0} style={{ ...flexStyle, ...(props.flexStyle) }}>
        <Box sm={3} style={{ height: 70, minWidth: 70, textAlign: 'center' }}>
          {props.img}
        </Box>
        <Box sm={9} ml={2}>
          {props.text}
        </Box>
      </Flex>
    </Paper>
  )
}
