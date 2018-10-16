import React from 'react'

import './NotFound.scss'

class NotFound extends React.Component {
  render() {
    return (
      <div className="container not-found">
        <h1>404</h1>
        <p>Oh no! You broke everything :(</p>
      </div>
    )
  }
}

export default NotFound
