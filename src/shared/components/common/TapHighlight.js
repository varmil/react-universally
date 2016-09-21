import React from 'react'

const DEFAULT_HIGHLIGHT_COLOR = 'rgba(0,0,0,.1)'
const DEFAULT_HIGHLIGHT_DURATION_MS = 20

const containerStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const clear = (timeoutId) => {
  if (timeoutId && clearTimeout) {
    clearTimeout(timeoutId)
  }
}

export default class TapHighlight extends React.Component {
  constructor(props) {
    super(props)
    this.state = { highlight: false }
  }

  componentWillUnmount () {
    clear(this.timeoutId)
  }

  onTouchTap(e) {
    this.setState({ highlight: true })

    clear()
    this.timeoutId = setTimeout(() => {
      this.setState({ highlight: false })
    }, DEFAULT_HIGHLIGHT_DURATION_MS)
  }

  render() {
    const bgColor = (this.state.highlight) ? DEFAULT_HIGHLIGHT_COLOR : 'none'
    const tappedStyle = {
      backgroundColor: bgColor,
    }

    return(
      <div onTouchTap={::this.onTouchTap} style={{ ...containerStyle, ...tappedStyle, }}>
      </div>
    )
  }
}
