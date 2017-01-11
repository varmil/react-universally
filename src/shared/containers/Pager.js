import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import GooglePager from '../components/common/GooglePager'

const FIRST_PAGE_NUMBER = 1

class Pager extends Component {
  static PropTypes = {
    fetch: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.location.query.page || FIRST_PAGE_NUMBER,
      nowLoading: false,
      hideNext: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    // fetch when query.page is changed ブラウザbackした際もここを通ってfetchする
    const nextPageNum = nextProps.location.query.page || FIRST_PAGE_NUMBER
    if (nextPageNum !== this.state.currentPage) {
      // fetch中は二重ローディングを防ぐ
      if (this.state.nowLoading) return

      // props.fetch return Promise
      this.props.fetch(nextPageNum).then((hideNext) => {
          this.setState({
              ...this.state,
              currentPage: nextPageNum,
              nowLoading: false,
              hideNext: !!hideNext,
          })
      })

      this.setState({ ...this.state, nowLoading: true })
    }
  }

  onTapPage(e, nextNum) {
    this.props.router.push({
      pathname: this.props.location.pathname,
      query: { ...this.props.location.query, page: nextNum },
    })
  }


  render() {
    const state = this.state
    return (
      <GooglePager
        style={{ ...this.props.style }}
        current={state.currentPage}
        nowLoading={state.nowLoading}
        hideNext={state.hideNext}
        onPageChanged={::this.onTapPage}
      />
    )
  }
}


export default connect()(withRouter(Pager))
