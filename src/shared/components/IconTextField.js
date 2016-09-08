import React from 'react'
import { Flex, Box } from 'reflexbox'
import { Paper, TextField } from 'material-ui';

const paperStyle = { margin: '0 auto' }
const flexStyle = { }

const textFieldStyle = {
  width: '80%'
}

export default (props) => {
  return(
    <Paper onTouchTap={props.onTap} style={{ ...paperStyle, ...(props.paperStyle) }}>
      <Flex align="center" p={0} style={{ ...flexStyle, ...(props.flexStyle) }}>
        <Box sm={1} ml={1} style={{ textAlign: 'left' }}>
          {props.leftIcon}
        </Box>
        <Box sm={8}>
          <TextField
            hintText={props.hintText}
            value={props.value}
            onChange={props.onChange}
          />
        </Box>
        <Box sm={3}>
          {props.rightIcon}
        </Box>
      </Flex>
    </Paper>
  )
}
