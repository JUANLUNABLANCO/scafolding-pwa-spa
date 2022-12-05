module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{js,png,xml,ico,css,html,json}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};