import React, { Component } from 'react'
import { Paper, TextField } from 'material-ui';
import MapsPlace from 'material-ui/svg-icons/maps/place'
import MapsRestaurant from 'material-ui/svg-icons/maps/restaurant'
import styles from './index.css'

// TextField id attr is workaround for the bug
// https://github.com/callemall/material-ui/issues/3757
class InlineSearchForm extends Component {
  render() {
    const props = this.props
    return (
      <Paper className={`base-paper ${styles.paper}`} zDepth={1}>
        <span>
          <MapsPlace className={styles.mapsIcon} />
          <TextField
            id='InlineSearchForm-area'
            className={styles.textField}
            hintText={<span>東京都、銀座</span>}
            value={props.areaFormValue}
            onChange={props.onChangeAreaForm}
          />
        </span>

        <span style={{ width: '5%', display: 'inline-block' }}></span>

        <span>
          <MapsRestaurant className={styles.mapsIcon} />
          <TextField
            id='InlineSearchForm-genre'
            className={styles.textField}
            hintText={<span>店名、ラーメン</span>}
            value={props.genreFormValue}
            onChange={props.onChangeGenreForm}
          />
        </span>
      </Paper>
    )
  }
}

export default InlineSearchForm
