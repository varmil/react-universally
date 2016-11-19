import React from 'react'
import Dropzone from 'react-dropzone'
import { map, throttle } from 'lodash'
import {  IconButton } from 'material-ui'
import ImgAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

import ImgPreviewList from '../list/ImgPreviewList'


const dropzoneStyle = {
  display: 'inline-block',
  backgroundColor: 'whitesmoke',
  border: '1px dashed gray',
  marginBottom: 10
}

const iconStyles = {
  medium: {
    width: 48,
    height: 48,
  },
  large: {
    width: 60,
    height: 60,
  },
}

const iconButtonStyles = {
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
}


export default class IconTextField extends React.Component {
  render() {
    const props = this.props

    return(
      <div>
        <Dropzone accept="image/*" onDrop={props.onDrop} style={dropzoneStyle}>
          <IconButton
            iconStyle={iconStyles.medium}
            style={iconButtonStyles.medium}
          >
            <ImgAddPhoto />
          </IconButton>
        </Dropzone>

        {props.files.length > 0 ?
          <ImgPreviewList files={props.files} onTapDelete={props.onTapImgDelete} />
        : null}
      </div>
    )
  }
}
