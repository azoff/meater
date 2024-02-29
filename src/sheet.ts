import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import toTitleCase from 'titlecase';

export const serviceAccountAuth = new JWT({
	email: process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'],
	key: process.env['GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY'],
	scopes: [
		'https://www.googleapis.com/auth/spreadsheets',
	],
});

export class AuthorizedGoogleSpreadsheet extends GoogleSpreadsheet {
	
	private loaded?: Promise<void>

	constructor(sheetId: string, auth = serviceAccountAuth) {
		super(sheetId, auth);
	}

	load() {
		if (!this.loaded) {
			this.loaded = this.loadInfo()
		}
		return this.loaded
	}

	async findOrCreateWorksheet(sheetTitle: string, headerTitles: string[]) {
		await this.load()
		const title = toTitleCase(sheetTitle)
		let sheet = this.sheetsByTitle[title]
		
		// ensure that a sheet with matching title exists
		if (!sheet) {
			sheet = this.sheetsByIndex[0]
			await sheet.updateProperties({ title })
		}

		// ensure that the sheet has the expected headers
		await sheet.setHeaderRow(headerTitles)

		// make the header row bold
		await sheet.loadCells('A1:Z1')
		for (let i = 0; i < headerTitles.length; i++) {
			const cell = sheet.getCell(0, i)
			cell.textFormat = { bold: true }
		}
		
		await sheet.saveUpdatedCells()
		return sheet
	}

}
