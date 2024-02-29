import pkg from '../package.json';

if (process.argv.includes('docker')) {
	console.log(`${pkg.name.replace('@', '')}:${pkg.version}`)
} else if (process.argv.includes('git')) {
	console.log(`v${pkg.version}`)
} else {
	console.log(pkg.version)
}