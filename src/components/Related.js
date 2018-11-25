import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'

import Loading from './Loading'
import Card from './Card'

import './Products.scss'

class Related extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { related } = this.props

    return (
      <div className="related-products">
        <h3 className="related-products-title">Related products</h3>
        {related ? (
          related.map((entry, index) => {
            return <Card key={index} entry={entry} />
          })
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

Related.propTypes = {
  app: PropTypes.object,
  related: PropTypes.array
}

export default connectComponent(Related)
