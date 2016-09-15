import React from 'react'

function createIsAuthenticated(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <mark className="mark-auth-mobile">[携帯電話番号認証済]</mark>
    )
  } else {
    return (
      null
    )
  }
}

export default (props) => {
  return (
    <span>
      {createIsAuthenticated(props.bool)}
    </span>
  )
}
