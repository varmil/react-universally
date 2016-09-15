import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
  width: '98%',
  maxWidth: 'none',
};

const imgStyle = {
  objectFit: 'scale-down',
  objectPosition: 'center 0%',
  width: '100%',
  maxHeight: 'inherit',
}

export default class ImgDialog extends React.Component {
  render() {
    if (! this.props.imgSrc) return null

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Image Preview"
          actions={actions}
          contentStyle={customContentStyle}
          onRequestClose={this.props.handleClose}
          open={this.props.open}
          autoScrollBodyContent={false}
        >
          <img src={this.props.imgSrc} role="presentation" style={imgStyle} />
        </Dialog>
      </div>
    )
  }
}
