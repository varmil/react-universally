import React from 'react'
import { SelectField, MenuItem } from 'material-ui'

export default (props) => {
  return(
    <SelectField id={props.id} value={props.value} onChange={props.onChange} floatingLabelText={props.floatingLabelText}>
      <MenuItem value={1} primaryText="US$1" />
      <MenuItem value={5} primaryText="US$5" />
      <MenuItem value={10} primaryText="US$10" />
      <MenuItem value={20} primaryText="US$20" />
      <MenuItem value={30} primaryText="US$30" />
      <MenuItem value={40} primaryText="US$40" />
      <MenuItem value={50} primaryText="US$50" />
      <MenuItem value={9999} primaryText="US$51 ~" />
    </SelectField>
  )
}
