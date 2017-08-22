import React from 'react'
import Link from 'react-router/lib/Link'
// import { connect } from 'react-redux'

class PageNotFoundView extends React.Component {
  render () {
    return (
      <div>
        <h1>Page not found</h1>
        <h2>The page you requested was not found.</h2>
        <Link to='/providerportal/'
          className={`page-not-found is-submit btn primary-btn`}
        >
          Go to homepage
        </Link>
      </div>
    )
  }
}

// function mapDispatchToProps (dispatch) {
//   return {
//     dispatch
//   }
// }

// export default connect(null, mapDispatchToProps)(PageNotFoundView)
export default PageNotFoundView
