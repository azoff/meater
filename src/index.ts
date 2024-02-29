import Database from 'db'
import Controller from 'controller'

const hostname = process.env['BUN_HOST'] ?? '0.0.0.0'
const port = process.env['BUN_PORT'] ?? 3000
const db = new Database(process.env['GOOGLE_SHEET_ID']!)
const controller = new Controller(db)

Bun.serve({
	hostname,
	port,
	fetch: controller.receive
})

console.log(`server started on http://${hostname}:${port}...`)