import { render } from './app'
import { getProducts } from './contentful'

import './main.scss'

getProducts().then((entries) => {
	entries.items.forEach((entry) => {
		const product = `
			<div class="product">
				<img class="product-image" src="${entry.fields.image.fields.file.url}" alt="${entry.fields.image.fields.title}">
				<div class="product-name">${entry.fields.name}</div>
				<div class="product-price">${entry.fields.price} SEK</div>
				<div class="product-description">${entry.fields.description}</div>
			</div>
		`

		render('.products', product)
	})
})