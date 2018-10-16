import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'

import Loading from './Loading'
import Card from './Card'

import './Products.scss'

class Products extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.loadProducts()
  }

  render () {
    const { entries } = this.props.products

    return (
      <div className="container">
        <div className="products">
          { entries ? (
            Object.keys(entries).map((id, index) => {
              return (
                <Card key={index} entry={entries[id]} />
              )
            })
          ) : (
            <Loading />
          ) }
        </div>
      </div>
    )
  }
}

Products.propTypes = {
  app: PropTypes.object,
  products: PropTypes.object,
  loadProducts: PropTypes.func
}

export default connectComponent(Products)
