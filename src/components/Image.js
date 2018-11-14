import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import './Image.scss'

class Image extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { src, alt, ...args } = this.props

    const query = {
      fm: args.format,
      q: args.quality,
      w: args.width,
      h: args.height
    }

    const jpg = qs.stringify(query)
    const webp = qs.stringify(Object.assign(query, { fm: 'webp' }))

    return (
      <picture>
        <source type="image/webp" srcSet={`${src}?${webp}`} />
        <source type="image/jpeg" srcSet={`${src}?${jpg}`} />
        <img className="image" src={`${src}?${jpg}`} alt={alt} />
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
