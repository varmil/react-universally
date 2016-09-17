import React from 'react'
import { FlatButton } from 'material-ui'

function onLoginButtonTap() {
  console.log('you tap LoginButton')
}

export default (props) => {
  return(
    <FlatButton
      label="LOGIN"
      onTouchTap={onLoginButtonTap}
    />
  )
}
