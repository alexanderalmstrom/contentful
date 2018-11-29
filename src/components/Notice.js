import React from 'react'
import PropTypes from 'prop-types'

import './Notice.scss'

class Notice extends React.Component {
  render() {
    return <div className="notice">{this.props.message}</div>
  }
}

Notice.defaultProps = {
  message: 'Something went wrong.'
}

Notice.propTypes = {
  message: PropTypes.string
}

export default Notice
