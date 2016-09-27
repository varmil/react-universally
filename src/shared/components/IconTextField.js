import React from 'react'
import { Flex, Box } from 'reflexbox'
import { AutoComplete, RaisedButton } from 'material-ui';

const flexStyle = { }

const autoCompleteStyle = {
  width: '100%'
}

const textFieldStyle = {
  width: '100%'
}

const hintStyle = {
  fontSize: 13
}

const rightButton = {
}


export default class IconTextField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {
    this.props.onChange(value)

    // TODO: サーバに対して通信？
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    })
  }

  handleNewRequest = (value) => {
    this.props.onChange(value)
  }

  render() {
    const props = this.props

    return(
      <Flex align="center" justify="space-between" style={{ ...flexStyle, ...(props.style) }}>
        <Box>
          <span style={{ position: 'relative', top: '6px' }}>{props.leftIcon}</span>
        </Box>
        <Box auto mr={2} style={{ textAlign: 'left' }}>
          <AutoComplete
            id={props.id}
            style={autoCompleteStyle}
            textFieldStyle={textFieldStyle}
            hintStyle={hintStyle}
            hintText={props.hintText}
            searchText={props.value}
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
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
}
