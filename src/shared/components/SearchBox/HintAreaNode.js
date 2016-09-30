import React from 'react'
import { Link } from 'react-router'
import { List, ListItem, Divider, Subheader } from 'material-ui'
import MapNearMe from 'material-ui/svg-icons/maps/near-me';

import LeftAvatar from './LeftAvatar'


/**
 * 何も表示されていない状態のときにだすナビ
 */
export default (props) => {
  return (
    <div>
      <List>
        <ListItem
          innerDivStyle={props.innerDivStyle}
          primaryText={`Near Me`}
          leftAvatar={LeftAvatar(<MapNearMe />)}
        />
      </List>
      <Divider inset={true} />
      <List>
        <ListItem
          insetChildren={true}
          innerDivStyle={props.innerDivStyle}
          primaryText="Tokyo"
        />
      </List>
    </div>
  )
}
