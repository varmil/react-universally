import React from 'react'
import { Flex, Box } from 'reflexbox'
import { TextField, RaisedButton } from 'material-ui';

const flexStyle = { }

const textFieldStyle = {
  width: '75%'
}

const hintStyle = {
  fontSize: 13
}

const rightButton = {
}


export default (props) => {
  return(
    <Flex align="center" justify="space-between" style={{ ...flexStyle, ...(props.style) }}>
      <Box auto style={{ textAlign: 'left' }}>
        <span style={{ position: 'relative', top: '6px' }}>{props.leftIcon}</span>
        <TextField
          id={props.id}
          style={textFieldStyle}
          hintStyle={hintStyle}
          hintText={props.hintText}
          value={props.value}
          onChange={props.onChange}
        />
      </Box>
      <Box>
        <RaisedButton
          label={props.buttonLabel}
          labelPosition="before"
          primary={true}
          icon={props.buttonIcon}
          style={rightButton}
          onTouchTap={props.onTapButton}
        />
      </Box>
    </Flex>
  )
}
