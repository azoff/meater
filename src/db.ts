import { AuthorizedGoogleSpreadsheet } from "sheet"

export type SerializedData = string | number | boolean | Date

export interface Serializable {
	serialize: () => Record<string, SerializedData>
}

export default class Database {

	spreadsheet: AuthorizedGoogleSpreadsheet

	constructor(sheetId: string) {
		this.spreadsheet = new AuthorizedGoogleSpreadsheet(sheetId)
	}

	async insert(table:string, objects: Serializable[]) {
		const rows = objects.map(obj => obj.serialize())
		const headerValues = Object.keys(rows[0])
		const sheet = await this.spreadsheet.findOrCreateWorksheet(table, headerValues)
		return sheet.addRows(rows, { insert: true })
	}

}
