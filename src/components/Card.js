import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Image from './Image'

import './Card.scss'

class Card extends React.Component {
  render() {
    const { entry } = this.props

    return (
      <div className="card">
        <Link to={`/product/${entry.fields.slug}`} className="card-link">
          <div className="card-image">
            {entry.fields.image ? (
              <Image image={entry.fields.image} width={680} />
            ) : null}
          </div>
          <div className="card-content">
            <h2 className="card-name">{entry.fields.name}</h2>
            <div className="card-price">
              {entry.fields.price} {entry.fields.currency}
            </div>
            <p className="card-description">{entry.fields.description}</p>
          </div>
        </Link>
      </div>
    )
  }
}

Card.propTypes = {
  entry: PropTypes.object.isRequired
}

export default Card
