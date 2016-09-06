import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

class Top extends Component {
  render() {
    return (
      <div>
        <Helmet title="RestaurantDetailTop" />
      </div>
    )
  }
}

export default connect()(Top)
