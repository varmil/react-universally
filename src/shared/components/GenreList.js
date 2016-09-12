import React from 'react'
import { Subheader, List } from 'material-ui'
import FasterCheckboxListItem from './FasterCheckboxListItem'

// NOTE: areaの持ち方を配列からObject等に変更する場合、このComponentも変更必要
export default (props) => {
  return(
    <div>
      <Subheader>{props.subheader}</Subheader>
        <List>
          {props.data.map(str =>
            <FasterCheckboxListItem
              key={`ListItem-${str}`}
              text={str}
              checkedItems={props.checkedItems}
              onCheck={props.onCheck}
            />
          )}
        </List>
    </div>
  )
}
