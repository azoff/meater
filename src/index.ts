import Router from 'router'

const hostname = process.env['MEATER_HOST'] ?? '0.0.0.0'
const port = process.env['MEATER_PORT'] ?? 3000
const router = new Router()

Bun.serve({
	hostname,
	port,
	fetch: router.fetch
})

console.log(`server started on http://${hostname}:${port}...`)