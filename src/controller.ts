import type Database from "db"
import Parser, { SupportedParserEngines, type SupportedParserEngineDomain } from "parser"
import type Restuarant from "restaurant"

interface RequestData {
	url?: string | null
}

class Controller {

	db: Database

	constructor(db: Database) {
		this.db = db
	}

	save = (restaurants: Restuarant[]) => this.db.insert('restaurants', restaurants)

	receive = async (req: Request) => {
		
		const reqUrl = new URL(req.url)
		console.log(`${req.method} ${reqUrl.pathname}`)
		
		if (req.method === 'GET' && reqUrl.pathname === '/map') {
			const mapId = process.env['GOOGLE_MAP_ID']
			const location = `https://www.google.com/maps/d/u/0/edit?mid=${mapId}&usp=sharing`
			return Response.redirect(location, 302)
		}

		let data: RequestData = {}
		try {
			data = await req.json() as RequestData
		} catch(e) {
			const url = reqUrl.searchParams.get('url')
			data = { url }
		}

		if (data.url == null) 
			return Response.json({ error: 'url is required' }, { status: 400 })
		else if (!data.url.startsWith('http'))
			return Response.json({ error: 'invalid url scheme' }, { status: 400 })		
		
		const hostname = new URL(data.url).hostname
		const domain = hostname.split('.').slice(-2).join('.')
		console.log(`processing source:`, data.url)
		
		if (!Object.keys(SupportedParserEngines).includes(domain))
			return new Response(`unsupported domain: ${domain}`, { status: 400 })
		
		const response = await fetch(data.url)
		const parser = new Parser(domain as SupportedParserEngineDomain)
		const restaurants = await parser.parse(response)
		
		console.log(`found ${restaurants.length} restaurant(s)!`)
		this.save(restaurants).then(() => console.log('saved to database!'))
		return Response.json({ restaurants })
	}

}

export default Controller