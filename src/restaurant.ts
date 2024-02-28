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
}

class Restuarant implements Serializable {
	
	name: string
	address: string
	phone: string
	writeup: string
	website: string
	source: string
	created: Date
	
	constructor(params: RestaurantParams) {
		this.name = params.name
		this.address = params.address
		this.phone = params.phone ?? ''
		this.writeup = params.writeup
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