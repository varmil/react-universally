import React, { Component, PropTypes } from 'react'

class Redirection extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.redirect(this.props)
  }

  componentWillUpdate(nextProps) {
    this.redirect(nextProps)
  }

  // For Override
  redirect() {
    throw new TypeError("Do not call abstract method from child.")
  }

  render() {
    return <div>{this.props.children}</div>
  }
}

export default Redirection
