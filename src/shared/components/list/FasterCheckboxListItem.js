import React, { Component } from 'react'
import { ListItem, Checkbox } from 'material-ui'


const createCheckbox = (text, props) => {
  return (
    <Checkbox
      onCheck={(e, isChecked) => props.onCheck(text, isChecked)}
      checked={props.checkedItems.indexOf(text) >= 0}
    />
  )
}

// NOTE: areaの持ち方を配列からObject等に変更する場合、このComponentも変更必要
class FasterCheckboxListItem extends Component {
  // This improves List rendering performance !
  // ------------------------------------------
  shouldComponentUpdate(nextProps) {
    const { text, checkedItems } = this.props;
    const currentIsChecked = checkedItems.indexOf(text) >= 0
    const nextIsChecked = nextProps.checkedItems.indexOf(text) >= 0
    return currentIsChecked !== nextIsChecked
  }
  // -------------------------------------------

  render() {
    const { text } = this.props;
    return (
      <ListItem
        leftCheckbox={createCheckbox(text, this.props)}
        primaryText={text}
      />
    )
  }
}

export default FasterCheckboxListItem
