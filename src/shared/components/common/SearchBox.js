import React from 'react'
import { Paper, TextField, IconButton, SvgIcon } from 'material-ui';
import { Flex, Box } from 'reflexbox'
import ActionSearch from 'material-ui/svg-icons/action/search'
import NavClose from 'material-ui/svg-icons/navigation/close'

const flexStyle = {
  backgroundColor: 'white',
}

const textFieldStyle = {
  height: 40,
}

const hintStyle = {
  fontSize: 12,
  bottom: 7,
}

const inputStyle = {
  fontSize: 12,
}

export default class SearchBox extends React.Component {
  render() {
    const props = this.props

    return(
        <Flex align="center" style={{ ...props.style, ...flexStyle }}>
          <Box pl={1}>
            {props.leftIcon || (<ActionSearch />)}
          </Box>
          <Box pl={1} auto>
            <TextField
              id={props.id}
              style={{ ...textFieldStyle }}
              hintStyle={{ ...hintStyle, ...props.hintStyle }}
              inputStyle={{ ...inputStyle }}
              underlineShow={false}
              fullWidth={true}

              hintText={props.hintText}
              value={props.value}
              onChange={props.onChange}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
            />
          </Box>
          {/* <Box>
            <IconButton>
              <NavClose />
            </IconButton>
          </Box> */}
        </Flex>
    )
  }
}
