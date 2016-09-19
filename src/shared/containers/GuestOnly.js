import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Redirection from './Redirection'

class GuestOnly extends Redirection {
  /**
   * @Override
   */
  redirect() {
    // Serverで認証情報はfetch済みの想定
    if (this.props.user.id) {
      this.props.router.replace('/search/top')
    }
  }
}


export default connect(state => ({
  user: state.user,
}))(withRouter(GuestOnly))
