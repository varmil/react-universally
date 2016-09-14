import React from 'react'
import { Avatar } from 'material-ui'
import NavClose from 'material-ui/svg-icons/navigation/close';
import { Flex, Box } from 'reflexbox'

import ImgDialog from '../dialog/ImgDialog'

const DEFAULT_IMG_SIZE = 85

const closeStyle = {
  position: 'absolute',
  top: 2,
  right: 2,
}

const initialState = {
  dialogFile: undefined,
  dialogOpened: false,
}


export default class ImgPreviewList extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  onTapItem(e, tappedFile) {
    e.preventDefault()
    e.stopPropagation()

    this.setState({ ...this.state, dialogOpened: true, dialogFile: tappedFile })
  }

  handleClose() {
    this.setState({ ...this.state, dialogOpened: false });
  }


  createItem(file, imgSize, onTapDelete) {
    const boxStyle = {
      position: 'relative',
      width: imgSize,
      height: imgSize,
      margin: 1,
    }

    // crop and resize images
    // http://stackoverflow.com/questions/11552380/how-to-automatically-crop-and-center-an-image
    const imgStyle = {
      objectFit: 'cover',
      objectPosition: 'center', /* Center the image within the element */
      height: imgSize,
      width: imgSize,
    }

    return (
      <Box
        key={`Box${file.preview}`}
        style={boxStyle}
        onTouchTap={(e) => this.onTapItem(e, file)}
      >
        <img key={`Img${file.preview}`} src={file.preview} role="presentation" style={imgStyle} />
        <Avatar
          key={`Avatar${file.preview}`}
          icon={<NavClose key={`NavClose${file.preview}`} />}
          size={28}
          style={closeStyle}
          onTouchTap={(e) => onTapDelete(e, file)}
        />
      </Box>
    )
  }

  render() {
    const props = this.props
    const imgSize = props.imgSize || DEFAULT_IMG_SIZE
    return(
      <div>
        <Flex
        align="center"
        wrap
        p={0}
        style={{}}
        >
        {props.files.map((file) => this.createItem(file, imgSize, props.onTapDelete))}
        </Flex>

        <ImgDialog open={this.state.dialogOpened} handleClose={::this.handleClose} file={this.state.dialogFile}  />
      </div>
    )
  }
}
