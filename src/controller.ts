import type Database from "db"
import Parser, { SupportedParserEngines, type SupportedParserEngineDomain } from "parser"
import type Restuarant from "restaurant"

interface RequestData {
	url?: string
}

class Controller {

	db: Database

	constructor(db: Database) {
		this.db = db
	}

	save = (restaurants: Restuarant[]) => this.db.insert('restaurants', restaurants)

	receive = async (req: Request) => {
		let data: RequestData = {}
		try {
			data = await req.json() as RequestData
		} catch(e) {
			console.warn('failed to parse request body', e)
		}
		
		if (!data.url) 
				return Response.json({ error: 'url is required' }, { status: 400 })
		
		const hostname = new URL(data.url).hostname
		const domain = hostname.split('.').slice(-2).join('.')
		
		if (!Object.keys(SupportedParserEngines).includes(domain))
			return new Response('unsupported domain', { status: 400 })
		
		const response = await fetch(data.url)
		const parser = new Parser(domain as SupportedParserEngineDomain)
		const restaurants = await parser.parse(response)
		this.save(restaurants) // background task
		return Response.json({ restaurants })
	}

}

export default Controller