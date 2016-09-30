import React from 'react'
import { isEmpty } from 'lodash'
import { List, ListItem, IconButton } from 'material-ui'
import NavArrow from 'material-ui/svg-icons/navigation/arrow-back'


export default (props) => {
  const { dataSource } = props
  if (isEmpty(dataSource)) return null

  const icon = (data) => (
    <IconButton
      style={{ top: -6, transform: 'rotate(45deg)' }}
      onTouchTap={(e) => props.onTapItemArrow(e, data)}
    >
      <NavArrow />
    </IconButton>
  )

  return (
    <List>
      {dataSource.map(data => (
        <ListItem
          key={`ListItem-${data.id}`}
          innerDivStyle={props.innerDivStyle}
          // TODO: 入力されていない文字をbold highlight
          primaryText={data.name}
          rightIconButton={icon(data)}
          onTouchTap={(e) => props.onTapItem(e, data)}
        />
      ))}
    </List>
  )
}
