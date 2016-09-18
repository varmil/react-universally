import React from 'react'
import { values } from 'lodash'
import { List, ListItem, Divider, IconMenu, MenuItem, IconButton, Avatar } from 'material-ui'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import { grey400 } from 'material-ui/styles/colors'

import FiveStar from '../FiveStar'


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
)

const rightIconMenu = (props, rstId) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onTouchTap={(e) => props.onTapDetail(e, rstId)}>Detail</MenuItem>
  </IconMenu>
)

const primaryTextStyle = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontSize: '80%',
}

const secondaryTextStyle = {
  fontSize: 11,
  lineHeight: '14px',
  marginTop: 0,
}

function createPrimaryText(str) {
  return (
    <div style={primaryTextStyle}>{str}</div>
  )
}

// Reviewの際の「投稿するお店を選ぶ」などで使用する小さめのレストランリスト
// NOTE: areaの持ち方を配列からObject等に変更する場合、このComponentも変更必要
export default (props) => {
  return(
    <div>
      <List>
        {values(props.restaurants).map(rst =>
          <div key={`div${rst.id}`}>
            <ListItem
              key={`listitem${rst.id}`}
              leftAvatar={<Avatar src="https://tabelog.ssl.k-img.com/restaurant/images/Rvw/49783/150x150_square_49783127.jpg" />}
              rightIconButton={rightIconMenu(props, rst.id)}
              primaryText={createPrimaryText(rst.name)}
              secondaryText={
                <p style={secondaryTextStyle}>
                  <FiveStar rating={rst.rating} /><br />
                  {rst.distance}m from {rst.area} / {rst.genre}
                </p>
              }
              secondaryTextLines={2}
              onTouchTap={(e) => props.onTapItem(e, rst.id)}
            />
            <Divider key={`divider${rst.id}`} inset={true} />
          </div>
        )}
      </List>
    </div>
  )
}
