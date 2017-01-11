import React from 'react'
import { map } from 'lodash'
import { Link } from 'react-router'
import { List, ListItem } from 'material-ui'
import MapsRst from 'material-ui/svg-icons/maps/restaurant'

import LeftAvatar from './LeftAvatar'
import masterGenre from '../../master/genre'


const DEFAULT_GENRE = map(masterGenre, (genre, id) => {
    return { id: id, name: genre, avatar: LeftAvatar(<MapsRst />) }
}).slice(0, 4)

/**
* 何も表示されていない状態のときにだすナビ
*/
export default (props) => {
    return (
        <div>
            <List>
                {DEFAULT_GENRE.map((data, i) => (
                    <Link key={`Link-Hint-${data.id}`} to={`/restaurant/list?genreId=${data.id}`} style={{ textDecoration: 'none' }} >
                        <ListItem
                            key={`ListItem-Hint-${data.id}`}
                            innerDivStyle={props.innerDivStyle}
                            primaryText={data.name}
                            leftAvatar={data.avatar}
                        />
                    </Link>
                ))}
            </List>
        </div>
    )
}
