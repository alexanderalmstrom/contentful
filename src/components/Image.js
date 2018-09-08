import React from 'react'
import PropTypes from 'prop-types'

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

    let argsArray = [],
        imageQuery = ''

    Object.entries(args).map(arg => {
      if (arg[1]) {
        arg = arg.join('=')
        argsArray.push(arg)
      }
    })

    if (argsArray.length > 0) {
      imageQuery = '?' + argsArray.join('&')
    }

    return (
      <img className="image"
        src={`${this.props.src}${imageQuery}`}
        alt={this.props.alt} />
    )
  }
}

Image.propTypes = {
  format: PropTypes.string,
  quality: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}

export default Image