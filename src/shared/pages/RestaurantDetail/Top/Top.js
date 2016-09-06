import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { Paper, Divider, Table, TableBody, TableRow, TableRowColumn } from 'material-ui';

class Top extends Component {
  render() {
    return (
      <div>
        <Helmet title="RestaurantDetailTop" />

        <Paper>
          <h2></h2>
        </Paper>
      </div>
    )
  }
}

export default connect()(Top)
