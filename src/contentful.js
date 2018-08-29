import { client } from './client'

export function getProducts () {
	const products = client.getEntries({
			content_type: 'product'
		})
		.catch((error) => console.log(error))
		.then((entries) => {
			return entries
		})

	return products
}