import React from 'react'
import { Link } from 'react-router'
import { List, ListItem, Divider, Avatar } from 'material-ui'
import MapsRst from 'material-ui/svg-icons/maps/restaurant'

import stubGenre from '../../stub/genre'


const avatarStyle = {
  top: 5,
  left: 20,
}

const DEFAULT_GENRE = stubGenre.map((genre, i) => {
  return { id: i, name: genre, avatar: (<Avatar size={25} style={avatarStyle} icon={<MapsRst />} />) }
}).slice(0, 3)


/**
 * 何も表示されていない状態のときにだすナビ
 */
export default (props) => {
  return (
    <div>
      <List>
        {DEFAULT_GENRE.map((data, i) => (
          <ListItem
            key={`ListItem-Hint-${data.id}`}
            innerDivStyle={props.innerDivStyle}
            primaryText={data.name}
            leftAvatar={data.avatar}
          />
        ))}
      </List>
      <Divider inset={true} />
      <List>
        <Link to={`/search/regular`}>
          <ListItem
            insetChildren={true}
            innerDivStyle={props.innerDivStyle}
            primaryText="検索画面へ"
          />
        </Link>
      </List>
    </div>
  )
}
