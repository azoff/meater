import type Restuarant from "restaurant"
import EaterParserEngine from 'engines/eater'

type ParserEngine = (response: Response) => Promise<Restuarant[]>

export const SupportedParserEngines = {
	'eater.com': EaterParserEngine
}

export type SupportedParserEngineDomain = keyof typeof SupportedParserEngines

class Parser {

	parse: ParserEngine

	constructor(parserEngine: SupportedParserEngineDomain) {
		this.parse = SupportedParserEngines[parserEngine]
	}

}

export default Parser