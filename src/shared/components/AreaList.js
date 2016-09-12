import React from 'react'
import { Subheader, List, ListItem } from 'material-ui'
import FasterCheckboxListItem from './FasterCheckboxListItem'

// NOTE: areaの持ち方を配列からObject等に変更する場合、このComponentも変更必要
export default (props) => {
  return(
    <div>
      <Subheader>{props.subheader}</Subheader>
        <List>
          {Object.keys(props.data).map(district =>
            <ListItem
              key={`ListItem-${district}`}
              primaryText={district}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={props.data[district].map(commune =>
                <FasterCheckboxListItem
                  key={`ListItem-${commune}`}
                  text={commune}
                  checkedItems={props.checkedItems}
                  onCheck={props.onCheck}
                />
              )}
            />
          )}
        </List>
    </div>
  )
}
