import * as cheerio from 'cheerio';

export default async function(response: Response) {
	const $ = cheerio.load(await response.text())
	const restaurants = $('.c-mapstack__card')
		.filter((_, el) => 
			$(el).find('.c-mapstack__card-hed h1').length > 0 &&
			$(el).find('.c-mapstack__address').length > 0 
		)
		.map((_, el) => {
			const name = $(el).find('.c-mapstack__card-hed h1').text()
			const address = $(el).find('.c-mapstack__address').text()
			const phone = $(el).find('.c-mapstack__phone a').attr('href')
			const writeup = $(el).find('.c-entry-content').text()?.trim()
			const website = $(el).find('.c-mapstack__info[data-analytics-link="link-icon"]').attr('href')
			return { name, address, phone, writeup, website }
		})
	return Array.from(restaurants)
}