import React from 'react'
import { map, throttle } from 'lodash'
import { Flex, Box } from 'reflexbox'
import { AutoComplete, RaisedButton } from 'material-ui';

const THROTTLE_WAIT_MS = 200

const flexStyle = { }

const autoCompleteStyle = {
  width: '100%'
}

const textFieldStyle = {
  width: '100%',
  fontSize: 13
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
    }

    this.throttleUpdateInput = throttle(this.handleUpdateInput, THROTTLE_WAIT_MS, { trailing: false })
  }

  handleUpdateInput = (value) => {
    // backspaceなどで文字数が減った場合
    // if (this.props.value.length > value.length) {
    //   this.props.onChange(value)
    //   return;
    // }

    // reduxだとあんまり行儀よくないけど...
    this.props.autoCompleteApi({ value })
    .then(({data}) => {
      console.log(data)
      this.setState({
        dataSource: map(data, 'name')
      })
    })
    .catch((error) => {})

    this.props.onChange(value)
  }

  // TODO: handleUpdateInputと別Propsで管理
  handleNewRequest = (value) => {
    this.props.onChange(value)
  }

  render() {
    const props = this.props

    return(
      <Flex align="center" justify="space-between" style={{ ...flexStyle, ...(props.style) }}>
        <Box mr={1}>
          <span style={{ position: 'relative', top: '6px' }}>{props.leftIcon}</span>
        </Box>
        <Box auto mr={2} style={{ textAlign: 'left' }}>
          <AutoComplete
            id={props.id}
            style={autoCompleteStyle}
            textFieldStyle={textFieldStyle}
            hintStyle={hintStyle}
            hintText={props.hintText}
            filter={AutoComplete.noFilter}
            searchText={props.value}
            dataSource={this.state.dataSource}
            onUpdateInput={this.throttleUpdateInput}
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
