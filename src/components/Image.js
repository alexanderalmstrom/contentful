import React from 'react'
import PropTypes from 'prop-types'

import './Image.scss'

class Image extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const defaults = {
      fm: "jpg",
      q: 70,
      w: 1280
    }

    const args = Object.assign({}, defaults, {
      fm: this.props.format != false ? this.props.format || defaults.fm : null,
      q: this.props.quality != false ? this.props.quality || defaults.q : null,
      w: this.props.width != false ? this.props.width || defaults.w : null,
      h: this.props.height
    })

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

Image.propTypes = {
  format: PropTypes.string,
  quality: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image
