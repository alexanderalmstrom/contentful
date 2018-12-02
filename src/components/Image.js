import React from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import './Image.scss'

class Image extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { image, ...args } = this.props

    const query = {
      fm: args.format,
      q: args.quality,
      w: args.width,
      h: args.height
    }

    const jpg = qs.stringify(query)
    const webp = qs.stringify(Object.assign(query, { fm: 'webp' }))

    return (
      <div className={args.className}>
        {image && image.fields ? (
          <picture>
            <source
              type="image/webp"
              srcSet={`${image.fields.file.url}?${webp}`}
            />
            <source
              type="image/jpeg"
              srcSet={`${image.fields.file.url}?${jpg}`}
            />
            <img
              className="image"
              src={`${image.fields.file.url}?${jpg}`}
              alt={image.title}
            />
          </picture>
        ) : null}
      </div>
    )
  }
}

Image.defaultProps = {
  format: 'jpg',
  quality: 70,
  width: 1440
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
  className: PropTypes.string,
  format: PropTypes.string,
  quality: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image
