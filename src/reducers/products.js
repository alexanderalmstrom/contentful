import { makeReducer } from './util'

export const products = makeReducer(function (action) {
	switch (action.type) {
		case 'LOAD_PRODUCTS_PENDING':
			return {
				fetching: true
			}

		case 'LOAD_PRODUCTS_FULFILLED':
			return {
				fetching: false,
				entries: action.payload.reduce((collection, entry) => {
					collection[ entry.sys.id ] = entry
					return collection
				}, {})
			}

		case 'LOAD_PRODUCTS_REJECTED':
			return {
				error: true,
				fetching: false
			}
	}
}, { entries: [] })