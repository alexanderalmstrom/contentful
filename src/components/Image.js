import React from 'react'
import PropTypes from 'prop-types'

import './Image.scss'

class Image extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const args = {
      fm: this.props.format,
      q: this.props.quality,
      w: this.props.width,
      h: this.props.height
    }

    const query = Object.entries(args).map(item => {
      return item[1] ? item.join('=') : false
    }, args).filter(item => {
      return item
    }).join('&')

    return (
      <img className="image"
        src={`${this.props.src}?${query}`}
        alt={this.props.alt} />
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
