import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import './Image.scss'

class Image extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const args = {
      fm: this.props.format,
      q: this.props.quality,
      w: this.props.width,
      h: this.props.height
    }

    const defaultQuery = qs.stringify(args),
      webpQuery = qs.stringify(Object.assign(args, { fm: 'webp' }))

    return (
      <picture>
        <source type="image/webp" srcSet={`${this.props.src}?${webpQuery}`} />
        <source
          type="image/jpeg"
          srcSet={`${this.props.src}?${defaultQuery}`}
        />
        <img
          className="image"
          src={`${this.props.src}?${defaultQuery}`}
          alt={this.props.alt}
        />
      </picture>
    )
  }
}

Image.defaultProps = {
  format: 'jpg',
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
