import React from 'react'
import { DropDownMenu, MenuItem } from 'material-ui'


const styles = {
  customWidth: {
    width: 100,
  },
}

const DEFAULT_VALUE = 1


export default class RstSortMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue || DEFAULT_VALUE };
  }

  handleChange = (event, index, value) => {
    event.preventDefault()
    this.setState({ value })

    // trigger event
    this.props.onChange(event, index, value)
  }

  render() {
    return(
      <DropDownMenu
        value={this.state.value}
        onChange={this.handleChange}
        style={{ marginLeft: '-20px' }}
        labelStyle={{ fontWeight: 'bold', color: 'white' }}
        autoWidth={true}
      >
        <MenuItem value={1} primaryText="標準" />
        <MenuItem value={2} primaryText="総合ランキング" />
      </DropDownMenu>
    )
  }
}
