import React from 'react'
import PropTypes from 'prop-types'

import './Image.scss'

class Image extends React.Component {
  constructor (props) {
    super(props)
  }

  parseQuery (args) {
    return Object.entries(args).map(item => {
      return item[1] ? item.join('=') : false
    }, args).filter(item => {
      return item
    }).join('&')
  }

  render () {
    const args = {
      fm: this.props.format,
      q: this.props.quality,
      w: this.props.width,
      h: this.props.height
    }

    const defaultQuery = this.parseQuery(args),
          webpQuery = this.parseQuery(Object.assign(args, { fm: 'webp' }))

    return (
      <picture>
        <source
          type="image/webp"
          srcSet={`${this.props.src}?${webpQuery}`}></source>
        <source
          type="image/jpeg"
          srcSet={`${this.props.src}?${defaultQuery}`}></source>
        <img
          className="image"
          src={`${this.props.src}?${defaultQuery}`}
          alt={this.props.alt} />
      </picture>
    )
  }
}

Image.defaultProps = {
  format: "jpg",
  quality: 70,
  width: 1280
}

Image.propTypes = {
  format: PropTypes.string,
  quality: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image
