import React from 'react'
import { SelectField, MenuItem } from 'material-ui'

export default (props) => {
  return(
    <SelectField id={props.id} value={props.value} onChange={props.onChange} floatingLabelText={props.floatingLabelText}>
      <MenuItem value={1} primaryText="US$1  - US$9" />
      <MenuItem value={2} primaryText="US$10 - US$19" />
      <MenuItem value={3} primaryText="US$20 - US$29" />
      <MenuItem value={4} primaryText="US$30 - US$39" />
      <MenuItem value={5} primaryText="US$40 - US$49" />
    </SelectField>
  )
}
