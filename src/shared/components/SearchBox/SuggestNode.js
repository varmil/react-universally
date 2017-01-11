import React from 'react'
import { isEmpty } from 'lodash'
import { Link } from 'react-router'
import { List, ListItem, IconButton } from 'material-ui'
import NavArrow from 'material-ui/svg-icons/navigation/chevron-right'


// FIXME: SearchBoxからCOPYした
const NODE_TYPE = {
  GENRE: 'genre',
  AREA: 'area',
}


export default (props) => {
  const { dataSource, nodeType } = props
  if (isEmpty(dataSource)) return null

  const icon = (data) => {
    if (data.isCategorySuggest) {
        // render nothing if the keyword is Genre
    } else {
        return (
            <IconButton
                style={{ top: -6 }}
                onTouchTap={(e) => props.onTapItemArrow(e, data)}
            >
                <NavArrow />
            </IconButton>
        )
    }
  }


  const createQuery = (data) => {
      if (nodeType === NODE_TYPE.GENRE) {
          if (data.isCategorySuggest) return `genreId=${data.id}`
          else return `rstId=${data.id}`
      } else {
          // TODO: implement area search
          return `todo-not-implement-area-query`
      }
  }


  return (
    <List>
      {dataSource.map(data => (
        <Link key={`ListItem-Suggest-${data.id}`} to={`/restaurant/list?${createQuery(data)}`} style={{ textDecoration: 'none' }} >
            <ListItem
              key={`ListItem-${data.id}`}
              innerDivStyle={props.innerDivStyle}
              // TODO: 入力されていない文字をbold highlight
              primaryText={data.name}
              rightIconButton={icon(data)}
              onTouchTap={(e) => props.onTapItem(e, data)}
            />
        </Link>
      ))}
    </List>
  )
}
