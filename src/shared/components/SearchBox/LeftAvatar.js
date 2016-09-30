import React from 'react'
import { Avatar } from 'material-ui'


const avatarStyle = {
  top: 5,
  left: 20,
}

/**
 * 何も表示されていない状態のときにだすナビ
 */
export default (icon) => {
  return (
    <Avatar size={25} style={avatarStyle} icon={icon} />
  )
}
