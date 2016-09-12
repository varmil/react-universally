import React from 'react'
import { Subheader, List, ListItem, Checkbox } from 'material-ui'

const createCheckbox = (commune, props) => {
  return (
    <Checkbox
      onCheck={(e, isChecked) => props.onCheck(commune, isChecked)}
      checked={props.checkedItems.indexOf(commune) >= 0}
    />
  )
}

// NOTE: areaの持ち方を配列からObject等に変更する場合、このComponentも変更必要
export default (props) => {
  return(
    <div>
      <Subheader>{props.subheader}</Subheader>
      <List>
        {Object.keys(props.data).map(district =>
          <ListItem
            key={district}
            primaryText={district}
            initiallyOpen={false}
            primaryTogglesNestedList={true}
            nestedItems={props.data[district].map(commune =>
              <ListItem
                key={commune}
                leftCheckbox={createCheckbox(commune, props)}
                primaryText={commune}
              />
            )}
          />
        )}
      </List>
    </div>
  )
}
