import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import './Image.scss'

class Image extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { src, alt, ...props } = this.props

    const args = {
      fm: props.format,
      q: props.quality,
      w: props.width,
      h: props.height
    }

    const jpg = qs.stringify(args)
    const webp = qs.stringify(Object.assign(args, { fm: 'webp' }))

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
