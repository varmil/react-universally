import React from 'react'
import { CircularProgress } from 'material-ui'

const circleStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  margin: '-20px 0 0 -20px',
}

export default (props) => {
  return(
    <CircularProgress style={circleStyle} />
  )
}
