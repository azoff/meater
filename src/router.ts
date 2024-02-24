import Parser, { SupportedParserEngines, type SupportedParserEngineDomain } from "parser"

interface RequestData {
	url?: string
}

class Router {

	fetch = async (req: Request) => {
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
		return Response.json({ restaurants })
	}

}

export default Router