import type { Serializable, SerializedData } from "db"
import toTitleCase from "titlecase"

interface RestaurantParams {
	name: string
	address: string
	phone?: string
	writeup: string
	website?: string
	source: string
	created?: Date
	tags?: string[]
}

function coerceTags(writeup: string) {
	const tags = []
	if (writeup.includes('vegan') || writeup.includes('vegetarian'))
		tags.push('plants')
	if (writeup.includes('bakery') || writeup.includes('baked') || writeup.includes('bake shop') || 
			writeup.includes('donut') || writeup.includes('bread') || writeup.includes('pastry') ||
			writeup.includes('cake') || writeup.includes('cookie') || writeup.includes('pie') ||
			writeup.includes('tart') || writeup.includes('croissant') || writeup.includes('muffin') ||
			writeup.includes('scone') || writeup.includes('biscuit') || writeup.includes('roll') ||
			writeup.includes('bagel') || writeup.includes('pretzel') || writeup.includes('strudel'))
		tags.push('carbs')
	if (writeup.includes('bar') || writeup.includes('pub') || writeup.includes('brewery') || 
			writeup.includes('cocktail') || writeup.includes('wine') || writeup.includes('beer'))
		tags.push('booze')
	if (writeup.includes('sushi') || writeup.includes('poke') || writeup.includes('sashimi') ||
			writeup.includes('nigiri') || writeup.includes('maki') || writeup.includes('roll'))
		tags.push('sushi')
	if (writeup.includes('fish') || writeup.includes('seafood') || writeup.includes('crab') ||
			writeup.includes('lobster') || writeup.includes('shrimp') || writeup.includes('oyster') ||
			writeup.includes('clam') || writeup.includes('mussel') || writeup.includes('scallop'))
		tags.push('seafood')
	if (writeup.includes('cafe') || writeup.includes('coffee') || writeup.includes('tea'))
		tags.push('caffeine')
	if (writeup.includes('soft serve') || writeup.includes('ice cream') || writeup.includes('gelato'))
		tags.push('dairy')
	return tags
}

class Restuarant implements Serializable {
	
	name: string
	address: string
	phone: string
	writeup: string
	tags: string
	website: string
	source: string
	created: Date
	
	constructor(params: RestaurantParams) {
		this.name = params.name
		this.address = params.address
		this.phone = params.phone ?? ''
		this.writeup = params.writeup
		this.tags = (params.tags ?? coerceTags(params.writeup.toLowerCase())).join(', ')
		this.website = params.website ?? ''
		this.source = params.source
		this.created = params.created ?? new Date()
	}

	serialize() {
		const properties = Object.getOwnPropertyNames(this) as (keyof Restuarant)[]
		const serialized: Record<string, SerializedData> = {}
		properties.forEach(prop => {
			serialized[toTitleCase(prop)] = this[prop] as SerializedData
		})
		return serialized
	}

}

export default Restuarant