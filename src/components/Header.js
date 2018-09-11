import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

class Header extends React.Component {
	render () {
		return (
			<header className="main-header">
	      <h1 className="main-brand">
	        <Link className="main-brand-link" to="/">Contentful</Link>
	      </h1>
	    </header>
		)
	}
}

export default Header
