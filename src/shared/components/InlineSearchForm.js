import React, { Component } from 'react'
import { Paper, TextField } from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';

const paperStyle = {
  padding: '20px 0px',
  textAlign: 'center',
  display: 'inline-block',
  width: '100%',
}

const formStyle = {
  width: '40%',
}

class InlineSearchForm extends Component {
  render() {
    const props = this.props
    return (
      <Paper style={paperStyle} zDepth={1}>
        <ActionSearch />
        <span className="search-form__text search-form__text--area">
          <TextField
            style={formStyle}
            hintText="東京都、銀座"
            value={props.areaFormValue}
            onChange={props.onChangeAreaForm}
            fullWidth={true}
          />
        </span>
        <span style={{ margin: '10px' }}>
          ×
        </span>
        <span className="search-form__text search-form__text--keyword">
          <TextField
            style={formStyle}
            hintText="店名、ラーメン"
            value={props.genreFormValue}
            onChange={props.onChangeGenreForm}
            fullWidth={true}
          />
        </span>
      </Paper>
    )
  }
}

export default InlineSearchForm
